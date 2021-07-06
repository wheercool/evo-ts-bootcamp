import { Camera } from '../Camera/Camera';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react';
import { CameraFilterValue } from '../../types';

interface CameraList {
  names: CameraFilterValue[];
}

export const CameraList = observer((props: CameraList) => {
    const { names } = props;
    const filtersStore = useStore('Filters');
    return <ul>
      Cameras: &nbsp;
      {
        names.map(cameraName =>
          <Camera key={cameraName}
                  name={cameraName}
                  active={filtersStore.activeCamera === cameraName}
                  onClick={() => filtersStore.changeCamera(cameraName)}
          />)
      }
    </ul>
  }
)

