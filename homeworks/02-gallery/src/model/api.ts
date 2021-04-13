import { Image } from './Image';

interface IResponse {
  total: number;
  totalHits: number;
  hits: ImageHit[];
}

interface ImageHit {
  id: string;
  pageUrl: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: string;
  previewHeight: string;
  webformatURL: string;
  webformatWidth: string;
  webformatHeight: string;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  favorites: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
}

export async function findImages(query: string): Promise<Image[]> {
  const q = encodeURI(query);
  const response = await fetch(`https://pixabay.com/api/?key=21148951-6cdeaf655c45b183929f1d0f4&q=${q}&image_type=photo`);
  const data: IResponse = await response.json();
  return data.hits.map(item => ({
    url: item.largeImageURL,
    previewUrl: item.webformatURL,
    width: item.imageWidth,
    height: item.imageHeight,
    title: item.user,
    views: item.views
  }));
}

