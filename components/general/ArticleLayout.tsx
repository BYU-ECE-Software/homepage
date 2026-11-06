import type { ReactNode } from 'react';
import Image from 'next/image';
import RichText from './RichText';

interface ArticleLayoutProps {
  title: string;
  content: string;
  eyebrow?: string;
  description?: string;
  author?: string;
  published?: string;
  image?: string;
  imageAlt?: string;
  videoUrl?: string;
  children?: ReactNode;
}

export default function ArticleLayout({
  title,
  content,
  eyebrow = 'Department News',
  description,
  author,
  published,
  image,
  imageAlt,
  videoUrl,
  children,
}: ArticleLayoutProps) {
  return (
    <article>
      <header className="border-b border-slate-200 bg-slate-50 px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-byu-royal text-sm font-semibold tracking-widest uppercase">
            {eyebrow}
          </p>
          <h1 className="text-byu-navy mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && <p className="mt-5 text-xl leading-8 text-slate-600">{description}</p>}
          {(author || published) && (
            <p className="mt-6 text-sm text-slate-500">
              {author && <span className="font-medium text-slate-700">By {author}</span>}
              {author && published && <span aria-hidden="true"> · </span>}
              {published && <time>{published}</time>}
            </p>
          )}
        </div>
      </header>
      {image && (
        <div className="mx-auto mt-10 w-full max-w-5xl px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={image}
              alt={imageAlt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      )}
      {videoUrl && (
        <div className="mx-auto mt-10 w-full max-w-5xl px-6">
          <div className="aspect-video overflow-hidden rounded-lg bg-slate-950">
            <iframe
              src={videoUrl}
              title={`${title} video`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
      <div className="px-6 py-12">
        <RichText content={content} className="mx-auto" />
        {children && <div className="mx-auto mt-10 max-w-3xl">{children}</div>}
      </div>
    </article>
  );
}
