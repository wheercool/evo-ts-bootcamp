import { Middleware } from 'redux';
import { eventsFromActions as basketEvents } from '../basket/events';
import { eventsFromActions as menuEvents } from '../pizza-menu/events';


export function middleWareFactory(log: (message: string) => Promise<void>) {
  const middleWare: Middleware = (api) => next => action => {
    next(action);
    [basketEvents, menuEvents]
      .flatMap(events => events(api.getState(), action))
      .forEach(event => log(JSON.stringify(event)))
  }
  return middleWare;
}
