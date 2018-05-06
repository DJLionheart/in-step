import React from 'react';
import { Paper, Table, TableBody, TableHead, TableRow, TableCell } from 'material-ui';

import DesktopSong from '../../desktop/DesktopSong/DesktopSong'
import { Typography } from 'material-ui';

function DesktopPlaylist(props) {
    const headerNames = ['#', 'BPM', 'Track Name', 'Artist', 'Genre', 'Options']

    const tableHeaders = headerNames.map( (column, i) => {
        return(
            <TableCell key={ i }>
                <Typography variant="title">
                    { column }
                </Typography>
            </TableCell>
        )
    })
    const { name, tracks } = props;

    const playlistSongs = tracks.map( (track, i) => {
        const { bpm, track_name, artist_name, track_genre, track_id } = track;
        return(
            <DesktopSong
                    playlist_track_number={ i+1 } 
                    bpm={ bpm }
                    track_name={ track_name }
                    artist_name={ artist_name }
                    track_genre={ track_genre }
                    track_id={ track_id }
                    addBtn={ false }
                    rmvBtn={ true }
                    key={ i }/>
        )
    })
    return(
        <Paper>
            <h2>{ name }</h2>
            <Table>
                <TableHead displaySelectAll={ false } adjustForCheckbox={ false }>
                    <TableRow>
                        { tableHeaders }
                    </TableRow>
                </TableHead>
                <TableBody displayRowCheckbox={ false }>
                    { playlistSongs }
                </TableBody>
            </Table>
        </Paper>
    )
}

export default DesktopPlaylist;