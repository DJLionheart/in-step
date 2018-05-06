import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavBar from './components/NavBar/NavBar';
import routes from './routes'
import './App.css';
import { createMuiTheme } from 'material-ui/styles';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffdd4b',
      main: '#ffab00',
      dark: '#c67c00',
      contrastText: '#37474f'
    }
  },

})

class App extends Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <MuiThemeProvider theme={muiTheme}>
        <div className="App">
          {
            pathname === '/' || pathname === '/loading' || pathname === '/questionnaire' 
              ? null
              : <NavBar/>
          }
            { routes }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
