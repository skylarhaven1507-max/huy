import React, { useState, useEffect } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { CATEGORIES } from '../data/categories';
import { ArticleCard } from '../components/ArticleCard';
import { HeroArticle } from '../components/HeroArticle';
import { TrendingList } from '../components/TrendingList';
import { 
  Filter, 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface CategoryViewProps {
  categorySlug: string;
}

export const CategoryView: React.FC<CategoryViewProps> = ({ categorySlug }) => {
  const { articles, navigateTo, userProfile, toggleFollowCategory } = useNewspaper();
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Find category metadata
  const category = CATEGORIES.find((c) => c.slug === categorySlug) || {
    id: categorySlug,
    name: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
    slug: categorySlug,
    description: 'Tập hợp các bài phân tích, tin tức chuyên sâu về ' + categorySlug,
    articleCount: 10,
  };

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${category.name} — Nhật Báo`;
    return () => {
      document.title = prevTitle;
    };
  }, [category.name, categorySlug]);

  // Filter articles in this category
  const categoryArticles = articles.filter((a) => a.categorySlug === categorySlug);

  // Extract all unique tags in this category
  const allTags = Array.from(new Set(categoryArticles.flatMap((a) => a.tags)));

  // Filter by tag if selected
  const filtered = selectedTag
    ? categoryArticles.filter((a) => a.tags.includes(selectedTag))
    : categoryArticles;

  // Sort
  const sortedArticles = [...filtered].sort((a, b) => {
    if (sortBy === 'popular') return (b.views || 0) - (a.views || 0);
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const featuredInCat = sortedArticles[0];
  const listArticles = sortedArticles.slice(1, visibleCount + 1);
  const hasMore = visibleCount + 1 < sortedArticles.length;

  const isFollowing = userProfile.followedCategories.includes(categorySlug);

  return (
    <div className="space-y-8">
      {/* Breadcrumb & Header */}
      <div className="space-y-3 pb-6 border-b" style={{ borderColor: 'var(--border-rule)' }}>
        <div className="flex items-center gap-2 text-xs opacity-60">
          <button onClick={() => navigateTo({ page: 'home' })} className="hover:underline">
            Trang chủ
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-ink" style={{ color: 'var(--text-ink)' }}>
            {category.name}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base opacity-75 mt-1 max-w-2xl font-serif">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleFollowCategory(categorySlug)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                isFollowing 
                  ? 'bg-amber-900/10 text-amber-900 dark:text-amber-300 border-amber-800' 
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
              style={{ borderColor: 'var(--border-rule)' }}
            >
              {isFollowing ? '✓ Đang theo dõi chuyên mục' : '+ Theo dõi chuyên mục'}
            </button>
            <span className="text-xs opacity-60 font-mono">
              {categoryArticles.length} bài viết
            </span>
          </div>
        </div>

        {/* Filter tags & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedTag(null)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                selectedTag === null
                  ? 'bg-amber-800 text-white font-semibold'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70'
              }`}
              style={{ borderColor: 'var(--border-rule)' }}
            >
              Tất cả chủ đề
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  selectedTag === tag
                    ? 'bg-amber-800 text-white font-semibold'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70'
                }`}
                style={{ borderColor: 'var(--border-rule)' }}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 text-xs">
            <span className="opacity-60 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Sắp xếp:
            </span>
            <button
              onClick={() => setSortBy('newest')}
              className={`px-2.5 py-1 rounded border text-xs font-medium ${
                sortBy === 'newest' ? 'font-bold bg-amber-500/10 border-amber-700' : 'opacity-70'
              }`}
              style={{ borderColor: sortBy === 'newest' ? 'var(--accent-gold)' : 'var(--border-rule)' }}
            >
              Mới nhất
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-2.5 py-1 rounded border text-xs font-medium ${
                sortBy === 'popular' ? 'font-bold bg-amber-500/10 border-amber-700' : 'opacity-70'
              }`}
              style={{ borderColor: sortBy === 'popular' ? 'var(--accent-gold)' : 'var(--border-rule)' }}
            >
              Đọc nhiều
            </button>
          </div>
        </div>
      </div>

      {/* Featured story in Category */}
      {featuredInCat && (
        <section>
          <HeroArticle article={featuredInCat} />
        </section>
      )}

      {/* Main Articles List & Trending Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        {/* Articles feed */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-editorial text-xl font-bold uppercase tracking-wider pb-2 border-b" style={{ borderColor: 'var(--border-rule)' }}>
            Danh sách bài viết
          </h3>

          {listArticles.length === 0 ? (
            <div className="p-8 text-center border rounded-xl opacity-70" style={{ borderColor: 'var(--border-rule)' }}>
              Không có bài viết nào phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
            <div className="space-y-4">
              {listArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="horizontal" />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="pt-6 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="px-8 py-3 rounded-full border text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all shadow-xs"
                style={{ borderColor: 'var(--border-rule)' }}
              >
                Tải thêm bài viết ({sortedArticles.length - (visibleCount + 1)} bài còn lại)
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <TrendingList />
        </div>
      </section>
    </div>
  );
};
