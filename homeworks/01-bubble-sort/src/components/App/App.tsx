import React from 'react';
import './App.css';
import { BarChart } from '../BarChart/BarChart';
import { bubble, minElement } from '../../models/algorithms';
import { Algorithm, AlgorithmIteration, toAlgorithmIteration } from '../../models/AlgorithmIteration';
import { Toolbar } from '../Toolbar/Toolbar';
import { VisualizationStatus } from '../../models/VisualizationStatus';
import { AlgorithmName } from '../AlgorithmSelector/AlgorithmSelector';

interface IState {
  status: VisualizationStatus;
  values: number[];
  iterator: AlgorithmIteration;
  algorithm: Algorithm;
  algorithmName: AlgorithmName;
}

const MAX_MEMBERS = 15;
const MAX_VALUE = 1000;
const REFRESH_TIME = 100;
const algorithms = {
  'bubble': bubble,
  'min': minElement
} as const;

class App extends React.Component<{}, IState> {
  private handle?: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);
    const values = generateArray(MAX_MEMBERS, MAX_VALUE);
    const algorithm = bubble;
    this.state = {
      values,
      status: VisualizationStatus.Waiting,
      algorithm,
      iterator: toAlgorithmIteration(algorithm(values)),
      algorithmName: 'bubble'
    }
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          Bubble Sort Visualization
        </header>
        <main className="app-main">
          <BarChart values={this.state.values}/>
        </main>
        <footer className="app-footer">
          <Toolbar status={this.state.status}
                   algorithm={this.state.algorithmName}
                   onStart={this.onStart}
                   onPause={this.onPause}
                   onChangeAlgorithm={this.onChangeAlgorithm}
                   onRandomize={this.onRandomize}
          />
        </footer>
      </div>
    );
  }

  onStart = () => {
    const generator = this.state.algorithm(this.state.values);
    this.setState({
      iterator: toAlgorithmIteration(generator)
    })
    this.clearTimer();
    this.handle = setInterval(() => {
      this.tick();
    }, REFRESH_TIME);
  }
  onPause = () => {
    clearInterval(this.handle!);
    this.setState({
      status: VisualizationStatus.Waiting
    })
  }
  onChangeAlgorithm = (algo: AlgorithmName) => {
    this.setState({
      algorithmName: algo,
      algorithm: algorithms[algo]
    })
  }
  onRandomize = () => {
    this.clearTimer();
    const newValues = generateArray(MAX_MEMBERS, MAX_VALUE);
    this.setState({
      status: VisualizationStatus.Waiting,
      values: newValues
    })
  }

  private tick() {
    const [done, newValues] = this.state.iterator(this.state.values);
    if (done) {
      this.clearTimer();
      this.setState({
        status: VisualizationStatus.Sorted
      })
    } else {
      this.setState({
        values: newValues,
        status: VisualizationStatus.InProgress
      })
    }
  }
  private clearTimer = () => {
    clearInterval(this.handle!);
  }
}

function generateArray(MAX_MEMBERS: number, MAX_VALUE: number) {
  const values = [];
  for (let i = 0; i < MAX_MEMBERS; i++) {
    values.push((Math.random() * MAX_VALUE) | 0);
  }
  return values;
}

export default App;
