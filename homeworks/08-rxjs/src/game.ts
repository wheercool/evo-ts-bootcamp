import { Subscription, merge, defer, combineLatest, concat, empty, fromEvent, of } from 'rxjs';
import { delayWhen, concatAll, take, window, throttleTime, share, buffer, delay, filter, map, mapTo, repeat, scan, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { createPoint2D, createSmile, changeSmileVisible, generateSmileType, hideSmile, killedSmile, randomPosition } from './model';
import { Renderer } from './Renderer';
import { Sound } from './Sound';

import { Smile, SmileType } from './types';

const SMILE_RADIUS = 24;
const SMILE_SHOW_TIME = 1000;
const SMILE_HIDDEN_TIME = 2000;
const RECHARGE_TIME = 2000;
const LIVES = 3;

const generateSmile = () => createSmile(randomPosition(), generateSmileType(), false);

export function run() {
  const render = new Renderer(LIVES, RECHARGE_TIME);
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
 
  const click$ = fromEvent(document, 'click')
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
        return changeSmileVisible(smile, visible);
      }, generateSmile()),
      share()
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
    filter(smile => !smile.visible && smile.type === SmileType.Unhappy)
  );

  const missedSadSmile$ = killedSadSmile$.pipe(
    startWith(true),
    buffer(sadSmiles$),
    filter(killes => !killes.some(Boolean)),
	tap(() => sound.scream()),
	tap(() => console.log('missed'))
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

  const game$ = combineLatest(scores$, smile$.pipe(startWith(generateSmile())), smileDead$, lives$)
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
