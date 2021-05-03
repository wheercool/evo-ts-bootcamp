import { Middleware } from 'redux';
import { PIZZA_SELECTED } from '../pizza-menu/actions';
import { addPizzaIntoBasket } from './actions';

export const middleWare: Middleware = ({ dispatch, getState }) => next => action => {
  next(action);
  if (action.type === PIZZA_SELECTED) {
    next(addPizzaIntoBasket(action.id));
  }
}

