import { MarsPhotosService } from '../services/MarsPhotosService';
import { ImagesStore } from './ImagesStore';
import { FavoritesStore } from './FavoritesStore';

export class RootStore {
  readonly marsPhotosService: MarsPhotosService;
  readonly imagesStore: ImagesStore;
  readonly favoritesStore: FavoritesStore;

  constructor() {
    this.marsPhotosService = new MarsPhotosService();
    this.imagesStore = new ImagesStore(this);
    this.favoritesStore = new FavoritesStore(this);
  }
}

