import React from 'react';
import { MarsPhotosService } from './services/MarsPhotosService';
import style from './App.module.css';

import { CameraList } from './components/CameraList/CameraList';
import { Sol } from './components/Sol/Sol';
import { ImageList } from './components/ImageList/ImageList';
import { CameraName } from './types';
import { RoverList } from './components/RoverList/RoverList';
import { useDispatch, useSelector } from 'react-redux';
import { changeSol, fetchImages, getActiveSol } from './features/images/imagesSlice';
import { ViewSwitch } from './components/ViewSwitch/ViewSwitch';

async function run() {
  const service = new MarsPhotosService();
  const data = await service.getPhotos('Curiosity')
  console.log(data);
}

run();

function App() {
  return (
    <div className={style.app}>
      <header>Mars Viewer</header>
      <main>
        <ViewSwitch/>

      </main>
    </div>
  );
}

export default App;
