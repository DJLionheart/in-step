import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar'
import Menu, { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import ClearAll from '@material-ui/icons/ClearAll';
import Typography from 'material-ui/Typography';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';

import { handle_modal } from '../../ducks/modals';
import './NavBar.css'

import YoutubeFrame from '../YoutubeFrame/YoutubeFrame';

const { 
    REACT_APP_LOGOUT_BUTTON,
    REACT_APP_HOME_URL,
    REACT_APP_YT_KEY,
    REACT_APP_YT_URL,
    REACT_APP_PLAYLISTS,
    REACT_APP_CLEAR_ALL
} = process.env;

class NavBar extends Component {
    constructor() {
        super();
        this.state={
            anchorEl: null,
            currentLocation: 'profile',
            youTubeResult: '',
            okButton: true,
            playlistName: ''
        }

        this.handleNav = this.handleNav.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.searchYoutube = this.searchYoutube.bind(this);
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

    handleInput(e) {
        this.setState({
            playlistName: e,
            okButton: false
        })
    }

    handleLogout() {
        axios.post(REACT_APP_LOGOUT_BUTTON).then( () => {
            this.props.history.push(REACT_APP_HOME_URL)
        })
    }

    searchYoutube(track, artist) {
        const { handle_modal } = this.props;
        handle_modal('notOnSpotify', false)
        axios.get(`${REACT_APP_YT_URL}/search?part=snippet&q=${track}+by+${artist}&order=rating&type=video&videoDefinition=high&videoEmbeddable=true&key=${REACT_APP_YT_KEY}`)
            .then( res => {
                if( res.data.items.length < 1) {
                    handle_modal('notOnYoutube', true)
                } else {
                    console.log('Youtube Results: ', res.data)
                    this.setState({
                        youTubeResult: res.data.items[0].id.videoId
                    })
    
                    handle_modal('youTubeFrame', true)
                }
            }).catch(err => console.log('Youtube search error: ', err))
    }

    addPlaylist(playlistName) {
        const { userid } = this.props.user_data.user
            , { get_playlists, handle_modal } = this.props;
        axios.post(`${REACT_APP_PLAYLISTS}/${userid}`, {playlist_name: playlistName}).then( res => {
            console.log('Playlist created on server: ', res.data)
            get_playlists(userid).then( () => {
                handle_modal('createPlaylist', false)
                this.setState({
                    okButton: true
                })
            })
        }).catch(err => console.log('Error getting playlists: ', err))
    }

    renamePlaylist(id, playlistName) {
        const { userid } = this.props.user_data.user
            , { get_playlists, handle_modal } = this.props;
        axios.put(`${REACT_APP_PLAYLISTS}/${id}`, {newName: playlistName}).then( res => {
            console.log('Playlist renamed on server: ', res.data)
            get_playlists(userid)
            handle_modal('renamePlaylist', false)
        }).catch(err => console.log('Error renaming playlist: ', err))
    }

    removePlaylist(idToRemove) {
        const { userid } = this.props.user_data.user
            , { get_playlists, changeIndex, handle_modal } = this.props;
        axios.delete(`${REACT_APP_PLAYLISTS}/${idToRemove}`).then( res => {
            changeIndex(0)
            get_playlists(userid)
            handle_modal('removePlaylist', false)
        }).catch(err => console.log(`Error removing playlist ${idToRemove}: `, err))
        
    }

    clearPlaylist(idToRemove) {
        const { userid } = this.props.user_data.user
            , { get_playlists, handle_modal } = this.props;
        axios.delete(`${REACT_APP_CLEAR_ALL}/${idToRemove}`).then( res => {
            get_playlists(userid)
            handle_modal('clearTracks', false)
        }).catch(err => console.log(`Error clearing all tracks from playlist ${idToRemove}: `, err))
        
    }

    render() {
        const style = {
            background: '#29434e'
        };
        const { anchorEl, youTubeResult, okButton, playlistName } = this.state;

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

        const { lastPlaylist, removePlaylist, clearTracks, renamePlaylist, createPlaylist, tooManyPl, sharePl, notOnSpotify, youTubeFrame, notOnYoutube, resetPrefs } = this.props.modals;

        const { current_index, playlists, indexMatrix } = this.props.user_data
            , playlistId = indexMatrix[current_index];

        const { handle_modal, search } = this.props
            , { playBtnSearch } = search
            , { track, artist } = playBtnSearch;

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

                {
                    // Not On Spotify Dialog
                }
                <Dialog
                    open={ notOnSpotify }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Not on Spotify'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            We're having trouble locating that track on Spotify. Do you want to see if it's on YouTube instead?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={ () => this.searchYoutube(track, artist) }>
                            Sure
                        </Button>
                        <Button color="default" onClick={ () => handle_modal('notOnSpotify', false) }>
                            No Thanks
                        </Button>
                    </DialogActions>
                </Dialog>
            
                {
                    // Last Playlist Dialog
                }
                <Dialog
                    open={ lastPlaylist }
                    onClose={ this.closeAlert }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Only Playlist'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            It looks like you don't have any other playlists. Please press 
                            <IconButton
                                aria-label="clear-all-button-example"
                                color="secondary"
                            >
                                <ClearAll/>
                            </IconButton> 
                            below if you want to start over.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={ () => handle_modal('lastPlaylist', false) }>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {
                    // Too Many Playlists Dialog
                }
                <Dialog
                    open={ tooManyPl }
                    onClose={ this.closeAlert }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Playlist Limit'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Standard users are allowed three playlists. 
                            Premium users can create up to ten playlists. 
                            Click <Link to="/premium">here</Link> if you would like to upgrade.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={ () => handle_modal('tooManyPl', false) }>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {
                    // Remove Playlist Warning
                }
                <Dialog
                    open={ removePlaylist }
                    onClose={ this.closeAlert }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Delete Confirmation'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this playlist?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={ () => this.removePlaylist(playlistId) }>
                            Yes
                        </Button>
                        <Button color="default" onClick={ () => handle_modal('removePlaylist', false) }>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {
                    // Clear All Tracks Warning
                }
                <Dialog
                    open={ clearTracks }
                    onClose={ this.closeAlert }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Clear All'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to remove all tracks from this playlist?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={ () => this.clearPlaylist(playlistId) }>
                            Yes
                        </Button>
                        <Button color="primary" onClick={ () => handle_modal('clearTracks', false) }>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>

                {
                    // Create and Name Playlist Dialog
                }
                <Dialog
                    open={ createPlaylist }
                    onClose={ this.closeAlert }
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Choose a Name</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            What would you like to call your new playlist?
                        </DialogContentText>
                        <TextField autoFocus margin="dense" onChange={ e => this.handleInput(e.target.value )} placeholder="New Playlist" id="name" label="Playlist Name" type="text" value={ playlistName }/>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={ okButton } color="primary" onClick={ () => this.addPlaylist(playlistName) }>
                            Create
                        </Button>
                        <Button color="default" onClick={ () => handle_modal('createPlaylist', false) }>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            
                {
                    // Rename Playlist Dialog
                }
                <Dialog
                    open={ renamePlaylist }
                    onClose={ this.closeAlert }
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Rename</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            What would you like to call this playlist?
                        </DialogContentText>
                        <TextField autoFocus margin="dense" onChange={ e => this.handleInput(e.target.value )} placeholder={ playlists[current_index].playlist_name } id="name" label="Playlist Name" type="text" value={ playlistName }/>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={ okButton } color="primary" onClick={ () => this.renamePlaylist(playlistId, playlistName) }>
                            Save
                        </Button>
                        <Button color="default" onClick={ () => handle_modal('renamePlaylist', false) }>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            
                {
                    // Share Playlist Dialog
                }
                <Dialog
                    open={ sharePl }
                    onClose={ handle_modal }
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Share Playlist</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            How would you like to share?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary">
                            Spotify
                        </Button>
                        <Button color="secondary">
                            Email
                        </Button>
                        <Button color="default" onClick={ () => handle_modal('sharePl', false) }>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {
                    // YouTube Frame
                }
                <Dialog
                    open={ youTubeFrame }
                    onClose={ handle_modal }
                >
                    <DialogContent>
                    <YoutubeFrame vidId={ youTubeResult }/>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={ () => handle_modal('youTubeFrame', false) }>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                {
                    // 
                }
                <Dialog
                    open={ notOnYoutube }
                    onClose={ handle_modal }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Not on Youtube'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            It appears that this track can't be found on YouTube either.
                            Please try a web search...
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={ () => handle_modal('notOnYoutube', false) }>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { handle_modal } )(withRouter(NavBar));