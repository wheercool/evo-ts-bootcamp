import * as React from 'react';
import { Button } from '../Button/Button';
import { VisualizationStatus } from '../../models/VisualizationStatus';
import './Toolbar.css';
import { AlgorithmName, AlgorithmSelector } from '../AlgorithmSelector/AlgorithmSelector';

interface IProps {
  status: VisualizationStatus;
  algorithm: AlgorithmName;

  onStart(): void;

  onPause(): void;

  onRandomize(): void;

  onChangeAlgorithm(algorithm: AlgorithmName): void;
}

export class Toolbar extends React.Component<IProps> {
  render() {
    const { onStart, onPause, onChangeAlgorithm, onRandomize, status, algorithm } = this.props;
    return <div className="toolbar">
      <div className="toolbar-algorithm-selector">
        <AlgorithmSelector disabled={status === VisualizationStatus.InProgress}
                           algorithm={algorithm}
                           onChange={onChangeAlgorithm}/>
      </div>
      <div className="toolbar-buttons">
        {status === VisualizationStatus.InProgress
          ? <Button onClick={onPause}>Pause</Button>
          : <Button disabled={status === VisualizationStatus.Sorted} onClick={onStart}>Start</Button>
        }
        <Button disabled={status === VisualizationStatus.InProgress} onClick={onRandomize}>Randomize</Button>
      </div>
      <div className="toolbar-status"> {status}</div>
    </div>;
  }
}
