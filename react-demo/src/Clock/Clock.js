import React, { PureComponent } from 'react';

export default class Clock extends PureComponent {
  constructor(props) {
    super(props);
    this.timerId = null;
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div>
        <h1>{this.state.date.toLocaleTimeString()}</h1>
      </div>
    );
  }
}
