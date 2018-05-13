import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ClearAll from '@material-ui/icons/ClearAll';
// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';

import { changeIndex, add_playlist, rename_playlist, remove_playlist, clear_all } from '../../ducks/users';

import ButtonBar from './ButtonBar/ButtonBar';
import PlaylistContainer from './PlaylistContainer/PlaylistContainer';

import './PlaylistManager.css'


class PlaylistManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastPl: false,
            plDeleteConf: false,
            clearAllConf: false,
            namePl: false,
            tooMany: false,
            premiumUser: false,
            sharePl: false,
            renamePl: false,
            playlistName: '',
            okButton: true
        }
        this.handleTab = this.handleTab.bind(this);
        this.addPlaylist = this.addPlaylist.bind(this);
        this.removePlaylist = this.removePlaylist.bind(this);
        this.clearPlaylist = this.clearPlaylist.bind(this);
        this.openAlert = this.openAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);

    }
    
    openAlert(alertName) {
        this.setState({
            [alertName]: true
        })
    }
    
    closeAlert(dialog_name) {
        this.setState({
            [dialog_name]: false,
            okButton: true
        })
    }

    handleInput(e) {
        this.setState({
            playlistName: e,
            okButton: false
        })
    }

    handleTab(event, value) {
        this.props.changeIndex(value)
    }
    
    addPlaylist(playlistName) {
        const { userid } = this.props.user_data.user
        this.props.add_playlist(userid, playlistName)
        this.closeAlert('namePl')
    }

    renamePlaylist(playlistName) {
        const { current_index, indexMatrix } = this.props.user_data.user
            , plIdToRename = indexMatrix[current_index]
        this.props.rename_playlist(plIdToRename, playlistName)
        this.closeAlert('renamePl')
    }

    removePlaylist(idToRemove) {
        remove_playlist(idToRemove)
        this.closeAlert('plDeleteConf')
    }

    clearPlaylist(idToRemove) {
        this.props.clear_all(idToRemove)
        this.closeAlert('clearAllConf')
    }


    render() {
        const { lastPl, plDeleteConf, namePl, sharePl, renamePl, playlistName, okButton, tooMany, clearAllConf } = this.state
            , { current_index, playlists, indexMatrix } = this.props.user_data
            , playlistId = indexMatrix[current_index];

        const playlistContents = playlists.map( (playlist, i) => {
            return (
                <div key={ playlist.playlist_name }>
                    { current_index === i && <PlaylistContainer removeSong={ this.removeSong }playlist={ playlist }/> }
                </div>
            )
        })

        const playlistTabs = playlists.map( (playlist, i) => {
            return <Tab label={ playlist.playlist_name } key={ i } className="playlist-tab"/>
        })

        return(
            <main>
                <AppBar position="static">
                    <Tabs value={ current_index } onChange={ this.handleTab }>
                        { playlistTabs }
                    </Tabs>
                </AppBar>
                { playlistContents }
                <ButtonBar
                    openAlert={ this.openAlert }/>
                {
                    // Last Playlist Dialog
                }
                <Dialog
                    open={ lastPl }
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
                        <Button color="primary" onClick={ () => this.closeAlert('lastPl') }>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {
                    // Too Many Playlists Dialog
                }
                <Dialog
                    open={ tooMany }
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
                        <Button color="primary" onClick={ () => this.closeAlert('tooMany') }>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {
                    // Remove Playlist Warning
                }
                <Dialog
                    open={ plDeleteConf }
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
                        <Button color="default" onClick={ () => this.closeAlert('plDeleteConf') }>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
                
                {
                    // Clear All Tracks Warning
                }
                <Dialog
                    open={ clearAllConf }
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
                        <Button color="primary" onClick={ () => this.closeAlert('clearAllConf') }>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>

                {
                    // Create and Name Playlist Dialog
                }
                <Dialog
                    open={ namePl }
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
                        <Button color="default" onClick={ () => this.closeAlert('namePl')}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            
                {
                    // Rename Playlist Dialog
                }
                <Dialog
                    open={ renamePl }
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
                        <Button disabled={ okButton } color="primary" onClick={ () => this.renamePlaylist(playlistName) }>
                            Save
                        </Button>
                        <Button color="default" onClick={ () => this.closeAlert('renamePl')}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            
                {
                    // Share Playlist Dialog
                }
                <Dialog
                    open={ sharePl }
                    onClose={ this.closeAlert }
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
                        <Button color="default" onClick={ () => this.closeAlert('sharePl')}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps, { changeIndex, add_playlist, rename_playlist, remove_playlist, clear_all })(PlaylistManager);
