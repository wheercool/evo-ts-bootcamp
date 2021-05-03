export const PIZZA_ADDED_INTO_BASKET = 'PIZZA_ADDED_INTO_BASKET';
export const PIZZA_REMOVED_FROM_BASKET = 'PIZZA_REMOVED_FROM_BASKET';

export interface AddPizzaIntoBasket {
  type: typeof PIZZA_ADDED_INTO_BASKET;
  id: string;
}

export interface RemovePizzaFromBasket {
  type: typeof PIZZA_REMOVED_FROM_BASKET,
  id: string;
}

export type BasketActions = AddPizzaIntoBasket | RemovePizzaFromBasket;

export const addPizzaIntoBasket = (id: string) => {
  return {
    type: PIZZA_ADDED_INTO_BASKET,
    id
  }
}

export const removePizzaFromBasket = (id: string) => {
  return {
    type: PIZZA_REMOVED_FROM_BASKET,
    id
  }
}
