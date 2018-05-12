import React, { Component } from 'react';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import MediaQuery from 'react-responsive';

import { TextField, Paper, Button, FormControl, FormControlLabel, Radio, RadioGroup } from 'material-ui';

import axios from 'axios';
import './Search.css'

import { reduxSort, sort_results, get_input, get_type, get_results } from '../../ducks/search';
import { get_playlists } from '../../ducks/users';
import MobileSearch from '../mobile/MobileSearch/MobileSearch';
import DesktopSearch from '../desktop/DesktopSearch/DesktopSearch';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            searchType: 'bpm',
            results: []
        }
        this.searchDb = this.searchDb.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSort(sort) {
        const { sortBy, sortDirection, invertDirection } = this.props.search;
        let direction = '';
        sortBy === sort ? direction = invertDirection[sortDirection] : direction = 'asc';
        this.props.reduxSort(sort, direction)
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
        // const { searchInput, searchType, results } = this.state
        const { sortBy, sortDirection, search_input, search_type, results } = this.props.search
            , { get_input, get_type, get_results } = this.props


        const sortedResults = orderBy( results, sortBy, sortDirection );

        return(
            <Paper>
            <div className="search-controls">
            
                <TextField name="searchInput" value={ search_input } onChange={ e => get_input(e) } placeholder="What are you looking for?" fullWidth margin="normal"/>
                <Button variant="raised" children="Search" default={ true } onClick={ () => get_results(search_type, search_input) }/>
                <br/>
                <FormControl>
                    <RadioGroup name="searchType" value={ search_type } onChange={ e => get_type(e) }>
                        <FormControlLabel value="bpm" control={<Radio color="primary"/>} label="BPM"/>
                        <FormControlLabel value="track_name" control={<Radio color="primary"/>} label="Track"/>
                        <FormControlLabel value="artist_name" control={<Radio color="primary"/>} label="Artist"/>
                        <FormControlLabel value="track_genre" control={<Radio color="primary"/>} label="Genre"/>
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <main className="search-results">
                    <MediaQuery query="(max-device-width: 1223px)">
                        
                        <section className="search-results">
                            <MobileSearch
                                sortedResults={ sortedResults }
                                showControl={ sortedResults === [] ? false : true }/>
                        </section>
                    </MediaQuery>

                    <MediaQuery query="(min-device-width: 1224px)">
      
                        <DesktopSearch
                            sortedResults={ sortedResults }/>
                    </MediaQuery>
                </main>

            </div>
    
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { reduxSort, sort_results, get_input, get_type, get_results, get_playlists })(Search);