import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import routes from './routes'
import './App.css';

class App extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <div className="App">
        {
          pathname === '/' || pathname === '/loading' || pathname === '/questionnaire' 
            ? null
            : <NavBar/>
        }
          { routes }
      </div>
    );
  }
}

export default withRouter(App);
