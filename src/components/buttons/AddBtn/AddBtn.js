import React, { Component } from 'react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';

import IconButton from 'material-ui/IconButton';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';

class AddBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'default'
        }
    }

    componentDidMount(props) {
        const { track_id } = this.props;
        const { playlists, current_index } = this.props.user_data
        const onPlaylist = filter( playlists[current_index].tracks, {track_id: track_id})
        if(onPlaylist.length >= 1 ) {
            this.setState({
                color: 'secondary'
            })
        }
    }

    render() {
        const { track_id, btnFunc } = this.props;
        const { color } = this.state;

        return(
            <IconButton 
                aria-label="Add to playlist" 
                color={ color } onClick={ () => btnFunc(track_id) }
            >
                <PlaylistAdd/>
            </IconButton>   
        )
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps)(AddBtn);