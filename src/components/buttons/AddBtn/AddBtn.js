import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import filter from 'lodash/filter';

import IconButton from 'material-ui/IconButton';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import { get_playlists } from '../../../ducks/users';

const { REACT_APP_ADD_RMV_TR } = process.env;


function AddBtn(props) {
    const { get_playlists, track } = props
        , { track_id } = track
        , { playlists, current_index, indexMatrix, user } = props.user_data
        , { userid } = user
        , plId = indexMatrix[current_index];

    const addTrack = (plId, trackId) => {
        axios.post(`${REACT_APP_ADD_RMV_TR}/${plId}`, {track_id: trackId}).then( res => {
            console.log(`Track ${trackId} added to Playlist ${plId}: `, res.data)
            get_playlists(userid)
        }).catch(err => console.log('Error adding track: ', err))
    }

    const removeTrack = (plId, trackNum) => {
        axios.delete(`${REACT_APP_ADD_RMV_TR}/${plId}?track_num=${trackNum}`).then( res => {
            get_playlists(userid)
        }).catch(err => console.log('Error adding track: ', err))
    }


    let color = '',
        func = null,
        ariaLabel = '',
        inPlaylist = filter(playlists[current_index].tracks, {track_id: track.track_id});

    if( inPlaylist.length >= 1 ) {
        color = 'secondary';
        func = () => {
            removeTrack(plId, inPlaylist[0].track_num);
            get_playlists(userid)
        }
        ariaLabel = "Remove from playlist"
    } else {
        color = 'default';
        func = () => {
            addTrack(plId, track_id)
            get_playlists(userid)
        };
        ariaLabel = "Add to playlist"
    }

    return(
        <IconButton 
            aria-label={ ariaLabel } 
            color={ color } onClick={ func }
        >
            <PlaylistAdd/>
        </IconButton>   
    )
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps, { get_playlists })(AddBtn);