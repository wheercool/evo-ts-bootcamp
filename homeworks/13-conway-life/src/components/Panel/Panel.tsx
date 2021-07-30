import { useStore } from '../../store';
import style from './Panel.module.css'
import { useCallback } from 'react';
import { GameStatus } from '../../types';
import { observer } from 'mobx-react';


export const Panel = observer(() => {
  const controller = useStore('Controller');
  const gameInfo = useStore('GameInfo');
  const rejectSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>((event) => event.preventDefault(), [])
  const onChangeColumns = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    controller.changeColumns(+event.target.value);
  }, [controller]);

  const onChangeRows = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    controller.changeRows(+event.target.value);
  }, [controller]);

  return <div className={style.panel}>
    <h2>Panel</h2>
    <p className={style.help}>Click the cell on the left to add/remove cell</p>
    <form onSubmit={rejectSubmit}>
      <fieldset className={style.fieldset}>
        <legend {...{ align: 'left' }}>Information</legend>
        <div className={style.field}>
          <label htmlFor=""> Iteration: </label>
          {gameInfo.iteration}
        </div>
        <div className={style.field}>
          <label htmlFor="">Total cells:</label>
          {gameInfo.totalCells}
        </div>
      </fieldset>
    </form>
    <form onSubmit={rejectSubmit}>
      <fieldset className={style.fieldset}>
        <legend {...{ align: 'left' }}>Grid</legend>
        <div className={style.field}>
          <label htmlFor=""> Columns: </label>
          <input type="number" min={1} onChange={onChangeColumns} value={gameInfo.columns}/>
        </div>
        <div className={style.field}>
          <label htmlFor="rows"> Rows: </label>
          <input type="number" min={1} onChange={onChangeRows} value={gameInfo.rows}/>
        </div>
        <div className={style.buttons}>
          <button onClick={controller.toggleGrid}>Toggle Grid</button>
        </div>
      </fieldset>
    </form>

    <form onSubmit={rejectSubmit}>
      <fieldset className={style.fieldset}>
        <legend {...{ align: 'left' }}>Simulation</legend>
        <div className={style.field}>
          <label htmlFor=""> Status: </label>
          {gameInfo.gameStatus}
        </div>
        <div className={style.field}>
          <label htmlFor="rows"> Speed: </label>
          <div className={style.speedControl}>
            <button onClick={controller.decreaseSpeed}>-</button>
            <span>{gameInfo.speed}</span>
            <button onClick={controller.increaseSpeed}>+</button>
          </div>
        </div>
        <div className={style.buttons}>
          {gameInfo.gameStatus === GameStatus.Stopped
            ? <button onClick={controller.startGame}>Start</button>
            : <button onClick={controller.stopGame}>Stop</button>
          }
          <button onClick={controller.nextStep}>Next</button>
        </div>
      </fieldset>
    </form>
  </div>
})
