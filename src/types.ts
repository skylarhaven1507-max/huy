export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface ArticleContentBlock {
  type: 'paragraph' | 'heading' | 'blockquote' | 'image' | 'infographic' | 'callout' | 'timeline';
  content?: string;
  authorQuote?: string;
  source?: string;
  imageUrl?: string;
  imageCaption?: string;
  data?: Array<{ label: string; value: string; detail?: string }>;
  timelineItems?: Array<{ time: string; title: string; desc: string }>;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ArticleContentBlock[];
  coverImage: string;
  imageCaption?: string;
  category: string;
  categorySlug: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number; // in minutes
  tags: string[];
  views: number;
  featured?: boolean;
  trending?: boolean;
  isEditorPick?: boolean;
  isBreaking?: boolean;
  relatedSlugs?: string[];
  audioUrl?: string;
  location?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color?: string;
  articleCount?: number;
}

export interface VideoItem {
  id: string;
  title: string;
  slug: string;
  duration: string;
  coverImage: string;
  videoUrl: string;
  category: string;
  publishedAt: string;
  views: number;
  description: string;
  author: string;
}

export type VideoArticle = VideoItem;

export interface PodcastEpisode {
  id: string;
  title: string;
  slug: string;
  duration: string;
  durationSeconds: number;
  coverImage: string;
  audioUrl: string;
  host: string;
  category: string;
  publishedAt: string;
  description: string;
  episodeNumber: number;
}

export interface UserBookmark {
  articleId: string;
  savedAt: string;
}

export interface ReadingHistoryItem {
  articleId: string;
  readAt: string;
  progressPercent: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  membership: 'Standard' | 'Premium Subscriber';
  role?: string;
  bookmarks: string[]; // article IDs
  history: ReadingHistoryItem[];
  readingHistory?: ReadingHistoryItem[];
  followedCategories: string[];
  followedAuthors: string[];
}

export type ThemeMode = 'classic' | 'modern' | 'dark';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';
export type LineHeight = 'tight' | 'normal' | 'relaxed';

export interface ReadingSettings {
  theme: ThemeMode;
  fontSize: FontSize;
  lineHeight: LineHeight;
  focusedMode: boolean;
}

export type ActiveRoute = 
  | { page: 'home' }
  | { page: 'category'; slug: string }
  | { page: 'article'; slug: string }
  | { page: 'search'; query?: string; category?: string }
  | { page: 'videos'; slug?: string }
  | { page: 'podcasts'; slug?: string }
  | { page: 'profile'; tab?: 'profile' | 'bookmarks' | 'history' | 'categories' }
  | { page: 'bookmarks' }
  | { page: 'history' }
  | { page: 'admin' }
  | { page: 'not-found' };
