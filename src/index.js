import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { sessionService } from 'redux-react-session';

import store from './ducks/store';

import './index.css';

import App from './App';

//import registerServiceWorker from './registerServiceWorker';

sessionService.initSessionService(store)

ReactDOM.render(
<Provider store={ store }>
    <HashRouter>
        <App />
    </HashRouter>
</Provider>
, document.getElementById('root'));
//registerServiceWorker();
