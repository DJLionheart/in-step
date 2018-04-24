import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import routes from './routes'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          this.props.location.pathname === '/' || this.props.location.pathname === '/questionnaire'
            ? null
            : <NavBar/>
        }
          { routes }
      </div>
    );
  }
}

export default withRouter(App);
