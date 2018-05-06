import React from 'react';
import { connect } from 'react-redux';
import { Paper, Table, TableBody, TableHead, TableRow, TableCell, Button, Menu, MenuItem } from 'material-ui';

import DesktopSong from '../DesktopSong/DesktopSong';

function DesktopSearch(props) {
    const headerNames = [
        {display: 'BPM', name: 'bpm'},
        {display: 'Track Name', name: 'track_name'},
        {display: 'Artist', name: 'artist_name'},
        {display: 'Genre', name: 'track_genre'}
    ]

    const tableHeaders = headerNames.map( (column, i) => {
        return(
            <TableCell key={ i }>
                <Button 
                    value={ column.name }
                    label={ column.display }
                    onClick={ props.handleSort }/>
            </TableCell>
        )
    })

    const { sortBy } = props.search;

    const searchResults = props.sortedResults.map( (song, i) => {
        const { bpm, track_name, artist_name, track_genre, track_id } = song;
        
        return (
            <DesktopSong 
                bpm={ bpm }
                track_name={ track_name }
                artist_name={ artist_name }
                track_genre={ track_genre }
                track_id={ track_id }
                key={ track_id }/>
        )
    } );
    return(
        <Paper>
            <Table>
                <TableHead displaySelectAll={ false } adjustForCheckbox={ false }>
                    <TableRow>
                        { tableHeaders }
                        <TableCell>
                            <Menu 
                                value={ sortBy }
                                onChange={ props.handleSort }>
                                <MenuItem value="bpm" primaryText="BPM"/>
                                <MenuItem value="track_name" primaryText="Track Name"/>
                                <MenuItem value="artist_name" primaryText="Artist"/>
                                <MenuItem value="track_genre" primaryText="Genre"/>
                            </Menu>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody displayRowCheckbox={ false }>
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
