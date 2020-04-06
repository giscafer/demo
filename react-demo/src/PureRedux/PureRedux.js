import React from 'react';
import { createStore, bindActionCreators } from 'redux';

function run() {
  const initialState = { count: 0 };

  // reducer
  const counter = (state = initialState, action) => {
    switch (action.type) {
      case 'PLUS_ONE':
        return { count: state.count + 1 };
      case 'MINUS_ONE':
        return { count: state.count - 1 };
      case 'CUSTOM_COUNT':
        return { count: state.count + action.playload.count };
      default:
        break;
    }
    return state;
  };

  const store = createStore(counter);

  // action creator
  function plusOne() {
    // action
    return { type: 'PLUS_ONE' };
  }

  function minusOne() {
    return { type: 'MINUS_ONE' };
  }

  function customCount(count) {
    return { type: 'CUSTOM_COUNT', playload: { count } };
  }

  const minus = bindActionCreators(minusOne, store.dispatch);

  store.subscribe(() => console.log(store.getState()));

  store.dispatch(plusOne());
  store.dispatch(minusOne());
  minus(); // bindActionCreators
  store.dispatch(customCount(5));
}

export default () => (
  <div>
    <button onClick={run}>执行</button>
    <p>打开控制台看效果</p>
  </div>
);
