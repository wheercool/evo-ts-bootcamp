import { getPizzaById } from './features/pizza-menu/selectors';

export interface BasketItem {
  _id: string;
  count: number;
}

export type Pizza = {
  name: string;
  price: number;
  _id: string;
}

export type State = {
  menu: Pizza[];
  basket: BasketItem[];
}

export interface PizzaEvent {
 eventName: string;
}

export const pizzaEvent = (state: State, id: string, type: string) => {
  const pizza = getPizzaById(state, id);
  if (!pizza) {
    throw new Error(`Cannot find pizza ${id}`)
  }

  return {
    eventName: type,
    pizzaName: pizza.name,
    pizzaPrice: pizza.price
  }
};
