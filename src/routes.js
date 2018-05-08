import React from 'react';

import Auth from './components/Auth/Auth';
import Loader from './components/Loader/Loader'
import LoaderTwo from './components/Loader/LoaderTwo'
import Questionnaire from './components/Questionnaire/Questionnaire';
import Profile from './components/Profile/Profile';
import Pace from './components/Pace/Pace';
import Search from './components/Search/Search';
import PlaylistManager from './components/PlaylistManager/PlaylistManager';

import { Switch, Route } from 'react-router-dom';

export default(
    <Switch>
        <Route exact path="/" component={ Auth } />
        <Route path="/loading" component={ Loader }/> 
        <Route path="/loading/user_data" component={ LoaderTwo }/> 
        <Route path="/questionnaire" component={ Questionnaire }/>
        <Route path="/profile" component={ Profile } />
        <Route path="/pace" component={ Pace } />
        <Route path="/search" component={ Search } />
        <Route path="/playlist_manager" component={ PlaylistManager } />
    </Switch>
)
