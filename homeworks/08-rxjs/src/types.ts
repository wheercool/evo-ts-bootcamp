export type Point2D = [number, number];

export enum SmileType {
  Unhappy,
  Happy,
}

export interface Smile {
  position: Point2D,
  type: SmileType;
  visible: boolean;
}
