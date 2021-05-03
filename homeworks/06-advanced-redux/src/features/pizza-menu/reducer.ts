import { Reducer } from 'redux';
import { Pizza } from '../../types';
import { PIZZA_SELECTED, PIZZA_VIEWED, PizzaActions } from './actions';

export type PizzaList = Pizza[];

export const reducer: Reducer<PizzaList, PizzaActions> = (state = [], action) => {
  switch (action.type) {
    case PIZZA_VIEWED: {
      return action.pizza;
    }
    case PIZZA_SELECTED: {
      return state;
    }
    default:
      return state;
  }
}
