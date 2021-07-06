import { Rover } from '../Rover/Rover';
import React from 'react';
import { observer } from 'mobx-react';

import style from './RoverList.module.css';
import { useStore } from '../../stores/store';

export const RoverList = observer(() => {
  const filtersStore = useStore('Filters');
  return <ul className={style.roverList}>
    {
      filtersStore.rovers.map(roverName =>
        <Rover key={roverName}
               name={roverName}
               active={roverName === filtersStore.roverName}
               onClick={() => filtersStore.changeRover(roverName)}
        />
      )
    }
  </ul>
})
