import React from 'react';
import { useNewspaper } from '../context/NewspaperContext';
import { PodcastEpisode } from '../types';
import { Headphones, Play, Pause, Clock, Calendar, Sparkles } from 'lucide-react';

export const PodcastsView: React.FC = () => {
  const { podcasts, audioTrack, playAudio, pauseAudio, resumeAudio } = useNewspaper();

  const handlePlayPodcast = (pod: PodcastEpisode) => {
    if (audioTrack?.title === pod.title) {
      if (audioTrack.isPlaying) {
        pauseAudio();
      } else {
        resumeAudio();
      }
    } else {
      playAudio(pod.title, `${pod.host} • Tập #${pod.episodeNumber} (${pod.category})`, pod.audioUrl, false);
    }
  };

  const featuredPod = podcasts[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: 'var(--border-rule)' }}>
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            <Headphones className="w-4 h-4" />
            <span>KÊNH ÂM THANH &amp; TỌA ĐÀM BÁO CHÍ</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold tracking-tight">
            Podcasts Tri Thức
          </h1>
          <p className="text-xs sm:text-sm opacity-70 mt-1 font-serif">
            Lắng nghe những cuộc đối thoại sâu sắc cùng học giả, chuyên gia kinh tế và nhà hoạch định chính sách hàng đầu.
          </p>
        </div>
        <span className="text-xs font-mono opacity-60 px-3 py-1 rounded border self-start sm:self-center" style={{ borderColor: 'var(--border-rule)' }}>
          {podcasts.length} tập phát sóng
        </span>
      </div>

      {/* Featured Podcast Card */}
      {featuredPod && (
        <div 
          className="rounded-2xl border p-6 sm:p-8 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-rule)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 aspect-square rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-rule)' }}>
              <img
                src={featuredPod.coverImage}
                alt={featuredPod.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded font-bold uppercase tracking-wider text-[11px] text-white bg-emerald-800">
                  Tập mới nhất
                </span>
                <span className="font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Tập #{featuredPod.episodeNumber} • {featuredPod.category}
                </span>
                <span>•</span>
                <span className="opacity-70">{featuredPod.duration}</span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold leading-snug">
                {featuredPod.title}
              </h2>

              <p className="text-sm opacity-80 leading-relaxed font-serif">
                {featuredPod.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handlePlayPodcast(featuredPod)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm shadow-md hover:brightness-110 transition-all"
                  style={{ backgroundColor: '#8B1E1E' }}
                >
                  {audioTrack?.title === featuredPod.title && audioTrack.isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Tạm dừng</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                      <span>Nghe tập này ({featuredPod.duration})</span>
                    </>
                  )}
                </button>

                <div className="text-xs opacity-75">
                  Host: <strong>{featuredPod.host}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Episode List */}
      <div className="space-y-4">
        <h3 className="font-editorial text-xl font-bold uppercase tracking-wider pb-2 border-b" style={{ borderColor: 'var(--border-rule)' }}>
          Các tập phát sóng khác
        </h3>

        <div className="space-y-3">
          {podcasts.map((pod) => {
            const isPlayingThis = audioTrack?.title === pod.title && audioTrack.isPlaying;
            return (
              <div
                key={pod.id}
                className="p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-xs"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border-rule)',
                }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border shrink-0" style={{ borderColor: 'var(--border-rule)' }}>
                    <img
                      src={pod.coverImage}
                      alt={pod.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-emerald-700 dark:text-emerald-400 mb-0.5">
                      <span>Tập #{pod.episodeNumber} • {pod.category}</span>
                      <span>•</span>
                      <span>{pod.publishedAt}</span>
                    </div>
                    <h4 className="font-editorial text-base font-bold truncate">
                      {pod.title}
                    </h4>
                    <p className="text-xs opacity-70 line-clamp-1">
                      {pod.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-mono opacity-60 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {pod.duration}
                  </span>

                  <button
                    onClick={() => handlePlayPodcast(pod)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    style={{ borderColor: 'var(--border-rule)' }}
                  >
                    {isPlayingThis ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    <span>{isPlayingThis ? 'Tạm dừng' : 'Nghe ngay'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
