import React, { Component } from 'react';
import { Tabs, Tab, RaisedButton } from 'material-ui';
import { Plus } from '@material-ui/icons';
import MediaQuery from 'react-responsive';

import MobilePlaylist from '../mobile/MobilePlaylist/MobilePlaylist';
import DesktopPlaylist from '../desktop/DesktopPlaylist/DesktopPlaylist';
import ButtonBar from './ButtonBar/ButtonBar';

import './PlaylistManager.css'


class PlaylistManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    }

    addPlaylist() {
        this.setState({
            playlists: [...this.state.playlists, {name: 'New Playlist', tracks: []}]
        })
    }

    render() {

        const playlistTabs = this.state.playlists.map( (playlist, i) => {
            return(
                <Tab label={ playlist.name } key={ i } className="playlist-tab">
                    <MediaQuery query="(max-device-width: 1223px)">
                        <MobilePlaylist name={ playlist.name } tracks={ playlist.tracks } className="playlist-contents"/>
                    </MediaQuery>
                    <MediaQuery query="(min-device-width: 1224px)">
                        <DesktopPlaylist name={ playlist.name } tracks={ playlist.tracks } className="playlist-contents"/>
                    </MediaQuery>
                <ButtonBar/>
                </Tab>

            )
        })
        return(
            <main>
                <h1>PlaylistManager</h1>
                <Tabs>
                    { playlistTabs }
                </Tabs>
                <div className="add-playlist">
                    <RaisedButton label="New Playlist"/>

                </div>
            </main>
        )
    }
}

export default PlaylistManager;
