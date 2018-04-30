import React, { Component } from 'react';
import Table, {TableBody, TableHeader, TableRow, TableHeaderColumn } from 'material-ui/Table';

import axios from 'axios';

class SearchTable extends Component {
    constructor() {
        super();
        this.state = {
            sortBy: '',
            sortDirection: 'asc'
        }
    }


    render() {
        return(
            <Table>
                <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                    <TableRow>
                        <TableHeaderColumn>BPM</TableHeaderColumn>
                        <TableHeaderColumn>Track Name</TableHeaderColumn>
                        <TableHeaderColumn>Artist</TableHeaderColumn>
                        <TableHeaderColumn>Mix</TableHeaderColumn>
                        <TableHeaderColumn>Genre</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={ false }>
                    { searchResults }
                </TableBody>
            </Table>

        )
    }
}
