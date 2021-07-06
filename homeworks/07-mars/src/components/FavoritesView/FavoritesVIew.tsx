import { ImageList } from '../ImageList/ImageList';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteImages, removeFavorite } from '../../features/favorites/favoritesSlice';
import { useCallback } from 'react';
import { ImageWithFavorite } from '../../types';

export function FavoritesView() {
  const images = useAppSelector(getFavoriteImages);
  const dispatch = useAppDispatch();
  const removeImage = useCallback((image: ImageWithFavorite) => dispatch(removeFavorite(image.id)), []);
  return <div>
    <ImageList images={images} onChangeFavorite={removeImage}/>
  </div>
}
