import React, { PureComponent } from 'react';
import withTimer from '../HOC/withTimer';

class HOCClock extends PureComponent {
  render() {
    return (
      <div>
        <h2>HOC实现的时钟</h2>
        <h1>{this.props.time.toLocaleTimeString()}</h1>
      </div>
    );
  }
}

export default withTimer(HOCClock);
