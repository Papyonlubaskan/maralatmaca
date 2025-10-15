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
  const [isLoading, setIsLoading] = useState(!priority); // priority=true ise loading gösterme
  const [optimizedSrc, setOptimizedSrc] = useState(src);

  useEffect(() => {
    if (src) {
      // Resim yolunu düzenle
      let imageSrc = src;
      
      // Eğer resim yolu relative ise /uploads/ ile başlat
      if (imageSrc && !imageSrc.startsWith('http') && !imageSrc.startsWith('/')) {
        imageSrc = `/uploads/images/${imageSrc}`;
      }
      
      // Eğer resim yolu /uploads/images/ ile başlamıyorsa düzenle
      if (imageSrc && !imageSrc.startsWith('http') && !imageSrc.includes('/uploads/')) {
        imageSrc = `/uploads/images/${imageSrc}`;
      }
      
      // Railway production için absolute URL oluştur
      if (typeof window !== 'undefined' && window.location.hostname === 'maralatmaca-production.up.railway.app') {
        if (imageSrc && !imageSrc.startsWith('http')) {
          imageSrc = `https://maralatmaca-production.up.railway.app${imageSrc}`;
        }
      }
      
      // Server-side rendering için de absolute URL oluştur
      if (typeof window === 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) {
        if (imageSrc && !imageSrc.startsWith('http')) {
          imageSrc = `${process.env.NEXT_PUBLIC_SITE_URL}${imageSrc}`;
        }
      }
      
      setOptimizedSrc(imageSrc);
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
        loading={priority ? 'eager' : loading}
        unoptimized={false}
        onError={() => {
          console.log('Image load error for:', optimizedSrc);
          setError(true);
          setIsLoading(false);
        }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

