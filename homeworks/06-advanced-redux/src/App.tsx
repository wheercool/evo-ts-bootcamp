import React from 'react';
import './App.css';
import { PizzaListContainer } from './containers/PizzaListContainer';
import { PizzaBasketContainer } from './containers/PizzaBasketContainer';
import { useSelector } from 'react-redux';
import { getTotalPrice } from './features/basket/selectors';
import { TotalPrice } from './components';


function App() {
  const totalPrice = useSelector(getTotalPrice);
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 p-8">
        <div className="grid grid-cols-4 gap-4">
          <PizzaListContainer/>
        </div>
      </div>
      <div className="col-span-1 bg-white overflow-y-auto h-full">
        <div className="flex flex-col p-8">
          <TotalPrice price={totalPrice}/>
          <PizzaBasketContainer/>
          <div className="flex flex-col">
            <button
              className="bg-yellow-400 rounded-xl pt-2 pb-2"
            >Make Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


