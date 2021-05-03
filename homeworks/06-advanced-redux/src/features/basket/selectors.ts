import { Pizza, State } from '../../types';

export const getBasket = (state: State): Array<Pizza & { count: number }> => {
  const map = new Map<string, Pizza>();
  state.menu.forEach(pizza => map.set(pizza._id, pizza));

  return state.basket.map(basketItem => {
    const pizza = map.get(basketItem._id);
    if (!pizza) {
      throw new Error('Cannot find pizza by id');
    }
    return {
      ...pizza,
      count: basketItem.count
    }
  })
}

export const getTotalPrice = (state: State): number => {
  const prices = new Map<string, number>();
  state.menu.forEach(pizza => prices.set(pizza._id, pizza.price));

  return state.basket.reduce((price, basketItem) => {
    const pizzaPrice = prices.get(basketItem._id);
    if (pizzaPrice === undefined) {
      throw new Error('Cannot find pizza by id');
    }
    return price + basketItem.count * pizzaPrice
  }, 0)
}
