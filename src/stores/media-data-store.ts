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

interface MediaDataStoreState {
  mediaContent: MediaContent[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  trigger: boolean;
}

class MediaDataStore {
  private readonly mediaService = new MediaService();

  private state: MediaDataStoreState = {
    mediaContent: [],
    isLoading: false,
    isSaving: false,
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

  public get mediaContent() {
    return this.state.mediaContent;
  }

  public get isLoading() {
    return this.state.isLoading;
  }

  public get isSaving() {
    return this.state.isSaving;
  }

  public get error() {
    return this.state.error;
  }

  public findOne(id: number): MediaContent | null {
    if (!this.state.mediaContent) return null;
    return this.state.mediaContent.find((item: MediaContent) => item.id === id) || null;
  }

  public add(mediaContentItem: MediaContent): void {
    this.state.isSaving = true;
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

  public update(mediaContentItem: MediaContentItem) {
    if (!this.mediaContent.length) {
      this.add(mediaContentItem);
      return;
    }

    this.state.isSaving = true;
    this.state.error = null;

    this.subscribe(
      this.mediaService.updateMediaItem$(mediaContentItem),
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

  public delete(id: number): void {
    if (!this.mediaContent.length) return;

    this.state.isSaving = true;
    this.state.error = null;

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
          this.state.isSaving = false;
        });
      },
    });
  }
}

export default MediaDataStore;
