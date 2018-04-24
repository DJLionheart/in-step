import React from 'react';

import Auth from './components/Auth/Auth';
import Questionnaire from './components/Questionnaire/Questionnaire';
import Profile from './components/Profile/Profile';
import Pace from './components/Pace/Pace';
import Search from './components/Search/Search';
import Playlist from './components/Playlist/Playlist';

import { Switch, Route } from 'react-router-dom';

export default(
    <Switch>
        <Route exact path="/" component={ Auth } />
        <Route path="/questionnaire" component={ Questionnaire }/>
        <Route path="/profile" component={ Profile } />
        <Route path="/pace" component={ Pace } />
        <Route path="/search" component={ Search } />
        <Route path="/playlist" component={ Playlist } />
    </Switch>
)
