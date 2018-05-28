import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { get_playlists } from '../../../ducks/users';

const { REACT_APP_ADD_RMV_TR } = process.env;


function RmvBtn(props) {
    const { track, get_playlists } = props
        , { track_num } = track
        , { current_index, indexMatrix, user } = props.user_data
        , { userid } = user
        , plId = indexMatrix[current_index];

    const removeTrack = (plId, trackNum) => {
        axios.delete(`${REACT_APP_ADD_RMV_TR}/${plId}?track_num=${trackNum}`).then( res => {
            // console.log(` remove_track query sent: `, res.data)
            get_playlists(userid)
        }).catch(err => console.log('Error adding track: ', err))
    }


    return(
        <IconButton
            aria-label="Remove from playlist"
            color="default" onClick={ () => removeTrack(plId, track_num) }
        >
            <DeleteIcon/>
        </IconButton>   
    )
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps, { get_playlists })(RmvBtn);

