import React, { useState } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { X, User, Lock, Mail, Check, LogIn, Sparkles } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login, showToast } = useNewspaper();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim(), name.trim() || undefined);
  };

  const handleQuickLogin = (demoName: string, demoEmail: string) => {
    login(demoEmail, demoName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md rounded-2xl shadow-2xl border p-6 sm:p-7 relative"
        style={{
          backgroundColor: 'var(--bg-card, #FFFFFF)',
          color: 'var(--text-ink, #121212)',
          borderColor: 'var(--border-dark, #121212)',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-opacity"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-[#8B0000] dark:text-amber-400">
            <User className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-sans font-black uppercase tracking-widest text-[#8B0000]">
            TÒA SOẠN NHẬT BÁO
          </span>
          <h3 className="font-editorial text-2xl font-black mt-1">
            {isRegister ? 'Tạo Tài Khoản Độc Giả' : 'Đăng Nhập Độc Giả'}
          </h3>
          <p className="text-xs opacity-70 mt-1 font-sans">
            Đồng bộ bài viết đã lưu, theo dõi chuyên mục yêu thích và lưu lịch sử đọc đa thiết bị.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 font-sans">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold mb-1 opacity-80">Họ và tên</label>
              <div className="relative">
                <input
                  type="text"
                  required={isRegister}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn An"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                  style={{
                    backgroundColor: 'var(--bg-subtle, #F5F1E9)',
                    borderColor: 'var(--border-rule, #E5E0D5)',
                    color: 'var(--text-ink, #121212)',
                  }}
                />
                <User className="w-4 h-4 opacity-40 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Địa chỉ Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="docgia@nhatbao.vn"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                style={{
                  backgroundColor: 'var(--bg-subtle, #F5F1E9)',
                  borderColor: 'var(--border-rule, #E5E0D5)',
                  color: 'var(--text-ink, #121212)',
                }}
              />
              <Mail className="w-4 h-4 opacity-40 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 opacity-80">Mật khẩu</label>
            <div className="relative">
              <input
                type="password"
                required
                defaultValue="••••••••"
                placeholder="Mật khẩu của bạn"
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
                style={{
                  backgroundColor: 'var(--bg-subtle, #F5F1E9)',
                  borderColor: 'var(--border-rule, #E5E0D5)',
                  color: 'var(--text-ink, #121212)',
                }}
              />
              <Lock className="w-4 h-4 opacity-40 absolute left-3 top-3" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs opacity-75 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-[#8B0000]" />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <button 
              type="button"
              onClick={() => showToast('Liên kết đặt lại mật khẩu đã được tạo.', 'info')}
              className="hover:underline text-[#8B0000]"
            >
              Quên mật khẩu?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: '#8B0000' }}
          >
            <LogIn className="w-4 h-4" />
            <span>{isRegister ? 'Đăng Ký Tài Khoản' : 'Đăng Nhập'}</span>
          </button>
        </form>

        {/* Quick 1-Click Demo Login */}
        <div className="mt-5 pt-4 border-t space-y-2.5" style={{ borderColor: 'var(--border-rule, #E5E0D5)' }}>
          <div className="text-[10px] uppercase font-bold tracking-widest text-center opacity-60">
            Hoặc đăng nhập nhanh trải nghiệm
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('Nguyễn Văn An', 'an.nguyen@nhatbao.vn')}
              className="px-3 py-2 rounded-lg border text-xs text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--border-rule, #E5E0D5)' }}
            >
              <div className="font-bold truncate text-[11px]">Nguyễn Văn An</div>
              <div className="text-[10px] opacity-60">Hội viên Cao cấp</div>
            </button>
            <button
              onClick={() => handleQuickLogin('Trần Minh Thư', 'thu.tran@nhatbao.vn')}
              className="px-3 py-2 rounded-lg border text-xs text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--border-rule, #E5E0D5)' }}
            >
              <div className="font-bold truncate text-[11px]">Trần Minh Thư</div>
              <div className="text-[10px] opacity-60">Độc giả Tiêu chuẩn</div>
            </button>
          </div>
        </div>

        {/* Switch Register/Login */}
        <div className="text-center text-xs opacity-75 mt-4">
          {isRegister ? (
            <span>
              Đã có tài khoản?{' '}
              <button 
                type="button" 
                onClick={() => setIsRegister(false)}
                className="font-bold text-[#8B0000] hover:underline"
              >
                Đăng nhập ngay
              </button>
            </span>
          ) : (
            <span>
              Chưa có tài khoản độc giả?{' '}
              <button 
                type="button" 
                onClick={() => setIsRegister(true)}
                className="font-bold text-[#8B0000] hover:underline"
              >
                Đăng ký thành viên
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
