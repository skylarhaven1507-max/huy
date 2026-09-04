import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Article, 
  ActiveRoute, 
  ThemeMode, 
  FontSize, 
  LineHeight, 
  UserProfile, 
  ReadingHistoryItem,
  VideoItem,
  PodcastEpisode
} from '../types';
import { INITIAL_ARTICLES } from '../data/mockArticles';
import { MOCK_VIDEOS, MOCK_PODCASTS } from '../data/mockMultimedia';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'bookmark';
}

interface AudioTrackState {
  isPlaying: boolean;
  title: string;
  subtitle: string;
  audioUrl: string;
  currentTime: number;
  duration: number;
  playbackRate: number;
  isTTS?: boolean;
}

interface NewspaperContextType {
  // Articles state
  articles: Article[];
  getArticleBySlug: (slug: string) => Article | undefined;
  getArticlesByCategory: (categorySlug: string) => Article[];
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  deleteArticle: (id: string) => void;

  // Routing
  currentRoute: ActiveRoute;
  navigateTo: (route: ActiveRoute) => void;
  
  // Theme & Reading settings
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  lineHeight: LineHeight;
  setLineHeight: (height: LineHeight) => void;
  focusedReadingMode: boolean;
  setFocusedReadingMode: (focused: boolean) => void;
  
  // User Personalization
  userProfile: UserProfile;
  isBookmarked: (articleId: string) => boolean;
  toggleBookmark: (articleId: string) => void;
  recordReadingHistory: (articleId: string, progressPercent?: number) => void;
  toggleFollowCategory: (categorySlug: string) => void;
  toggleFollowAuthor: (authorId: string) => void;
  
  // Audio & Multimedia
  videos: VideoItem[];
  podcasts: PodcastEpisode[];
  audioTrack: AudioTrackState | null;
  playAudio: (title: string, subtitle: string, url: string, isTTS?: boolean) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  setAudioProgress: (seconds: number) => void;
  setAudioRate: (rate: number) => void;

  // Toasts
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'bookmark') => void;
  removeToast: (id: string) => void;

  // Search
  searchHistory: string[];
  addSearchHistory: (term: string) => void;
  clearSearchHistory: () => void;

  // Auth & Login
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const NewspaperContext = createContext<NewspaperContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_ARTICLES = 'thoi_bao_articles_v1';
const LOCAL_STORAGE_KEY_THEME = 'thoi_bao_theme_v1';
const LOCAL_STORAGE_KEY_BOOKMARKS = 'thoi_bao_bookmarks_v1';
const LOCAL_STORAGE_KEY_HISTORY = 'thoi_bao_history_v1';
const LOCAL_STORAGE_KEY_SEARCH_HIST = 'thoi_bao_search_hist_v1';

const parsePathToRoute = (pathname: string): ActiveRoute => {
  try {
    const clean = pathname.replace(/^\/+|\/+$/g, '');
    if (!clean || clean === 'home') return { page: 'home' };
    if (clean === 'bookmarks') return { page: 'bookmarks' };
    if (clean === 'history') return { page: 'history' };
    if (clean === 'profile') return { page: 'profile' };
    if (clean === 'videos') return { page: 'videos' };
    if (clean === 'podcasts') return { page: 'podcasts' };
    if (clean === 'admin') return { page: 'admin' };
    if (clean === 'search') return { page: 'search' };

    if (clean.startsWith('category/')) {
      const slug = clean.replace('category/', '');
      return { page: 'category', slug };
    }
    if (clean.startsWith('article/')) {
      const slug = clean.replace('article/', '');
      return { page: 'article', slug };
    }
  } catch {
    // fallback
  }
  return { page: 'home' };
};

const routeToPath = (route: ActiveRoute): string => {
  switch (route.page) {
    case 'home': return '/';
    case 'category': return `/category/${route.slug}`;
    case 'article': return `/article/${route.slug}`;
    case 'search': return `/search`;
    case 'bookmarks': return `/bookmarks`;
    case 'history': return `/history`;
    case 'profile': return `/profile`;
    case 'videos': return `/videos`;
    case 'podcasts': return `/podcasts`;
    case 'admin': return `/admin`;
    case 'not-found': return '/404';
    default: return '/';
  }
};

