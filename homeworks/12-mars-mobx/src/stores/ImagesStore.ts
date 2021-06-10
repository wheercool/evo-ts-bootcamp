import { RootStore } from './RootStore';
import { action, makeObservable, observable } from 'mobx';
import { FiltersStore } from './FiltersStore';
import { ImageViewModel } from './ImageViewModel';

export class ImagesStore {
  readonly filtersStore = new FiltersStore();
  @observable images: ImageViewModel[] = [];
  @observable loading = false;

  constructor(private rootStore: RootStore) {
    makeObservable(this);
  }

  @action.bound
  async fetchImages() {
    this.loading = true;
    try {
      const data = await this.rootStore.marsPhotosService.getPhotos(this.filtersStore.roverName, this.filtersStore.query);
      const images = data.photos.map(photo => new ImageViewModel(this.rootStore.favoritesStore).init(photo));
      this.updateImages(images);
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  }

  @action
  private updateImages(images: ImageViewModel[]) {
    this.loading = false;
    this.images = images;
  }
}
