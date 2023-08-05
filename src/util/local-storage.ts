const testLocalStorage = '__storage_test__';
let fallbackStorage: Map<string, any>;

export default class LocalStorageUtil {
  storage: null | any = null;
  hasLocalStorage = false;

  constructor() {
    try {
      const storage = window.localStorage;
      storage.setItem(testLocalStorage, testLocalStorage);
      storage.removeItem(testLocalStorage);
      this.storage = storage;
      this.hasLocalStorage = true;
    } catch (e) {
      this.hasLocalStorage = false;
      if (!fallbackStorage) fallbackStorage = new Map();
    }
  }

  getInLocal(key: string) {
    if (this.storage && this.hasLocalStorage) {
      return this.storage.getItem(key);
    }
    return fallbackStorage.get(key);
  }

  setInLocal(key: string, value: string | boolean) {
    if (this.storage && this.hasLocalStorage) {
      this.storage.setItem(key, value);
    } else {
      fallbackStorage.set(key, value);
    }
  }
}

export const LocalStorage = new LocalStorageUtil();
