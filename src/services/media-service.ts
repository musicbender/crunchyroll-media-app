import mockData from '../constants/mock-media-content';
import { MEDIA_LOCAL_STORAGE_KEY } from '../constants/keys';
import MediaContent from '../models/media-content';
import { LocalStorage } from '../util/local-storage';
import { Observable, delay, of, tap } from 'rxjs';

// mocking a REST API behavior using local storage to mock database persistence.
export default class MediaService {
  // to replicate http request delay
  private static sleepTimeout = 1500;
  private static initialData = mockData;

  constructor() {
    let data = LocalStorage.getInLocal(MEDIA_LOCAL_STORAGE_KEY);

    // seed mock data if it doesn't exist
    if (!data) {
      data = JSON.stringify(MediaService.initialData);
      LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, data);
    }
  }

  // fetch filtered media content items
  getMediaContent$(): Observable<MediaContent[]> {
    let data = JSON.parse(LocalStorage.getInLocal(MEDIA_LOCAL_STORAGE_KEY));
    const typeFilter = ['movie', 'tv-show', 'game'];

    if (data) {
      data = data.filter((item: MediaContent) => typeFilter.includes(item.type));
    }

    return of(data).pipe(delay(MediaService.sleepTimeout));
  }

  // add new media content item
  addMediaItem$(mediaItem: MediaContent): Observable<MediaContent> {
    const data: MediaContent[] = JSON.parse(LocalStorage.getInLocal(MEDIA_LOCAL_STORAGE_KEY)) || [];
    data.push(mediaItem);
    LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, JSON.stringify(data));
    return of(mediaItem).pipe(delay(MediaService.sleepTimeout));
  }

  updateMediaItem$(mediaItem: MediaContent): Observable<MediaContent> {
    const data = JSON.parse(LocalStorage.getInLocal(MEDIA_LOCAL_STORAGE_KEY)) || [];
    let wasUpdated = false;

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === mediaItem.id) {
        data[i] = mediaItem;
        wasUpdated = true;
        break;
      }
    }

    if (wasUpdated) {
      LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, JSON.stringify(data));
    }

    return of(mediaItem).pipe(
      delay(MediaService.sleepTimeout),
      tap(() => {
        if (!wasUpdated) throw new Error('Could not find item to update');
      }),
    );
  }

  deleteMediaItem$(id: number): Observable<number> {
    const data = JSON.parse(LocalStorage.getInLocal(MEDIA_LOCAL_STORAGE_KEY)) || [];
    const itemIndex = data.findIndex((mediaItem: MediaContent) => mediaItem.id === id);

    if (itemIndex >= 0) {
      data.splice(itemIndex, 1);
      LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, JSON.stringify(data));
    }

    return of(id).pipe(
      delay(MediaService.sleepTimeout),
      tap(() => {
        if (itemIndex < 0) throw new Error('There was an error trying to delete media content');
      }),
    );
  }

  resetMock() {
    LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, JSON.stringify(MediaService.initialData));
  }
}
