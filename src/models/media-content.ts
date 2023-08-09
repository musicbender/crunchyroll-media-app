import { MediaContentGenre, MediaContentItem, MediaContentType } from '../types';

export default class MediaContent {
  id: number;
  title: string;
  type: MediaContentType;
  genre: MediaContentGenre;
  releaseYear: number;
  rating: number;

  constructor(mediaContent: MediaContentItem) {
    this.id = mediaContent.id;
    this.title = mediaContent.title;
    this.type = mediaContent.type;
    this.genre = mediaContent.genre;
    this.releaseYear = mediaContent.releaseYear;
    this.rating = mediaContent.rating;
  }
}
