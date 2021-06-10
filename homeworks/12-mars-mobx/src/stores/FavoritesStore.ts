import { RootStore } from './RootStore';
import { action, computed, makeObservable, observable } from 'mobx';
import { ImageViewModel } from './ImageViewModel';

export class FavoritesStore {
  @observable images: ImageViewModel[] = [];

  @computed get total() {
    return this.images.length;
  }

  constructor(private rootStore: RootStore) {
    makeObservable(this);
  }

  @action.bound removeImage(id: number) {
    const index = this.images.findIndex(image => image.id === id);
    if (index !== -1) {
      this.images.splice(index, 1);
    }
  }

  @action addImage(id: number) {
    const imageToAdd = this.rootStore.imagesStore.images.find(image => image.id === id);
    if (!imageToAdd) {
      console.error(`Cannot find image with id ${id}`);
    } else {
      this.images.push(imageToAdd);
    }
  }

  hasImage(id: number): boolean {
    return this.images.some(image => image.id === id);
  }
}
