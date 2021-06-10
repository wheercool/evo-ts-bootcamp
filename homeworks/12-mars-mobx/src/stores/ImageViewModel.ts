import { FavoritesStore } from './FavoritesStore';
import { MarsPhoto } from '../types';
import { action, computed, observable } from 'mobx';

export class ImageViewModel {
  @observable id = -1;
  @observable src = '';

  @computed get favorite(): boolean {
    return this.favoritesStore.hasImage(this.id);
  }

  constructor(private readonly favoritesStore: FavoritesStore) {
  }

  init(image: MarsPhoto) {
    this.id = image.id;
    this.src = image.img_src;
    return this;
  }

  @action.bound toggleFavorite() {
    if (this.favorite) {
      this.favoritesStore.removeImage(this.id);
    } else {
      this.favoritesStore.addImage(this.id);
    }
  }
}
