import React, { useState, useEffect } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { ArticleCard } from '../components/ArticleCard';
import { ReadingControls } from '../components/ReadingControls';
import { LightboxModal } from '../components/LightboxModal';
import { 
  ChevronRight, 
  Clock, 
  Calendar, 
  Eye, 
  Share2, 
  Bookmark, 
  MessageSquare, 
  Send, 
  Heart,
  ZoomIn,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface ArticleViewProps {
  slug: string;
}

interface CommentItem {
  id: string;
  name: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ slug }) => {
  const { 
    getArticleBySlug, 
    articles, 
    navigateTo, 
    fontSize, 
    lineHeight, 
    focusedReadingMode,
    isBookmarked,
    toggleBookmark,
    recordReadingHistory,
    showToast
  } = useNewspaper();

  const [readingProgress, setReadingProgress] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      name: 'Nguyễn Đình Trọng',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      time: '2 giờ trước',
      content: 'Một bài phân tích rất sâu sắc và đa chiều. Việc làm chủ công nghệ chuỗi cung ứng ngoài khơi thực sự là chìa khóa then chốt cho an ninh năng lượng quốc gia.',
      likes: 14,
    },
    {
      id: 'c2',
      name: 'Lê Hoàng Yến',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      time: '4 giờ trước',
      content: 'Rất ấn tượng với tỷ lệ nội địa hóa 68% của các nhà máy cơ khí giàn khoan Việt Nam. Cần có thêm nhiều chính sách tín dụng xanh hỗ trợ.',
      likes: 8,
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const article = getArticleBySlug(slug);

  // Record reading history & track scroll progress
  useEffect(() => {
    if (!article) return;
    
    // Dynamic page title for SEO & readability
    const prevTitle = document.title;
    document.title = `${article.title} — Nhật Báo`;

    recordReadingHistory(article.id, 10);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setReadingProgress(progress);
        if (progress > 30) {
          recordReadingHistory(article.id, progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.title = prevTitle;
    };
  }, [article?.id, article?.title, slug]);

  if (!article) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="font-editorial text-2xl font-bold">Không tìm thấy bài viết</h2>
        <p className="opacity-70 text-sm">Bài viết bạn tìm kiếm có thể đã được gỡ hoặc đường dẫn không chính xác.</p>
        <button
          onClick={() => navigateTo({ page: 'home' })}
          className="px-6 py-2.5 rounded-full border text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5"
          style={{ borderColor: 'var(--border-rule)' }}
        >
          Quay lại Trang chủ
        </button>
      </div>
    );
  }

  // Related articles (same category or tags, excluding current)
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && (a.categorySlug === article.categorySlug || a.tags.some(t => article.tags.includes(t))))
    .slice(0, 3);

  // Collect all gallery images in this article for lightbox
  const galleryImages = [
    { url: article.coverImage, caption: article.imageCaption || article.title, title: article.title },
    ...article.content
      .filter((b) => b.type === 'image' && b.imageUrl)
      .map((b) => ({ url: b.imageUrl!, caption: b.imageCaption, title: article.title }))
  ];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newComment: CommentItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: 'Bạn (Độc giả Tri Thức)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      time: 'Vừa xong',
      content: newCommentText.trim(),
      likes: 1,
    };
    setComments([newComment, ...comments]);
    setNewCommentText('');
    showToast('Bình luận của bạn đã được gửi thành công!', 'success');
  };

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const fontClass = 
    fontSize === 'sm' ? 'text-sm' :
    fontSize === 'lg' ? 'text-lg' :
    fontSize === 'xl' ? 'text-xl' :
    fontSize === '2xl' ? 'text-2xl' : 'text-base';

  const lineClass = 
    lineHeight === 'tight' ? 'reading-tight' :
    lineHeight === 'relaxed' ? 'reading-relaxed' : 'reading-normal';

  return (
    <>
      {/* 1. STICKY READING PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-50 transition-all no-print"
        style={{ backgroundColor: 'transparent' }}
      >
        <div 
          className="h-full transition-all duration-150"
          style={{ 
            width: `${readingProgress}%`,
            backgroundColor: '#8B1E1E'
          }}
        />
      </div>

      <div className={`space-y-8 ${focusedReadingMode ? 'max-w-3xl mx-auto py-6' : ''}`}>
        {/* Top Controls: Back button & Breadcrumb */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b no-print" style={{ borderColor: 'var(--border-rule)' }}>
          <button
            onClick={() => navigateTo({ page: 'category', slug: article.categorySlug })}
            className="flex items-center gap-1.5 text-xs font-semibold hover:underline opacity-80"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Chuyên mục {article.category}</span>
          </button>

          <div className="flex items-center gap-2 text-xs opacity-60">
            <span>Tiến độ đọc: {readingProgress}%</span>
          </div>
        </div>

        {/* Main Article Container */}
        <div className="relative flex gap-8 items-start">
          {/* Floating Left Reading Controls (desktop) */}
          {!focusedReadingMode && (
            <div className="hidden lg:block shrink-0">
              <ReadingControls article={article} />
            </div>
          )}

          {/* Core Editorial Article Column */}
          <article className="flex-1 min-w-0 max-w-4xl mx-auto space-y-6">
            {/* Header: Category, Date, Time */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <button
                  onClick={() => navigateTo({ page: 'category', slug: article.categorySlug })}
                  className="font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 hover:underline"
                >
                  {article.category}
                </button>
                <span className="opacity-40">•</span>
                <span className="opacity-75 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formattedDate}
                </span>
                <span className="opacity-40">•</span>
                <span className="opacity-75 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readingTime} phút đọc
                </span>
                <span className="opacity-40">•</span>
                <span className="opacity-75 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.views.toLocaleString()} lượt xem
                </span>
              </div>

              {/* Big Editorial Headline */}
              <h1 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-extrabold leading-[1.18] tracking-tight">
                {article.title}
              </h1>

              {/* Sapo / Sub-headline */}
              <p className="font-serif italic text-lg sm:text-xl opacity-90 leading-relaxed border-l-3 pl-4 py-1" style={{ borderColor: 'var(--accent-gold)' }}>
                {article.excerpt}
              </p>
            </div>

            {/* Author Byline */}
            <div 
              className="flex items-center justify-between py-4 border-t border-b text-xs"
              style={{ borderColor: 'var(--border-rule)' }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-11 h-11 rounded-full object-cover border-2"
                  style={{ borderColor: 'var(--border-rule)' }}
                />
                <div>
                  <div className="font-bold text-sm text-ink" style={{ color: 'var(--text-ink)' }}>
                    {article.author.name}
                  </div>
                  <div className="opacity-70">{article.author.role}</div>
                </div>
              </div>

              {/* Mobile controls toggle */}
              <div className="lg:hidden flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(article.id)}
                  className="p-2 rounded-full border hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ borderColor: 'var(--border-rule)' }}
                  aria-label="Lưu bài viết"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked(article.id) ? 'fill-amber-600 text-amber-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Large Cover Image with Caption (Click to open Lightbox) */}
            <figure className="space-y-2 group cursor-pointer" onClick={() => handleOpenLightbox(0)}>
              <div className="relative overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-rule)' }}>
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full max-h-[580px] object-cover group-hover:scale-101 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
              {article.imageCaption && (
                <figcaption className="text-xs italic font-serif opacity-75 leading-relaxed text-center px-4">
                  {article.imageCaption}
                </figcaption>
              )}
            </figure>

            {/* Article Content Blocks */}
            <div className={`font-reading ${fontClass} ${lineClass} space-y-6 pt-4`}>
              {article.content.map((block, index) => {
                if (block.type === 'paragraph') {
                  return (
                    <p 
                      key={index} 
                      className={`leading-relaxed ${index === 0 ? 'editorial-drop-cap' : ''}`}
                    >
                      {block.content}
                    </p>
                  );
                }

                if (block.type === 'heading') {
                  return (
                    <h3 
                      key={index}
                      className="font-editorial text-xl sm:text-2xl font-bold pt-4 pb-1 border-b"
                      style={{ borderColor: 'var(--border-rule)' }}
                    >
                      {block.content}
                    </h3>
                  );
                }

                if (block.type === 'blockquote') {
                  return (
                    <blockquote
                      key={index}
                      className="my-6 p-6 rounded-xl border-l-4 border bg-subtle"
                      style={{
                        backgroundColor: 'var(--bg-subtle)',
                        borderColor: 'var(--border-rule)',
                        borderLeftColor: '#8B1E1E',
                      }}
                    >
                      <p className="font-serif italic text-lg sm:text-xl font-medium leading-relaxed mb-2">
                        &quot;{block.content}&quot;
                      </p>
                      {block.authorQuote && (
                        <cite className="block text-xs font-sans not-italic font-bold opacity-75">
                          — {block.authorQuote}
                        </cite>
                      )}
                    </blockquote>
                  );
                }

                if (block.type === 'image' && block.imageUrl) {
                  return (
                    <figure 
                      key={index} 
                      className="my-6 space-y-2 cursor-pointer group"
                      onClick={() => handleOpenLightbox(1)}
                    >
                      <div className="relative overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-rule)' }}>
                        <img
                          src={block.imageUrl}
                          alt={block.imageCaption || 'Hình ảnh trong bài'}
                          className="w-full max-h-[480px] object-cover group-hover:scale-101 transition-transform"
                        />
                        <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                      </div>
                      {block.imageCaption && (
                        <figcaption className="text-xs italic font-serif opacity-75 text-center">
                          {block.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                if (block.type === 'infographic' && block.data) {
                  return (
                    <div 
                      key={index}
                      className="my-8 p-6 rounded-2xl border shadow-xs"
                      style={{
                        backgroundColor: 'var(--bg-card)',
                        borderColor: 'var(--border-rule)',
                      }}
                    >
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>DỮ LIỆU ĐẶC BIỆT &amp; CHỈ SỐ THEO DÕI</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {block.data.map((item, dIdx) => (
                          <div 
                            key={dIdx}
                            className="p-3.5 rounded-xl border"
                            style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}
                          >
                            <div className="text-[11px] opacity-70 font-medium">{item.label}</div>
                            <div className="font-editorial text-2xl font-black text-ink my-1" style={{ color: '#8B1E1E' }}>
                              {item.value}
                            </div>
                            {item.detail && (
                              <div className="text-[10px] opacity-60 leading-tight">{item.detail}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* Tags & Keyword Pills */}
            <div className="pt-6 border-t space-y-3" style={{ borderColor: 'var(--border-rule)' }}>
              <div className="text-xs font-bold uppercase tracking-wider opacity-60">
                CHỦ ĐỀ LIÊN QUAN
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => navigateTo({ page: 'search', query: tag })}
                    className="text-xs px-3 py-1.5 rounded-full border hover:border-amber-700 transition-colors"
                    style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Author Extended Bio Card */}
            <div 
              className="p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-4 my-8"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-rule)',
              }}
            >
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-16 h-16 rounded-full object-cover border-2 shrink-0"
                style={{ borderColor: 'var(--border-rule)' }}
              />
              <div className="space-y-1">
                <div className="font-editorial text-lg font-bold">{article.author.name}</div>
                <div className="text-xs text-amber-800 dark:text-amber-400 font-semibold">{article.author.role}</div>
                <p className="text-xs opacity-75 leading-relaxed font-serif">
                  {article.author.bio}
                </p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="pt-8 border-t space-y-6" style={{ borderColor: 'var(--border-rule)' }}>
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-2xl font-bold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-700" />
                  <span>Ý KIẾN ĐỘC GIẢ ({comments.length})</span>
                </h3>
                <span className="text-xs opacity-60">Ý kiến được kiểm duyệt theo chuẩn văn minh báo chí</span>
              </div>

              {/* Form submit comment */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  rows={3}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Chia sẻ quan điểm, góc nhìn của bạn về bài viết này..."
                  className="w-full p-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30 transition-all"
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderColor: 'var(--border-rule)',
                    color: 'var(--text-ink)',
                  }}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md hover:brightness-110 transition-all"
                    style={{ backgroundColor: '#8B1E1E' }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi bình luận</span>
                  </button>
                </div>
              </form>

              {/* Comment list */}
              <div className="space-y-4 pt-4">
                {comments.map((cmt) => (
                  <div
                    key={cmt.id}
                    className="p-4 rounded-xl border space-y-2"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'var(--border-rule)',
                    }}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={cmt.avatar}
                          alt={cmt.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="font-bold">{cmt.name}</span>
                      </div>
                      <span className="opacity-50">{cmt.time}</span>
                    </div>
                    <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                      {cmt.content}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] opacity-60 hover:opacity-100 cursor-pointer pt-1">
                      <Heart className="w-3 h-3 text-red-500" />
                      <span>{cmt.likes} lượt thích</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Articles Carousel / Grid */}
            <div className="pt-10 border-t space-y-6" style={{ borderColor: 'var(--border-rule)' }}>
              <div className="flex items-center justify-between">
                <h3 className="font-editorial text-2xl font-bold uppercase tracking-wider">
                  CÙNG CHUYÊN MỤC
                </h3>
                <button
                  onClick={() => navigateTo({ page: 'category', slug: article.categorySlug })}
                  className="text-xs font-semibold hover:underline"
                >
                  Xem thêm {article.category} →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} variant="standard" />
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Lightbox component */}
      <LightboxModal
        isOpen={lightboxOpen}
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % galleryImages.length)}
      />
    </>
  );
};
