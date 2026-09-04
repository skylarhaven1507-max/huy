import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { Article } from '../types';
import { Bookmark, Clock, Eye, Sparkles, MapPin } from 'lucide-react';

interface HeroArticleProps {
  article: Article;
}

export const HeroArticle: React.FC<HeroArticleProps> = ({ article }) => {
  const { navigateTo, isBookmarked, toggleBookmark } = useNewspaper();
  const bookmarked = isBookmarked(article.id);

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      onClick={() => navigateTo({ page: 'article', slug: article.slug })}
      className="group cursor-pointer p-5 sm:p-7 lg:p-8 border transition-all duration-200 relative overflow-hidden bento-card"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-dark)',
        color: 'var(--text-ink)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left 7 Columns: Headline, Sapo, Author, Tags */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div>
            {/* Bento Category Badge & Metadata */}
            <div className="flex flex-wrap items-center gap-3 mb-2.5">
              <span className="text-[11px] font-sans font-black uppercase text-[#8B0000] dark:text-[#E63946] tracking-widest">
                The Lead Story • {article.category}
              </span>
              <span className="opacity-30">•</span>
              <span className="opacity-70 flex items-center gap-1 text-xs font-sans">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime} phút đọc
              </span>
              {article.location && (
                <>
                  <span className="opacity-30">•</span>
                  <span className="opacity-70 flex items-center gap-1 text-xs font-sans">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    {article.location}
                  </span>
                </>
              )}
            </div>

            {/* Editorial Headline with Tight Tracking */}
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black leading-[1.05] tracking-tighter group-hover:text-[#8B0000] dark:group-hover:text-[#E63946] transition-colors mb-3">
              {article.title}
            </h2>

            {/* Sapo / Excerpt in Italic */}
            <p className="font-serif italic text-base sm:text-lg opacity-85 leading-relaxed border-l-2 pl-3.5 mb-2" style={{ borderColor: 'var(--accent-gold)' }}>
              {article.excerpt}
            </p>
          </div>

          {/* Byline & Interactive actions */}
          <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-4 text-xs opacity-80" style={{ borderColor: 'var(--border-rule)' }}>
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-9 h-9 rounded object-cover border"
                style={{ borderColor: 'var(--border-dark)' }}
              />
              <div>
                <div className="font-bold text-sm font-sans" style={{ color: 'var(--text-ink)' }}>
                  {article.author.name}
                </div>
                <div className="opacity-70 text-[11px] font-sans">{article.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px] font-mono">
                <Eye className="w-3.5 h-3.5 opacity-70" />
                <span>{article.views.toLocaleString()} lượt đọc</span>
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(article.id);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-xs font-sans font-semibold uppercase tracking-wider"
                style={{ borderColor: 'var(--border-dark)' }}
                aria-label="Lưu bài viết"
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#D4AF37] text-[#D4AF37]' : ''}`} />
                <span>{bookmarked ? 'Đã lưu' : 'Lưu'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Bento Editorial Image with Caption */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden border" style={{ borderColor: 'var(--border-dark)' }}>
            <div className="aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {article.imageCaption && (
              <div 
                className="p-3 text-[11px] font-serif leading-relaxed italic border-t"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-dark)',
                  color: 'var(--text-muted)',
                }}
              >
                {article.imageCaption}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
