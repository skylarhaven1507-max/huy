import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { CATEGORIES } from '../data/categories';
import { ThemeSwitcher } from './ThemeSwitcher';
import { 
  X, 
  Bookmark, 
  User, 
  Video, 
  Headphones, 
  ShieldCheck, 
  Compass, 
  Sun,
  TrendingUp,
  Search,
  History,
  LogIn,
  LogOut
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const { 
    currentRoute, 
    navigateTo, 
    userProfile, 
    isLoggedIn, 
    setIsLoginModalOpen, 
    logout 
  } = useNewspaper();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Drawer content */}
      <div
        className="relative w-4/5 max-w-sm h-full flex flex-col z-10 shadow-2xl overflow-y-auto border-r transition-transform"
        style={{
          backgroundColor: 'var(--bg-main)',
          color: 'var(--text-ink)',
          borderColor: 'var(--border-rule)',
        }}
      >
        {/* Drawer header */}
        <div 
          className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--border-rule)' }}
        >
          <div>
            <div className="text-[10px] tracking-widest uppercase opacity-60 font-semibold font-sans">TÒA SOẠN</div>
            <div className="font-editorial text-xl font-black">NHẬT BÁO</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search quick button */}
        <div className="p-4 border-b" style={{ borderColor: 'var(--border-rule)' }}>
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm opacity-80 hover:opacity-100 transition-opacity"
            style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border-rule)' }}
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-700" />
              <span>Tìm kiếm bài viết...</span>
            </span>
            <span className="text-xs opacity-50">⌘K</span>
          </button>
        </div>

        {/* Categories list */}
        <div className="p-4 flex-1">
          <div className="text-xs uppercase tracking-wider font-semibold opacity-50 mb-3 px-2">
            Chuyên mục thời sự
          </div>
          <nav className="space-y-1">
            <button
              onClick={() => {
                navigateTo({ page: 'home' });
                onClose();
              }}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${
                currentRoute.page === 'home'
                  ? 'bg-amber-900/10 font-bold text-amber-900 dark:text-amber-400'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <span>Trang chủ</span>
              <Compass className="w-4 h-4 opacity-50" />
            </button>

            {CATEGORIES.map((cat) => {
              const isActive = currentRoute.page === 'category' && currentRoute.slug === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    navigateTo({ page: 'category', slug: cat.slug });
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-amber-900/10 font-bold text-amber-900 dark:text-amber-400'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs opacity-40">{cat.articleCount} bài</span>
                </button>
              );
            })}
          </nav>

          {/* Multimedia & Special Features */}
          <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-rule)' }}>
            <div className="text-xs uppercase tracking-wider font-semibold opacity-50 mb-3 px-2">
              Đa phương tiện &amp; Hồ sơ
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => {
                  navigateTo({ page: 'videos' });
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-3"
              >
                <Video className="w-4 h-4 text-rose-600" />
                <span>Video Phóng sự</span>
              </button>

              <button
                onClick={() => {
                  navigateTo({ page: 'podcasts' });
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-3"
              >
                <Headphones className="w-4 h-4 text-emerald-600" />
                <span>Podcasts &amp; Audio</span>
              </button>

              <button
                onClick={() => {
                  navigateTo({ page: 'bookmarks' });
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <Bookmark className="w-4 h-4 text-amber-600" />
                  <span>Bài đọc sau (Bookmark)</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold">
                  {userProfile.bookmarks.length}
                </span>
              </button>

              <button
                onClick={() => {
                  navigateTo({ page: 'history' });
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-3 cursor-pointer"
              >
                <History className="w-4 h-4 text-sky-600" />
                <span>Lịch sử đọc bài</span>
              </button>

              <button
                onClick={() => {
                  navigateTo({ page: 'admin' });
                  onClose();
                }}
                className="w-full text-left px-3 py-2.5 rounded-md text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-3 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Tòa soạn &amp; CMS Admin</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Drawer footer */}
        <div 
          className="p-4 border-t space-y-3"
          style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs opacity-75 font-semibold">Chế độ hiển thị</span>
            <ThemeSwitcher compact />
          </div>

          {/* User Section */}
          <div className="pt-2 border-t" style={{ borderColor: 'var(--border-rule)' }}>
            {isLoggedIn ? (
              <div className="space-y-2">
                <div 
                  onClick={() => {
                    navigateTo({ page: 'profile' });
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name}
                    className="w-8 h-8 rounded object-cover border"
                    style={{ borderColor: 'var(--border-rule)' }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold truncate">{userProfile.name}</div>
                    <div className="text-[11px] opacity-60 truncate">{userProfile.membership}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded text-xs text-red-700 dark:text-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  setIsLoginModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border text-xs font-bold uppercase tracking-wider text-white cursor-pointer hover:brightness-110"
                style={{ backgroundColor: '#8B0000' }}
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng nhập tài khoản</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
