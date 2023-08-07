import { StoreContext } from './stores';
import MediaStore from './stores/media-store';

function App() {
  return (
    <StoreContext.Provider value={{ mediaStore: new MediaStore() }}>
      <div className="App">
        <header className="App-header">
          <h1>Media Content</h1>
        </header>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
