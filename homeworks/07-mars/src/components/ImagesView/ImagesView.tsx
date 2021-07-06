import { RoverList } from '../RoverList/RoverList';
import { CameraList } from '../CameraList/CameraList';
import { ImageWithFavorite } from '../../types';
import { Sol } from '../Sol/Sol';
import { changeSol, fetchImages, getActiveSol, getCameras, getImages } from '../../features/images/imagesSlice';
import { ImageList } from '../ImageList/ImageList';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFavorite, removeFavorite } from '../../features/favorites/favoritesSlice';

import style from './ImagesView.module.css';

export function ImagesView() {
  const sol = useAppSelector(getActiveSol);
  const dispatch = useAppDispatch();
  const images = useAppSelector(getImages);
  const cameras = useAppSelector(getCameras);
  const onChangeFavorite = useCallback((image: ImageWithFavorite) => {
    if (image.favorite) {
      dispatch(removeFavorite(image.id));
    } else {
      dispatch(addFavorite(image));
    }
  }, [])

  return <div>
    <RoverList/>
    <CameraList names={cameras}/>
    <Sol value={sol} onChange={(value) => dispatch(changeSol(value))}/>
    <button className={style.loadBtn} onClick={() => dispatch(fetchImages())}>Load</button>
    <ImageList images={images} onChangeFavorite={onChangeFavorite}/>
  </div>
}
