import React, { useState } from 'react';
import { Newspaper } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Hình ảnh báo chí',
  className = '',
  fallbackCategory = 'NHẬT BÁO',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If source is missing or error occurred, render newspaper-styled fallback
  if (!src || hasError) {
    return (
      <div 
        className={`flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        style={{
          backgroundColor: 'var(--bg-subtle, #F5F1E9)',
          color: 'var(--text-ink, #121212)',
          border: '1px solid var(--border-rule, #E5E0D5)',
        }}
      >
        <Newspaper className="w-8 h-8 opacity-35 mb-2 text-[#8B0000]" />
        <span className="text-[10px] font-sans font-black uppercase tracking-widest opacity-60">
          {fallbackCategory}
        </span>
        <span className="text-[11px] font-serif italic opacity-75 line-clamp-1 max-w-[80%] mt-0.5">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      onLoad={() => setIsLoaded(true)}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-80'} ${className}`}
      {...props}
    />
  );
};
