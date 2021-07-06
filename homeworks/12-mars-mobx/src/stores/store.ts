import { createContext } from './storeUtils';
import { RootStore } from './RootStore';

const rootStore = new RootStore();

export const { StoreProvider, useStore } = createContext({
  RootStore: rootStore,
  Favorites: rootStore.favoritesStore,
  Images: rootStore.imagesStore,
  Filters: rootStore.imagesStore.filtersStore
});
