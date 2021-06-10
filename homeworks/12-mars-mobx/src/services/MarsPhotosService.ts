import { CameraName, MarsPhotos } from '../types';

export type GetPhotosQuery = Partial<{
  sol: number;
  camera: CameraName;
  page: number;
}>
export class MarsPhotosService {
  async getPhotos(rover: string = 'curiosity', query: GetPhotosQuery = {}): Promise<MarsPhotos> {
    const urlString = process.env.REACT_APP_MARS_PHOTOS_URL;
    if (!urlString) {
      throw new Error('Set REACT_APP_MARS_PHOTOS_URL env variable');
    }
    const apiKey = process.env.REACT_APP_API_KEY;
    if (!apiKey) {
      throw new Error('Set REACT_APP_API_KEY env variable')
    }
    const url = new URL(`${urlString}/${rover}/photos`);
    url.searchParams.append('api_key', apiKey);

    Object.entries(Object.assign({ sol: 1 }, query)).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value!.toString())
      }
    });
    const response = await fetch(url.toString())
    return await response.json();
  }
}
export const marsPhotoService = new MarsPhotosService();
