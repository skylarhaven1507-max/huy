import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { Flame, ArrowUpRight } from 'lucide-react';

export const TrendingList: React.FC = () => {
  const { articles, navigateTo, userProfile } = useNewspaper();

  // Get articles sorted by trending or views
  const trendingArticles = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  // Calculate reading progress from user history or fallback to 45%
  const readCount = userProfile.history.length;
  const readPercent = Math.min(100, Math.max(25, readCount * 15));

  return (
    <div
      className="p-6 flex flex-col border bento-tint"
      style={{
        borderColor: 'var(--border-dark)',
        color: 'var(--text-ink)',
      }}
    >
      {/* Header: Exact Bento Grid micro typography */}
      <div className="flex items-center justify-between border-b pb-2 mb-4" style={{ borderColor: 'var(--border-dark)' }}>
        <h3 className="text-[12px] font-sans font-black uppercase tracking-widest">
          TRENDING NOW • ĐỌC NHIỀU
        </h3>
        <span className="text-[10px] font-mono uppercase opacity-70">
          24H
        </span>
      </div>

      {/* Numbered Bento list */}
      <div className="flex flex-col gap-4">
        {trendingArticles.map((art, index) => {
          const rank = `0${index + 1}`.slice(-2);
          return (
            <div
              key={art.id}
              onClick={() => navigateTo({ page: 'article', slug: art.slug })}
              className="group cursor-pointer flex gap-3.5 items-start pb-3 border-b last:border-b-0 last:pb-0 transition-colors"
              style={{ borderColor: 'var(--border-rule)' }}
            >
              <span
                className="text-3xl font-black text-[#D4AF37] opacity-80 shrink-0 tracking-tight leading-none pt-0.5"
              >
                {rank}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-sans font-bold uppercase text-[#666666] dark:text-[#A39D93] mb-1">
                  {art.category} • {art.views.toLocaleString()} LƯỢT ĐỌC
                </p>
                <h4 className="text-sm font-bold leading-tight hover:underline cursor-pointer group-hover:text-[#8B0000] dark:group-hover:text-[#E63946] transition-colors line-clamp-2">
                  {art.title}
                </h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bento Bottom: Reading Progress meter from design */}
      <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-dark)' }}>
        <div className="flex items-center justify-between text-[11px] font-sans font-bold uppercase tracking-wider">
          <span>Tiến độ đọc hôm nay</span>
          <span>{readPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#E5E5E5] dark:bg-stone-800 mt-2">
          <div 
            className="h-full bg-[#121212] dark:bg-[#D4AF37] transition-all duration-500" 
            style={{ width: `${readPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
