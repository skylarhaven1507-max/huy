import React, { useState } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { CATEGORIES } from '../data/categories';
import { Article } from '../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Clock, 
  BarChart3, 
  FileText, 
  Users, 
  TrendingUp, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { articles, addArticle, deleteArticle, showToast, navigateTo } = useNewspaper();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  // Form states for new article
  const [newTitle, setNewTitle] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('kinh-te');
  const [newCoverImage, setNewCoverImage] = useState('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80');
  const [newAuthorName, setNewAuthorName] = useState('Ban Biên Tập Tri Thức');
  const [newContent, setNewContent] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);

  // Quick stats
  const totalViews = articles.reduce((acc, cur) => acc + (cur.views || 0), 0);
  const totalComments = 184;

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExcerpt.trim()) return;

    const catObj = CATEGORIES.find((c) => c.slug === newCategorySlug);
    const slug = newTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newArt: Article = {
      id: `art-${Date.now()}`,
      title: newTitle,
      slug: slug || `bai-viet-${Date.now()}`,
      excerpt: newExcerpt,
      category: catObj ? catObj.name : 'Kinh tế',
      categorySlug: newCategorySlug,
      coverImage: newCoverImage,
      imageCaption: `Ảnh minh họa cho bài viết: ${newTitle}`,
      author: {
        id: `author-${Date.now()}`,
        name: newAuthorName,
        role: 'Phóng viên Thường trú',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        bio: 'Biên tập viên ban Kinh tế & Hội nhập Thời Báo Tri Thức.',
      },
      publishedAt: new Date().toISOString(),
      readingTime: Math.max(3, Math.round(newContent.split(' ').length / 80)),
      views: 120,
      featured: isFeatured,
      isBreaking: isBreaking,
      tags: [catObj ? catObj.name : 'Thời sự', 'Tin mới'],
      content: [
        {
          type: 'paragraph',
          content: newContent || newExcerpt,
        },
      ],
    };

    addArticle(newArt);
    setIsCreateModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
  };

  const filteredArticles = filterCategory === 'all'
    ? articles
    : articles.filter((a) => a.categorySlug === filterCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--border-rule)' }}>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            HỆ THỐNG BIÊN TẬP CMS V4.2
          </div>
          <h1 className="font-editorial text-3xl font-extrabold tracking-tight">
            Tổng Biên Tập &amp; Quản Trị Tòa Soạn
          </h1>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-md hover:brightness-110 transition-all self-start sm:self-center"
          style={{ backgroundColor: '#8B1E1E' }}
        >
          <Plus className="w-4 h-4" />
          <span>Soạn bài viết mới</span>
        </button>
      </div>

      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          className="p-5 rounded-2xl border space-y-1"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-rule)' }}
        >
          <div className="flex items-center justify-between text-xs opacity-70">
            <span>Tổng bài phát hành</span>
            <FileText className="w-4 h-4 text-amber-700" />
          </div>
          <div className="font-editorial text-3xl font-black">{articles.length}</div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">+100% đạt chỉ tiêu xuất bản</div>
        </div>

        <div 
          className="p-5 rounded-2xl border space-y-1"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-rule)' }}
        >
          <div className="flex items-center justify-between text-xs opacity-70">
            <span>Lượt đọc tích lũy</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-editorial text-3xl font-black">{totalViews.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Tăng 18.4% tuần này</div>
        </div>

        <div 
          className="p-5 rounded-2xl border space-y-1"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-rule)' }}
        >
          <div className="flex items-center justify-between text-xs opacity-70">
            <span>Ý kiến phản hồi</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-editorial text-3xl font-black">{totalComments}</div>
          <div className="text-[11px] opacity-60 font-medium">98.2% đã duyệt văn minh</div>
        </div>

        <div 
          className="p-5 rounded-2xl border space-y-1"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-rule)' }}
        >
          <div className="flex items-center justify-between text-xs opacity-70">
            <span>Tốc độ đọc trung bình</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="font-editorial text-3xl font-black">4.8 phút</div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Tỷ lệ hoàn thành cao</div>
        </div>
      </div>

      {/* Articles Management Table */}
      <div 
        className="rounded-2xl border p-5 space-y-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-rule)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b" style={{ borderColor: 'var(--border-rule)' }}>
          <h3 className="font-editorial text-lg font-bold">Danh mục ấn bản ({filteredArticles.length})</h3>
          
          <div className="flex items-center gap-2 text-xs">
            <span className="opacity-70">Lọc chuyên mục:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg border text-xs bg-transparent focus:outline-none"
              style={{ borderColor: 'var(--border-rule)' }}
            >
              <option value="all">Tất cả ({articles.length})</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="opacity-60 border-b uppercase tracking-wider text-[10px]" style={{ borderColor: 'var(--border-rule)' }}>
              <tr>
                <th className="py-2.5 px-3">Bài viết</th>
                <th className="py-2.5 px-3">Chuyên mục</th>
                <th className="py-2.5 px-3">Tác giả</th>
                <th className="py-2.5 px-3">Lượt xem</th>
                <th className="py-2.5 px-3">Ngày đăng</th>
                <th className="py-2.5 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--border-rule)' }}>
              {filteredArticles.map((art) => (
                <tr key={art.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 max-w-xs sm:max-w-md">
                    <div 
                      onClick={() => navigateTo({ page: 'article', slug: art.slug })}
                      className="font-editorial font-bold text-sm truncate hover:underline cursor-pointer"
                    >
                      {art.title}
                    </div>
                    <div className="opacity-60 text-[11px] line-clamp-1">{art.excerpt}</div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold border" style={{ borderColor: 'var(--border-rule)' }}>
                      {art.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap opacity-80">{art.author.name}</td>
                  <td className="py-3 px-3 whitespace-nowrap font-mono">{art.views.toLocaleString()}</td>
                  <td className="py-3 px-3 whitespace-nowrap opacity-60">
                    {new Date(art.publishedAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => navigateTo({ page: 'article', slug: art.slug })}
                      className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10"
                      title="Xem bài"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteArticle(art.id)}
                      className="p-1 rounded hover:bg-red-500/10 text-red-600"
                      title="Xóa bài viết"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE ARTICLE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div 
            className="w-full max-w-2xl rounded-2xl shadow-2xl border p-6 my-8 relative animate-in fade-in zoom-in-95"
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-ink)',
              borderColor: 'var(--border-rule)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b mb-4" style={{ borderColor: 'var(--border-rule)' }}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <h3 className="font-editorial text-xl font-bold">Soạn thảo bài báo mới</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 opacity-80">Tiêu đề bài viết lớn *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Việt Nam hoàn tất đàm phán hiệp định thương mại mới..."
                  className="w-full px-3.5 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-amber-800/30"
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderColor: 'var(--border-rule)',
                    color: 'var(--text-ink)',
                  }}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 opacity-80">Đoạn Sapo / Tóm tắt mở đầu *</label>
                <textarea
                  rows={2}
                  required
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Tóm tắt 1-2 câu quan trọng nhất của bài báo..."
                  className="w-full px-3.5 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-amber-800/30"
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderColor: 'var(--border-rule)',
                    color: 'var(--text-ink)',
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 opacity-80">Chuyên mục</label>
                  <select
                    value={newCategorySlug}
                    onChange={(e) => setNewCategorySlug(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border text-xs focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderColor: 'var(--border-rule)',
                      color: 'var(--text-ink)',
                    }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 opacity-80">Tác giả</label>
                  <input
                    type="text"
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border text-xs focus:outline-none"
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderColor: 'var(--border-rule)',
                      color: 'var(--text-ink)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 opacity-80">URL Ảnh Cover</label>
                <input
                  type="url"
                  value={newCoverImage}
                  onChange={(e) => setNewCoverImage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border text-xs focus:outline-none font-mono"
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderColor: 'var(--border-rule)',
                    color: 'var(--text-ink)',
                  }}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 opacity-80">Nội dung chi tiết</label>
                <textarea
                  rows={6}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Nhập nội dung đầy đủ của bài báo..."
                  className="w-full px-3.5 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-amber-800/30 leading-relaxed font-serif"
                  style={{
                    backgroundColor: 'var(--bg-subtle)',
                    borderColor: 'var(--border-rule)',
                    color: 'var(--text-ink)',
                  }}
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded accent-amber-800"
                  />
                  <span>Đặt làm bài Tiêu điểm đặc biệt</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBreaking}
                    onChange={(e) => setIsBreaking(e.target.checked)}
                    className="rounded accent-red-700"
                  />
                  <span>Gắn mác Tin nóng (Breaking)</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-rule)' }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ borderColor: 'var(--border-rule)' }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-white font-bold shadow-md hover:brightness-110"
                  style={{ backgroundColor: '#8B1E1E' }}
                >
                  Xuất bản ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
