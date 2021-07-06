import React, { useCallback, useState } from 'react';
import { ImagesView } from '../ImagesView/ImagesView';
import { FavoritesView } from '../FavoritesView/FavoritesView';

import style from './ViewSwitch.module.css'
import classNames from 'classnames';
import { useStore } from '../../stores/store';

import { observer } from 'mobx-react';

enum View {
  Images,
  Favorites
}


export const ViewSwitch = observer(() => {
  const favoritesStore = useStore('Favorites');
  const [view, changeView] = useState(View.Images);
  const goToImages = useCallback(() => changeView(View.Images), []);
  const goToFavorites = useCallback(() => changeView(View.Favorites), []);

  let ViewComponent = view === View.Images
    ? <ImagesView/>
    : <FavoritesView/>
  return <div className={style.switchContainer}>
    <button className={classNames(style.switchBtn, { [style.switchBtnActive]: view === View.Images })}
            onClick={goToImages}>Images
    </button>
    <button className={classNames(style.switchBtn, { [style.switchBtnActive]: view === View.Favorites })}
            onClick={goToFavorites}>Favorites ({favoritesStore.total})
    </button>
    <div>
      {ViewComponent}
    </div>
  </div>
})
