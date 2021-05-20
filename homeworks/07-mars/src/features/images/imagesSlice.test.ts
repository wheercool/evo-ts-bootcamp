import { fetchImages, imagesSlice, ImagesState } from './imagesSlice';
import { CameraName, MarsPhotos } from '../../types';
import { marsPhotoService } from '../../services/MarsPhotosService';
import { configureStore } from '@reduxjs/toolkit';

describe('imagesSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })
  describe('#loadImages', () => {
    it('should load images', () => {
      const initialState: ImagesState = {
        filters: {
          cameraName: 'All',
          roverName: 'Curiosity',
          sol: 1,
        },
        photos: []
      }
      const photosToLoad: MarsPhotos = {
        photos: [
          {
            id: 1,
            camera: {
              id: 1,
              name: CameraName.MAST,
              full_name: 'MAST',
              rover_id: 1
            },
            earth_date: 'Thu May 20 2021',
            img_src: 'some_image',
            rover: {
              id: 1,
              launch_date: 'Thu May 22 2021',
              landing_date: 'Thu May 20 2021',
              name: 'Curiosity',
              status: 'OK'
            },
            sol: 1
          }
        ]
      }
      const action = imagesSlice.actions.loadImages(photosToLoad);
      const newState = imagesSlice.reducer(initialState, action);
      expect(newState.filters).toEqual(initialState.filters);
      expect(newState.photos).toEqual(photosToLoad.photos);
    })
  })
  describe('#changeRover', () => {
    it('should change rove filter', () => {
      const initialState: ImagesState = {
        filters: {
          cameraName: 'All',
          roverName: 'Curiosity',
          sol: 1,
        },
        photos: []
      }
      const action = imagesSlice.actions.changeRover('Opportunity');
      const newState = imagesSlice.reducer(initialState, action);
      const { roverName: _, ...initialRestFilters } = initialState.filters;
      const { roverName, ...restFilters } = newState.filters;
      expect(initialRestFilters).toEqual(restFilters);
      expect(roverName).toEqual('Opportunity');
    })
  })
  describe('#changeCamera', () => {
    it('should change camera filter', () => {
      const initialState: ImagesState = {
        filters: {
          cameraName: 'All',
          roverName: 'Curiosity',
          sol: 1,
        },
        photos: []
      }
      const action = imagesSlice.actions.changeCamera(CameraName.MAST);
      const newState = imagesSlice.reducer(initialState, action);
      const { cameraName: _, ...initialRestFilters } = initialState.filters;
      const { cameraName, ...restFilters } = newState.filters;
      expect(initialRestFilters).toEqual(restFilters);
      expect(cameraName).toEqual(CameraName.MAST);
    })
  })
  describe('#changeSol', () => {
    it('should change sol filter', () => {
      const initialState: ImagesState = {
        filters: {
          cameraName: 'All',
          roverName: 'Curiosity',
          sol: 1,
        },
        photos: []
      }
      const action = imagesSlice.actions.changeSol(22);
      const newState = imagesSlice.reducer(initialState, action);
      const { sol: _, ...initialRestFilters } = initialState.filters;
      const { sol, ...restFilters } = newState.filters;
      expect(initialRestFilters).toEqual(restFilters);
      expect(sol).toEqual(22);
    })
  })
  describe('Async actions', () => {
    describe('#fetchImages', () => {
      it('should fetch images', async () => {
        const store = configureStore({
          reducer: {
            images: imagesSlice.reducer
          }
        })
        const photos: MarsPhotos = {
          photos: []
        };
        jest.spyOn(marsPhotoService, 'getPhotos')
          .mockReturnValue(Promise.resolve(photos));

        const action = fetchImages();
        await store.dispatch(action)
        expect(marsPhotoService.getPhotos).toHaveBeenCalled()
      });
    });
  });
})


