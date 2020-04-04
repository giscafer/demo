import React from 'react';
import './App.css';
import Hello from './Hello';
import logo from './logo.svg';
import routeMap from './routeMap';

const routeKeys = Object.keys(routeMap);

const styles = {
  listStyle: { listStyle: 'none' },
};

class App extends React.PureComponent {
  //  window.history 是無法清除的，這裡是demo的用法，不推薦使用
  handleLinkClick = (key) => {
    if (key) {
      window.history.pushState(null, '', `/#/${key}`);
    } else {
      window.history.pushState(null, '', `/`);
    }

    this.forceUpdate();
  };

  render() {
    const currentPage = document.location.hash.replace(/#\/?/, '');

    let CurrentPage = routeMap[currentPage] || Hello;

    /*  if (currentPage.match(/\/user\/w+|\/list-page/)) {
    CurrentPage = ListSample;
  }
  if (currentPage.match(/\/wizard\/step\/\w+/)) {
    CurrentPage = WizardSmaple;
  } */
    return (
      <div className='App'>
        <header className='App-header'>
          <img
            src={logo}
            className='App-logo'
            alt='logo'
            onClick={() => this.handleLinkClick()}
          />
          <span
            style={{ marginTop: '5px', cursor: 'pointer' }}
            onClick={() => this.handleLinkClick()}
          >
            React Demo
          </span>
        </header>
        <div className='main'>
          <div className='side-nav'>
            <ul>
              {routeKeys.map((key) => (
                <li
                  key={key}
                  className={key === currentPage ? 'is-active' : ''}
                  style={styles.listStyle}
                >
                  <span
                    className='link'
                    onClick={() => this.handleLinkClick(key)}
                  >
                    {key}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className='content'>
            <CurrentPage />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
