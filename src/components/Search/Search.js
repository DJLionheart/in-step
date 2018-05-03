import React, { Component } from 'react';
import { orderBy } from 'lodash';

import { TextField, Toolbar, ToolbarGroup, ToolbarTitle, DropDownMenu, MenuItem, Paper, RaisedButton, RadioButtonGroup, RadioButton} from 'material-ui';

import axios from 'axios';
import './Search.css'

import Song from '../Song/Song';

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
        const searchResults = sortedResults.map( (song, i) => {
            const { bpm, track_name, artist_name, track_mix, track_genre, track_id } = song;
            return (
                <Song bpm={ bpm } track_name={ track_name } artist_name={ artist_name } track_mix={ track_mix } track_genre={ track_genre } track_id={ track_id } key={ track_id }/>
            )
        } );

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
            <div className="search-results">
                <Toolbar className="search-tools">
                    <ToolbarGroup firstChild={ true }>
                        <ToolbarTitle text="Sort by:"/>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <DropDownMenu value={ sortBy } onChange={ this.handleSort }>
                            <MenuItem value="bpm" primaryText="BPM"/>
                            <MenuItem value="track_name" primaryText="Track Name"/>
                            <MenuItem value="artist_name" primaryText="Artist"/>
                            <MenuItem value="track_genre" primaryText="Genre"/>
                        </DropDownMenu>
                    </ToolbarGroup>
                </Toolbar>
                <main className="search-results">
                    { searchResults }
                </main>

            </div>
    
            </Paper>
        )
    }
}

export default Search;