import React, { useCallback, useState } from 'react';
import { ImagesView } from '../ImagesView/ImagesView';
import { FavoritesView } from '../FavoritesView/FavoritesVIew';
import { useAppSelector } from '../../hooks';
import { getFavoriteImagesCount } from '../../features/favorites/favoritesSlice';

import style from './ViewSwitch.module.css'
import classNames from 'classnames';

enum View {
  Images,
  Favorites
}


export function ViewSwitch() {
  const [view, changeView] = useState(View.Images);
  const totalFavorites = useAppSelector(getFavoriteImagesCount);
  const goToImages = useCallback(() => changeView(View.Images), []);
  const goToFavorites = useCallback(() => changeView(View.Favorites), []);

  let ViewComponent = view === View.Images
    ? <ImagesView/>
    : <FavoritesView/>
  return <div className={style.switchContainer}>
    <button className={classNames(style.switchBtn, { [style.switchBtnActive]: view === View.Images })} onClick={goToImages}>Images</button>
    <button className={classNames(style.switchBtn, { [style.switchBtnActive]: view === View.Favorites })} onClick={goToFavorites}>Favorites
      ({totalFavorites})
    </button>
    <div>
      {ViewComponent}
    </div>
  </div>
}