export const NewspaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Articles
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ARTICLES);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ARTICLES;
  });

  // Routing with URL sync
  const [currentRoute, setCurrentRoute] = useState<ActiveRoute>(() => {
    if (typeof window !== 'undefined' && window.location.pathname) {
      return parsePathToRoute(window.location.pathname);
    }
    return { page: 'home' };
  });

  // Auth & Login
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('thoi_bao_auth_v1') === 'true';
    } catch {
      return false;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userName, setUserName] = useState<string>('Nguyễn Văn An');
  const [userEmail, setUserEmail] = useState<string>('an.nguyen@thoitri.vn');

  // Theme
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_THEME);
      if (saved === 'classic' || saved === 'modern' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'classic';
  });

  // Reading settings
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [lineHeight, setLineHeight] = useState<LineHeight>('normal');
  const [focusedReadingMode, setFocusedReadingMode] = useState<boolean>(false);

  // User Profile
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_BOOKMARKS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['art-01', 'art-02'];
  });

  const [history, setHistory] = useState<ReadingHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_HISTORY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      { articleId: 'art-01', readAt: new Date().toISOString(), progressPercent: 85 },
      { articleId: 'art-03', readAt: new Date(Date.now() - 3600000).toISOString(), progressPercent: 40 }
    ];
  });

  const [followedCategories, setFollowedCategories] = useState<string[]>(['thoi-su', 'kinh-te', 'cong-nghe']);
  const [followedAuthors, setFollowedAuthors] = useState<string[]>(['auth_1', 'auth_3']);

  // Search history
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_SEARCH_HIST);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['Bán dẫn', 'NetZero 2050', 'Trí tuệ nhân tạo', 'Lãi suất'];
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Audio state
  const [audioTrack, setAudioTrack] = useState<AudioTrackState | null>(null);

  // Multimedia items
  const [videos] = useState<VideoItem[]>(MOCK_VIDEOS);
  const [podcasts] = useState<PodcastEpisode[]>(MOCK_PODCASTS);

  // Sync articles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_ARTICLES, JSON.stringify(articles));
    } catch {
      // ignore
    }
  }, [articles]);

  // Sync theme
  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_THEME, newTheme);
    } catch {
      // ignore
    }
  };

  // Sync bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  // Sync history
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  // Sync search history
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_SEARCH_HIST, JSON.stringify(searchHistory));
    } catch {
      // ignore
    }
  }, [searchHistory]);

  // Popstate listener for browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parsePathToRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Window scroll to top on navigation & update URL
  const navigateTo = (route: ActiveRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const path = routeToPath(route);
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }
    } catch {
      // Ignore pushState restriction in sandbox iframe
    }
  };

  // Auth methods
  const login = (email: string, name?: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    if (name) setUserName(name);
    try {
      localStorage.setItem('thoi_bao_auth_v1', 'true');
    } catch {
      // ignore
    }
    setIsLoginModalOpen(false);
    showToast(`Chào mừng bạn ${name || email} đã đăng nhập thành công!`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.removeItem('thoi_bao_auth_v1');
    } catch {
      // ignore
    }
    showToast('Đã đăng xuất khỏi tài khoản.', 'info');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'bookmark' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getArticleBySlug = (slug: string) => {
    return articles.find((a) => a.slug === slug);
  };

  const getArticlesByCategory = (categorySlug: string) => {
    return articles.filter((a) => a.categorySlug === categorySlug);
  };

  const addArticle = (article: Article) => {
    setArticles((prev) => [article, ...prev]);
    showToast(`Đã xuất bản bài viết: "${article.title.slice(0, 35)}..."`, 'success');
  };

  const updateArticle = (article: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === article.id ? article : a)));
    showToast(`Đã cập nhật bài viết thành công.`, 'success');
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    showToast(`Đã xóa bài viết khỏi hệ thống.`, 'info');
  };

  const isBookmarked = (articleId: string) => bookmarks.includes(articleId);

  const toggleBookmark = (articleId: string) => {
    if (bookmarks.includes(articleId)) {
      setBookmarks((prev) => prev.filter((id) => id !== articleId));
      showToast('Đã xóa bài viết khỏi danh sách Đọc sau', 'info');
    } else {
      setBookmarks((prev) => [articleId, ...prev]);
      showToast('Đã lưu vào danh sách Đọc sau', 'bookmark');
    }
  };

  const recordReadingHistory = (articleId: string, progressPercent = 0) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.articleId !== articleId);
      return [{ articleId, readAt: new Date().toISOString(), progressPercent }, ...filtered];
    });
  };

  const toggleFollowCategory = (categorySlug: string) => {
    setFollowedCategories((prev) => {
      const isFollowing = prev.includes(categorySlug);
      const next = isFollowing ? prev.filter((c) => c !== categorySlug) : [...prev, categorySlug];
      showToast(isFollowing ? 'Đã hủy theo dõi chuyên mục' : 'Đã theo dõi chuyên mục', 'success');
      return next;
    });
  };

  const toggleFollowAuthor = (authorId: string) => {
    setFollowedAuthors((prev) => {
      const isFollowing = prev.includes(authorId);
      const next = isFollowing ? prev.filter((a) => a !== authorId) : [...prev, authorId];
      showToast(isFollowing ? 'Đã hủy theo dõi tác giả' : 'Đã theo dõi tác giả', 'success');
      return next;
    });
  };

  const addSearchHistory = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setSearchHistory((prev) => [clean, ...prev.filter((t) => t.toLowerCase() !== clean.toLowerCase())].slice(0, 8));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  // Audio management
  const playAudio = (title: string, subtitle: string, url: string, isTTS = false) => {
    setAudioTrack({
      isPlaying: true,
      title,
      subtitle,
      audioUrl: url,
      currentTime: 0,
      duration: isTTS ? 180 : 300,
      playbackRate: 1,
      isTTS,
    });
  };

  const pauseAudio = () => {
    if (audioTrack) {
      setAudioTrack({ ...audioTrack, isPlaying: false });
    }
  };

  const resumeAudio = () => {
    if (audioTrack) {
      setAudioTrack({ ...audioTrack, isPlaying: true });
    }
  };

  const stopAudio = () => {
    setAudioTrack(null);
  };

  const setAudioProgress = (seconds: number) => {
    if (audioTrack) {
      setAudioTrack({ ...audioTrack, currentTime: seconds });
    }
  };

  const setAudioRate = (rate: number) => {
    if (audioTrack) {
      setAudioTrack({ ...audioTrack, playbackRate: rate });
    }
  };

  const userProfile: UserProfile = {
    name: isLoggedIn ? userName : 'Khách đọc báo',
    email: isLoggedIn ? userEmail : 'chua_dang_nhap@nhatbao.vn',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    membership: isLoggedIn ? 'Premium Subscriber' : 'Standard',
    role: isLoggedIn ? 'Độc giả Cao cấp' : 'Khách đọc báo',
    bookmarks,
    history,
    readingHistory: history,
    followedCategories,
    followedAuthors,
  };

  return (
    <NewspaperContext.Provider
      value={{
        articles,
        getArticleBySlug,
        getArticlesByCategory,
        addArticle,
        updateArticle,
        deleteArticle,
        currentRoute,
        navigateTo,
        theme,
        setTheme,
        fontSize,
        setFontSize,
        lineHeight,
        setLineHeight,
        focusedReadingMode,
        setFocusedReadingMode,
        userProfile,
        isBookmarked,
        toggleBookmark,
        recordReadingHistory,
        toggleFollowCategory,
        toggleFollowAuthor,
        videos,
        podcasts,
        audioTrack,
        playAudio,
        pauseAudio,
        resumeAudio,
        stopAudio,
        setAudioProgress,
        setAudioRate,
        toasts,
        showToast,
        removeToast,
        searchHistory,
        addSearchHistory,
        clearSearchHistory,
        isLoggedIn,
        isLoginModalOpen,
        setIsLoginModalOpen,
        login,
        logout,
      }}
    >
      {children}
    </NewspaperContext.Provider>
  );
};

export const useNewspaper = () => {
  const context = useContext(NewspaperContext);
  if (!context) {
    throw new Error('useNewspaper must be used within NewspaperProvider');
  }
  return context;
};
