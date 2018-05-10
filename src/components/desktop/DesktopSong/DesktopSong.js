import React, { Component } from 'react';
import { connect } from 'react-redux';
import { includes } from 'lodash';

import { TableRow, TableCell } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

import './DesktopSong.css';

class DesktopSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            playlist: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    

    handleClick(icon) {
        const { playlists, current_index } = this.props.user_data
            // , { track_id, playlist_id } = this.props;
        switch( icon ) {
            case 'favorite':
                this.setState({
                    favorite: this.state.favorite ? false : true
                })
                break;

            case 'playlist':
                if( !includes(playlists[current_index].track_id, ) ) {
                    this.setState({
                        playlist: this.state.playlist ? false : true
                    })
                    // add_song(playlist_id, track_id)
                } else {
                    this.openAlert('addedWarning')
                }

                break;
            
            default:
                break;
        }
    }

    render() {
        const { favorite, playlist } = this.state;
        const { track_num, bpm, track_name, artist_name, track_genre,  addBtn, rmvBtn } = this.props;
        return(
            <TableRow>
                {
                    track_num !== ''
                        ? <TableCell>{ track_num }</TableCell>
                        : null
                }
                <TableCell numeric>{ bpm }</TableCell>
                <TableCell>{ track_name }</TableCell>
                <TableCell>{ artist_name }</TableCell>
                <TableCell>{ track_genre }</TableCell>
                <TableCell>
                    <IconButton aria-label="Play" color="primary"><PlayArrow/></IconButton>
                    <IconButton aria-label="Favorite" color={ favorite ? 'primary' : 'default'} onClick={ () => this.handleClick('favorite') }>{ favorite ? <Favorite/> : <FavoriteBorder/> }</IconButton>
                    {
                        addBtn ? <IconButton aria-label="Add to playlist" color={ playlist ? 'secondary' : 'default' } onClick={ () => this.handleClick('playlist') }><PlaylistAdd/></IconButton> : null
                    }
    
                    {
                        rmvBtn ? <IconButton aria-label="Remove from playlist" color="default" value="remove" onClick={ () => this.handleClick('playlist') }><DeleteIcon/></IconButton> : null
                    }
                </TableCell>
            </TableRow>            
        )
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps)(DesktopSong);
