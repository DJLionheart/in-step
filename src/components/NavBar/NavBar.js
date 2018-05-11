import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar'
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from 'material-ui/Typography';

import './NavBar.css'

const { 
    REACT_APP_LOGOUT_BUTTON,
    REACT_APP_HOME_URL
} = process.env;

class NavBar extends Component {
    constructor() {
        super();
        this.state={
            anchorEl: null,
            currentLocation: 'profile'
        }

        this.handleNav = this.handleNav.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleNav(evt) {
        this.setState({
            anchorEl: evt.currentTarget
        })
    }

    handleClose(path) {
        this.setState({
            anchorEl: null
        })
        this.props.history.push(path)

    }

    handleLogout() {
        axios.post(REACT_APP_LOGOUT_BUTTON).then( () => {
            this.props.history.push(REACT_APP_HOME_URL)
        })
    }

    render() {
        const style = {
            background: '#004ba0'
        };
        // currentLocation
        const { anchorEl } = this.state;

        const navHeaders = [
            {name: 'Profile', path: '/profile'},
            {name: 'Find Your Pace', path: '/pace'},
            {name: 'Search', path: '/search'},
            {name: 'Playlist Manager', path: '/playlist_manager'}
        ]

        const navLinks = navHeaders.map( (page, i) => {
            return <MenuItem key={ i } onClick={ () => this.handleClose(page.path) }>{ page.name }</MenuItem>
        })

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

            case '/playlist_manager':
                navLocation = 'Playlist Manager';
                break;
            
            default:
                navLocation = ''
                break;
        }

        return(
            <div>
                <AppBar position="static" style={ style }>
                    <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-owns={ anchorEl ? 'navigation-menu' : null }
                                aria-label="Menu"
                                aria-haspopup="true"
                                onClick={ this.handleNav }
                            >
                                <MenuIcon/>
                            </IconButton>    
                            <Typography variant="title" color="inherit">
                                { navLocation }
                            </Typography>
                            <Menu className="nav-bar"
                                anchorEl={ anchorEl }
                                open={ Boolean(anchorEl)}
                                onClose={ this.handleClose }
                            >
                                { navLinks }
                                <MenuItem><a href="/api/logout">Logout</a></MenuItem>
                            </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withRouter(NavBar);