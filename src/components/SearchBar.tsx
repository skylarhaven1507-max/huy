import React, { useState, useRef, useEffect } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface SearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onClose, autoFocus = false }) => {
  const { articles, navigateTo, searchHistory, addSearchHistory, clearSearchHistory } = useNewspaper();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const POPULAR_SEARCHES = ['Năng lượng sạch', 'Bán dẫn', 'Trí tuệ nhân tạo', 'Tài chính', 'Di sản'];

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching articles
  const results = query.trim() === '' 
    ? [] 
    : articles.filter((art) => {
        const q = query.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.excerpt.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q) ||
          art.author.name.toLowerCase().includes(q) ||
          art.tags.some((t) => t.toLowerCase().includes(q))
        );
      }).slice(0, 5);

  const handleSelectArticle = (article: Article) => {
    addSearchHistory(query || article.title);
    setIsOpen(false);
    setQuery('');
    if (onClose) onClose();
    navigateTo({ page: 'article', slug: article.slug });
  };

  const handleSubmitSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    addSearchHistory(query.trim());
    setIsOpen(false);
    if (onClose) onClose();
    navigateTo({ page: 'search', query: query.trim() });
  };

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    addSearchHistory(term);
    setIsOpen(false);
    if (onClose) onClose();
    navigateTo({ page: 'search', query: term });
  };

  // Helper to highlight matched words
  const highlightMatch = (text: string, keyword: string) => {
    if (!keyword.trim()) return text;
    const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === keyword.toLowerCase() ? (
            <mark key={i} className="search-highlight font-semibold">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-lg">
      <form onSubmit={handleSubmitSearch} className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none opacity-50">
          <Search className="w-4 h-4" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Tìm bài viết, chuyên mục, tác giả..."
          className="w-full pl-10 pr-10 py-2 text-sm rounded-full border transition-all focus:outline-none focus:ring-1 focus:ring-amber-800/30"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-rule)',
            color: 'var(--text-ink)',
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 p-1 rounded-full opacity-60 hover:opacity-100"
            aria-label="Xóa từ khóa"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* Real-time dropdown results */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-full mt-2 rounded-xl shadow-xl border overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-rule)',
            color: 'var(--text-ink)',
          }}
        >
          {query.trim() === '' ? (
            <div className="p-4 space-y-4">
              {/* Search history */}
              {searchHistory.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs opacity-60 mb-2 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> Lịch sử tìm kiếm
                    </span>
                    <button
                      type="button"
                      onClick={clearSearchHistory}
                      className="hover:underline text-[11px]"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {searchHistory.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectTerm(item)}
                        className="text-xs px-2.5 py-1 rounded-md border hover:border-amber-700/50 transition-colors"
                        style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular searches */}
              <div>
                <div className="flex items-center gap-1.5 text-xs opacity-60 mb-2 font-medium">
                  <TrendingUp className="w-3 h-3" /> Xu hướng tìm kiếm
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectTerm(item)}
                      className="text-xs px-2.5 py-1 rounded-md border hover:border-amber-700/50 transition-colors flex items-center gap-1"
                      style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}
                    >
                      <span>#{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="p-2.5 px-4 text-xs opacity-60 border-b flex justify-between items-center" style={{ borderColor: 'var(--border-rule)' }}>
                <span>Kết quả nhanh ({results.length})</span>
                <span className="text-[11px]">Nhấn Enter để xem toàn bộ</span>
              </div>
              {results.length === 0 ? (
                <div className="p-6 text-center text-sm opacity-70">
                  Không tìm thấy bài viết nào phù hợp với &quot;{query}&quot;
                </div>
              ) : (
                <div className="divide-y" style={{ borderColor: 'var(--border-rule)' }}>
                  {results.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => handleSelectArticle(art)}
                      className="w-full text-left p-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex gap-3 items-start"
                    >
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-16 h-12 object-cover rounded shrink-0 border"
                        style={{ borderColor: 'var(--border-rule)' }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5 text-[11px] opacity-75">
                          <span className="font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                            {art.category}
                          </span>
                          <span>•</span>
                          <span>{art.author.name}</span>
                        </div>
                        <h4 className="text-sm font-editorial font-bold line-clamp-1 leading-snug">
                          {highlightMatch(art.title, query)}
                        </h4>
                        <p className="text-xs opacity-70 line-clamp-1 mt-0.5">
                          {highlightMatch(art.excerpt, query)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* View all button */}
              <button
                type="button"
                onClick={() => handleSubmitSearch()}
                className="w-full p-2.5 text-xs text-center font-medium flex items-center justify-center gap-1.5 border-t hover:opacity-80 transition-opacity"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-rule)',
                  color: 'var(--text-ink)',
                }}
              >
                <span>Xem tất cả kết quả cho &quot;{query}&quot;</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
