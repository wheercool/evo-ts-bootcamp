import { ThunkAction } from 'redux-thunk';
import { getPizza } from '../../services/api';
import { Pizza, State } from '../../types';

export const PIZZA_VIEWED = 'PIZZA_VIEWED' as const;
export const PIZZA_SELECTED = 'PIZZA_SELECTED';

export interface ViewPizza {
  type: typeof PIZZA_VIEWED;
  pizza: Pizza[];
}

export interface SelectPizza {
  type: typeof PIZZA_SELECTED;
  id: string;
}

export type PizzaActions = ViewPizza | SelectPizza;

export function loadMenu(): ThunkAction<Promise<void>, State, {}, ViewPizza> {
  return (dispatch, getState) =>
    getPizza()
      .then(pizza => {
        dispatch(viewPizza(pizza.items));
      })
      .catch(e => console.error(e))
}

export const viewPizza = (pizza: Pizza[]) => ({ type: PIZZA_VIEWED, pizza });
export const selectPizza = (id: string) => ({ type: PIZZA_SELECTED, id });
