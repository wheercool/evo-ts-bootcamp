import React, { useEffect, useState } from 'react';
import './App.css';
import { mouse$, targetPosition$ } from './pipes';
import { tap } from 'rxjs/operators';
import { Point2D } from './types';

function App() {
  return null;
  // const [position, changePosition] = useState([0, 0]);
  // const [mousePosition, changeMousePosition] = useState([0, 0] as Point2D);
  // useEffect(() => {
  //   targetPosition$.pipe(
  //     tap(changePosition),
  //     tap(console.log)
  //   ).subscribe();
  //   mouse$.pipe(tap(changeMousePosition)).subscribe();
  // }, [])
  // return (
  //   <div>
  //     <div style={{ transform: `translate(${position[0]}px, ${position[1]}px)`, }}>Target</div>
  //     <div style={{ transform: `translate(${mousePosition[0]}px, ${mousePosition[1]}px)`, }}>x</div>
  //   </div>
  // );
}

export default App;
