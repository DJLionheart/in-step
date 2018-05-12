import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ClearAll from '@material-ui/icons/ClearAll';
// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';

import { changeIndex, add_playlist, remove_playlist } from '../../ducks/users';

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
            playlistName: '',
            okButton: true
        }
        this.handleTab = this.handleTab.bind(this);
        this.addPlaylist = this.addPlaylist.bind(this);
        this.removePlaylist = this.removePlaylist.bind(this);
        this.namePlaylist = this.namePlaylist.bind(this);
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
            [dialog_name]: false
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
            ,  { add_playlist } = this.props;
        add_playlist(userid, playlistName)
        this.closeAlert('namePl')
    }

    removePlaylist(idToRemove) {
        const { user, playlists } = this.props.user_data
            , { userid } = user;

        if( playlists.length > 1) {
            remove_playlist(userid, idToRemove)
        } else {
            this.openAlert('')
        }
    }

    // Song Controlls - Remove
    removeSong(id) {
        const { indexMatrix, current_index, userid } = this.props.user_data
            , { get_playlists } = this.props
            , plId = indexMatrix[current_index];
        
        axios.delete(`/api/playlists/manage/${plId}?track_id=${id}`).then( () => {
            get_playlists(userid)
        })
    }

    // Song Controlls - Favorite



    render() {

        const { deleteDialog, nameDialog, playlistName, okButton } = this.state
            , { current_index, playlists } = this.props.user_data;

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

                <Dialog
                    open={ deleteDialog }
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
                        <Button color="primary" onClick={ () => this.closeAlert('deleteDialog') }>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            
                <Dialog
                    open={ nameDialog }
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
                            OK
                        </Button>
                        <Button color="secondary" onClick={ () => this.closeAlert('nameDialog')}>
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

export default connect(mapStateToProps, { changeIndex, add_playlist })(PlaylistManager);
