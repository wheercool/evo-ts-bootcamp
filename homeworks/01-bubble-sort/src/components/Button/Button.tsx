import * as React from 'react';
import { noop } from '../../utils';

import './Button.css';

interface IProps {
  disabled?: boolean;

  onClick?(): void;
}

export class Button extends React.Component<IProps> {
  static defaultProps = {
    disabled: false,
    onClick: noop
  }

  render() {
    const { disabled, onClick } = this.props;
    return <button disabled={disabled} className="button" onClick={onClick}>{this.props.children}</button>
  }
}
