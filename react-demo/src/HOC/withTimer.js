import React from 'react';

export default (WrappedComponent) => {
  return class extends React.Component {
    state = { time: new Date() };

    componentDidMount() {
      this.timerId = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.timerId);
    }

    tick() {
      this.setState({ time: new Date() });
    }

    render() {
      return <WrappedComponent time={this.state.time} {...this.props} />;
    }
  };
};
