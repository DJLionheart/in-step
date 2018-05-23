import React from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';
import Table, { TableBody, TableHead, TableRow, TableCell, TableSortLabel } from 'material-ui/Table';

import DesktopSong from '../DesktopSong/DesktopSong';
import Tooltip from 'material-ui/Tooltip';

import { sort_results } from '../../../ducks/search';

import './DesktopSearch.css'

function DesktopSearch(props) {
    const headerNames = [
        {label: 'BPM', id: 'bpm', numeric: false, disablePadding: false},
        {label: 'Track Name', id: 'track_name', numeric: false, disablePadding: false},
        {label: 'Artist', id: 'artist_name', numeric: false, disablePadding: false},
        {label: 'Genre', id: 'track_genre', numeric: false, disablePadding: false}
    ]
    const { sort_results } = props
        , { sortBy, sortDirection } = props.search;

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
                        onClick={ () => sort_results( column.id )}
                    >
                        { column.label }
                    </TableSortLabel>
                </Tooltip>
            </TableCell>
        )
    })

    const searchResults = props.sortedResults.map( (song, i) => {
        const { track_id } = song;
        
        return (
            <DesktopSong
                track={ song }
                order_num={ '' }
                addBtn={ true }
                key={ track_id }/>
        )
    } );
    return(
        <Paper id="d-search">
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

export default connect(mapStateToProps, { sort_results })(DesktopSearch);
