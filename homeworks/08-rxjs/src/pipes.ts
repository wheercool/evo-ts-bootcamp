import { fromEvent, interval } from 'rxjs';
import { map, mapTo, startWith, withLatestFrom } from 'rxjs/operators';
import { Point2D } from './types';

export const mouse$ = fromEvent(document, 'mousemove').pipe(map(event => {
  const mouseEvent = event as MouseEvent;
  return [mouseEvent.pageX, mouseEvent.pageY] as Point2D;
}), startWith([0, 0] as Point2D));

export const click$ = fromEvent(document, 'click').pipe(mapTo(true), startWith(false));

export const shootAt$ = click$.pipe(
  withLatestFrom(mouse$),
  map(([_, xy]) => xy)
);

const positions: Point2D[] = [[0.25, 0.33], [0.25, 0.66], [0.5, 0.33], [0.5, 0.66], [0.75, 0.33], [0.75, 0.66]];
export const targetPosition$ = interval(1000).pipe(map(() => randomPosition()))

export const game$ = targetPosition$;

function randomPosition(): Point2D {
  const rnd = Math.floor(Math.random() * positions.length);
  return positions[rnd];
}
