export type Language = 'bn' | 'en';

export type CategoryKey = 
  | 'all'
  | 'lead'
  | 'national'
  | 'politics'
  | 'country'
  | 'economy'
  | 'international'
  | 'sports'
  | 'entertainment'
  | 'opinion'
  | 'tech'
  | 'lifestyle';

export interface Article {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  content: string[];
  contentEn: string[];
  category: CategoryKey;
  categoryLabelBn: string;
  categoryLabelEn: string;
  kicker?: string;
  kickerEn?: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  publishedAtEn: string;
  readTime: string;
  readTimeEn: string;
  imageUrl: string;
  caption: string;
  captionEn?: string;
  isLead?: boolean;
  isBreaking?: boolean;
  isTrending?: boolean;
  division?: string;
  district?: string;
  tags: string[];
  viewsCount: number;
  commentsCount: number;
}

export interface MarketTickerItem {
  symbol: string;
  nameBn: string;
  nameEn: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface PrayerTime {
  nameBn: string;
  nameEn: string;
  time: string;
}

export interface WeatherData {
  cityBn: string;
  cityEn: string;
  tempCelsius: number;
  conditionBn: string;
  conditionEn: string;
  humidity: string;
}

export interface PollOption {
  id: string;
  labelBn: string;
  labelEn: string;
  votes: number;
}

export interface Poll {
  id: string;
  questionBn: string;
  questionEn: string;
  totalVotes: number;
  options: PollOption[];
  date: string;
}

export interface EPaperPage {
  pageNumber: number;
  nameBn: string;
  nameEn: string;
  imageUrl: string;
  date: string;
  clippings: {
    id: string;
    titleBn: string;
    titleEn: string;
    box: { top: string; left: string; width: string; height: string };
    articleId?: string;
  }[];
}

export interface ArticleComment {
  id: string;
  authorName: string;
  timeAgo: string;
  comment: string;
  likes: number;
}

export interface BreakingNewsItem {
  id: string;
  textBn: string;
  textEn: string;
  timeBn: string;
  timeEn: string;
}

export interface AdminUser {
  email: string;
  role: 'super_admin' | 'editor';
  name: string;
}

