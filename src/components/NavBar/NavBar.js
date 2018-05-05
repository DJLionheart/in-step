import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { LeftNav, MenuItem } from 'material-ui';
import { Menu } from '@material-ui/icons';

import NavMenu from './NavMenu';


class NavBar extends Component {
    render() {
        let navLocation = '';

        switch( this.props.location.pathname ) {
            case '/profile':
                navLocation = 'Profile';
                break;

            case '/pace':
                navLocation = 'Find Your Pace';
                break;

            case '/search':
                navLocation = 'Search';
                break;

            case '/playlist':
                navLocation = 'Playlist Manager';
                break;



        }
        return(
            <div>
                <main>
                    <Link to="/profile"><button>Profile</button></Link>
                    <Link to="/pace"><button>Find Your Pace</button></Link>
                    <Link to="/search"><button>Search</button></Link>
                    <Link to="/playlist"><button>Playlist Manager</button></Link>
                    <a href="/api/logout"><button>Logout</button></a>
                </main>
            </div>
        )
    }
}

export default withRouter(NavBar);