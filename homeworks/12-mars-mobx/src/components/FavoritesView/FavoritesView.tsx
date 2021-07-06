import { ImageList } from '../ImageList/ImageList';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { ImageViewModel } from '../../stores/ImageViewModel';


export const FavoritesView = observer(() => {
  const favorites = useStore('Favorites');
  const toggleFavorite = useCallback((image: ImageViewModel) => image.toggleFavorite(), []);
  return <div>
    <ImageList images={favorites.images} onChangeFavorite={toggleFavorite}/>
  </div>
})
