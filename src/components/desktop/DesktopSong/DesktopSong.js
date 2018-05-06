import React from 'react';

import { TableRow, TableCell, IconButton } from 'material-ui/Table';

import { PlayArrow, PlaylistAdd, FavoriteBorder, Delete } from '@material-ui/icons'

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
            <TableCell>{ bpm }</TableCell>
            <TableCell>{ track_name }</TableCell>
            <TableCell>{ artist_name }</TableCell>
            {/* <TableCell>{ track_mix }</TableCell> */}
            <TableCell>{ track_genre }</TableCell>
            <TableCell>
                <PlayArrow/>
                <FavoriteBorder/>
                {
                    addBtn ? <IconButton><PlaylistAdd/></IconButton> : null
                }

                {
                    rmvBtn ? <IconButton><Delete/></IconButton> : null
                }
            </TableCell>
        </TableRow>            
    )
}

export default DesktopSong;
