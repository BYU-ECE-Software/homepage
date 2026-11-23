export interface NewsStory {
  slug: string;
  title: string;
  description: string;
  /** Publication date in YYYY-MM-DD format. */
  date: string;
  category?: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  videoUrl?: string;
  /** Canonical public article URL for attribution. */
  sourceUrl?: string;
  /** Article text or a concise summary in Markdown. */
  content: string;
}
