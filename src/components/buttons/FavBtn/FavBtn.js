import React from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';

import IconButton from 'material-ui/IconButton';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';



function FavBtn(props) {
    const { track_id, btnFunc } = props;
    const { favorite_tracks } = props.user_data

    let inFavorites = filter( favorite_tracks, {track_id: track_id});

    return(
        <IconButton 
            aria-label="Favorite"
            color={ inFavorites ? 'primary' : 'default' }
            onClick={ () => btnFunc(track_id) }
        >
            {
                inFavorites ? <Favorite/> : <FavoriteBorder/>
            }
        </IconButton>
    )
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps)(FavBtn);