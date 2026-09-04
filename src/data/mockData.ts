import { INITIAL_ARTICLES } from './mockArticles';
import { CATEGORIES } from './categories';
import { Article } from '../types';

export interface StandardMockArticle {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  categorySlug: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  views: number;
  featured?: boolean;
}

// Map the 32 rich articles to the standard mock schema requested
export const mockData: StandardMockArticle[] = INITIAL_ARTICLES.map((art) => ({
  id: art.id,
  title: art.title,
  slug: art.slug,
  description: art.excerpt,
  content: art.content.map((b) => b.content || '').join('\n\n'),
  category: art.category,
  categorySlug: art.categorySlug,
  author: {
    name: art.author.name,
    role: art.author.role,
    avatar: art.author.avatar,
  },
  image: art.coverImage,
  publishedAt: art.publishedAt,
  readingTime: art.readingTime,
  tags: art.tags,
  views: art.views,
  featured: art.featured,
}));

export const MOCK_ARTICLES: Article[] = INITIAL_ARTICLES;
export { INITIAL_ARTICLES, CATEGORIES };
export default mockData;
