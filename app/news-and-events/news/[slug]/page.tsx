import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/general/ArticleLayout';
import { stories } from '@/data/news';
import { formatNewsDate } from '@/data/news/formatNewsDate';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);

  if (!story) return {};

  return {
    title: `${story.title} | Electrical and Computer Engineering`,
    description: story.description,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <ArticleLayout
      eyebrow={story.category ?? 'Department News'}
      title={story.title}
      description={story.description}
      author={story.author}
      published={formatNewsDate(story.date)}
      content={story.content}
    />
  );
}
