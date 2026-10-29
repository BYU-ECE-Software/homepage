import { PageIntro } from '@/components/general/ContentPage';
import NewsArchive from '@/components/general/NewsArchive';
import type { NewsItem } from '@/components/general/NewsGrid';
import { stories } from '@/data/news';
import { formatNewsDate } from '@/data/news/formatNewsDate';

const newsItems: NewsItem[] = stories.map((story) => ({
  title: story.title,
  description: story.description,
  date: formatNewsDate(story.date),
  category: story.category,
  author: story.author,
  image: story.image,
  imageAlt: story.imageAlt,
  href: `/news-and-events/news/${story.slug}`,
}));

export default function NewsPage() {
  return (
    <>
      <PageIntro
        title="Department news"
        description="Research breakthroughs, student accomplishments, faculty work, and stories from the ECE community."
      />
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <NewsArchive items={newsItems} />
        </div>
      </section>
    </>
  );
}
