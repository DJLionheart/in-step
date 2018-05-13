import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/es/integration/react';

import store from './ducks/store';
// import persistor from './ducks/store';

import './index.css';

import App from './App';
// import LoadingScreen from './components/Loader/LoadingScreen';

//import registerServiceWorker from './registerServiceWorker';

//<PersistGate loading={<LoadingScreen/>} persistor={ persistor }>
//</PersistGate>

ReactDOM.render(
<Provider store={ store }>
        <HashRouter>
            <App />
        </HashRouter>
</Provider>
, document.getElementById('root'));
//registerServiceWorker();
