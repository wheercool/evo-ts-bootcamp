import { Reducer } from 'redux';
import { BasketActions, PIZZA_ADDED_INTO_BASKET, PIZZA_REMOVED_FROM_BASKET } from './actions';
import { BasketItem } from '../../types';

export const reducer: Reducer<BasketItem[], BasketActions> = (state = [], action) => {
  switch (action.type) {
    case PIZZA_ADDED_INTO_BASKET: {
      const newBasket: BasketItem[] = [];
      let found = false;
      state.forEach(basketItem => {
        if (basketItem._id === action.id) {
          newBasket.push({ ...basketItem, count: basketItem.count + 1 })
          found = true;
        } else {
          newBasket.push(basketItem);
        }
      })
      if (!found) {
        newBasket.push({ _id: action.id, count: 1 });
      }
      return newBasket;
    }
    case PIZZA_REMOVED_FROM_BASKET: {
      const newBasket: BasketItem[] = [];
      state.forEach(basketItem => {
        if (basketItem._id === action.id) {
          const newCount = basketItem.count - 1;
          if (newCount > 0) {
            newBasket.push({ ...basketItem, count: newCount })
          }
        } else {
          newBasket.push(basketItem);
        }
      })
      return newBasket;
    }
    default:
      return state;
  }
}
