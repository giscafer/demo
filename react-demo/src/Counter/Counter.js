/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-04-06 15:35:50
 * @description: redux 结合 react 使用
 */

import React from 'react';
import { bindActionCreators, createStore } from 'redux';
import { connect, Provider } from 'react-redux';

// Store initial state
const initialState = { count: 0 };

// action
function plusOne() {
  return { type: 'PLUS_ONE' };
}

function minusOne() {
  return { type: 'MINUS_ONE' };
}

// reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'PLUS_ONE':
      return { count: state.count + 1 };
    case 'MINUS_ONE':
      return { count: state.count - 1 };
    default:
      break;
  }
  return state;
};

const store = createStore(counter);

class Counter extends React.Component {
  render() {
    const { count, plusOne, minusOne } = this.props;
    return (
      <div>
        <h3>理解 redux 在 react 中使用，connect、mapStateToProps、mapDispatchToProps</h3>
        <br />
        <br />
        <br />
        <button onClick={minusOne}>-</button>
        &nbsp;&nbsp;<span>{count}</span>&nbsp;&nbsp;
        <button onClick={plusOne}>+</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ plusOne, minusOne }, dispatch);
}

const ConnectCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

export default class ConnectCounterSample extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectCounter />
      </Provider>
    );
  }
}
