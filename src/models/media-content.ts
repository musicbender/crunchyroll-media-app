import { MediaContentResponse } from '../types';

class MediaContent {
  id?: number;
  title?: string;
  type?: 'movie' | 'tv-show' | 'game' | 'comic' | 'book';
  genre?: string;
  releaseYear?: number;
  rating?: number;

  constructor(mediaContent: MediaContentResponse) {
    this.id = mediaContent.id;
    this.title = mediaContent.title;
    this.type = mediaContent.type;
    this.genre = mediaContent.genre;
    this.releaseYear = mediaContent.releaseYear;
    this.rating = mediaContent.rating;
  }
}

export default MediaContent;
