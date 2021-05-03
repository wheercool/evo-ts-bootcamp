import { PIZZA_SELECTED, PIZZA_VIEWED, PizzaActions } from './actions';
import { pizzaEvent, PizzaEvent, State } from '../../types';

export interface PizzaSelectedEvent extends PizzaEvent {
  eventName: typeof PIZZA_SELECTED;
  pizzaName: string;
  pizzaPrice: number;
}

export interface PizzaViewedEvent {
  eventName: typeof PIZZA_VIEWED;
}

export const eventsFromActions = (state: State, action: PizzaActions): PizzaEvent[] => {
  switch (action.type) {
    case PIZZA_VIEWED:
      return [{
        eventName: action.type,
      }]
    case PIZZA_SELECTED:
      return [pizzaEvent(state, action.id, action.type)];
    default:
      return [];
  }
}
