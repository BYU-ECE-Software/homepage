'use client';

import { useMemo, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import NewsCard, { type NewsItem } from './NewsCard';

interface NewsGridProps {
  items: NewsItem[];
  featuredFirst?: boolean;
  columns?: 2 | 3;
  carousel?: boolean;
}

export default function NewsGrid({
  items,
  featuredFirst = false,
  columns = 3,
  carousel = true,
}: NewsGridProps) {
  const [page, setPage] = useState(0);

  const [featured, ...rest] = items;
  const gridItems = featuredFirst ? rest : items;
  const pageSize = columns === 2 ? 2 : 3;
  const pageCount = carousel ? Math.ceil(gridItems.length / pageSize) : 1;
  const currentPage = Math.min(page, Math.max(pageCount - 1, 0));
  const visibleItems = useMemo(
    () =>
      carousel
        ? gridItems.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
        : gridItems,
    [carousel, gridItems, currentPage, pageSize],
  );

  if (items.length === 0) {
    return (
      <p className="rounded-lg bg-slate-50 p-8 text-center text-slate-600">
        No stories are currently posted.
      </p>
    );
  }

  const gridClass = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="space-y-6">
      {featuredFirst && <NewsCard item={featured} featured />}
      <div className={`grid gap-6 ${gridClass}`}>
        {visibleItems.map((item) => (
          <NewsCard key={`${item.title}-${item.date}`} item={item} />
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
            aria-label="Previous stories"
            className="text-byu-navy flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="text-sm font-medium text-slate-500">
            {currentPage + 1} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(p + 1, pageCount - 1))}
            disabled={currentPage === pageCount - 1}
            aria-label="Next stories"
            className="text-byu-navy flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

export type { NewsItem } from './NewsCard';
