import { makeAutoObservable } from 'mobx';

interface MediaViewStoreState {
  isEditing: boolean;
  editId: number | null;
}

// this store handles view-specific state
class MediaViewStore {
  private state: MediaViewStoreState = {
    isEditing: false,
    editId: null,
  };

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  public get isEditing() {
    return this.state.isEditing;
  }

  public set isEditing(editing: boolean) {
    this.state.isEditing = editing;
  }

  public get editId() {
    return this.state.editId;
  }

  public set editId(id: number | null) {
    this.state.editId = id;
  }
}

export default MediaViewStore;
