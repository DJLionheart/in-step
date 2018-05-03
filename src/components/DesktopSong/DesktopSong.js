import React from 'react';

import { TableRow, TableRowColumn } from 'material-ui/Table';

import { PlayArrow, PlaylistAdd, FavoriteBorder } from '@material-ui/icons'

import './DesktopSong.css';


function Song (props) {
    const { bpm, track_name, artist_name, track_genre } = props;
    return(
        <TableRow>
            <TableRowColumn>{ bpm }</TableRowColumn>
            <TableRowColumn>{ track_name }</TableRowColumn>
            <TableRowColumn>{ artist_name }</TableRowColumn>
            {/* <TableRowColumn>{ track_mix }</TableRowColumn> */}
            <TableRowColumn>{ track_genre }</TableRowColumn>
            <TableRowColumn>
                <PlayArrow/>
                <FavoriteBorder/>
                <PlaylistAdd/>
            </TableRowColumn>
        </TableRow>            
    )
}

export default Song;
