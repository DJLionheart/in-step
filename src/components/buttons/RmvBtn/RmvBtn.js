import React from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


import { remove_track } from '../../../ducks/users';

function RmvBtn(props) {
    const { track, remove_track } = props
        , { track_num } = track
        , { current_index, indexMatrix } = props.user_data
        , plId = indexMatrix[current_index];

    return(
        <IconButton
            aria-label="Remove from playlist"
            color="default" onClick={ () => remove_track(plId, track_num) }
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

export default connect(mapStateToProps, { remove_track })(RmvBtn);

