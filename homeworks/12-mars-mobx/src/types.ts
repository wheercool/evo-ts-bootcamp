export enum RoverName {
  Curiosity    = 'Curiosity',
  Perseverance = 'Perseverance',
  Opportunity  = 'Opportunity'
}

export enum CameraName {
  FHAZ       = 'FHAZ',
  RHAZ       = 'RHAZ',
  MAST       = 'MAST',
  CHEMCAM    = 'CHEMCAM',
  MAHLI      = 'MAHLI',
  MARDI      = 'MARDI',
  NAVCAM     = 'NAVCAM',
  PANCAM     = 'PANCAM',
  MINITES    = 'MINITES',
  EDL_RUCAM  = 'EDL_RUCAM',
  EDL_PUCAM2 = 'EDL_PUCAM2',
  MCZ_RIGHT  = 'MCZ_RIGHT',
  MCZ_LEFT   = 'MCZ_LEFT',
  ENTRY      = 'ENTRY',
}

export interface MarsPhotos {
  photos: MarsPhoto[];
}

export interface Camera {
  id: number;
  name: CameraName;
  rover_id: number;
  full_name: string;
}

export interface Rover {
  id: number;
  name: RoverName;
  landing_date: string;
  launch_date: string;
  status: string;
}

export interface MarsPhoto {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

export interface Image {
  id: number;
  src: string;
}

export type CameraFilterValue = CameraName | 'All';
