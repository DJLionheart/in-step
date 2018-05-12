import React from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';

import IconButton from 'material-ui/IconButton';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

import { add_track, remove_track } from '../../../ducks/users';

function AddBtn(props) {
    const { track, add_track, remove_track } = props
        , { track_num } = track
        , { playlists, current_index, indexMatrix } = props.user_data
        , plId = indexMatrix[current_index];

    let color = '',
        func = null,
        ariaLabel = '',
        inPlaylist = filter(playlists[current_index].tracks, {track_id: track.track_id});

    if( inPlaylist.length >= 1 ) {
        color = 'secondary';
        func = () => remove_track(plId, track_num);
        ariaLabel = "Remove from playlist"
    } else {
        color = 'default';
        func = () => add_track(plId, track);
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

export default connect(mapStateToProps, { add_track, remove_track })(AddBtn);