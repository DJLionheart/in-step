import React from 'react';

import { TableRow, TableCell } from 'material-ui/Table';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';

import './DesktopSong.css';


function DesktopSong (props) {
    const { playlist_track_number, bpm, track_name, artist_name, track_genre,  addBtn, rmvBtn } = props;
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
                <IconButton aria-label="Favorite" color="default"><FavoriteBorder/></IconButton>
                {
                    addBtn ? <IconButton aria-label="Add to playlist" color="secondary"><PlaylistAdd/></IconButton> : null
                }

                {
                    rmvBtn ? <IconButton aria-label="Remove from playlist"><DeleteIcon/></IconButton> : null
                }
            </TableCell>
        </TableRow>            
    )
}

export default DesktopSong;
