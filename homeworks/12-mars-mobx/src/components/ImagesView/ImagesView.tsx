import { RoverList } from '../RoverList/RoverList';
import { CameraList } from '../CameraList/CameraList';
import { Sol } from '../Sol/Sol';
import { ImageList } from '../ImageList/ImageList';
import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import style from './ImagesView.module.css';
import { useStore } from '../../stores/store';
import { ImageViewModel } from '../../stores/ImageViewModel';

export const ImagesView = observer(() => {
  const imagesStore = useStore('Images');
  const filtersStore = useStore('Filters');
  const onToggleFavorite = useCallback((image: ImageViewModel) => image.toggleFavorite(), [])
  return <div>
    <RoverList/>
    <CameraList names={filtersStore.cameras}/>
    <Sol value={filtersStore.sol} onChange={filtersStore.changeSol}/>
    <button className={style.loadBtn} onClick={imagesStore.fetchImages}>Load</button>
    {
      imagesStore.loading
        ? <div>Loading...</div>
        : <ImageList images={imagesStore.images} onChangeFavorite={onToggleFavorite}/>
    }

  </div>
})
