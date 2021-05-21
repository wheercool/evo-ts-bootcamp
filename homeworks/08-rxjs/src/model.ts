import { Point2D } from './types';

const boundingR = 20;

export function minus(a: Point2D, b: Point2D): Point2D {
  return [a[0] - b[0], a[1] - b[1]];
}
export function length(a: Point2D): number {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

export function isTargetHit(targetPosition: Point2D, hitAt: Point2D) {
  return length(minus(hitAt, targetPosition)) <= boundingR;
}
