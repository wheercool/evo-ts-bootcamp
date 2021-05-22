import { concat, empty, fromEvent, of } from 'rxjs';
import { delay, filter, map, mapTo, repeat, scan, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { createPoint2D, createSmile, generateSmileType, hideSmile, killedSmile, randomPosition } from './model';
import { Renderer } from './Renderer';
import { Smile, SmileType } from './types';

const SMILE_RADIUS = 24;
const SMILE_SHOW_TIME = 1500;
const SMILE_HIDDEN_TIME = 2000;
const LIVES = 10;

export function run() {
  const render = new Renderer();

  const mouse$ = fromEvent(document, 'mousemove')
    .pipe(
      map(event => {
        const mouseEvent = event as MouseEvent;
        return createPoint2D(mouseEvent.pageX, mouseEvent.pageY);
      }),
      startWith(createPoint2D(0, 0)),
      tap(position => render.updateTarget(position))
    );

  const click$ = fromEvent(document, 'click')
    .pipe(
      mapTo(true)
    );

  const smileVisible$ = concat(
    of(true).pipe(delay(SMILE_HIDDEN_TIME)),
    of(false).pipe(delay(SMILE_SHOW_TIME))
  ).pipe(
    repeat(Infinity)
  );

  const smile$ = smileVisible$
    .pipe(
      map((visible) => createSmile(randomPosition(), generateSmileType(), visible)),
      tap(smile => render.updateSmile(smile)),
    );

  const shootAt$ = click$.pipe(
    withLatestFrom(mouse$),
    map(([_, xy]) => xy)
  );

  const hitSmile$ = shootAt$
    .pipe(
      withLatestFrom(smile$),
      map(([shootAt, smile]) => {
        const killed = killedSmile(smile, shootAt, SMILE_RADIUS);
        return [killed, killed ? hideSmile(smile) : smile] as [boolean, Smile]
      }),
      tap(([killed, smile]) => {
        render.hitSmile(killed);
        render.updateSmile(smile);
      })
    );

  const lives$ = hitSmile$
    .pipe(
      scan((acc, [hit, smile]) => acc + ((hit && smile.type === SmileType.Unhappy) ? 0 : -1), LIVES),
      tap(lives => render.updateLives(lives))
    );

  const gameOver$ = lives$
    .pipe(
      filter(value => value <= 0),
      tap(() => {
        render.gameOver()
      }),
      mapTo(empty)
    );

  gameOver$.subscribe();
  render.animate();
}
