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
  /** Full article body in Markdown. */
  content: string;
}
