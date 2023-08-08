import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved, runInAction } from 'mobx';
import { MediaContentItem } from '../types';
import {
  Observable,
  ObservableInput,
  Subscription,
  catchError,
  from,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { toStream } from 'mobx-utils';
import MediaService from '../services/media-service';
import MediaContent from '../models/media-content';

interface MediaStoreState {
  mediaContent: MediaContent[];
  isLoading: boolean;
  error: string | null;
  trigger: boolean;
}

class MediaStore {
  private readonly mediaService = new MediaService();

  private state: MediaStoreState = {
    mediaContent: [],
    isLoading: false,
    error: null,
    trigger: false,
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

  add(mediaContentItem: MediaContent): void {
    this.state.isLoading = true;
    this.state.error = null;

    this.subscribe(
      this.mediaService.addMediaItem$(mediaContentItem),
      (res: MediaContent | number) => {
        runInAction(() => {
          const addedItem = res as MediaContent;
          this.state.mediaContent.push(addedItem);
        });
      },
    );
  }

  update(mediaContentItem: MediaContentItem) {
    this.subscribe(
      this.mediaService.addMediaItem$(mediaContentItem),
      (res: MediaContent | number) => {
        runInAction(() => {
          const updatedItem = res as MediaContent;

          for (let i = 0; i < this.mediaContent.length; i++) {
            if (this.mediaContent[i].id === updatedItem.id) {
              this.mediaContent.splice(i, 1, updatedItem);
              break;
            }
          }
        });
      },
    );
  }

  delete(id: number): void {
    if (!this.mediaContent.length) return;

    for (let i = 0; i < this.mediaContent.length; i++) {
      if (this.mediaContent[i].id === id) {
        this.mediaContent.splice(i, 1);
        break;
      }
    }

    this.subscribe(this.mediaService.deleteMediaItem$(id), (res: MediaContent | number) => {
      runInAction(() => {
        const deletedId = res as number;

        for (let i = 0; i < this.mediaContent.length; i++) {
          if (this.mediaContent[i].id === deletedId) {
            this.mediaContent.splice(i, 1);
            break;
          }
        }
      });
    });
  }

  private initFetch() {
    return from(toStream(() => [this.state.trigger], true) as ObservableInput<[boolean]>)
      .pipe(
        tap(() => {
          runInAction(() => {
            this.state.isLoading = true;
            this.state.error = null;
          });
        }),
        mergeMap(() => this.mediaService.getMediaContent$()),
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

          return of([this.state.trigger]);
        }),
      )
      .subscribe();
  }

  private subscribe(
    stream: Observable<MediaContent | number>,
    onNext: (res: MediaContent | number) => void,
  ) {
    stream.subscribe({
      next: onNext,
      error: (err) => {
        console.error(err);

        runInAction(() => {
          this.state.error = err.message;
        });
      },
      complete: () => {
        runInAction(() => {
          this.state.isLoading = false;
        });
      },
    });
  }
}

export default MediaStore;
