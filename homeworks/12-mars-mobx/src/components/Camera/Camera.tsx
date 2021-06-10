import style from './Camera.module.css';
import { CameraFilterValue } from '../../types';
import { useCallback } from 'react';
import classNames from 'classnames';

interface Camera {
  name: CameraFilterValue;
  active: boolean;

  onClick(name: CameraFilterValue): void;
}

export function Camera(props: Camera) {
  const { name, onClick, active } = props;
  const handleClick = useCallback(() => onClick(name), [name]);
  return <button onClick={handleClick}
                 className={classNames(style.camera, { [style.cameraActive]: active })}> {name}</button>
}
