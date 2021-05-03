import { BasketActions, PIZZA_ADDED_INTO_BASKET, PIZZA_REMOVED_FROM_BASKET } from './actions';
import { pizzaEvent, PizzaEvent, State } from '../../types';

export interface PizzaAddedIntoBasketEvent {
  eventName: typeof PIZZA_ADDED_INTO_BASKET;
  pizzaName: string;
  pizzaPrice: number;
}

export interface PizzaRemovedFromBasketEvent {
  eventName: typeof PIZZA_REMOVED_FROM_BASKET;
  pizzaName: string;
  pizzaPrice: number;
}

export const eventsFromActions = (state: State, action: BasketActions): PizzaEvent[] => {
  switch (action.type) {
    case PIZZA_ADDED_INTO_BASKET:
    case PIZZA_REMOVED_FROM_BASKET:
      return [pizzaEvent(state, action.id, action.type)]
    default:
      return [];
  }
}
