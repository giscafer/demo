import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const styles = {
  menuItem: {
    display: 'block',
  },
};

const Home = () => <h2>Home Page</h2>;
const Hello = () => <h2>Hello Page</h2>;
const About = () => <h2>About Page</h2>;

export default class RouterSample extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <h3>路由有三种方式：URL、Hash路由、内存路由 </h3>
          <ul>
            <Link to='/home' style={styles.menuItem}>
              Home
            </Link>
            <Link to='/hello' style={styles.menuItem}>
              Hello
            </Link>
            <Link to='/about' style={styles.menuItem}>
              About
            </Link>
          </ul>

          <div className='page-container'>
            <Route path='/home' component={Home} />
            <Route path='/hello' component={Hello} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    );
  }
}
