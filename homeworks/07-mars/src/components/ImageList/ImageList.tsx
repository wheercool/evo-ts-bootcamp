import style from './ImageList.module.css';
import { ImageWithFavorite } from '../../types';

interface ImageList {
  images: ImageWithFavorite[]

  onChangeFavorite(image: ImageWithFavorite): void;
}

export function ImageList(props: ImageList) {
  const { images, onChangeFavorite } = props;
  if (images.length === 0) {
    return <h3 className={style.center}>No Data</h3>;
  }
  return <div className={style.imageList}>
    {
      images.map(image => (
        <div className={style.imageWrapper} key={image.id}>
          <img loading={'lazy'} src={image.src} alt={image.id.toString()}/>
          <button className={style.favoriteBtn} onClick={() => onChangeFavorite(image)}>{
            image.favorite ? '-' : '+'
          }</button>
        </div>))
    })
  </div>;
}
