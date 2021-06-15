import { Pizza, State } from '../../types';

export const getMenu = (state: State) => state.menu;
export const getPizzaById = (state: State, id: string): Pizza | undefined => state.menu.find(pizza => pizza._id === id)
