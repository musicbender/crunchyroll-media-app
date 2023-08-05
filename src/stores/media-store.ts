import { makeObservable, observable } from 'mobx';
import { MediaContentResponse } from '../types';

interface MediaObservables {
  mediaContent: MediaContentResponse[];
}

class MediaStore {
  mediaContent: MediaContentResponse[] = [];

  constructor() {
    makeObservable<MediaObservables>(this, {
      mediaContent: observable,
    });
  }

  add(mediaContentItem: MediaContentResponse): void {
    this.mediaContent.push(mediaContentItem);
  }

  update(mediaContentItem: MediaContentResponse) {
    for (let i = 0; i < this.mediaContent.length; i++) {
      if (this.mediaContent[i].id === mediaContentItem.id) {
        this.mediaContent.splice(i, 1, mediaContentItem);
        break;
      }
    }
  }

  delete(id: number): void {
    if (!this.mediaContent.length) return;

    for (let i = 0; i < this.mediaContent.length; i++) {
      if (this.mediaContent[i].id === id) {
        this.mediaContent.splice(i, 1);
        break;
      }
    }
  }
}

export default MediaStore;
