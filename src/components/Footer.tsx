import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { CATEGORIES } from '../data/categories';
import { 
  Building2, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Award, 
  ExternalLink,
  ArrowUp,
  Globe2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useNewspaper();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="w-full border-t-4 border-double transition-colors mt-16 no-print"
      style={{
        backgroundColor: 'var(--bg-subtle)',
        borderColor: 'var(--border-dark)',
        color: 'var(--text-ink)',
      }}
    >
      {/* Top Footer: Editorial Masthead statement */}
      <div className="border-b" style={{ borderColor: 'var(--border-dark)' }}>
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold opacity-65 mb-1">
              TÒA SOẠN BÁO ĐIỆN TỬ VÀ ẤN PHẨM IN
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black tracking-tighter">
              NHẬT BÁO
            </h2>
            <p className="text-xs sm:text-sm opacity-75 max-w-xl mt-2 leading-relaxed font-serif italic">
              Tôn chỉ: Phụng sự sự thật, nâng cao dân trí, lan tỏa các giá trị học thuật chuẩn mực và đồng hành cùng tiến trình hội nhập của đất nước.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 border text-[11px] font-sans font-bold uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors self-end md:self-center"
            style={{ borderColor: 'var(--border-dark)' }}
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Về đầu trang</span>
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-xs">
          {/* Col 1 & 2: Chuyên mục */}
          <div className="col-span-2 space-y-3">
            <h4 className="text-[11px] font-sans font-black uppercase tracking-widest pb-1 border-b" style={{ borderColor: 'var(--border-dark)' }}>
              CHUYÊN MỤC NỘI DUNG
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1 font-sans">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => navigateTo({ page: 'category', slug: cat.slug })}
                  className="text-left opacity-75 hover:opacity-100 hover:text-[#8B0000] dark:hover:text-[#E63946] transition-colors"
                >
                  {cat.name}
                </button>
              ))}
              <button
                onClick={() => navigateTo({ page: 'videos' })}
                className="text-left opacity-75 hover:opacity-100 hover:text-[#8B0000] dark:hover:text-[#E63946] font-medium transition-colors"
              >
                Video phóng sự
              </button>
              <button
                onClick={() => navigateTo({ page: 'podcasts' })}
                className="text-left opacity-75 hover:opacity-100 hover:text-[#8B0000] dark:hover:text-[#E63946] font-medium transition-colors"
              >
                Podcasts &amp; Audio
              </button>
            </div>
          </div>

          {/* Col 3: Về tòa soạn */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans font-black uppercase tracking-widest pb-1 border-b" style={{ borderColor: 'var(--border-dark)' }}>
              TÒA SOẠN
            </h4>
            <ul className="space-y-2 opacity-75 font-sans">
              <li><button onClick={() => navigateTo({ page: 'home' })} className="hover:opacity-100">Giới thiệu Ban Biên tập</button></li>
              <li><button onClick={() => navigateTo({ page: 'home' })} className="hover:opacity-100">Quy chế Xuất bản</button></li>
              <li><button onClick={() => navigateTo({ page: 'home' })} className="hover:opacity-100">Tiêu chuẩn Đạo đức Báo chí</button></li>
              <li><button onClick={() => navigateTo({ page: 'admin' })} className="hover:opacity-100 font-bold text-[#8B0000] dark:text-[#E63946]">Hệ thống CMS Biên tập</button></li>
              <li><button onClick={() => navigateTo({ page: 'profile' })} className="hover:opacity-100">Tài khoản &amp; Đọc sau</button></li>
            </ul>
          </div>

          {/* Col 4: Dịch vụ & Hợp tác */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans font-black uppercase tracking-widest pb-1 border-b" style={{ borderColor: 'var(--border-dark)' }}>
              DỊCH VỤ &amp; HỢP TÁC
            </h4>
            <ul className="space-y-2 opacity-75 font-sans">
              <li><a href="#" className="hover:opacity-100">Đặt báo in dài hạn</a></li>
              <li><a href="#" className="hover:opacity-100">Quảng cáo &amp; Truyền thông</a></li>
              <li><a href="#" className="hover:opacity-100">Cung cấp nguồn tin RSS/API</a></li>
              <li><a href="#" className="hover:opacity-100">Tuyển dụng phóng viên</a></li>
              <li><a href="#" className="hover:opacity-100">Liên hệ Tòa soạn</a></li>
            </ul>
          </div>

          {/* Col 5: Liên hệ & Pháp lý */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <h4 className="text-[11px] font-sans font-black uppercase tracking-widest pb-1 border-b" style={{ borderColor: 'var(--border-dark)' }}>
              ĐƯỜNG DÂY NÓNG
            </h4>
            <div className="space-y-2 opacity-80 leading-relaxed font-sans">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8B0000]" />
                <span className="font-mono font-bold">1900 8826 (24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8B0000]" />
                <span className="font-mono">toasoan@nhatbao.vn</span>
              </div>
              <div className="flex items-start gap-2 pt-1 text-[11px]">
                <Building2 className="w-3.5 h-3.5 text-[#8B0000] shrink-0 mt-0.5" />
                <span>Số 18 Phố Tràng Tiền, Hoàn Kiếm, Hà Nội</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-sans uppercase tracking-wider opacity-70" style={{ borderColor: 'var(--border-dark)' }}>
          <div>
            © 1988 - 2026 <strong>Nhật Báo</strong>. GP số 218/GP-BTTTT cấp ngày 15/05/2018.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Điều khoản</a>
            <span>•</span>
            <a href="#" className="hover:underline">Bảo mật</a>
            <span>•</span>
            <a href="#" className="hover:underline">Bản quyền</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
