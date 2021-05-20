import { Rover } from '../Rover/Rover';
import React from 'react';

import style from './RoverList.module.css';
import { changeRover, getActiveRover } from '../../features/images/imagesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

export function RoverList() {
  const activeRoverName = useAppSelector(getActiveRover);
  const dispatch = useAppDispatch();
  const rovers = ['Curiosity', 'Perseverance', 'Opportunity'] as const;
  return <ul className={style.roverList}>
    {
      rovers.map(roverName =>
        <Rover key={roverName}
               name={roverName}
               active={roverName === activeRoverName}
               onClick={() => dispatch(changeRover(roverName))}
        />
      )
    }
  </ul>
}
