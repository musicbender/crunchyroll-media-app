import { createContext, useContext } from 'react';
import MediaDataStore from './media-data-store';
import MediaViewStore from './media-view-store';

const store = {
  mediaData: new MediaDataStore(),
  mediaView: new MediaViewStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
