import axios from 'axios';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { applyMiddleware, bindActionCreators, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Action type constant
const FETCH_BEGIN = 'FETCH_REDDIT_LIST_BEGIN';
const FETCH_SUCCESS = 'FETCH_REDDIT_LIST_SUCCESS';
const FETCH_FAILURE = 'FETCH_REDDIT_LIST_FAILURE';
const FETCH_DISMISS_ERROR = 'FETCH_REDDIT_LIST_DISMISS_ERROR';

// async action
export function fetchRedditList(args = {}) {
  return (dispatch) => {
    dispatch({
      type: FETCH_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get('http://www.reddit.com/r/reactjs.json');

      doRequest.then(
        (res) => {
          dispatch({
            type: FETCH_SUCCESS,
            data: res.data,
          });

          resolve(res);
        },
        (err) => {
          dispatch({
            type: FETCH_FAILURE,
            data: {
              error: err,
            },
          });
          reject(err);
        }
      );
    });

    return promise;
  };
}

// async action saves request error by default
export function dismissFetchRedditListError() {
  return {
    type: FETCH_DISMISS_ERROR,
  };
}

const initialState = { redditList: [] };

// Reducer

export function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BEGIN:
      return {
        ...state,
        redditList: [], // 每次请求清空当前数据
        fetchRedditListPedding: true,
        fetchRedditListError: null,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        redditList: action.data.data.children,

        fetchRedditListPedding: false,
        fetchRedditListError: null,
      };
    case FETCH_FAILURE:
      return {
        ...state,
        fetchRedditListError: action.data.error,
        fetchRedditListPedding: false,
      };

    case FETCH_DISMISS_ERROR:
      // dismiss error
      return {
        ...state,
        fetchRedditListError: null,
      };

    default:
      break;
  }

  return state;
}

const styles = {
  result: {
    textAlign: 'left',
    fontSize: '16px',
  },
  error: {
    color: 'red',
  },
};

class RedditList extends React.Component {
  render() {
    const {
      fetchRedditList,
      redditList = [],
      fetchRedditListPedding,
      fetchRedditListError,
    } = this.props;
    return (
      <div>
        <button onClick={fetchRedditList}>fetch reddit list</button>
        <br />
        <br />
        <br />
        {fetchRedditListPedding && <h3>加载中……</h3>}
        {fetchRedditListError && (
          <h3 style={styles.error}>请求失败，请检查网络 reddit.com</h3>
        )}
        <ul style={styles.result}>
          {redditList.map((item) => (
            <li key={item.data.created}>{item.data.title}</li>
          ))}
          {}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    redditList: state.redditList,
    fetchRedditListPedding: state.fetchRedditListPedding,
    fetchRedditListError: state.fetchRedditListError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { fetchRedditList, dismissFetchRedditListError },
    dispatch
  );
};

const ConnectRedditList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedditList);
const middlewares = [thunk, logger];
const store = createStore(reducer, applyMiddleware(...middlewares));

export default () => {
  return (
    <Provider store={store}>
      <ConnectRedditList />
    </Provider>
  );
};
