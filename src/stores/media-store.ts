import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved, runInAction } from 'mobx';
import { MediaContentItem } from '../types';
import { ObservableInput, Subscription, catchError, from, of, switchMap, tap } from 'rxjs';
import { toStream } from 'mobx-utils';
import MediaService from '../services/mock-media-api';
import MediaContent from '../models/media-content';

interface MediaStoreState {
  mediaContent: MediaContent[];
  isLoading: boolean;
  error: string | null;
}

class MediaStore {
  private readonly mediaService = new MediaService();

  private state: MediaStoreState = {
    mediaContent: [],
    isLoading: false,
    error: null,
  };

  private subscription$?: Subscription;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });

    onBecomeObserved(this.state, 'mediaContent', () => {
      this.subscription$ = this.initFetch();
    });

    onBecomeUnobserved(this.state, 'mediaContent', () => {
      this.subscription$?.unsubscribe();
    });
  }

  get mediaContent() {
    return this.state.mediaContent;
  }

  get isLoading() {
    return this.state.isLoading;
  }

  get error() {
    return this.state.error;
  }

  add(mediaContentItem: MediaContentItem): void {
    this.mediaContent.push(mediaContentItem);
  }

  update(mediaContentItem: MediaContentItem) {
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

  private initFetch() {
    return from(toStream(() => [], true) as ObservableInput<[]>)
      .pipe(
        tap(() => {
          runInAction(() => {
            this.state.isLoading = true;
            this.state.error = null;
          });
        }),
        switchMap(() => {
          return this.mediaService.getMediaContent$();
        }),
        tap((res) => {
          runInAction(() => {
            this.state.isLoading = false;
            this.state.mediaContent = res;
          });
        }),
        catchError((err) => {
          console.error(err);

          runInAction(() => {
            this.state.isLoading = false;
            this.state.error = err.message;
          });

          return of([]);
        }),
      )
      .subscribe();
  }
}

export default MediaStore;
