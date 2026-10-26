'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PromoHeroAction } from '@/components/general/PromoHero';

export type HeroImage = string | { src: string; alt: string };

interface HeroProps {
  /** A single image src string, or an array for carousel mode. */
  images: HeroImage | HeroImage[];
  /** Alt text for the hero image. */
  alt?: string;
  /** Large heading overlaid on the image. */
  title?: string;
  /** Smaller subtext rendered below the title. */
  subtitle?: string;
  /** Optional calls to action rendered beneath the subtitle. */
  actions?: PromoHeroAction[];
  /**
   * CSS height class for the hero container.
   * Pass a Tailwind height utility, e.g. "h-[420px]" or "h-96".
   * Defaults to "h-[420px]".
   */
  heightClass?: string;
  /** Auto-advance carousel slides. Default: true. */
  autoPlay?: boolean;
  /** Milliseconds between carousel slides. Default: 5000. */
  interval?: number;
  /**
   * Tailwind background-color class for the overlay behind text.
   * e.g. "bg-black/40". Default: "bg-black/35".
   */
  overlayClass?: string;
}

export default function Hero({
  images,
  alt = '',
  title,
  subtitle,
  actions = [],
  heightClass = 'h-[420px]',
  autoPlay = true,
  interval = 5000,
  overlayClass = 'bg-black/35',
}: HeroProps) {
  const imageList = (Array.isArray(images) ? images : [images]).map((image, index) =>
    typeof image === 'string' ? { src: image, alt: index === 0 ? alt : '' } : image,
  );
  const isCarousel = imageList.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex || fading) return;
      setFading(true);
      setTimeout(() => {
        setActiveIndex(index);
        setFading(false);
      }, 300);
    },
    [activeIndex, fading],
  );

  const next = useCallback(
    () => goTo((activeIndex + 1) % imageList.length),
    [activeIndex, goTo, imageList.length],
  );

  useEffect(() => {
    if (!isCarousel || !autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [isCarousel, autoPlay, interval, next]);

  return (
    <section
      className={`relative w-full ${heightClass} overflow-hidden bg-[#002255]`}
      aria-label={title ?? 'Hero banner'}
    >
      {/* Slides */}
      {imageList.map((image, i) => (
        <div
          key={image.src}
          aria-hidden={i !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === activeIndex && !fading ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay — only rendered when text is present */}
      {(title || subtitle) && <div className={`absolute inset-0 z-10 ${overlayClass}`} />}

      {/* Text */}
      {(title || subtitle || actions.length > 0) && (
        <div
          className={
            actions.length > 0
              ? 'absolute right-14 bottom-16 left-14 z-20 max-w-3xl sm:right-auto sm:bottom-16 sm:left-10 sm:max-w-[min(70%,48rem)]'
              : 'absolute bottom-10 left-10 z-20 max-w-[60%]'
          }
        >
          {title && (
            <h1
              className={`mb-1 text-3xl leading-tight font-bold text-white drop-shadow-md ${actions.length > 0 ? 'sm:text-5xl' : ''}`}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-base leading-relaxed text-white/90 drop-shadow">{subtitle}</p>
          )}
          {actions.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {actions.map((action) => {
                const classes =
                  action.variant === 'secondary'
                    ? 'rounded-md border border-white/70 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 sm:px-5 sm:py-3 sm:text-base'
                    : 'rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-byu-navy hover:bg-blue-50 sm:px-5 sm:py-3 sm:text-base';
                return action.href.startsWith('/') ? (
                  <Link key={action.label} href={action.href} className={classes}>
                    {action.label}
                  </Link>
                ) : (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes}
                  >
                    {action.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Carousel controls */}
      {isCarousel && (
        <>
          <button
            onClick={() => goTo((activeIndex - 1 + imageList.length) % imageList.length)}
            aria-label="Previous slide"
            className="absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-2xl leading-none text-white transition-colors hover:bg-black/65"
          >
            ‹
          </button>
          <button
            onClick={() => goTo((activeIndex + 1) % imageList.length)}
            aria-label="Next slide"
            className="absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-2xl leading-none text-white transition-colors hover:bg-black/65"
          >
            ›
          </button>

          {/* Dots */}
          <div
            role="tablist"
            className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2"
          >
            {imageList.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full border-2 border-white/80 p-0 transition-colors ${
                  i === activeIndex ? 'bg-white' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
