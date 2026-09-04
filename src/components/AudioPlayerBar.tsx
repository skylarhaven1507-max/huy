import React, { useRef, useEffect } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  X, 
  Headphones, 
  Mic
} from 'lucide-react';

export const AudioPlayerBar: React.FC = () => {
  const { 
    audioTrack, 
    pauseAudio, 
    resumeAudio, 
    stopAudio, 
    setAudioProgress, 
    setAudioRate 
  } = useNewspaper();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current || !audioTrack) return;
    if (audioTrack.isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [audioTrack?.isPlaying]);

  useEffect(() => {
    if (!audioRef.current || !audioTrack) return;
    audioRef.current.playbackRate = audioTrack.playbackRate;
  }, [audioTrack?.playbackRate]);

  if (!audioTrack) return null;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setAudioProgress(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(audioTrack.duration, audioRef.current.currentTime + seconds));
    audioRef.current.currentTime = newTime;
    setAudioProgress(newTime);
  };

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const nextIdx = (rates.indexOf(audioTrack.playbackRate) + 1) % rates.length;
    setAudioRate(rates[nextIdx]);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t shadow-2xl p-3 sm:p-4 backdrop-blur-md transition-all no-print"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-rule)',
        color: 'var(--text-ink)',
      }}
    >
      <audio
        ref={audioRef}
        src={audioTrack.audioUrl}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setAudioProgress(audioRef.current.currentTime);
          }
        }}
        onEnded={stopAudio}
      />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Track info */}
        <div className="flex items-center gap-3 w-full sm:w-1/3 min-w-0">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
            style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-rule)' }}
          >
            {audioTrack.isTTS ? (
              <Mic className="w-5 h-5 text-amber-700 animate-pulse" />
            ) : (
              <Headphones className="w-5 h-5 text-emerald-600" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase font-bold tracking-wider opacity-60 flex items-center gap-1.5">
              <span>{audioTrack.isTTS ? 'Giọng đọc bài viết AI' : 'Bản tin Âm thanh'}</span>
              {audioTrack.isPlaying && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              )}
            </div>
            <div className="font-editorial font-bold text-sm truncate leading-snug">
              {audioTrack.title}
            </div>
            <div className="text-[11px] opacity-60 truncate">
              {audioTrack.subtitle}
            </div>
          </div>
        </div>

        {/* Center player controls */}
        <div className="flex-1 w-full max-w-md flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleSkip(-15)}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100 transition-opacity"
              title="Lùi 15 giây"
              aria-label="Lùi 15 giây"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => (audioTrack.isPlaying ? pauseAudio() : resumeAudio())}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md hover:scale-105 transition-transform"
              style={{ backgroundColor: '#8B1E1E' }}
              aria-label={audioTrack.isPlaying ? 'Tạm dừng' : 'Phát'}
            >
              {audioTrack.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            <button
              onClick={() => handleSkip(15)}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 opacity-75 hover:opacity-100 transition-opacity"
              title="Tua 15 giây"
              aria-label="Tua 15 giây"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Time scrubber */}
          <div className="w-full flex items-center gap-2 text-[11px] font-mono opacity-70">
            <span>{formatTime(audioTrack.currentTime)}</span>
            <input
              type="range"
              min={0}
              max={audioTrack.duration || 100}
              value={audioTrack.currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-800"
            />
            <span>{formatTime(audioTrack.duration)}</span>
          </div>
        </div>

        {/* Right speed & close controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={cyclePlaybackRate}
            className="px-2.5 py-1 rounded-md text-xs font-mono font-bold border hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}
            title="Tốc độ phát"
          >
            {audioTrack.playbackRate}x
          </button>

          <button
            onClick={stopAudio}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100 transition-opacity"
            title="Đóng trình phát"
            aria-label="Đóng trình phát"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
