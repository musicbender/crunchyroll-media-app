import MediaList from './components/media-list/media-list';
import { StoreContext } from './stores';
import MediaStore from './stores/media-store';

function MediaApplication() {
  return (
    <StoreContext.Provider value={{ mediaStore: new MediaStore() }}>
      <div className="App">
        <header className="App-header">
          <h1>Media Content</h1>
        </header>
        <main>
          <MediaList />
        </main>
      </div>
    </StoreContext.Provider>
  );
}

export default MediaApplication;
