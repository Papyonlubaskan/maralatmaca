'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { imageCacheManager } from '@/lib/image-cache';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  loading?: 'lazy' | 'eager';
  fallbackTitle?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  className = '',
  priority = false,
  quality = 75,
  loading = 'lazy',
  fallbackTitle
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [optimizedSrc, setOptimizedSrc] = useState(src);

  useEffect(() => {
    if (src) {
      // Önbellekten kontrol et
      const cacheKey = `${src}-${width || 'fill'}-${height || 'fill'}-${quality}`;
      const cached = imageCacheManager.get(cacheKey);
      
      if (cached) {
        setOptimizedSrc(cached);
      } else {
        // Optimize et ve önbelleğe ekle
        const optimized = imageCacheManager.optimizeUrl(src, {
          width: width,
          height: height,
          quality: quality,
          format: 'webp'
        });
        setOptimizedSrc(optimized);
      }
    }
  }, [src, width, height, quality]);

  if (error || !src) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 ${className}`}>
        <div className="text-center p-6 animate-fade-in">
          <div className="relative">
            <i className="ri-book-line text-6xl text-orange-500 dark:text-orange-400 mb-4 drop-shadow-lg"></i>
            <div className="absolute -top-1 -right-1">
              <i className="ri-error-warning-line text-2xl text-red-500 dark:text-red-400 animate-pulse"></i>
            </div>
          </div>
          {fallbackTitle && (
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 mt-2">
              {fallbackTitle}
            </h3>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Görsel yüklenemedi
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 animate-pulse">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Yükleniyor...</p>
          </div>
        </div>
      )}
      <Image
        src={optimizedSrc}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        className={className}
        priority={priority}
        quality={quality}
        loading={priority ? undefined : loading}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        onError={() => setError(true)}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

