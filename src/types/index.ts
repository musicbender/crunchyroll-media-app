import theme from '../styles/theme';

export type MediaContentType = 'movie' | 'tv-show' | 'game' | 'comic' | 'book';

export interface MediaContentItem {
  id: number;
  title: string;
  type: MediaContentType;
  genre: string;
  releaseYear: number;
  rating: number;
}

export type Theme = typeof theme;

export type BreakPoints = {
  desktopXXL: number;
  desktopXL: number;
  desktopL: number;
  desktopM: number;
  desktopS: number;
  tablet: number;
  mobileL: number;
  mobileM: number;
  mobileS: number;
};
