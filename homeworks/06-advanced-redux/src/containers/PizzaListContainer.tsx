import * as React from 'react';
import { useCallback } from 'react';

import { Loading, PizzaList } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getMenu } from '../features/pizza-menu/selectors';
import { loadMenu, selectPizza } from '../features/pizza-menu/actions';

export const PizzaListContainer = React.memo(function () {
  const dispatch = useDispatch();
  const pizza = useSelector(getMenu)
  const addPizza = useCallback((id: string) => dispatch(selectPizza(id)), [dispatch]);
  React.useEffect(() => {
    dispatch(loadMenu());
  }, []);

  return pizza.length > 0
    ? <PizzaList pizza={pizza} onAdd={addPizza}/>
    : <Loading/>
});
