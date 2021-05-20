import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { Image, ImageWithFavorite } from '../../types';

export interface FavoritesState {
  images: Image[]
}

const initialState: FavoritesState = {
  images: []
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Image>) {
      state.images.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      const index = state.images.findIndex(favorite => favorite.id === action.payload);
      if (index >= 0) {
        state.images.splice(index, 1);
      }
    }
  }
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

const getFavorites = (state: RootState) => state.favorites;

export const getFavoriteImages = createSelector(getFavorites, (favorites): ImageWithFavorite[] => {
  return favorites.images.map(image => ({
    ...image,
    favorite: true
  }));
});
export const getFavoriteImagesCount = createSelector(getFavorites, (favorites) => {
  return favorites.images.length;
})
