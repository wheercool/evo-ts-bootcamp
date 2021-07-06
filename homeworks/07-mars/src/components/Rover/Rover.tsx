import * as React from 'react';

import curiosity from './images/curiosity.jpg';
import opportunity from './images/opportunity.jpg';
import perseverance from './images/perseverance.jpg';
import classNames from 'classnames';

import style from './Rover.module.css';
import { RoverName } from '../../types';
import { useCallback } from 'react';

interface IRover {
  active?: boolean;
  name: RoverName;
  onClick: (roverName: RoverName) => void;
}

const images = {
  Curiosity: curiosity,
  Perseverance: perseverance,
  Opportunity: opportunity
}

export const Rover = (props: IRover) => {
  const { name, active = false, onClick } = props;
  const clickHandler = useCallback(() => onClick(name), [name]);
  return <div className={classNames(style.rover, { [style.roverActive]: active })} onClick={clickHandler}>
    <header>Rover: {name}</header>
    <img className={style.roverImage} src={images[name]} alt={name}/>
  </div>
}
