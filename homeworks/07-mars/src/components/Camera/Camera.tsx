import style from './Camera.module.css';
import { CameraName } from '../../types';
import { useCallback } from 'react';
import classNames from 'classnames';

interface Camera {
  name: CameraName | 'All';
  active: boolean;

  onClick(name: CameraName | 'All'): void;
}

export function Camera(props: Camera) {
  const { name, onClick, active } = props;
  const handleClick = useCallback(() => onClick(name), [name]);
  return <button onClick={handleClick}
                 className={classNames(style.camera, { [style.cameraActive]: active })}> {name}</button>
}
