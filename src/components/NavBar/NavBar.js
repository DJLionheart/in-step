import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppBar from 'material-ui/AppBar'
import Menu, { MenuItem } from 'material-ui/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MediaQuery from 'react-responsive';
import Typography from 'material-ui/Typography';



class NavBar extends Component {
    constructor() {
        super();
        this.state={
            anchorEl: null,
            currentLocation: 'profile'
        }
    }

    handleNav(evt) {
        this.setState({

        })
    }
    handleClick(evt) {
        this.setState({
            anchorEl: evt.currentTarget
        })
    }
    handleClose() {
        this.setState({
            anchorEl: null
        })
    }


    render() {
        // currentLocation
        const { anchorEl } = this.state;

        const navHeaders = [
            {name: 'Profile', path: '/profile'},
            {name: 'Find Your Pace', path: '/pace'},
            {name: 'Search', path: '/search'},
            {name: 'Playlist Manager', path: '/playlist_manager'}
        ]

        const mobileNav = navHeaders.map( (page, i) => {
            return <Link to={ page.path } key={ i }><MenuItem>{ page.name }</MenuItem></Link>
        })

        const desktopNav = navHeaders.map( (page, i) => {
            return <Link to={ page.path } key={ i }><Typography variant="title">{ page.name }</Typography></Link>
        })

        let navLocation = '';

        switch( this.props.location.pathname ) {
            case '/pace':
                navLocation = 'Find Your Pace';
                break;

            case '/search':
                navLocation = 'Search';
                break;

            case '/playlist':
                navLocation = 'Playlist Manager';
                break;
            
            default:
                navLocation = 'Profile';
                break;



        }
        return(
            <div>
                <AppBar position="static">
                    <MediaQuery query="(max-device-width: 1223px)">
                        <MenuIcon/>
                        <Typography variant="title">
                            { navLocation }
                        </Typography>
                        <Menu
                            anchorEl={ anchorEl }
                            open={ Boolean(anchorEl) }
                            onClose={ this.handleClose }>
                            { mobileNav }
                            <MenuItem><a href="/api/logout">Logout</a></MenuItem>
                        </Menu>
                    </MediaQuery>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <nav>
                            { desktopNav }
                            <a href="/api/logout"><Typography variant="title">Logout</Typography></a>
                        </nav>
                    </MediaQuery>
                </AppBar>
            </div>
        )
    }
}

export default withRouter(NavBar);