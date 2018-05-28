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

import logo from '../../logos/instep.png';

import { handle_modal } from '../../ducks/modals';
import { get_user, apply_prefs, get_playlists, log_out, changeIndex } from '../../ducks/users';
import './NavBar.css'

import YoutubeFrame from '../YoutubeFrame/YoutubeFrame';

const { 
    REACT_APP_AUTH_ME,
    REACT_APP_USERS,
    REACT_APP_HOME_URL,
    REACT_APP_YT_KEY,
    REACT_APP_YT_URL,
    REACT_APP_PLAYLISTS,
    REACT_APP_CLEAR_ALL,
    REACT_APP_LOGOUT
} = process.env;

class NavBar extends Component {
    constructor() {
        super();
        this.state={
            anchorEl: null,
            currentLocation: 'profile',
            location: 'Profile',
            youTubeResult: '',
            okButton: true,
            playlistName: ''
        }

        this.handleNav = this.handleNav.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.searchYoutube = this.searchYoutube.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        // this.savePlaylist = this.savePlaylist.bind(this);
    }

    componentDidMount() {
        const { get_user, get_playlists, apply_prefs, user_data } = this.props
            , { user, playlists } = user_data;

        if( playlists.length === 0 || user === {}) {
                axios.get(REACT_APP_AUTH_ME).then( res => {
                // console.log('USER: ', res.data)
                
                get_user(res.data)
                const { userid } = res.data;

                axios.get(`${REACT_APP_PLAYLISTS}/${userid}`).then( resp => {
                    if(resp.data.length === 0) {
                        axios.post(`${REACT_APP_PLAYLISTS}/${userid}`, {playlist_name: 'Playlist 1'})
                        .then( result => {
                            console.log(result)
                            get_playlists(userid)

                        }
                        ).catch(err => console.log('Error creating playlist: ', err))
                    } else {
                        get_playlists(userid)
                    }
                })
                axios.get(`${REACT_APP_USERS}?userid=${userid}`).then( response => {
                    apply_prefs(response.data)
                })
            })
        }
    }

    handleNav(evt) {
        this.setState({
            anchorEl: evt.currentTarget
        })
    }

    handleClose(page) {
        this.setState({
            anchorEl: null
        })
        this.props.history.push(page.path)
        this.setState({
            location: page.name
        })

    }

    handleInput(e) {
        this.setState({
            playlistName: e,
            okButton: false
        })
    }

    handleLogout() {
        axios.post(REACT_APP_LOGOUT).then( () => {
            this.props.log_out()
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
                    // console.log('Youtube Results: ', res.data)
                    this.setState({
                        youTubeResult: res.data.items[0].id.videoId
                    })
    
                    handle_modal('youTubeFrame', true)
                }
            }).catch(err => console.log('Youtube search error: ', err))
    }

    // savePlaylist() {
    //     let trackContainer = []
    //     const { handle_modal } = this.props
    //         , { user, playlists, current_index } = this.props.user_data
    //         , { auth_id, access_token } = user
    //         , { playlist_name } = playlists[current_index].playlist_name;
        
    //     handle_modal('sharePl', false)

    //     const searchForId = (track, artist) => {
    //         const config = {
    //             headers: {'Authorization': 'Bearer ' + access_token }
    //         }
            
    //         axios.get(`https://api.spotify.com/v1/search?q=track:'${track}'%20artist:'${artist}'&type=track&limit=5`, config)
    //             .then( res => {
    //                 let spotifyResults = res.data.tracks.items[0];
    //                 console.log('Spotify results: ', res.data.tracks.items[0])
    //                 if(spotifyResults) {
    //                     trackContainer.push(spotifyResults.track_id)
    //                 }
    //         }).catch(err => console.log('Search for id error: : ', err));
    //     }
        
    //     const plConfig = {
    //         headers: {
    //             'Authorization': 'Bearer ' + access_token,
    //             'Content-Type': 'application/json'
    //         },
    //         data: {
    //             name: JSON.stringify({name: playlist_name, public: false})
    //         }
    //     }
    //     axios.post(`https://api.spotify.com/v1/users/${auth_id}/playlists`, plConfig)
    //         .then( res => {
    //             console.log('Spotify playlist created: ', res.data)
    //             let spotifyPlaylistId = res.data.id

    //             let stack = [];

    //             playlists[current_index].tracks.forEach( track => {
    //                 stack.push(searchForId(track.track_name, track.artist_name))
    //             })

    //             Promise.all(stack).then( () => {
    //                 console.log('Stack after promise.all: ', stack)
    //                 console.log('Track container: ', trackContainer)
    //             })
    //     }).catch(err => console.log('Play button error: ', err));
    // }

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
            handle_modal('removePlaylist', false)
            get_playlists(userid)
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

    logout() {
        axios.post(REACT_APP_LOGOUT).then( () => {
            this.props.log_out();
            this.props.history.push(REACT_APP_HOME_URL)
        })
    }

    render() {

        const style = {
            background: '#29434e'
        };
        const { anchorEl, youTubeResult, okButton, playlistName } = this.state;

        const navHeaders = [
            {name: 'Profile', path: '/profile'},
            {name: 'Search', path: '/search'},
            {name: 'Playlist Manager', path: '/playlist_manager'}
        ]

        const navLinks = navHeaders.map( (page, i) => {
            return <MenuItem key={ i } onClick={ () => this.handleClose(page) }>{ page.name }</MenuItem>
        })

        // let navLocation = '';

        // switch( this.props.location.pathname ) {
        //     case '/profile':
        //         navLocation = 'Profile';
        //         break;

        //     case '/search':
        //         navLocation = 'Search';
        //         break;

        //     case '/playlist_manager':
        //         navLocation = 'Playlist Manager';
        //         break;
            
        //     default:
        //         navLocation = ''
        //         break;
        // }
        const { location } = this.state;

        const { lastPlaylist, removePlaylist, clearTracks, renamePlaylist, createPlaylist, tooManyPl, sharePl, notOnSpotify, youTubeFrame, notOnYoutube } = this.props.modals;

        const { current_index, playlists, indexMatrix } = this.props.user_data
            , playlistId = indexMatrix[current_index];

        const { handle_modal, search } = this.props
            , { playBtnSearch } = search
            , { track, artist } = playBtnSearch;

        return(
            <div className="nav-bar">
                <AppBar position="fixed" style={ style }>
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
                            <Typography variant="headline" color="inherit">
                                { location }
                            </Typography>
                            <div className="logo">
                                <img src={ logo } alt="instep logo"/>
                            </div>
                            <Menu className="nav-bar"
                                anchorEl={ anchorEl }
                                open={ Boolean(anchorEl)}
                                onClose={ this.handleClose }
                            >
                                { navLinks }
                                <MenuItem onClick={ this.handleLogout }>Logout</MenuItem>
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
                        <TextField autoFocus margin="dense" onChange={ e => this.handleInput(e.target.value )} placeholder={ playlists.length > 0 ? playlists[current_index].playlist_name : 'Playlist Name' } id="name" label="Playlist Name" type="text" value={ playlists.length > 0 ? playlistName : '' }/>
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
                    <DialogTitle id="form-dialog-title">Save Playlist</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Would you like to save this playlist to spotify?
                        </DialogContentText>
                        <Typography variant="caption">
                            Note: only tracks actually found on Spotify will be saved.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={ this.savePlaylist }>
                            Yes
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

export default connect(mapStateToProps, { handle_modal, get_playlists, log_out, changeIndex, get_user, apply_prefs } )(withRouter(NavBar));