import { configureStore } from '@reduxjs/toolkit'
import { imagesSlice } from './features/images/imagesSlice'
import { favoritesSlice } from './features/favorites/favoritesSlice';

const store = configureStore({
  reducer: {
    images: imagesSlice.reducer,
    favorites: favoritesSlice.reducer
  }
})

export default store;
export type RootState = ReturnType<typeof store['getState']>;
export type AppDispatch = typeof store.dispatch;

