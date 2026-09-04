import React, { useEffect } from 'react';
import { NewspaperProvider, useNewspaper } from './context/NewspaperContext';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomeView } from './views/HomeView';
import { CategoryView } from './views/CategoryView';
import { ArticleView } from './views/ArticleView';
import { SearchView } from './views/SearchView';
import { VideosView } from './views/VideosView';
import { PodcastsView } from './views/PodcastsView';
import { ProfileView } from './views/ProfileView';
import { AdminView } from './views/AdminView';
import { Compass, Home, Search } from 'lucide-react';

const NotFoundView: React.FC = () => {
  const { navigateTo } = useNewspaper();
  return (
    <div className="py-20 text-center space-y-5 max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-800 dark:text-amber-300">
        <Compass className="w-8 h-8" />
      </div>
      <span className="text-[11px] font-sans font-black uppercase tracking-widest text-[#8B0000]">
        404 • KHÔNG TÌM THẤY TRANG
      </span>
      <h2 className="font-editorial text-3xl font-black">
        Trang này không tồn tại hoặc đã được chuyển dời
      </h2>
      <p className="text-sm opacity-75 font-sans leading-relaxed">
        Xin lỗi quý độc giả, nội dung bài viết hoặc chuyên mục bạn đang tìm kiếm hiện không khả dụng trên hệ thống Nhật Báo.
      </p>
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => navigateTo({ page: 'search' })}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded border text-xs font-bold uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
          style={{ borderColor: 'var(--border-dark)' }}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Tìm kiếm</span>
        </button>
        <button
          onClick={() => navigateTo({ page: 'home' })}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider text-white shadow-md hover:brightness-110 cursor-pointer"
          style={{ backgroundColor: '#8B0000' }}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Trang chủ</span>
        </button>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { currentRoute } = useNewspaper();

  // Scroll to top upon route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute.page, (currentRoute as any).slug]);

  const renderCurrentView = () => {
    switch (currentRoute.page) {
      case 'home':
        return <HomeView />;
      case 'category':
        return <CategoryView categorySlug={currentRoute.slug} />;
      case 'article':
        return <ArticleView slug={currentRoute.slug} />;
      case 'search':
        return <SearchView initialQuery={currentRoute.query} />;
      case 'videos':
        return <VideosView />;
      case 'podcasts':
        return <PodcastsView />;
      case 'profile':
        return <ProfileView initialTab={currentRoute.tab || 'bookmarks'} />;
      case 'bookmarks':
        return <ProfileView initialTab="bookmarks" />;
      case 'history':
        return <ProfileView initialTab="history" />;
      case 'admin':
        return <AdminView />;
      case 'not-found':
        return <NotFoundView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <Layout>
      <ErrorBoundary>
        {renderCurrentView()}
      </ErrorBoundary>
    </Layout>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <NewspaperProvider>
        <AppContent />
      </NewspaperProvider>
    </ErrorBoundary>
  );
}
