import React from 'react';
import { IconMenu, MenuItem, IconButton } from 'material-ui';
import { Menu } from '@material-ui/icons';
import { Link } from 'react-router-dom';

function NavMenu() {
    return(
        <IconMenu
            iconButtonElement={<IconButton><Menu/></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}>
            <Link to="/profile"><MenuItem primaryText="Profile"/></Link>
            <Link to="/pace"><MenuItem primaryText="Find Your Pace"/></Link>
            <Link to="/search"><MenuItem primaryText="Search"/></Link>
            <Link to="/playlist_manager"><MenuItem primaryText="Playlist Manager"/></Link>
            <a href="/api/logout"><MenuItem primaryText="Logout"/></a>
        </IconMenu>
    )
}

export default NavMenu;