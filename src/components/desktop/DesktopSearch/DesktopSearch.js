import React from 'react';
import { connect } from 'react-redux';
import { Paper, Button } from 'material-ui';
import Table, { TableBody, TableHead, TableRow, TableCell, TableSortLabel } from 'material-ui/Table';

import DesktopSong from '../DesktopSong/DesktopSong';
import Tooltip from 'material-ui/Tooltip';

function DesktopSearch(props) {
    const headerNames = [
        {label: 'BPM', id: 'bpm', numeric: false, disablePadding: false},
        {label: 'Track Name', id: 'track_name', numeric: false, disablePadding: false},
        {label: 'Artist', id: 'artist_name', numeric: false, disablePadding: false},
        {label: 'Genre', id: 'track_genre', numeric: false, disablePadding: false}
    ]

    const { sortBy, sortDirection } = props.search;
    const tableHeaders = headerNames.map( (column) => {
        return(
            <TableCell
                key={ column.id } 
                numeric={ column.numeric }
                padding={ column.disablePadding ? 'none' : 'default' }
                sortDirection={ sortBy === column.id ? sortDirection : false }
            >
                <Tooltip
                    title="Sort"
                    placement={ column.numeric ? 'bottom-end' : 'bottom-start' }
                    enterDelay={ 300 }
                >
                    <TableSortLabel
                        active={ sortBy === column.id }
                        direction={ sortDirection }
                        onClick={ () => props.handleSort( column.id )}
                    >
                        { column.label }
                    </TableSortLabel>
                </Tooltip>
            </TableCell>
        )
    })

    const searchResults = props.sortedResults.map( (song, i) => {
        const { bpm, track_name, artist_name, track_genre, track_id } = song;
        
        return (
            <DesktopSong 
                bpm={ bpm }
                track_name={ track_name }
                artist_name={ artist_name }
                track_genre={ track_genre }
                track_id={ track_id }
                key={ track_id }
                addBtn={ true }
                playlist_track_number={ '' }/>
        )
    } );
    return(
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        { tableHeaders }
                        <TableCell>
                            <TableSortLabel
                                active={ false }
                            >
                                Options
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { searchResults }
                </TableBody>
            </Table>
        </Paper>
    
    )

}

function mapStateToProps(state) {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(DesktopSearch);
