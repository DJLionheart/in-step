import React from 'react';

import Auth from './components/Auth/Auth';
import About from './components/About/About';
import Examples from './components/Examples/Examples';
import Search from './components/Search/Search';
import Playlist from './components/Playlist/Playlist';

import { Switch, Route } from 'react-router-dom';

export default(
    <Switch>
        <Route exact path="/" component={ Auth } />
        <Route path="/about" component={ About } />
        <Route path="/examples" component={ Examples } />
        <Route path="/search" component={ Search } />
        <Route path="/playlist" component={ Playlist } />
    </Switch>
)
