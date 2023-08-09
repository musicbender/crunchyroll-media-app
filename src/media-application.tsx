import { ThemeProvider } from 'styled-components';
import MediaList from './components/media-list';
import { StoreContext } from './stores';
import MediaDataStore from './stores/media-data-store';
import theme from './styles/theme';
import globalStyles from './styles/global-styles';
import Header from './components/common/header';
import { MainWrapper } from './styles';
import MediaViewStore from './stores/media-view-store';

const GlobalStyle = globalStyles;

function MediaApplication() {
  return (
    <StoreContext.Provider
      value={{
        mediaData: new MediaDataStore(),
        mediaView: new MediaViewStore(),
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="App">
          <Header />
          <MainWrapper>
            <MediaList />
          </MainWrapper>
        </div>
      </ThemeProvider>
    </StoreContext.Provider>
  );
}

export default MediaApplication;
