export interface MediaContentResponse {
  id: number;
  title: string;
  type: 'movie' | 'tv-show' | 'game' | 'comic' | 'book';
  genre: string;
  releaseYear: number;
  rating: number;
}
