import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
// import Button from 'material-ui/Button';
// import Typography from 'material-ui/Typography';

import { changeIndex } from '../../ducks/users';

import ButtonBar from './ButtonBar/ButtonBar';
import PlaylistContainer from './PlaylistContainer/PlaylistContainer';

import './PlaylistManager.css'


function PlaylistManager(props) {
    
    const handleTab = (event, value) => {
        props.changeIndex(value)
    }

    const { current_index, playlists } = props.user_data

    const playlistContents = playlists.map( (playlist, i) => {
        return (
            <div key={ playlist.playlist_name }>
                { current_index === i && <PlaylistContainer playlist={ playlist }/> }
            </div>
        )
    })

    const playlistTabs = playlists.map( (playlist, i) => {
        return <Tab label={ playlist.playlist_name } key={ i } className="playlist-tab"/>
    })

    return(
        <main>
            <AppBar position="static">
                <Tabs value={ current_index } onChange={ handleTab }>
                    { playlistTabs }
                </Tabs>
            </AppBar>
            { playlistContents }
            <ButtonBar/>  
        </main>
    )
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps, { changeIndex })(PlaylistManager);
