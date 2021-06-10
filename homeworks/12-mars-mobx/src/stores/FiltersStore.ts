import { CameraFilterValue, CameraName, RoverName } from '../types';
import { action, computed, makeObservable, observable } from 'mobx';
import { GetPhotosQuery } from '../services/MarsPhotosService';

export class FiltersStore {
  readonly rovers: RoverName[] = [RoverName.Curiosity, RoverName.Perseverance, RoverName.Opportunity];

  @observable roverName: RoverName = RoverName.Perseverance;
  @observable activeCamera: CameraFilterValue = 'All';
  @observable sol = 1;

  @computed get cameras(): CameraFilterValue[] {
    switch (this.roverName) {
      case RoverName.Curiosity:
        return ['All', CameraName.MAST, CameraName.MAHLI, CameraName.NAVCAM];
      case RoverName.Perseverance:
        return ['All', CameraName.EDL_RUCAM, CameraName.EDL_PUCAM2, CameraName.MCZ_RIGHT, CameraName.MCZ_LEFT];
      case RoverName.Opportunity:
        return ['All', CameraName.FHAZ, CameraName.NAVCAM, CameraName.PANCAM, CameraName.ENTRY];
    }
  }

  @computed get query(): GetPhotosQuery {
    let query: GetPhotosQuery = {};
    if (this.activeCamera !== 'All') {
      query.camera = this.activeCamera;
    }

    if (this.sol > 0) {
      query.sol = this.sol;
    }
    return query
  }

  constructor() {
    makeObservable(this);
  }

  @action.bound changeRover(roverName: RoverName) {
    this.roverName = roverName;
    this.activeCamera = 'All';
  }

  @action.bound changeCamera(camera: CameraFilterValue) {
    this.activeCamera = camera;
  }

  @action.bound changeSol(sol: number) {
    this.sol = sol;
  }
}
