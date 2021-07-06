import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CameraName, Image, ImageWithFavorite, MarsPhoto, MarsPhotos, RoverName } from '../../types';
import { GetPhotosQuery, marsPhotoService } from '../../services/MarsPhotosService';
import { AppDispatch, RootState } from '../../store';
import { getFavoriteImages } from '../favorites/favoritesSlice';

export interface ImagesState {
  filters: {
    sol: number;
    roverName: RoverName;
    cameraName: CameraName | 'All';
  },
  photos: MarsPhoto[];
}

let initialState: ImagesState = {
  photos: [],
  filters: {
    sol: 1,
    roverName: 'Perseverance',
    cameraName: 'All'
  }
};

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    loadImages(state, action: PayloadAction<MarsPhotos>) {
      state.photos = action.payload.photos;
    },
    changeRover(state, action: PayloadAction<RoverName>) {
      const roverName = action.payload;
      state.filters.roverName = roverName;
    },
    changeCamera(state, action: PayloadAction<CameraName | 'All'>) {
      const cameraName = action.payload;
      state.filters.cameraName = cameraName;

    },
    changeSol(state, action: PayloadAction<number>) {
      const sol = action.payload;
      state.filters.sol = sol;
    }
  }
})

export const { changeCamera, changeRover, changeSol, loadImages } = imagesSlice.actions;

export function getRoverCameras(roverName: RoverName): CameraName[] {
  return [];
}

export const fetchImages = createAsyncThunk<void, never, {
  dispatch: AppDispatch,
  state: RootState
}>('images/fetch', async (_, thunkApi) => {
  const state = thunkApi.getState();
  const filters = state.images.filters;
  let query: GetPhotosQuery = {};
  if (filters.cameraName !== 'All') {
    query.camera = filters.cameraName;
  }

  if (filters.sol > 0) {
    query.sol = filters.sol;
  }

  const images = await marsPhotoService.getPhotos(filters.roverName, query);
  thunkApi.dispatch(loadImages(images));
})

const getAllImages = (state: RootState): Image[] => {
  return state.images.photos.map(photo => ({
    id: photo.id,
    src: photo.img_src,
  }));
}

export const getImages = createSelector(getAllImages, getFavoriteImages, (images, favoriteImages): ImageWithFavorite[] => {
  return images.map(img => {
    return { ...img, favorite: favoriteImages.some(favoriteImage => favoriteImage.id === img.id) }
  })
})
export const getActiveCamera = (state: RootState) => state.images.filters.cameraName;
export const getActiveRover = (state: RootState) => state.images.filters.roverName;
export const getActiveSol = (state: RootState) => state.images.filters.sol;
export const getCameras = createSelector(getActiveRover, (roverName): (CameraName | 'All')[] => {
  switch (roverName) {
    case 'Curiosity':
      return ['All', CameraName.MAST, CameraName.MAHLI, CameraName.NAVCAM];
    case 'Perseverance':
      return ['All', CameraName.EDL_RUCAM, CameraName.EDL_PUCAM2, CameraName.MCZ_RIGHT, CameraName.MCZ_LEFT];
    case 'Opportunity':
      return ['All', CameraName.FHAZ, CameraName.NAVCAM, CameraName.PANCAM, CameraName.ENTRY];
  }
})
