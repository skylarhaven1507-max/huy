import React, { useState } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { CATEGORIES } from '../data/categories';
import { SearchBar } from './SearchBar';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MobileDrawer } from './MobileDrawer';
import { LoginModal } from './LoginModal';
import { 
  Bookmark, 
  Menu, 
  Bell, 
  User, 
  Sun, 
  CloudSun, 
  TrendingUp, 
  Sparkles,
  Video,
  Headphones,
  ShieldCheck,
  Search,
  Check,
  LogIn,
  LogOut,
  History
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentRoute, 
    navigateTo, 
    userProfile, 
    showToast,
    isLoggedIn,
    setIsLoginModalOpen,
    logout
  } = useNewspaper();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');

  const todayStr = 'Thứ Sáu, 04/09/2026';
  const lunarStr = 'Ất Tỵ • 24/7 ÂL';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail.trim()) return;
    showToast(`Cảm ơn bạn! Bản tin sáng sẽ gửi tới ${subscribeEmail}`, 'success');
    setSubscribeEmail('');
    setIsSubscribeModalOpen(false);
  };

  return (
    <>
      <header 
        className="w-full border-b-4 border-double transition-colors no-print"
        style={{
          backgroundColor: 'var(--bg-main)',
          color: 'var(--text-ink)',
          borderColor: 'var(--border-dark)',
        }}
      >
        {/* TOP BAR: Bento Black Strip */}
        <div 
          className="bg-[#121212] text-white py-1 px-4 text-[10px] uppercase tracking-[0.2em] hidden md:block shrink-0"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Date, Edition, Weather */}
            <div className="flex items-center gap-4">
              <span>{todayStr} — {lunarStr}</span>
              <span className="opacity-40">|</span>
              <div className="flex items-center gap-1.5 opacity-90">
                <CloudSun className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Hà Nội 28°C</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-90">
                <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>TP.HCM 31°C</span>
              </div>
            </div>

            {/* Right: Currency/Gold, Theme, Subscribe in Gold */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[10px] font-mono opacity-80">
                <span className="text-emerald-400">VN-Index: 1.288,4 (+5.8)</span>
                <span>•</span>
                <span className="text-[#D4AF37]">Vàng SJC: 89,5 tr</span>
              </div>
              <span className="opacity-30">|</span>
              <ThemeSwitcher compact />
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="font-bold text-[#D4AF37] hover:underline cursor-pointer uppercase tracking-[0.2em] text-[10px]"
              >
                Đặt mua báo
              </button>
            </div>
          </div>
        </div>

        {/* MAIN HEADER: Masthead, Brand, Quick Actions */}
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Left for Mobile: Hamburger button & search */}
            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 border border-[#121212]/20 dark:border-white/20 cursor-pointer"
                aria-label="Mở menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
                className="p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 border border-[#121212]/20 dark:border-white/20 cursor-pointer"
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Left for Desktop: Issue info */}
            <div className="hidden lg:flex items-center gap-3 w-1/4">
              <div className="text-[10px] uppercase font-sans tracking-widest leading-relaxed opacity-75 border-l-2 pl-3" style={{ borderColor: 'var(--border-dark)' }}>
                <div className="font-bold">NHẬT BÁO TRI THỨC</div>
                <div>Khởi lập 1988 • Số 12.840</div>
                <div className="text-[9px] opacity-60">Toàn quốc &amp; Quốc tế</div>
              </div>
            </div>

            {/* CENTER: THE EDITORIAL MASTHEAD WITH CLASSIC NEWSPAPER LINES */}
            <div className="text-center flex-1">
              <button
                onClick={() => navigateTo({ page: 'home' })}
                className="inline-block group text-left sm:text-center focus:outline-none cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-sans font-bold opacity-65 mb-1">
                  <span className="hidden sm:inline-block w-8 border-b border-current opacity-40"></span>
                  TIẾNG NÓI CỦA TRI THỨC &amp; THỜI ĐẠI
                  <span className="hidden sm:inline-block w-8 border-b border-current opacity-40"></span>
                </div>
                
                {/* Traditional Newspaper Double Horizontal Rule */}
                <div 
                  className="inline-block border-y-2 py-1 sm:py-2 px-3 sm:px-6 my-0.5 border-current"
                  style={{ borderColor: 'var(--border-dark)' }}
                >
                  <h1 
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-none group-hover:opacity-90 transition-opacity"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    NHẬT BÁO
                  </h1>
                </div>

                <div className="text-[10px] font-serif italic tracking-wide opacity-70 mt-1">
                  Thời Báo Tri Thức • Xuất bản hàng ngày từ 1988
                </div>
              </button>
            </div>

            {/* RIGHT: Search, Bookmark, Profile/Login, Notifications */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 lg:w-1/4">
              {/* Desktop Search */}
              <div className="hidden lg:block w-44 xl:w-52">
                <SearchBar />
              </div>

              {/* Bookmark button */}
              <button
                onClick={() => navigateTo({ page: 'bookmarks' })}
                className="relative p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors border cursor-pointer"
                style={{ borderColor: 'var(--border-rule)' }}
                title="Bài viết đã lưu (Đọc sau)"
                aria-label="Bài viết đã lưu"
              >
                <Bookmark className="w-4 h-4 opacity-80" />
                {userProfile.bookmarks.length > 0 && (
                  <span 
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--accent-color, #8B0000)' }}
                  >
                    {userProfile.bookmarks.length}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors border cursor-pointer"
                  style={{ borderColor: 'var(--border-rule)' }}
                  title="Thông báo tin tức"
                  aria-label="Thông báo"
                >
                  <Bell className="w-4 h-4 opacity-80" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8B0000] ring-2 ring-white dark:ring-stone-900" />
                </button>

                {/* Notification Dropdown */}
                {isNotificationsOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 sm:w-80 rounded shadow-2xl border p-3 z-50 animate-in fade-in zoom-in-95"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-dark)' }}
                  >
                    <div className="flex items-center justify-between pb-2 border-b text-xs font-semibold" style={{ borderColor: 'var(--border-rule)' }}>
                      <span className="font-sans uppercase text-[10px] tracking-widest">Thông báo mới</span>
                      <span className="text-[10px] text-[#8B0000] font-bold">Vừa cập nhật</span>
                    </div>
                    <div className="divide-y text-xs py-1" style={{ borderColor: 'var(--border-rule)' }}>
                      <div className="py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 cursor-pointer">
                        <div className="font-semibold text-[#8B0000]">Tin nóng</div>
                        <p className="opacity-80 line-clamp-2">Việt Nam chính thức phát điện tổ hợp điện gió ngoài khơi 1,2 GW tại Nam Trung Bộ.</p>
                        <span className="text-[10px] opacity-50">10 phút trước</span>
                      </div>
                      <div className="py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded px-1 cursor-pointer">
                        <div className="font-semibold text-emerald-700 dark:text-emerald-400">Kinh tế</div>
                        <p className="opacity-80 line-clamp-2">Báo cáo thị trường vốn quý III: Dòng tiền mạo hiểm đổ mạnh vào công nghệ sâu.</p>
                        <span className="text-[10px] opacity-50">1 giờ trước</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsNotificationsOpen(false)}
                      className="w-full text-center text-[11px] pt-2 text-[#8B0000] hover:underline cursor-pointer"
                    >
                      Đóng thông báo
                    </button>
                  </div>
                )}
              </div>

              {/* User Login / Profile Button */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 p-1 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    title="Tài khoản độc giả"
                  >
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded object-cover border"
                      style={{ borderColor: 'var(--border-dark)' }}
                    />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 rounded-xl shadow-2xl border p-2 z-50 animate-in fade-in zoom-in-95 text-xs font-sans"
                      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-dark)' }}
                    >
                      <div className="p-2 border-b mb-1" style={{ borderColor: 'var(--border-rule)' }}>
                        <div className="font-bold truncate">{userProfile.name}</div>
                        <div className="text-[10px] opacity-65 truncate">{userProfile.email}</div>
                      </div>
                      <button
                        onClick={() => {
                          navigateTo({ page: 'profile' });
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 opacity-70" />
                        <span>Hồ sơ độc giả</span>
                      </button>
                      <button
                        onClick={() => {
                          navigateTo({ page: 'bookmarks' });
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5 opacity-70" />
                        <span>Bài viết đã lưu ({userProfile.bookmarks.length})</span>
                      </button>
                      <button
                        onClick={() => {
                          navigateTo({ page: 'history' });
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                      >
                        <History className="w-3.5 h-3.5 opacity-70" />
                        <span>Lịch sử đọc</span>
                      </button>
                      <div className="border-t my-1" style={{ borderColor: 'var(--border-rule)' }} />
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left p-2 rounded hover:bg-red-500/10 text-red-700 dark:text-red-400 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-xs font-sans font-bold uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--border-dark)' }}
                  title="Đăng nhập tài khoản độc giả"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Expand */}
        {isSearchOpenMobile && (
          <div className="px-4 pb-3 lg:hidden">
            <SearchBar autoFocus onClose={() => setIsSearchOpenMobile(false)} />
          </div>
        )}

        {/* NAVIGATION BAR: Desktop horizontal, category links */}
        <div 
          className="border-t overflow-x-auto scrollbar-none hidden md:block"
          style={{
            borderColor: 'var(--border-dark)',
            backgroundColor: 'var(--bg-main)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <nav className="flex items-center space-x-5 lg:space-x-7 py-2.5 whitespace-nowrap text-[11px] font-sans font-bold uppercase tracking-widest">
              <button
                onClick={() => navigateTo({ page: 'home' })}
                className={`transition-colors hover:underline cursor-pointer ${
                  currentRoute.page === 'home'
                    ? 'text-[#8B0000] dark:text-[#E63946] underline font-black'
                    : 'opacity-85 hover:opacity-100'
                }`}
              >
                Trang chủ
              </button>

              {CATEGORIES.map((cat) => {
                const isActive = currentRoute.page === 'category' && currentRoute.slug === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => navigateTo({ page: 'category', slug: cat.slug })}
                    className={`transition-colors hover:underline cursor-pointer ${
                      isActive
                        ? 'text-[#8B0000] dark:text-[#E63946] underline font-black'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </nav>

            {/* Quick Links: Videos, Podcasts, Admin */}
            <div className="flex items-center gap-3 pl-4 border-l my-1 text-[11px] font-sans font-bold uppercase tracking-widest" style={{ borderColor: 'var(--border-rule)' }}>
              <button
                onClick={() => navigateTo({ page: 'videos' })}
                className={`flex items-center gap-1.5 transition-colors hover:underline cursor-pointer ${
                  currentRoute.page === 'videos'
                    ? 'text-[#8B0000] dark:text-[#E63946] underline'
                    : 'opacity-80 hover:opacity-100'
                }`}
                title="Video Phóng sự"
              >
                <Video className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>Video</span>
              </button>

              <button
                onClick={() => navigateTo({ page: 'podcasts' })}
                className={`flex items-center gap-1.5 transition-colors hover:underline cursor-pointer ${
                  currentRoute.page === 'podcasts'
                    ? 'text-[#8B0000] dark:text-[#E63946] underline'
                    : 'opacity-80 hover:opacity-100'
                }`}
                title="Podcasts"
              >
                <Headphones className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>Podcasts</span>
              </button>

              <button
                onClick={() => navigateTo({ page: 'admin' })}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  currentRoute.page === 'admin'
                    ? 'bg-[#121212] text-white'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{ borderColor: 'var(--border-dark)' }}
                title="Hệ thống CMS"
              >
                <span>CMS</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpenMobile(true)}
      />

      {/* Login Modal */}
      <LoginModal />

      {/* Subscription Modal */}
      {isSubscribeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="w-full max-w-md rounded-2xl shadow-2xl border p-6 relative animate-in fade-in zoom-in-95"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-ink)',
              borderColor: 'var(--border-rule)',
            }}
          >
            <div className="text-center mb-5">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-800 dark:text-amber-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-2xl font-bold">Đặt Mua Báo Nhật Báo</h3>
              <p className="text-xs opacity-70 mt-1">
                Nhận toàn quyền truy cập ấn phẩm số không giới hạn, phân tích kinh tế độc quyền và giao báo in tận nơi mỗi sáng.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">Địa chỉ Email của bạn</label>
                <input
                  type="email"
                  required
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30"
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderColor: 'var(--border-rule)',
                    color: 'var(--text-ink)',
                  }}
                />
              </div>

              <div className="p-3 rounded-lg border text-xs space-y-1" style={{ borderColor: 'var(--border-rule)', backgroundColor: 'var(--bg-subtle)' }}>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" /> <span>Đọc 100% bài viết chuyên sâu không có quảng cáo</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" /> <span>Bản tin The Daily Brief 6:00 sáng hàng ngày</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" /> <span>Quyền đọc tài liệu lưu trữ 35 năm tòa soạn</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubscribeModalOpen(false)}
                  className="flex-1 py-2.5 rounded-lg border text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  style={{ borderColor: 'var(--border-rule)' }}
                >
                  Để sau
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg text-xs font-bold text-white shadow-md hover:brightness-110 cursor-pointer"
                  style={{ backgroundColor: '#8B0000' }}
                >
                  Xác nhận Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

