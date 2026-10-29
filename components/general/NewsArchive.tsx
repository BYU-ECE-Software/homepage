'use client';

import { useState } from 'react';
import NewsGrid, { type NewsItem } from '@/components/general/NewsGrid';
import Pagination from '@/components/general/Pagination';

const STORIES_PER_PAGE = 6;

export default function NewsArchive({ items }: { items: NewsItem[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / STORIES_PER_PAGE);
  const start = (page - 1) * STORIES_PER_PAGE;
  const pageStories = items.slice(start, start + STORIES_PER_PAGE);

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <NewsGrid items={pageStories} featuredFirst={page === 1} carousel={false} />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}
