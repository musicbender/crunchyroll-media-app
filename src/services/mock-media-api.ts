import mockData from '../constants/mock-media-content';
import { MEDIA_LOCAL_STORAGE_KEY } from '../constants/keys';
import MediaContent from '../models/media-content';
import { MediaContentType } from '../types';
import { LocalStorage } from '../util/local-storage';
import { Observable, delay, of } from 'rxjs';

// interface MediaContentResponse {
//   data?: MediaContent[];
//   error?: {
//     message: string;
//   };
// }

export default class MediaService {
  private static sleepTimeout = 700;
  private data: MediaContent[] = [];

  constructor() {
    let data = LocalStorage.getInLocal(MEDIA_LOCAL_STORAGE_KEY);

    if (!data) {
      data = JSON.stringify(mockData);
      LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, data);
    }

    this.data = JSON.parse(data);
  }

  getMediaContent$(typeFilter?: MediaContentType): Observable<MediaContent[]> {
    let data = this.data;

    if (typeFilter) {
      data = data.filter((mediaItem: MediaContent) => mediaItem.type === typeFilter);
    }

    return of(data).pipe(delay(MediaService.sleepTimeout));
  }

  addMediaItem$(mediaItem: MediaContent): Observable<MediaContent[]> {
    this.data.push(mediaItem);
    LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, JSON.stringify(this.data));

    return of(this.data).pipe(delay(MediaService.sleepTimeout));
  }

  updateMediaItem$(mediaItem: MediaContent): Observable<MediaContent[]> {
    let wasUpdated = false;

    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === mediaItem.id) {
        this.data[i] = mediaItem;
        wasUpdated = true;
        break;
      }
    }

    if (wasUpdated) {
      LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, JSON.stringify(this.data));
    } else {
      throw new Error('Could not find item to update');
    }

    return of(this.data).pipe(delay(MediaService.sleepTimeout));
  }

  deleteMediaItem$(id: number): Observable<MediaContent[]> {
    const itemIndex = this.data.findIndex((mediaItem: MediaContent) => mediaItem.id === id);

    if (itemIndex >= 0) {
      this.data.splice(itemIndex, 1);
      LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, JSON.stringify(this.data));
    } else {
      throw new Error('There was an error trying to delete tmedia content');
    }

    return of(this.data).pipe(delay(MediaService.sleepTimeout));
  }
}
