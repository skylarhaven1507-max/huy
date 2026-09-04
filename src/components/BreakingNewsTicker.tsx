import React, { useState } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { Flame, X, ChevronRight, Pause, Play } from 'lucide-react';

export const BreakingNewsTicker: React.FC = () => {
  const { articles, navigateTo } = useNewspaper();
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter breaking articles or featured articles
  const breakingArticles = articles.filter((a) => a.isBreaking || a.trending).slice(0, 5);

  if (!isVisible || breakingArticles.length === 0) return null;

  const currentArticle = breakingArticles[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % breakingArticles.length);
  };

  return (
    <div
      className="w-full bg-[#8B0000] text-white py-1.5 px-4 sm:px-6 flex items-center overflow-hidden shrink-0 border-b border-[#121212]/20 no-print"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        {/* Badge: White with #8B0000 bold text */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-sans font-black uppercase bg-white text-[#8B0000] px-2 py-0.5 tracking-wider">
            Breaking
          </span>
          <span className="text-[11px] font-sans font-bold uppercase tracking-wider opacity-85 hidden sm:inline">
            Tin nóng
          </span>
        </div>

        {/* Dynamic ticker content */}
        <div 
          className="flex-1 min-w-0 flex items-center gap-3 cursor-pointer group"
          onClick={() => navigateTo({ page: 'article', slug: currentArticle.slug })}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className="text-[10px] font-mono uppercase bg-black/20 px-1.5 py-0.5 rounded-xs shrink-0 hidden md:inline">
            {currentArticle.category}
          </span>
          <p className="text-sm font-sans italic truncate group-hover:underline">
            {currentArticle.title}
          </p>
          <ChevronRight className="w-3.5 h-3.5 opacity-70 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0 text-white">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 rounded hover:bg-white/10 opacity-80 hover:opacity-100 transition-opacity"
            title={isPaused ? 'Tiếp tục chạy' : 'Tạm dừng'}
            aria-label="Tạm dừng tin nóng"
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
          <button
            onClick={handleNext}
            className="text-[10px] font-mono px-1.5 py-0.5 rounded hover:bg-white/10 opacity-80 hover:opacity-100 hidden sm:inline"
            title="Tin kế tiếp"
          >
            {currentIndex + 1}/{breakingArticles.length}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded hover:bg-white/10 opacity-80 hover:opacity-100 transition-opacity"
            title="Đóng thanh tin nóng"
            aria-label="Đóng thanh tin nóng"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
