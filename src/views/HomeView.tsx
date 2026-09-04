import React, { useEffect } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { HeroArticle } from '../components/HeroArticle';
import { ArticleCard } from '../components/ArticleCard';
import { TrendingList } from '../components/TrendingList';
import { Newsletter } from '../components/Newsletter';
import { CATEGORIES } from '../data/categories';
import { 
  ArrowRight, 
  Sparkles, 
  Video, 
  Headphones, 
  BookOpen, 
  TrendingUp,
  Quote
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { articles, navigateTo, videos } = useNewspaper();

  useEffect(() => {
    document.title = 'Nhật Báo — Báo Điện Tử Cổ Điển & Hiện Đại';
  }, []);

  // Find the primary featured hero article
  const heroArticle = articles.find((a) => a.featured) || articles[0];

  const heroLeadText = Array.isArray(heroArticle?.content)
    ? (heroArticle.content.find((b) => b.type === 'paragraph')?.content || heroArticle.excerpt)
    : String(heroArticle?.content || heroArticle?.excerpt || '');

  // Side dispatches for the Bento left column
  const leftDispatches = articles
    .filter((a) => a.id !== heroArticle.id)
    .slice(0, 2);

  // Secondary stories for the Bento 4-column row
  const secondaryStories = articles
    .filter((a) => a.id !== heroArticle.id && !leftDispatches.some(d => d.id === a.id))
    .slice(0, 4);

  // Editor's picks
  const editorsPicks = articles
    .filter((a) => a.isEditorPick && a.id !== heroArticle.id)
    .slice(0, 3);

  // Latest news feed
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  // Economics section
  const economyArticles = articles.filter((a) => a.categorySlug === 'kinh-te').slice(0, 3);

  // Tech section
  const techArticles = articles.filter((a) => a.categorySlug === 'cong-nghe').slice(0, 3);

  // Culture & Science
  const cultureArticles = articles.filter((a) => a.categorySlug === 'van-hoa' || a.categorySlug === 'khoa-hoc').slice(0, 4);

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* 1. MASTER BENTO GRID (12 COLUMNS) */}
      <section 
        className="grid grid-cols-1 lg:grid-cols-12 border overflow-hidden bento-card"
        style={{
          borderColor: 'var(--border-dark)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        {/* Left 3 Cols: Market Dispatch & Analysis */}
        <div 
          className="lg:col-span-3 border-b lg:border-b-0 lg:border-r p-5 sm:p-6 flex flex-col justify-between gap-6"
          style={{ borderColor: 'var(--border-dark)' }}
        >
          {leftDispatches.map((art, idx) => (
            <div 
              key={art.id}
              onClick={() => navigateTo({ page: 'article', slug: art.slug })}
              className="cursor-pointer group"
            >
              <span className="text-[10px] font-sans font-black uppercase tracking-widest text-[#8B0000] dark:text-[#E63946]">
                {idx === 0 ? 'Market Dispatch' : 'Special Analysis'} • {art.category}
              </span>
              <h4 className="font-editorial text-xl font-black my-2 leading-tight group-hover:underline tracking-tight">
                {art.title}
              </h4>
              <p className="text-xs font-serif leading-relaxed opacity-80 mb-3 line-clamp-3 italic">
                {art.excerpt}
              </p>
              <div 
                className="text-[9px] font-mono uppercase opacity-65 border-t pt-2 flex items-center justify-between"
                style={{ borderColor: 'var(--border-rule)' }}
              >
                <span>{art.author.name}</span>
                <span>{art.readingTime}p đọc</span>
              </div>
            </div>
          ))}

          {/* Bento mini-brief box inside left column */}
          <div 
            className="p-4 border bento-subtle mt-2"
            style={{ borderColor: 'var(--border-dark)' }}
          >
            <h4 className="text-[10px] font-sans font-black uppercase tracking-widest mb-1.5">
              THE DAILY BRIEF
            </h4>
            <p className="text-[11px] font-sans opacity-80 mb-3 leading-snug">
              Nhận bản tin phân tích sáng từ Ban Biên tập Thời Báo Tri Thức.
            </p>
            <div className="flex border" style={{ borderColor: 'var(--border-dark)' }}>
              <input
                type="text"
                placeholder="Email của bạn..."
                className="bg-transparent text-[11px] p-1.5 flex-1 outline-none font-sans"
              />
              <button
                onClick={() => alert('Cảm ơn bạn đã đăng ký nhận bản tin!')}
                className="bg-[#121212] dark:bg-[#FDFBF7] text-white dark:text-[#121212] px-3 text-[10px] font-sans font-bold uppercase tracking-wider cursor-pointer"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        {/* Center 6 Cols: The Lead Story */}
        <div 
          className="lg:col-span-6 border-b lg:border-b-0 lg:border-r p-5 sm:p-7 flex flex-col"
          style={{ borderColor: 'var(--border-dark)' }}
        >
          <div 
            onClick={() => navigateTo({ page: 'article', slug: heroArticle.slug })}
            className="cursor-pointer group flex-1 flex flex-col"
          >
            <div 
              className="w-full aspect-16/10 mb-4 relative overflow-hidden border"
              style={{ borderColor: 'var(--border-dark)' }}
            >
              <img
                src={heroArticle.coverImage}
                alt={heroArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {heroArticle.imageCaption && (
                <div className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-xs text-white p-2 text-[10px] font-serif italic truncate">
                  {heroArticle.imageCaption}
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-sans font-black uppercase text-[#8B0000] dark:text-[#E63946] tracking-widest">
                  The Lead Story • Tiêu điểm đặc biệt
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-black leading-[1.05] my-3 tracking-tighter group-hover:text-[#8B0000] dark:group-hover:text-[#E63946] transition-colors">
                  {heroArticle.title}
                </h2>
                <p className="text-base sm:text-lg font-serif italic opacity-90 mb-3 border-l-2 pl-3 leading-relaxed" style={{ borderColor: 'var(--accent-gold)' }}>
                  {heroArticle.excerpt}
                </p>
                <p className="text-xs sm:text-sm font-sans leading-relaxed opacity-80 line-clamp-3 mb-4">
                  {heroLeadText.slice(0, 320)}...
                </p>
              </div>

              <div className="pt-3 border-t flex items-center justify-between text-xs opacity-75 font-sans" style={{ borderColor: 'var(--border-rule)' }}>
                <div className="flex items-center gap-2.5">
                  <img
                    src={heroArticle.author.avatar}
                    alt={heroArticle.author.name}
                    className="w-6 h-6 rounded object-cover border"
                    style={{ borderColor: 'var(--border-dark)' }}
                  />
                  <span className="font-bold">{heroArticle.author.name}</span>
                </div>
                <span className="font-mono text-[11px]">{heroArticle.readingTime} phút đọc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 3 Cols: Trending Now 01-05 & Reading Progress */}
        <div className="lg:col-span-3">
          <TrendingList />
        </div>
      </section>

      {/* 2. TOP EDITORIAL GRID: 4 Bento Cards with sharp borders */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b-2" style={{ borderColor: 'var(--border-dark)' }}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#8B0000] dark:bg-[#E63946]" />
            <h3 className="text-xs sm:text-sm font-sans font-black uppercase tracking-widest">
              TIN TỨC CHỦ LỰC • EDITORIAL SELECTION
            </h3>
          </div>
          <span className="text-[11px] font-mono uppercase opacity-70 hidden sm:inline">
            CHỌN LỌC BỞI BAN BIÊN TẬP
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {secondaryStories.map((art) => (
            <div key={art.id}>
              <ArticleCard article={art} variant="standard" showExcerpt={true} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. TWO-COLUMN FEATURE: Latest News Stream & Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left 8 Cols: Latest updates & Op-Ed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b-2" style={{ borderColor: 'var(--border-dark)' }}>
            <h3 className="text-xs sm:text-sm font-sans font-black uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8B0000] dark:text-[#E63946]" />
              <span>DÒNG CHẢY SỰ KIỆN MỚI NHẤT</span>
            </h3>
            <span className="text-[10px] font-mono uppercase opacity-70">LIÊN TỤC 24/7</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {latestArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="horizontal" />
            ))}
          </div>

          {/* Op-Ed / Bento Quote Box */}
          <div 
            className="p-6 sm:p-8 border bento-subtle relative overflow-hidden"
            style={{
              borderColor: 'var(--border-dark)',
              color: 'var(--text-ink)',
            }}
          >
            <div className="flex items-center gap-2 text-[10px] font-sans font-black uppercase tracking-widest text-[#8B0000] dark:text-[#E63946] mb-2">
              <Quote className="w-3.5 h-3.5" />
              <span>GÓC NHÌN &amp; BÌNH LUẬN CHUYÊN GIA</span>
            </div>
            <h4 className="font-editorial text-xl sm:text-2xl font-black mb-3 leading-snug tracking-tight">
              &quot;Bản lĩnh của nền kinh tế không nằm ở tốc độ tăng trưởng ngắn hạn, mà ở khả năng hấp thụ các cú sốc toàn cầu và sự kiên định trong cải cách thể chế.&quot;
            </h4>
            <div className="flex items-center gap-3 pt-2 text-xs opacity-75 font-sans">
              <span className="font-bold">TS. Nguyễn Hoàng Nam</span>
              <span>—</span>
              <span>Viện Nghiên cứu Kinh tế Phát triển</span>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Editor's Picks & Video Spotlight */}
        <div className="lg:col-span-4 space-y-6">
          {/* Editor's Picks */}
          <div 
            className="p-5 border bento-card"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-dark)',
              color: 'var(--text-ink)',
            }}
          >
            <div className="flex items-center gap-2 pb-2.5 border-b mb-4" style={{ borderColor: 'var(--border-dark)' }}>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <h4 className="text-xs font-sans font-black uppercase tracking-widest">
                LỰA CHỌN CỦA TÒA SOẠN
              </h4>
            </div>
            <div className="space-y-3">
              {editorsPicks.map((art) => (
                <ArticleCard key={art.id} article={art} variant="compact" />
              ))}
            </div>
          </div>

          {/* Multimedia Portal Preview */}
          <div 
            className="p-5 border bento-card space-y-3"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-dark)',
              color: 'var(--text-ink)',
            }}
          >
            <div className="flex items-center justify-between pb-2.5 border-b" style={{ borderColor: 'var(--border-dark)' }}>
              <h4 className="text-xs font-sans font-black uppercase tracking-widest flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#8B0000]" />
                <span>VIDEO PHÓNG SỰ</span>
              </h4>
              <button
                onClick={() => navigateTo({ page: 'videos' })}
                className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#8B0000] dark:text-[#E63946] hover:underline flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {videos.slice(0, 1).map((vid) => (
              <div 
                key={vid.id}
                onClick={() => navigateTo({ page: 'videos' })}
                className="group cursor-pointer space-y-2"
              >
                <div className="relative overflow-hidden border aspect-16/10" style={{ borderColor: 'var(--border-dark)' }}>
                  <img
                    src={vid.coverImage}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-black text-white">
                    {vid.duration}
                  </span>
                </div>
                <h5 className="font-editorial text-sm font-bold leading-snug group-hover:text-[#8B0000] dark:group-hover:text-[#E63946] transition-colors tracking-tight">
                  {vid.title}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE DAILY BRIEF NEWSLETTER */}
      <Newsletter />

      {/* 5. KINH TẾ & TÀI CHÍNH SECTION */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b-2" style={{ borderColor: 'var(--border-dark)' }}>
          <div className="flex items-center gap-3">
            <h3 className="text-xs sm:text-sm font-sans font-black uppercase tracking-widest">
              KINH TẾ &amp; DOANH NGHIỆP
            </h3>
            <span className="text-[10px] font-sans font-bold uppercase px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-800/20 hidden sm:inline">
              Vĩ mô &amp; Thị trường
            </span>
          </div>
          <button
            onClick={() => navigateTo({ page: 'category', slug: 'kinh-te' })}
            className="text-[10px] font-sans font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
          >
            <span>Toàn bộ chuyên mục</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {economyArticles.map((art) => (
            <ArticleCard key={art.id} article={art} variant="standard" />
          ))}
        </div>
      </section>

      {/* 6. CÔNG NGHỆ & KHOA HỌC SECTION */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b-2" style={{ borderColor: 'var(--border-dark)' }}>
          <div className="flex items-center gap-3">
            <h3 className="text-xs sm:text-sm font-sans font-black uppercase tracking-widest">
              CÔNG NGHỆ &amp; TƯƠNG LAI
            </h3>
            <span className="text-[10px] font-sans font-bold uppercase px-2 py-0.5 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-800/20 hidden sm:inline">
              AI &amp; Bán dẫn
            </span>
          </div>
          <button
            onClick={() => navigateTo({ page: 'category', slug: 'cong-nghe' })}
            className="text-[10px] font-sans font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
          >
            <span>Toàn bộ chuyên mục</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {techArticles.map((art) => (
            <ArticleCard key={art.id} article={art} variant="standard" />
          ))}
        </div>
      </section>

      {/* 7. VĂN HÓA & NGHỆ THUẬT SECTION */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b-2" style={{ borderColor: 'var(--border-dark)' }}>
          <div className="flex items-center gap-3">
            <h3 className="text-xs sm:text-sm font-sans font-black uppercase tracking-widest">
              VĂN HÓA &amp; DI SẢN
            </h3>
          </div>
          <button
            onClick={() => navigateTo({ page: 'category', slug: 'van-hoa' })}
            className="text-[10px] font-sans font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
          >
            <span>Toàn bộ chuyên mục</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cultureArticles.map((art) => (
            <ArticleCard key={art.id} article={art} variant="standard" />
          ))}
        </div>
      </section>
    </div>
  );
};
