import { createContext, useContext } from 'react';
import MediaStore from './media-store';

const store = {
  mediaStore: new MediaStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
