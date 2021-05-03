import * as React from 'react';
import { useCallback } from 'react';

import { Missing, PizzaBasket } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { removePizzaFromBasket } from '../features/basket/actions';
import { getBasket } from '../features/basket/selectors';

export const PizzaBasketContainer = React.memo(function () {
  const dispatch = useDispatch();
  const basket = useSelector(getBasket)
  const removeFromBasket = useCallback((id: string) => dispatch(removePizzaFromBasket(id)), [dispatch]);

  return basket.length > 0
    ? <PizzaBasket pizza={basket} onMinus={removeFromBasket}/>
    : <Missing/>
})
