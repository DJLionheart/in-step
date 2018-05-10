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
    const { playlist, removeSong } = props
        , { playlist_name, playlist_id, tracks } = playlist;

    const playlistSongs = tracks.map( (track, i) => {
        const { bpm, track_name, artist_name, track_genre, track_id } = track;
        return(
            <DesktopSong
                    removeSong={ removeSong }
                    playlist_id={ playlist_id }
                    track_num={ i+1 } 
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
            <Typography variant="headline">{ playlist_name }</Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            { tableHeaders }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { playlistSongs }
                    </TableBody>
                </Table>
            </Paper>
        </Paper>
    )
}

export default DesktopPlaylist;