import React from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';

import IconButton from 'material-ui/IconButton';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import { get_playlists } from '../../../ducks/users';


function AddBtn(props) {
    const { track_id, btnFunc } = props;
    const { playlists, current_index, userid } = props.user_data


    const onPlaylist = filter( playlists[current_index].tracks, {track_id: track_id})
    console.log('On playlist: ', onPlaylist)
    let color = '';

    if(onPlaylist.length >= 1 ) {
        color = 'secondary';
    } else {
        color = 'default';
    }


    return(
        <IconButton 
            aria-label="Add to playlist" 
            color={ color } onClick={ () => btnFunc(track_id).then( res => get_playlists(userid)) }
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