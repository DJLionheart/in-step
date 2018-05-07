import React, { Component } from 'react';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import MediaQuery from 'react-responsive';

import { TextField, Paper, Button, FormControl, FormControlLabel, Radio, RadioGroup } from 'material-ui';

import axios from 'axios';
import './Search.css'

import { reduxSort } from '../../ducks/search';
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
        // this.addSong = this.addSong.bind(this);
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

    // addSong(song) {
    //     this.props.add_song(song)
    // }

    render() {
        const { searchInput, searchType, results } = this.state
            , { sortBy, sortDirection } = this.props.search;

        const sortedResults = orderBy( results, sortBy, sortDirection );

        return(
            <Paper>
            <div className="search-controls">
            
                <TextField name="searchInput" value={ searchInput } onChange={ e => this.handleInput(e) } placeholder="What are you looking for?" fullWidth margin="normal"/>
                <Button variant="raised" children="Search" default={ true } onClick={ this.searchDb }/>
                <br/>
                <FormControl>
                    <RadioGroup name="searchType" value={ searchType } onChange={ e => this.handleInput(e) }>
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
                                addSong={ this.addSong }
                                sortedResults={ sortedResults }
                                handleSort={ this.handleSort }
                                showControl={ sortedResults === [] ? false : true }/>
                        </section>
                    </MediaQuery>

                    <MediaQuery query="(min-device-width: 1224px)">
      
                        <DesktopSearch
                            addSong={ this.addSong }
                            sortedResults={ sortedResults }
                            handleSort={ this.handleSort }/>
                    </MediaQuery>
                </main>

            </div>
    
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps, { reduxSort })(Search);