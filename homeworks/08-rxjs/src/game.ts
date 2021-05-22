import { defer, combineLatest, concat, empty, fromEvent, of } from 'rxjs';
import { share, buffer, delay, filter, map, mapTo, repeat, scan, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { createPoint2D, createSmile, changeSmileVisible, generateSmileType, hideSmile, killedSmile, randomPosition } from './model';
import { Renderer } from './Renderer';
import { Smile, SmileType } from './types';

const SMILE_RADIUS = 24;
const SMILE_SHOW_TIME = 1500;
const SMILE_HIDDEN_TIME = 2000;
const LIVES = 10;

const generateSmile = () => createSmile(randomPosition(), generateSmileType(), false);

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
    of(false).pipe(delay(SMILE_HIDDEN_TIME)),
    of(true).pipe(delay(SMILE_SHOW_TIME)),
  ).pipe(
    repeat(Infinity)
  );

  const round$ = smileVisible$.pipe(
    scan((acc, next) => acc + Number(next), 0),
    tap(round => render.updateLives(round))
  );
  
  const smile$ = smileVisible$
    .pipe(
      scan((acc, visible) => {
        const smile = visible ? generateSmile() : acc;
        return changeSmileVisible(smile, visible);
      }, generateSmile()),
      share(),
      tap(smile => render.updateSmile(smile)),
    );

  const shootAt$ = click$.pipe(
    withLatestFrom(mouse$),
    map(([_, xy]) => xy)
  );

  const killedSmile$ = shootAt$.pipe(
    withLatestFrom(smile$),
    map(([shootAt, smile]) => killedSmile(smile, shootAt, SMILE_RADIUS)),
    filter(Boolean),
    tap(() => console.log('killed')),
  );

  const killedHappySmile$ = shootAt$.pipe(
    withLatestFrom(smile$),
    map(([shootAt, smile]) => killedSmile(smile, shootAt, SMILE_RADIUS) && smile.type === SmileType.Happy),
    filter(Boolean),
    tap(() => console.log('killed happy smile'))
  );

  const killedSadSmile$ = shootAt$.pipe(
    withLatestFrom(smile$),
    map(([shootAt, smile]) => killedSmile(smile, shootAt, SMILE_RADIUS) && smile.type === SmileType.Unhappy),
    filter(Boolean),
    tap(() => console.log('killed sad smile'))
  );

  const sadSmiles$ = smile$.pipe(
    filter(smile => !smile.visible && smile.type === SmileType.Unhappy)
  );

  const missedSadSmile$ = killedSadSmile$.pipe(
    buffer(sadSmiles$),
    filter(killes => !killes.some(Boolean)),
    tap(() => console.log('missed smile'))
  );

  const game$ = combineLatest(round$, smile$, killedSmile$, killedHappySmile$, missedSadSmile$)
    .pipe(tap(([round, smile, killedSmile]) => {
      render.updateSmile(smile);
      render.updateText('killed');
      render.updateLives(round);
    }))
    .subscribe();

  render.animate();
}
