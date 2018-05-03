import React, { Component } from 'react';
import { orderBy } from 'lodash';
import MediaQuery from 'react-responsive';

import { TextField, Toolbar, ToolbarGroup, ToolbarTitle, DropDownMenu, MenuItem, Paper, RaisedButton, RadioButtonGroup, RadioButton} from 'material-ui';

import axios from 'axios';
import './Search.css'

import { reduxSort } from '../../ducks/search';
import MobileSearch from './MobileSearch/MobileSearch';
import DesktopSearch from './DesktopSearch/DesktopSearch';


const invertDirection = {
    asc: 'desc',
    desc: 'asc'
}


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            searchType: 'bpm',
            results: [],
            sortBy: 'bpm',
            sortDirection: 'asc'
        }
        this.searchDb = this.searchDb.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    redux_sort(column) {
        const { sortBy, sortDirection } = this.props.search;

        this.props.handleSort(column, sortBy === column ? invertDirection[sortDirection] : 'asc')
    }

    handleSort(event, index, value) {
        this.setState({
            sortBy: value,
            sortDirection: this.state.sortBy === value ? invertDirection[this.state.sortDirection] : 'asc' 
        })
    }

    searchDb() {
        const { searchType, searchInput } = this.state;
        axios.get(`/api/search?type=${ searchType }&search=${ searchInput }`).then( res => {
            console.log(res.data);
            
            this.setState({
                results: res.data
            })
        }).catch( err => console.log(err))
        

    }

    render() {
        const { searchInput, searchType, results, sortBy, sortDirection } = this.state;
        const sortedResults = orderBy( results, sortBy, sortDirection );

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
                        onClick={ handleSort }/>
                </TableHeaderColumn>
            )
        })

        return(
            <Paper>
            <div className="search-controls">
            
                <TextField name="searchInput" value={ searchInput } onChange={ e => this.handleInput(e) } hintText="What are you looking for?" fullWidth={ true }/>
                <RaisedButton label="Search" default={ true } onClick={ this.searchDb }/>
                <br/>
                    <RadioButtonGroup name="searchType" defaultSelected="bpm" value={ searchType } onChange={ e => this.handleInput(e) }>
                        <RadioButton label="BPM" value="bpm"/>
                        <RadioButton label="Track" value="track_name"/>
                        <RadioButton label="Artist" value="artist_name"/>
                        <RadioButton label="Genre" value="track_genre"/>
                    </RadioButtonGroup>
            </div>
            <div>
                <main className="search-results">
                    <MediaQuery query="(max-device-width: 1223px)">
                        <Toolbar className="search-tools">
                            <ToolbarGroup firstChild={ true }>
                                <ToolbarTitle text="Sort by:"/>
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <DropDownMenu 
                                    value={ sortBy } 
                                    onChange={ this.handleSort }>
                                    <MenuItem value="bpm" primaryText="BPM"/>
                                    <MenuItem value="track_name" primaryText="Track Name"/>
                                    <MenuItem value="artist_name" primaryText="Artist"/>
                                    <MenuItem value="track_genre" primaryText="Genre"/>
                                </DropDownMenu>
                            </ToolbarGroup>
                        </Toolbar>
                        <section className="search-results">
                            <MobileSearch sortedResults={ sortedResults }/>
                        </section>
                    </MediaQuery>

                    <MediaQuery query="(min-device-width: 1224px)">
      
                        <DesktopSearch 
                            sortedResults={ sortedResults }
                            handleSort={ this.handleSort }/>
                    </MediaQuery>
                </main>

            </div>
    
            </Paper>
        )
    }
}

export default Search;