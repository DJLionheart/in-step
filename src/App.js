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
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffd95a',
      main: '#f9a825',
      dark: '#c17900',
      contrastText: '#29434e'
    }
  },

})
// const muiTheme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#63a4ff',
//       main: '#1976d2',
//       dark: '#004ba0',
//       contrastText: '#ffffff'
//     },
//     secondary: {
//       light: '#ffdd4b',
//       main: '#ffab00',
//       dark: '#c67c00',
//       contrastText: '#37474f'
//     }
//   },

// })

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
