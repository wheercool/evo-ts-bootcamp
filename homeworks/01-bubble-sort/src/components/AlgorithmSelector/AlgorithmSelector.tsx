import * as React from 'react';
import { ReactEventHandler } from 'react';
import './AlgorithmSelector.css';

export type AlgorithmName = 'bubble' | 'min';

interface IProps {
  disabled: boolean;
  algorithm: AlgorithmName;
  onChange(value: AlgorithmName): void;
}

export class AlgorithmSelector extends React.Component<IProps> {
  private onChange: ReactEventHandler<HTMLSelectElement> = (e) => {
    this.props.onChange(e.currentTarget.value as AlgorithmName);
  };

  render() {
    const { disabled, algorithm } = this.props;
    return <select className="algorithm-selector"
                   onChange={this.onChange}
                   value={algorithm}
                   disabled={disabled}
    >
      <option value="min">Min element</option>
      <option value="bubble">Bubble</option>
    </select>
  }
}
