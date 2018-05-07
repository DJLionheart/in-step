import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';
import ButtonBar from './ButtonBar/ButtonBar';
import PlaylistContainer from './PlaylistContainer/PlaylistContainer';

import './PlaylistManager.css'


class PlaylistManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
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
                ]},
                {name: 'Playlist 2', tracks: []},
                {name: 'Playlist 3', tracks: []}
            ]
        }
        this.handleTab = this.handleTab.bind(this);

    }
    handleTab(event, value) {
        this.setState({
            tabIndex: value
        })
    }

    addPlaylist() {
        this.setState({
            playlists: [...this.state.playlists, {name: 'New Playlist', tracks: []}]
        })
    }

    render() {
        const { tabIndex, playlists } = this.state;

        const playlistContents = playlists.map( (playlist, i) => {
            return (
                <div key={ playlist.name }>
                    { tabIndex === i && <PlaylistContainer playlist={ playlist }/> }
                </div>
            )
        })

        const playlistTabs = playlists.map( (playlist, i) => {
            return <Tab label={ playlist.name } key={ i } className="playlist-tab"/>
        })



        // const tabContents = this.state.playlists.map( (playlist, i) => {
        //     const { tabIndex } = this.state;
        //     return (
        //         { tabIndex === i && ()}
        //     )
        // })
        return(
            <main>
                <h1>PlaylistManager</h1>
                <AppBar position="static">
                <Tabs value={ tabIndex } onChange={ this.handleTab }>
                    { playlistTabs }
                </Tabs>
                </AppBar>
                { playlistContents }
                <ButtonBar/>
            </main>
        )
    }
}

export default PlaylistManager;
