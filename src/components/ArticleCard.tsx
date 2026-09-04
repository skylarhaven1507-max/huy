import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { Article } from '../types';
import { Bookmark, Clock, Flame, Eye } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'standard' | 'horizontal' | 'compact' | 'minimal' | 'lead';
  showExcerpt?: boolean;
  showImage?: boolean;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  variant = 'standard',
  showExcerpt = true,
  showImage = true,
  className = '',
}) => {
  const { navigateTo, isBookmarked, toggleBookmark } = useNewspaper();
  const bookmarked = isBookmarked(article.id);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
  });

  const handleClick = (e: React.MouseEvent) => {
    // If target is bookmark button, don't navigate
    if ((e.target as HTMLElement).closest('button')) return;
    navigateTo({ page: 'article', slug: article.slug });
  };

  // 1. MINIMAL (Title only with timestamp & category)
  if (variant === 'minimal') {
    return (
      <article 
        onClick={handleClick}
        className={`group cursor-pointer py-3 border-b transition-colors ${className}`}
        style={{ borderColor: 'var(--border-rule)' }}
      >
        <div className="flex items-center gap-2 mb-1 text-[10px] font-sans font-bold uppercase tracking-wider opacity-75">
          <span className="text-[#8B0000] dark:text-[#E63946]">
            {article.category}
          </span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>
        <h4 className="font-editorial text-sm sm:text-base font-bold leading-snug group-hover:text-[#8B0000] dark:group-hover:text-[#E63946] transition-colors tracking-tight">
          {article.title}
        </h4>
      </article>
    );
  }

  // 2. COMPACT (For sidebars, small square image on right or left)
  if (variant === 'compact') {
    return (
      <article
        onClick={handleClick}
        className={`group cursor-pointer flex gap-3 py-3 border-b transition-colors ${className}`}
        style={{ borderColor: 'var(--border-rule)' }}
      >
        {showImage && (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden border" style={{ borderColor: 'var(--border-dark)' }}>
            <img
              src={article.coverImage}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="min-w-0 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1 text-[10px] font-sans font-bold uppercase tracking-wider opacity-75">
              <span className="text-[#8B0000] dark:text-[#E63946]">
                {article.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-2.5 h-2.5" />
                {article.readingTime}p
              </span>
            </div>
            <h4 className="font-editorial text-sm sm:text-[15px] font-bold leading-snug line-clamp-2 group-hover:text-[#8B0000] dark:group-hover:text-[#E63946] transition-colors tracking-tight">
              {article.title}
            </h4>
          </div>
          <div className="flex items-center justify-between mt-1 text-[11px] opacity-70 font-sans">
            <span className="truncate">{article.author.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(article.id);
              }}
              className="p-1 hover:opacity-100 transition-opacity"
              title={bookmarked ? 'Bỏ lưu bài viết' : 'Lưu đọc sau'}
              aria-label="Lưu bài viết"
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // 3. HORIZONTAL (Wide layout with bigger image and excerpt)
  if (variant === 'horizontal') {
    return (
      <article
        onClick={handleClick}
        className={`group cursor-pointer flex flex-col sm:flex-row gap-4 p-4 sm:p-5 border transition-all duration-200 bento-card ${className}`}
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-dark)',
        }}
      >
        {showImage && (
          <div className="relative sm:w-56 md:w-64 h-44 sm:h-auto shrink-0 overflow-hidden border" style={{ borderColor: 'var(--border-dark)' }}>
            <img
              src={article.coverImage}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {article.isBreaking && (
              <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-sans font-black uppercase text-white bg-[#8B0000]">
                Breaking
              </span>
            )}
          </div>
        )}
        <div className="min-w-0 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5 text-[10px] font-sans font-bold uppercase tracking-wider opacity-75">
              <span className="text-[#8B0000] dark:text-[#E63946]">
                {article.category}
              </span>
              <span>•</span>
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" />
                {article.readingTime} phút đọc
              </span>
            </div>
            <h3 className="font-editorial text-lg sm:text-xl font-bold leading-snug group-hover:text-[#8B0000] dark:group-hover:text-[#E63946] transition-colors mb-2 tracking-tight">
              {article.title}
            </h3>
            {showExcerpt && (
              <p className="font-serif text-sm opacity-80 line-clamp-2 leading-relaxed italic">
                {article.excerpt}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between pt-3 mt-3 border-t text-xs opacity-75 font-sans" style={{ borderColor: 'var(--border-rule)' }}>
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-5 h-5 rounded object-cover border"
                style={{ borderColor: 'var(--border-dark)' }}
              />
              <span className="font-medium truncate">{article.author.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Eye className="w-3.5 h-3.5" />
                {article.views.toLocaleString()}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(article.id);
                }}
                className="p-1 hover:opacity-100 transition-opacity"
                title={bookmarked ? 'Bỏ lưu bài viết' : 'Lưu đọc sau'}
                aria-label="Lưu bài viết"
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // 4. STANDARD (Editorial column card)
  return (
    <article
      onClick={handleClick}
      className={`group cursor-pointer flex flex-col justify-between h-full p-4 sm:p-5 border transition-all duration-200 bento-card ${className}`}
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-dark)',
      }}
    >
      <div>
        {showImage && (
          <div className="relative w-full h-44 overflow-hidden mb-3 border" style={{ borderColor: 'var(--border-dark)' }}>
            <img
              src={article.coverImage}
              alt={article.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2 flex gap-1">
              <span className="px-2 py-0.5 text-[10px] font-sans font-black uppercase tracking-wider text-white bg-[#121212]">
                {article.category}
              </span>
              {article.trending && (
                <span className="px-1.5 py-0.5 text-[10px] font-sans font-bold uppercase text-black bg-[#D4AF37] flex items-center gap-0.5">
                  <Flame className="w-3 h-3 fill-black" /> Hot
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mb-2 text-[10px] font-sans font-bold uppercase tracking-wider opacity-70">
          <span>{formattedDate}</span>
          <span>•</span>
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3 h-3" />
            {article.readingTime} phút đọc
          </span>
        </div>

        <h3 className="font-editorial text-base sm:text-lg font-bold leading-snug group-hover:text-[#8B0000] dark:group-hover:text-[#E63946] transition-colors mb-2 tracking-tight">
          {article.title}
        </h3>

        {showExcerpt && (
          <p className="font-serif text-xs sm:text-sm opacity-80 line-clamp-3 leading-relaxed mb-4 italic">
            {article.excerpt}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t text-xs opacity-75 font-sans mt-auto" style={{ borderColor: 'var(--border-rule)' }}>
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-5 h-5 rounded object-cover border shrink-0"
            style={{ borderColor: 'var(--border-dark)' }}
          />
          <span className="truncate font-medium">{article.author.name}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(article.id);
          }}
          className="p-1 hover:opacity-100 transition-opacity shrink-0"
          title={bookmarked ? 'Bỏ lưu bài viết' : 'Lưu đọc sau'}
          aria-label="Lưu bài viết"
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
        </button>
      </div>
    </article>
  );
};
