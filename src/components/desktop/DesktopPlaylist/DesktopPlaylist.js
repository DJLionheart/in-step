import React from 'react';
import { Paper, Table, TableBody, TableHead, TableRow, TableCell } from 'material-ui';

import DesktopSong from '../../desktop/DesktopSong/DesktopSong'
import { Typography } from 'material-ui';

import './DesktopPlaylist.css'

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
    const { playlist } = props
        , { playlist_name, playlist_id, tracks } = playlist;

    const playlistSongs = tracks.map( (track, i) => {
        const { track_num } = track;
        return(
            <DesktopSong
                track={ track }
                playlist_id={ playlist_id }
                order_num={ i+1 }
                addBtn={ false }
                rmvBtn={ true }
                key={ track_num }/>
        )
    })
    return(
        <Paper className="playlist-main">
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