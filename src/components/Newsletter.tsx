import React, { useState } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast } = useNewspaper();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    showToast(`Đã đăng ký thành công cho ${email}!`, 'success');
  };

  return (
    <section
      className="border p-6 sm:p-8 lg:p-10 my-8 sm:my-10 relative overflow-hidden bento-subtle"
      style={{
        borderColor: 'var(--border-dark)',
        color: 'var(--text-ink)',
      }}
    >
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-widest border" style={{ borderColor: 'var(--border-dark)', backgroundColor: 'var(--bg-main)' }}>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>BẢN TIN ĐẶC QUYỀN MỖI SÁNG</span>
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter">
          THE DAILY BRIEF: KHỞI ĐẦU NGÀY MỚI CÙNG TRI THỨC
        </h3>

        <p className="text-xs sm:text-sm font-sans opacity-80 max-w-xl mx-auto leading-relaxed">
          Tóm lược những diễn biến chính trị, thị trường tài chính và đột phá công nghệ quan trọng nhất trong 24 giờ qua. Được chắt lọc bởi ban biên tập và gửi trực tiếp tới hòm thư của bạn lúc 06:00 mỗi sáng.
        </p>

        {isSubscribed ? (
          <div className="p-4 border flex items-center justify-center gap-3 text-emerald-800 dark:text-emerald-300 font-medium" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-dark)' }}>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-sans text-xs">Chúc mừng bạn đã gia nhập hơn 120.000 độc giả đón đọc The Daily Brief!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex border max-w-md mx-auto overflow-hidden shadow-xs" style={{ borderColor: 'var(--border-dark)' }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email của bạn..."
              className="bg-transparent text-xs p-3 flex-1 outline-none font-sans"
              style={{
                color: 'var(--text-ink)',
                backgroundColor: 'var(--bg-main)',
              }}
            />
            <button
              type="submit"
              className="bg-[#121212] dark:bg-[#FDFBF7] text-white dark:text-[#121212] px-5 text-xs font-sans font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
            >
              Tham gia
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-2 text-[11px] font-sans opacity-60 pt-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Cam kết bảo mật 100%. Bạn có thể hủy nhận tin bất cứ lúc nào.</span>
        </div>
      </div>
    </section>
  );
};
