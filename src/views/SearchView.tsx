import React, { useState } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { CATEGORIES } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { Search, Filter, Clock, X, ArrowUpDown } from 'lucide-react';

interface SearchViewProps {
  initialQuery?: string;
}

export const SearchView: React.FC<SearchViewProps> = ({ initialQuery = '' }) => {
  const { articles, searchHistory, addSearchHistory, clearSearchHistory } = useNewspaper();
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'views'>('relevance');

  const POPULAR_SEARCHES = ['Năng lượng sạch', 'Bán dẫn', 'Trí tuệ nhân tạo', 'Tài chính', 'Di sản', 'Kinh tế'];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addSearchHistory(query.trim());
    }
  };

  const handleSelectSearchTerm = (term: string) => {
    setQuery(term);
    addSearchHistory(term);
  };

  // Filter articles
  const filteredArticles = articles.filter((art) => {
    // Category match
    if (selectedCategory !== 'all' && art.categorySlug !== selectedCategory) {
      return false;
    }

    // Query match
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      art.author.name.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
    if (sortBy === 'views') {
      return (b.views || 0) - (a.views || 0);
    }
    // Relevance default (title match priority)
    const q = query.toLowerCase();
    const aInTitle = a.title.toLowerCase().includes(q) ? 1 : 0;
    const bInTitle = b.title.toLowerCase().includes(q) ? 1 : 0;
    return bInTitle - aInTitle;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Search Header Form */}
      <div 
        className="p-6 sm:p-8 rounded-2xl border space-y-6"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-rule)',
          color: 'var(--text-ink)',
        }}
      >
        <div className="space-y-1 text-center max-w-xl mx-auto">
          <h1 className="font-editorial text-3xl font-bold">Tìm Kiếm Tri Thức &amp; Tư Liệu</h1>
          <p className="text-xs sm:text-sm opacity-70">
            Tra cứu hơn 30 năm bài báo, chuyên đề phân tích và tài liệu lưu trữ của Thời Báo.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập tiêu đề, chuyên mục, tên tác giả hoặc từ khóa..."
            className="w-full pl-12 pr-12 py-3.5 text-base rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-800/30 transition-all"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-rule)',
              color: 'var(--text-ink)',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full opacity-60 hover:opacity-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Quick searches & history */}
        <div className="space-y-3 pt-2 text-xs">
          {searchHistory.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="opacity-60 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Lịch sử:
              </span>
              {searchHistory.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSearchTerm(item)}
                  className="px-2.5 py-1 rounded-md border hover:border-amber-700 transition-colors"
                  style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={clearSearchHistory}
                className="opacity-50 hover:opacity-100 hover:underline text-[11px]"
              >
                Xóa
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="opacity-60">Thịnh hành:</span>
            {POPULAR_SEARCHES.map((term, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSearchTerm(term)}
                className="px-2.5 py-1 rounded-md border hover:border-amber-700 transition-colors"
                style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}
              >
                #{term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--border-rule)' }}>
        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-3.5 h-3.5 opacity-60" />
          <span className="opacity-70 font-semibold">Chuyên mục:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg border text-xs bg-transparent focus:outline-none"
            style={{ borderColor: 'var(--border-rule)' }}
          >
            <option value="all">Tất cả chuyên mục</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="opacity-60">
            Tìm thấy <strong>{sortedArticles.length}</strong> bài viết
          </span>
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3 h-3 opacity-60" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg border text-xs bg-transparent focus:outline-none"
              style={{ borderColor: 'var(--border-rule)' }}
            >
              <option value="relevance">Độ liên quan</option>
              <option value="newest">Mới nhất</option>
              <option value="views">Lượt xem nhiều</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Results List */}
      {sortedArticles.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center opacity-50">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-xl font-bold">Không tìm thấy bài viết phù hợp</h3>
          <p className="text-xs opacity-70 max-w-sm mx-auto">
            Vui lòng thử lại với các từ khóa ngắn gọn hơn hoặc chọn chuyên mục khác.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedArticles.map((art) => (
            <ArticleCard key={art.id} article={art} variant="horizontal" />
          ))}
        </div>
      )}
    </div>
  );
};
