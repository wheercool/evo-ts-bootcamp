import { Camera } from '../Camera/Camera';
import { CameraName } from '../../types';
import { changeCamera, getActiveCamera } from '../../features/images/imagesSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface CameraList {
  names: (CameraName | 'All')[];
}

export function CameraList(props: CameraList) {
  const { names } = props;
  const dispatch = useAppDispatch();
  const activeCamera = useAppSelector(getActiveCamera);
  return <ul>
    Cameras: &nbsp;
    {
      names.map(cameraName =>
        <Camera key={cameraName}
                name={cameraName}
                active={activeCamera === cameraName}
                onClick={() => dispatch(changeCamera(cameraName))}
        />)
    }
  </ul>
}
