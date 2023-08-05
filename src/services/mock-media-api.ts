import mockData from '../constants/mock-media-content';
import { MEDIA_LOCAL_STORAGE_KEY } from '../constants/storage';
import MediaContent from '../models/media-content';
import { MediaContentResponse } from '../types';
import { LocalStorage } from '../util/local-storage';

class MediaService {
  private data: MediaContent[] = [];

  constructor() {
    let data = LocalStorage.getInLocal(MEDIA_LOCAL_STORAGE_KEY);

    if (!data) {
      data = JSON.stringify(mockData);
      LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, data);
    }

    this.data = JSON.parse(data);
  }

  get mediaData(): MediaContent[] {
    return this.data;
  }

  addMediaItem(mediaItem: MediaContent): MediaContent[] {
    this.data.push(mediaItem);
    LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, JSON.stringify(this.data));
    return this.data;
  }

  updateMediaItem(mediaItem: MediaContent): MediaContent[] {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === mediaItem.id) {
        this.data[i] = mediaItem;
        break;
      }
    }

    return this.data;
  }

  deleteMediaItem(id: number): void {
    const itemIndex = this.data.findIndex((mediaItem: MediaContent) => mediaItem.id === id);

    if (itemIndex >= 0) {
      this.data.splice(itemIndex, 1);
      LocalStorage.setInLocal(MEDIA_LOCAL_STORAGE_KEY, JSON.stringify(this.data));
    }
  }
}

export default MediaService;
