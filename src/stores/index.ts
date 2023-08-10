import { createContext, useContext } from 'react';
import MediaDataStore from './media-data-store';
import MediaViewStore from './media-view-store';

const store = {
  mediaData: new MediaDataStore(),
  mediaView: new MediaViewStore(),
};

/** Add store to global context and create a hook for easy implimentation */
export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
