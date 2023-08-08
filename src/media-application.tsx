import { ThemeProvider } from 'styled-components';
import MediaList from './components/media-list';
import { StoreContext } from './stores';
import MediaStore from './stores/media-store';
import theme from './styles/theme';
import globalStyles from './styles/global-styles';
import Header from './components/common/header';

const GlobalStyle = globalStyles;

function MediaApplication() {
  return (
    <StoreContext.Provider value={{ mediaStore: new MediaStore() }}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="App">
          <Header />
          <main>
            <MediaList />
          </main>
        </div>
      </ThemeProvider>
    </StoreContext.Provider>
  );
}

export default MediaApplication;
