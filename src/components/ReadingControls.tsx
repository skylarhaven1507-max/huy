import React, { useState } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { Article, FontSize, LineHeight } from '../types';
import { 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Printer, 
  Type, 
  AlignLeft, 
  Maximize2, 
  Minimize2, 
  Check, 
  Copy,
  Sliders
} from 'lucide-react';

interface ReadingControlsProps {
  article: Article;
}

export const ReadingControls: React.FC<ReadingControlsProps> = ({ article }) => {
  const { 
    fontSize, 
    setFontSize, 
    lineHeight, 
    setLineHeight, 
    focusedReadingMode, 
    setFocusedReadingMode,
    isBookmarked,
    toggleBookmark,
    showToast,
    audioTrack,
    playAudio,
    stopAudio
  } = useNewspaper();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const bookmarked = isBookmarked(article.id);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('Đã sao chép liên kết bài viết!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  // Text-to-speech using Web Speech API or audio player
  const handleToggleTTS = () => {
    if (audioTrack?.isTTS && audioTrack.title === article.title) {
      // Stop speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      stopAudio();
      showToast('Đã dừng đọc bài viết', 'info');
      return;
    }

    // Try SpeechSynthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.excerpt}. ${article.content.map(b => b.content || '').join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead.slice(0, 800)); // Sample reading
      utterance.lang = 'vi-VN';
      utterance.rate = 1.0;

      utterance.onstart = () => {
        playAudio(article.title, `Giọng đọc tự động • ${article.author.name}`, '', true);
        showToast('Đang phát giọng đọc bài viết...', 'info');
      };
      utterance.onend = () => {
        stopAudio();
      };
      utterance.onerror = () => {
        stopAudio();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback
      playAudio(article.title, `Bản tin âm thanh • ${article.author.name}`, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', true);
      showToast('Đang phát bản đọc âm thanh...', 'info');
    }
  };

  const fontSizes: { size: FontSize; label: string }[] = [
    { size: 'sm', label: 'Nhỏ' },
    { size: 'base', label: 'Chuẩn' },
    { size: 'lg', label: 'Lớn' },
    { size: 'xl', label: 'Rất lớn' },
  ];

  const lineHeights: { height: LineHeight; label: string }[] = [
    { height: 'tight', label: 'Gọn' },
    { height: 'normal', label: 'Tiêu chuẩn' },
    { height: 'relaxed', label: 'Thoáng' },
  ];

  return (
    <aside className="sticky top-24 flex flex-col gap-2 z-20 no-print">
      <div 
        className="flex flex-col gap-1.5 p-1.5 rounded-full border shadow-md backdrop-blur-md"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-rule)',
          color: 'var(--text-ink)',
        }}
      >
        {/* Bookmark */}
        <button
          onClick={() => toggleBookmark(article.id)}
          className={`p-2.5 rounded-full transition-colors ${
            bookmarked ? 'text-amber-600 bg-amber-500/10' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100'
          }`}
          title={bookmarked ? 'Bỏ lưu bài viết' : 'Lưu đọc sau'}
          aria-label="Lưu bài viết"
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-600' : ''}`} />
        </button>

        {/* Text-to-speech Audio Reader */}
        <button
          onClick={handleToggleTTS}
          className={`p-2.5 rounded-full transition-colors ${
            audioTrack?.isTTS ? 'text-amber-700 bg-amber-500/10' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100'
          }`}
          title={audioTrack?.isTTS ? 'Dừng đọc' : 'Nghe đọc bài báo (Text-to-Speech)'}
          aria-label="Nghe đọc bài báo"
        >
          {audioTrack?.isTTS ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Reading mode (Zen Mode / Focused Mode) */}
        <button
          onClick={() => {
            setFocusedReadingMode(!focusedReadingMode);
            showToast(focusedReadingMode ? 'Đã tắt chế độ đọc tập trung' : 'Đã bật chế độ đọc tập trung', 'info');
          }}
          className={`p-2.5 rounded-full transition-colors ${
            focusedReadingMode ? 'text-emerald-700 bg-emerald-500/10' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100'
          }`}
          title={focusedReadingMode ? 'Thoát chế độ đọc tập trung' : 'Chế độ đọc tập trung (Zen Mode)'}
          aria-label="Chế độ đọc tập trung"
        >
          {focusedReadingMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>

        {/* Typography Controls Popover Toggle */}
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className={`p-2.5 rounded-full transition-colors ${
            isSettingsOpen ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100'
          }`}
          title="Tùy chỉnh cỡ chữ và khoảng cách dòng"
          aria-label="Tùy chỉnh cỡ chữ"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* Share Button */}
        <button
          onClick={() => setIsShareOpen(!isShareOpen)}
          className={`p-2.5 rounded-full transition-colors ${
            isShareOpen ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100'
          }`}
          title="Chia sẻ bài viết"
          aria-label="Chia sẻ bài viết"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100 transition-colors"
          title="In ấn bản bài báo"
          aria-label="In bài báo"
        >
          <Printer className="w-4 h-4" />
        </button>
      </div>

      {/* Typography settings popover */}
      {isSettingsOpen && (
        <div
          className="absolute left-14 top-16 w-64 p-4 rounded-xl shadow-2xl border text-xs z-30 animate-in fade-in zoom-in-95"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-rule)',
            color: 'var(--text-ink)',
          }}
        >
          <div className="font-semibold pb-2 border-b mb-3" style={{ borderColor: 'var(--border-rule)' }}>
            Cấu hình giao diện đọc
          </div>

          {/* Font size */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] opacity-70 mb-1.5">
              <span>Cỡ chữ</span>
              <span className="font-semibold uppercase">{fontSize}</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {fontSizes.map((f) => (
                <button
                  key={f.size}
                  onClick={() => setFontSize(f.size)}
                  className={`py-1 rounded text-center font-medium border transition-colors ${
                    fontSize === f.size ? 'border-amber-700 bg-amber-500/10 font-bold' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ borderColor: fontSize === f.size ? 'var(--accent-gold)' : 'var(--border-rule)' }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Line height */}
          <div>
            <div className="flex items-center justify-between text-[11px] opacity-70 mb-1.5">
              <span>Khoảng cách dòng</span>
              <span className="font-semibold uppercase">{lineHeight}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {lineHeights.map((l) => (
                <button
                  key={l.height}
                  onClick={() => setLineHeight(l.height)}
                  className={`py-1 rounded text-center font-medium border transition-colors ${
                    lineHeight === l.height ? 'border-amber-700 bg-amber-500/10 font-bold' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ borderColor: lineHeight === l.height ? 'var(--accent-gold)' : 'var(--border-rule)' }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Share popover */}
      {isShareOpen && (
        <div
          className="absolute left-14 top-36 w-60 p-3 rounded-xl shadow-2xl border text-xs z-30 animate-in fade-in zoom-in-95 space-y-2"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-rule)',
            color: 'var(--text-ink)',
          }}
        >
          <div className="font-semibold pb-1 border-b" style={{ borderColor: 'var(--border-rule)' }}>
            Chia sẻ bài viết
          </div>
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-between p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Copy className="w-3.5 h-3.5" />
              <span>Sao chép liên kết</span>
            </span>
            {copied && <Check className="w-3.5 h-3.5 text-emerald-600" />}
          </button>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Chia sẻ lên Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Chia sẻ lên X (Twitter)
          </a>
        </div>
      )}
    </aside>
  );
};
