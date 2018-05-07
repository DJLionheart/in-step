import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
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
            dialogOpen: false,
            playlists: [
                {name: 'Playlist 1', tracks: [
                    {
                        artist_name: "Dreams Come True",
                        bpm: 180,
                        track_genre: "J-Pop",
                        track_id: 39,
                        track_name: "The Swinging Star",
                        track_year: 1992
                    },
                    {
                        artist_name: "Greeeen",
                        bpm: 176,
                        track_genre: "J-Pop",
                        track_id: 845,
                        track_name: "Kimi Omoi",
                        track_year: 2009
                    }
                ]}
            ]
        }
        this.handleTab = this.handleTab.bind(this);
        this.addPlaylist = this.addPlaylist.bind(this);
        this.removePlaylist = this.removePlaylist.bind(this);
        this.openAlert = this.openAlert.bind(this);
        this.closeAlert = this.closeAlert.bind(this);

    }
    handleTab(event, value) {
        this.props.changeIndex(value)
    }

    addPlaylist() {
        const playlistNumber = this.props.user_data.playlists.length + 1;
        this.props.add_playlist(playlistNumber)
    }

    removePlaylist(index) {
        if(this.props.user_data.playlists.length > 1) {
            this.props.remove_playlist(index)
        } else {
            this.openAlert()
        }
    }

    openAlert() {
        this.setState({
            dialogOpen: true
        })
    } 

    closeAlert() {
        this.setState({
            dialogOpen: false
        })
    }

    render() {
        const { dialogOpen } = this.state
            , { current_index, playlists } = this.props.user_data;

        const playlistContents = playlists.map( (playlist, i) => {
            return (
                <div key={ playlist.name }>
                    { current_index === i && <PlaylistContainer playlist={ playlist }/> }
                </div>
            )
        })

        const playlistTabs = playlists.map( (playlist, i) => {
            return <Tab label={ playlist.name } key={ i } className="playlist-tab"/>
        })

        return(
            <main>
                <h1>PlaylistManager</h1>
                <AppBar position="static">
                <Tabs value={ current_index } onChange={ this.handleTab }>
                    { playlistTabs }
                </Tabs>
                </AppBar>
                { playlistContents }
                <ButtonBar
                    addPlaylist={ this.addPlaylist }
                    removePlaylist={ this.removePlaylist }/>
                <Dialog
                    open={ dialogOpen }
                    onClose={ this.closeAlert }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Default Playlist'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            It looks like you don't have any other playlists. Please press the Clear button below if you want to start over.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={ this.closeAlert }>
                            OK
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

export default connect(mapStateToProps, { changeIndex, add_playlist, remove_playlist })(PlaylistManager);
