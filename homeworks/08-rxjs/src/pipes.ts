import { animationFrameScheduler, fromEvent, interval } from 'rxjs';
import { map, mapTo, startWith, withLatestFrom } from 'rxjs/operators';

export const mouse$ = fromEvent(document, 'mousemove').pipe(map(event => {
  const mouseEvent = event as MouseEvent;
  return [mouseEvent.x, mouseEvent.y];
}), startWith([0, 0]));

export const click$ = fromEvent(document, 'click').pipe(mapTo(true), startWith(false));

export const shootAt$ = click$.pipe(
  withLatestFrom(mouse$),
  map(([_, xy]) => xy)
)
const WIDTH = 1000;
const HEIGHT = 1000;

export const targetPosition$ = interval(2000).pipe(map(() => randomPosition(WIDTH, HEIGHT)))

export const loop$ = interval(0, animationFrameScheduler);
export const game$ = targetPosition$;

function randomPosition(width: number, height: number): [number, number] {
  return [Math.floor(Math.random() * width), Math.floor(Math.random() * height)];
}
