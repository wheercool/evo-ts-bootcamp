import * as React from 'react';
import './BarChart.css';

interface IProps {
  values: number[];
}

export class BarChart extends React.Component<IProps> {
  render() {
    const { values } = this.props;
    const max = Math.max(...values);
    return <div className="bar-chart">
      {values.map((value, index) =>
        <div className="bar" key={index} style={{
          height: percent(value, max) + '%',
          width: (100 / values.length) + '%'
        }}/>)
      }
    </div>
  }

}

function percent(value: number, max: number) {
  return value / max * 100;
}
