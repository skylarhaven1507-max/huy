import React, { useState } from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { VideoArticle } from '../types';
import { Play, Eye, Clock, Video, Film, Share2 } from 'lucide-react';

export const VideosView: React.FC = () => {
  const { videos, showToast } = useNewspaper();
  const [activeVideo, setActiveVideo] = useState<VideoArticle>(videos[0]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Đã sao chép liên kết video!', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Title & Introduction */}
      <div className="pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: 'var(--border-rule)' }}>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-1">
            <Film className="w-4 h-4" />
            <span>KÊNH TRUYỀN HÌNH TƯ LIỆU &amp; PHÓNG SỰ</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold tracking-tight">
            Video Phóng Sự Đặc Biệt
          </h1>
          <p className="text-xs sm:text-sm opacity-70 mt-1 font-serif">
            Những góc máy hiện trường chân thực, đối thoại chuyên sâu cùng các nhân vật có tầm ảnh hưởng.
          </p>
        </div>
        <span className="text-xs font-mono opacity-60 px-3 py-1 rounded border self-start sm:self-center" style={{ borderColor: 'var(--border-rule)' }}>
          {videos.length} tư liệu phát hành
        </span>
      </div>

      {/* Main Video Player Container */}
      <div 
        className="rounded-2xl border p-4 sm:p-6 space-y-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-rule)',
        }}
      >
        <div className="relative aspect-16/9 w-full bg-black rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-rule)' }}>
          <iframe
            src={activeVideo.videoUrl}
            title={activeVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video metadata */}
        <div className="space-y-2 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs opacity-75">
            <div className="flex items-center gap-3">
              <span className="font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                {activeVideo.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeVideo.duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {activeVideo.views.toLocaleString()} lượt xem
              </span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border hover:bg-black/5 dark:hover:bg-white/5"
              style={{ borderColor: 'var(--border-rule)' }}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Chia sẻ</span>
            </button>
          </div>

          <h2 className="font-editorial text-xl sm:text-2xl font-bold leading-snug">
            {activeVideo.title}
          </h2>

          <p className="text-sm opacity-80 leading-relaxed font-serif">
            {activeVideo.description}
          </p>
        </div>
      </div>

      {/* Video Playlist Grid */}
      <div className="space-y-4">
        <h3 className="font-editorial text-xl font-bold uppercase tracking-wider pb-2 border-b" style={{ borderColor: 'var(--border-rule)' }}>
          Danh sách phóng sự mới phát hành
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid) => {
            const isCurrent = vid.id === activeVideo.id;
            return (
              <div
                key={vid.id}
                onClick={() => {
                  setActiveVideo(vid);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`group cursor-pointer rounded-xl border p-3 space-y-3 transition-all ${
                  isCurrent ? 'ring-2 ring-rose-600 shadow-md' : 'hover:shadow-md'
                }`}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-rule)',
                }}
              >
                <div className="relative aspect-16/10 rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-rule)' }}>
                  <img
                    src={vid.coverImage}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5 fill-white" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/85 text-white">
                    {vid.duration}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-rose-700 dark:text-rose-400 mb-1">
                    {vid.category}
                  </div>
                  <h4 className="font-editorial text-sm sm:text-[15px] font-bold leading-snug line-clamp-2 group-hover:text-rose-700 transition-colors">
                    {vid.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2 text-[11px] opacity-60">
                    <span>{vid.views.toLocaleString()} lượt xem</span>
                    <span>•</span>
                    <span>{vid.publishedAt}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
