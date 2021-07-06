import { combineLatest, concat, fromEvent, merge, of, Subscription } from 'rxjs';
import { buffer, delay, filter, map, mapTo, repeat, scan, share, startWith, take, tap, throttleTime, withLatestFrom } from 'rxjs/operators';
import { changeSmileVisibility, createPoint2D, createSmile, generateSmileType, killedSmile, randomPosition } from './model';
import { Renderer } from './Renderer';
import { Sound } from './Sound';

import { Point2D, SmileType } from './types';

const SMILE_RADIUS = 24;
const SMILE_SHOW_TIME = 1000;
const SMILE_HIDDEN_TIME = 2000;
const RECHARGE_TIME = 2000;
const LIVES = 3;
const POSITIONS: Point2D[] = [[0.25, 0.33], [0.25, 0.66], [0.5, 0.33], [0.5, 0.66], [0.75, 0.33], [0.75, 0.66]];
const generateSmile = () => createSmile(randomPosition(POSITIONS), generateSmileType(), false);
const startSmile = () => createSmile([0, 0], SmileType.Unhappy, false);

export function run() {
  const render = new Renderer(LIVES, RECHARGE_TIME, POSITIONS, SMILE_RADIUS);
  render.homeScreen();

  const sound = new Sound();
  const mouse$ = fromEvent(document, 'mousemove')
    .pipe(
      map(event => {
        const mouseEvent = event as MouseEvent;
        return createPoint2D(mouseEvent.pageX, mouseEvent.pageY);
      }),
      tap(position => render.updateTarget(position))
    );

  mouse$.subscribe();

  const click$ = fromEvent(document, 'mousedown')
    .pipe(
      mapTo(true),
    );

  const smileVisible$ = concat(
    of(false).pipe(delay(SMILE_SHOW_TIME)),
    of(true).pipe(delay(SMILE_HIDDEN_TIME)),
  ).pipe(
    repeat(Infinity)
  );

  const smile$ = smileVisible$
    .pipe(
      scan((prevSmile, visible) => {
        const smile = visible ? generateSmile() : prevSmile;
        return changeSmileVisibility(smile, visible);
      }, generateSmile()),
      startWith(startSmile()),
      share(),
    );

  const shootAt$ = click$.pipe(
    throttleTime(RECHARGE_TIME),
    withLatestFrom(mouse$),
    map(([_, xy]) => xy),
    tap(() => sound.shoot()),
    tap(() => render.updateShoot())
  );


  const recharge$ = click$.pipe(
    map(() => Date.now()),
    withLatestFrom(shootAt$.pipe(map(() => Date.now()))),
    map(([click, shoot]) => shoot - click),
    filter(v => v < 0),
    tap(() => sound.recharge())
  );


  const killedSmile$ = shootAt$.pipe(
    withLatestFrom(smile$),
    map(([shootAt, smile]) => killedSmile(smile, shootAt, SMILE_RADIUS)),
    filter(Boolean),
    startWith(false),
  );

  const killedHappySmile$ = shootAt$.pipe(
    withLatestFrom(smile$),
    map(([shootAt, smile]) => killedSmile(smile, shootAt, SMILE_RADIUS) && smile.type === SmileType.Happy),
    filter(Boolean),
    tap(() => sound.scream())
  );


  const killedSadSmile$ = shootAt$.pipe(
    withLatestFrom(smile$),
    map(([shootAt, smile]) => killedSmile(smile, shootAt, SMILE_RADIUS) && smile.type === SmileType.Unhappy),
    filter(Boolean),
    tap(() => sound.point())
  );

  const scores$ = killedSadSmile$.pipe(
    scan((score) => score + 1, 0),
    startWith(0)
  );

  const sadSmiles$ = smile$.pipe(
    filter(smile => !smile.visible && smile.type === SmileType.Unhappy),
  );

  const missedSadSmile$ = killedSadSmile$.pipe(
    buffer(sadSmiles$),
    map((v, i) => [v, i] as [boolean[], number]),
    filter(([killes, index]) => index > 0 && !killes.some(Boolean)),
    tap(() => sound.scream()),
  );

  const lives$ = merge(missedSadSmile$, killedHappySmile$).pipe(
    scan(lives => lives - 1, LIVES),
    startWith(LIVES),
  );

  const smileDead$ = merge(
    smile$.pipe(mapTo(false)),
    killedSmile$
  );

  let gameSubscription: Subscription;

  const game$ = combineLatest(scores$, smile$, smileDead$, lives$)
    .pipe(
      tap(([scores, smile, smileDead, lives]) => {
        render.updateSmileDead(smileDead);
        render.updateScores(scores);
        render.updateSmile(smile);
        render.updateLives(lives);
        if (lives <= 0) {
          sound.stopBackground();
          sound.gameOver();
          render.gameOver();
          gameSubscription.unsubscribe();
        }
      }));


  // Start game when user mouse click
  click$.pipe(
    take(1),
    tap(() => {
      gameSubscription = game$.subscribe();
      recharge$.subscribe();
      render.startGame();
      sound.startBackground();

    })
  ).subscribe();

  render.animate();
}
