import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface LightboxImage {
  url: string;
  caption?: string;
  title?: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200 no-print">
      {/* Top bar controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-2 text-sm font-medium opacity-80">
          <ZoomIn className="w-4 h-4" />
          <span>Ảnh {currentIndex + 1} / {images.length}</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Đóng ảnh"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Prev / Next buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
            aria-label="Ảnh kế tiếp"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Image & Caption */}
      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center p-2">
        <img
          src={currentImg.url}
          alt={currentImg.caption || 'Chi tiết hình ảnh'}
          className="max-w-full max-h-[72vh] object-contain rounded-lg shadow-2xl"
        />
        {currentImg.caption && (
          <div className="mt-4 text-center max-w-2xl text-white/90 text-sm italic font-serif leading-relaxed px-4 py-2 bg-black/40 rounded-lg">
            {currentImg.caption}
          </div>
        )}
      </div>
    </div>
  );
};
