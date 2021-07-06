import { Point2D, Smile, SmileType } from './types';

export function createPoint2D(x: number, y: number): Point2D {
  return [x, y];
}

export function minus(a: Point2D, b: Point2D): Point2D {
  return [a[0] - b[0], a[1] - b[1]];
}

export function mul(a: Point2D, b: Point2D): Point2D {
  return [a[0] * b[0], a[1] * b[1]];
}

export function length(a: Point2D): number {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

export function killedSmile(smile: Smile, hitAt: Point2D, radius: number) {
  return smile.visible && length(minus(hitAt, smile.position)) <= radius;
}

export function randomPosition(positions: Point2D[]): Point2D {
  const rnd = Math.floor(Math.random() * positions.length);
  return mul(positions[rnd], createPoint2D(window.innerWidth, window.innerHeight));
}

export function createSmile(position: Point2D, type: SmileType, visible: boolean): Smile {
  return {
    position,
    type,
    visible
  }
}

export function hideSmile(smile: Smile): Smile {
  return {
    ...smile,
    visible: false
  }
}

export function changeSmileVisibility(smile: Smile, visible: boolean): Smile {
  return {
    ...smile,
    visible
  }
}

export function generateSmileType(): SmileType {
  const value = Math.random();
  return (value > 0.5)
    ? SmileType.Happy
    : SmileType.Unhappy;
}
