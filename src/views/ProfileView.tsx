import React, { useState, useEffect } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { ArticleCard } from '../components/ArticleCard';
import { CATEGORIES } from '../data/categories';
import { 
  Bookmark, 
  History, 
  Bell, 
  User, 
  Sliders, 
  Trash2, 
  ExternalLink,
  BookOpen,
  Calendar,
  Sparkles
} from 'lucide-react';

interface ProfileViewProps {
  initialTab?: 'bookmarks' | 'history' | 'categories' | 'settings' | 'profile';
}

export const ProfileView: React.FC<ProfileViewProps> = ({ initialTab = 'bookmarks' }) => {
  const { 
    userProfile, 
    articles, 
    navigateTo, 
    toggleBookmark, 
    toggleFollowCategory,
    showToast 
  } = useNewspaper();

  const getValidTab = (tab?: string): 'bookmarks' | 'history' | 'categories' | 'settings' => {
    if (tab === 'history') return 'history';
    if (tab === 'categories') return 'categories';
    if (tab === 'settings') return 'settings';
    return 'bookmarks';
  };

  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history' | 'categories' | 'settings'>(
    getValidTab(initialTab)
  );

  // Sync tab if initialTab changes
  useEffect(() => {
    if (initialTab) setActiveTab(getValidTab(initialTab));
  }, [initialTab]);

  const bookmarksList = userProfile.bookmarks || [];
  const historyList = userProfile.history || userProfile.readingHistory || [];

  // Bookmarked articles
  const bookmarkedArticles = articles.filter((a) => bookmarksList.includes(a.id));

  // Reading history articles with metadata
  const historyWithArticles = historyList.map((h) => {
    const art = articles.find((a) => a.id === h.articleId);
    return { ...h, article: art };
  }).filter((h) => h.article !== undefined);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* User Header Profile */}
      <div 
        className="p-6 sm:p-8 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-rule)',
        }}
      >
        <div className="flex items-center gap-4">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2"
            style={{ borderColor: 'var(--accent-gold)' }}
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-editorial text-2xl font-bold">{userProfile.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold text-amber-900 dark:text-amber-300 bg-amber-500/15 border border-amber-600/30 uppercase">
                {userProfile.membership || userProfile.role || 'Độc giả Cao cấp'}
              </span>
            </div>
            <p className="text-xs opacity-70 font-mono">{userProfile.email}</p>
            <div className="flex items-center gap-4 text-xs opacity-75 pt-1">
              <span><strong>{bookmarksList.length}</strong> bài đã lưu</span>
              <span>•</span>
              <span><strong>{historyList.length}</strong> bài đã đọc</span>
              <span>•</span>
              <span><strong>{userProfile.followedCategories?.length || 0}</strong> chuyên mục theo dõi</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => showToast('Đang cập nhật hồ sơ cá nhân...', 'info')}
          className="px-4 py-2 rounded-lg border text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors self-end sm:self-center"
          style={{ borderColor: 'var(--border-rule)' }}
        >
          Chỉnh sửa hồ sơ
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b text-sm font-semibold space-x-6" style={{ borderColor: 'var(--border-rule)' }}>
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === 'bookmarks'
              ? 'border-amber-800 text-amber-800 dark:text-amber-400 font-bold'
              : 'border-transparent opacity-70 hover:opacity-100'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Bài viết đã lưu ({bookmarksList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === 'history'
              ? 'border-amber-800 text-amber-800 dark:text-amber-400 font-bold'
              : 'border-transparent opacity-70 hover:opacity-100'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Lịch sử đọc ({historyList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-3 flex items-center gap-2 transition-colors border-b-2 ${
            activeTab === 'categories'
              ? 'border-amber-800 text-amber-800 dark:text-amber-400 font-bold'
              : 'border-transparent opacity-70 hover:opacity-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Chuyên mục theo dõi</span>
        </button>
      </div>

      {/* TAB CONTENT: BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedArticles.length === 0 ? (
            <div className="text-center py-16 border rounded-2xl p-6 opacity-70" style={{ borderColor: 'var(--border-rule)' }}>
              <Bookmark className="w-10 h-10 mx-auto opacity-40 mb-3" />
              <h3 className="font-editorial text-lg font-bold">Chưa có bài viết nào được lưu</h3>
              <p className="text-xs opacity-75 mt-1 max-w-sm mx-auto">
                Bấm vào biểu tượng dấu trang (Bookmark) trên bất kỳ bài viết nào để lưu đọc lại sau.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} variant="compact" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {historyWithArticles.length === 0 ? (
            <div className="text-center py-16 border rounded-2xl p-6 opacity-70" style={{ borderColor: 'var(--border-rule)' }}>
              <History className="w-10 h-10 mx-auto opacity-40 mb-3" />
              <h3 className="font-editorial text-lg font-bold">Lịch sử đọc trống</h3>
              <p className="text-xs opacity-75 mt-1">Các bài báo bạn đã xem qua sẽ tự động lưu trữ tại đây.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {historyWithArticles.map((h, idx) => (
                <div
                  key={idx}
                  onClick={() => navigateTo({ page: 'article', slug: h.article!.slug })}
                  className="group cursor-pointer p-4 rounded-xl border flex items-center justify-between gap-4 transition-colors hover:shadow-xs"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border-rule)',
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-amber-800 dark:text-amber-400 mb-0.5">
                      <span>{h.article!.category}</span>
                      <span>•</span>
                      <span>Đọc lúc {new Date(h.readAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <h4 className="font-editorial text-sm sm:text-base font-bold truncate group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                      {h.article!.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-[11px] font-mono font-bold">{(h as any).progressPercent || (h as any).progress || 100}%</div>
                      <div className="w-16 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-amber-700" style={{ width: `${(h as any).progressPercent || (h as any).progress || 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => {
            const isFollowed = userProfile.followedCategories.includes(cat.slug);
            return (
              <div
                key={cat.id}
                className="p-5 rounded-xl border flex flex-col justify-between space-y-3"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-rule)',
                }}
              >
                <div>
                  <h4 className="font-editorial text-lg font-bold">{cat.name}</h4>
                  <p className="text-xs opacity-70 mt-1 line-clamp-2">{cat.description}</p>
                </div>
                <button
                  onClick={() => toggleFollowCategory(cat.slug)}
                  className={`w-full py-2 rounded-lg text-xs font-semibold border transition-all ${
                    isFollowed
                      ? 'bg-amber-800 text-white border-amber-800'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                  style={{ borderColor: 'var(--border-rule)' }}
                >
                  {isFollowed ? '✓ Đang theo dõi' : '+ Theo dõi'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
