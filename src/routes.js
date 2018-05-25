import React from 'react';

import Auth from './components/Auth/Auth';
import Loader from './components/Loader/Loader'
import Questionnaire from './components/Questionnaire/Questionnaire';
import Profile from './components/Profile/Profile';
import Search from './components/Search/Search';
import PlaylistManager from './components/PlaylistManager/PlaylistManager';
// import Premium from './components/Premium/Premium';

import { Switch, Route } from 'react-router-dom';

const {
    REACT_APP_HOME_URL,
    REACT_APP_LOAD,
    REACT_APP_QUEST,
    REACT_APP_PROF,
    REACT_APP_SRC,
    REACT_APP_PM
    // REACT_APP_PREM
} = process.env;

export default(
    <Switch>
        <Route exact path={REACT_APP_HOME_URL} component={ Auth } />
        <Route path={REACT_APP_LOAD} component={ Loader }/>
        <Route path={REACT_APP_QUEST} component={ Questionnaire }/>
        <Route path={REACT_APP_PROF} component={ Profile } />
        <Route path={REACT_APP_SRC} component={ Search } />
        <Route path={REACT_APP_PM} component={ PlaylistManager } />
        {/* <Route path={REACT_APP_PREM} component={ Premium } /> */}
    </Switch>
)
