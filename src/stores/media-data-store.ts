import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved, runInAction } from 'mobx';
import { MediaContentItem, MediaContentType } from '../types';
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
  filters: MediaContentType[];
  searchQuery: string | null;
  isLoading: boolean;
  isSaving: boolean;
  deletingId: number | null;
  error: string | null;
  trigger: boolean;
}

class MediaDataStore {
  private readonly mediaService = new MediaService();

  private state: MediaDataStoreState = {
    mediaContent: [],
    filters: [],
    searchQuery: null,
    isLoading: false,
    isSaving: false,
    deletingId: null,
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
    let output = this.state.mediaContent;

    if (this.state.filters.length) {
      output = output.filter((item: MediaContent) => this.state.filters.includes(item.type));
    }

    if (this.state.searchQuery) {
      output = output.filter((item: MediaContent) =>
        item.title.startsWith(this.state.searchQuery || ''),
      );
    }

    return output;
  }

  public get filters() {
    return this.state.filters;
  }

  public set filters(value: MediaContentType[]) {
    this.state.filters = value;
  }

  public get searchQuery() {
    return this.state.searchQuery;
  }

  public set searchQuery(value: string | null) {
    this.state.searchQuery = value;
  }

  public get isLoading() {
    return this.state.isLoading;
  }

  public get isSaving() {
    return this.state.isSaving;
  }

  public get isDeleting() {
    return !!this.state.deletingId;
  }

  public get deletingId() {
    return this.state.deletingId;
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

    this.state.deletingId = id;
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

  // for reseting mock data to initial state
  public reset() {
    this.mediaService.resetMock();
    this.state.trigger = !this.state.trigger;
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
        // log error for observability
        console.error(err);

        runInAction(() => {
          this.state.error = err.message;
        });
      },
      complete: () => {
        runInAction(() => {
          this.state.isSaving = false;
          this.state.deletingId = null;
        });
      },
    });
  }
}

export default MediaDataStore;
