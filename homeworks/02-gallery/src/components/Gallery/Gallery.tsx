import style from './Gallery.module.css';

import * as React from 'react';
import { Image } from '../../model/Image';

interface IProps {
  images: Image[];
}

export class Gallery extends React.Component<IProps> {
  render() {
    const { images } = this.props;
    return <div className={style.gallery}>
      {
        images.map((image, index) => <div className={style.galleryItem}>
          <img className={style.galleryItem__img} src={image.previewUrl} key={index}/>
          <div className={style.galleryItem__overlay}>
            <header className={style.galleryItem__header}>
              <a href={image.url} className={style.galleryItem__link} target="_blank">{image.title}</a>
            </header>
            <footer className={style.galleryItem__footer}>
              {image.width}x{image.height}
            </footer>
          </div>
        </div>)
      }
    </div>
  }
}
