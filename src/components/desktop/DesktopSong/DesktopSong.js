import React, { Component } from 'react';

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
        this.handleColor = this.handleColor.bind(this);
    }

    handleColor(icon) {
        switch( icon ) {
            case 'favorite':
                this.setState({
                    favorite: this.state.favorite ? false : true
                })
                break;

            case 'playlist':
                this.setState({
                    playlist: this.state.playlist ? false : true
                })
                break;
            
            default:
                break;
        }
    }

    render() {
        const { favorite, playlist } = this.state;
        const { playlist_track_number, bpm, track_name, artist_name, track_genre,  addBtn, rmvBtn } = this.props;
        return(
            <TableRow>
                {
                    playlist_track_number !== ''
                        ? <TableCell>{ playlist_track_number }</TableCell>
                        : null
                }
                <TableCell numeric>{ bpm }</TableCell>
                <TableCell>{ track_name }</TableCell>
                <TableCell>{ artist_name }</TableCell>
                {/* <TableCell>{ track_mix }</TableCell> */}
                <TableCell>{ track_genre }</TableCell>
                <TableCell>
                    <IconButton aria-label="Play" color="primary"><PlayArrow/></IconButton>
                    <IconButton aria-label="Favorite" color={ favorite ? 'primary' : 'default '} onClick={ () => this.handleColor('favorite') }>{ favorite ? <Favorite/> : <FavoriteBorder/> }</IconButton>
                    {
                        addBtn ? <IconButton aria-label="Add to playlist" color={ playlist ? 'secondary' : 'default' } onClick={ () => this.handleColor('playlist') }><PlaylistAdd/></IconButton> : null
                    }
    
                    {
                        rmvBtn ? <IconButton aria-label="Remove from playlist" color="default" value="remove" onClick={ this.handleColor }><DeleteIcon/></IconButton> : null
                    }
                </TableCell>
            </TableRow>            
        )
    }
}

export default DesktopSong;
