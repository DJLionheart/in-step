import React from 'react';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn, FlatButton } from 'material-ui';

import DesktopSong from '../../DesktopSong/DesktopSong';

function DesktopSearch(props) {
    const headerNames = [
        {display: 'BPM', name: 'bpm'},
        {display: 'Track Name', name: 'track_name'},
        {display: 'Artist', name: 'artist_name'},
        {display: 'Genre', name: 'track_genre'}
    ]

    const tableHeaders = headerNames.map( (column, i) => {
        return(
            <TableHeaderColumn key={ i }>
                <FlatButton 
                    value={ column.name }
                    label={ column.display }
                    onClick={ props.handleSort }/>
            </TableHeaderColumn>
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
                key={ track_id }/>
        )
    } );
    return(
        <Table>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                <TableRow>
                    { tableHeaders }
                    <TableHeaderColumn>
                        <FlatButton 
                            label="Options"
                            disabled={ true }/>
                    </TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
                { searchResults }
            </TableBody>
        </Table>
    
    )

}

export default DesktopSearch;
