import React, { Component } from 'react';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import MediaQuery from 'react-responsive';

import { TextField, Paper, RaisedButton, RadioButtonGroup, RadioButton} from 'material-ui';

import axios from 'axios';
import './Search.css'

import { reduxSort } from '../../ducks/search';
import MobileSearch from '../mobile/MobileSearch/MobileSearch';
import DesktopSearch from '../desktop/DesktopSearch/DesktopSearch';


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
            results: []
        }
        this.searchDb = this.searchDb.bind(this)
        this.handleSort = this.handleSort.bind(this)
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSort(event, index, column) {
        const { sortBy, sortDirection } = this.props.search;
        this.props.reduxSort(column, sortBy === column ? invertDirection[sortDirection] : 'asc')
    }

    // handleSort(event, index, value) {
    //     this.setState({
    //         sortBy: value,
    //         sortDirection: this.state.sortBy === value ? invertDirection[this.state.sortDirection] : 'asc' 
    //     })
    // }

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
        const { searchInput, searchType, results } = this.state
            , { sortBy, sortDirection } = this.props.search;

        const sortedResults = orderBy( results, sortBy, sortDirection );

        // const headerNames = [
        //     {display: 'BPM', name: 'bpm'},
        //     {display: 'Track Name', name: 'track_name'},
        //     {display: 'Artist', name: 'artist_name'},
        //     {display: 'Genre', name: 'track_genre'}
        // ]
    
        // const tableHeaders = headerNames.map( (column, i) => {
        //     return(
        //         <TableHeaderColumn key={ i }>
        //             <FlatButton 
        //                 value={ column.name }
        //                 label={ column.display }
        //                 onClick={ handleSort }/>
        //         </TableHeaderColumn>
        //     )
        // })

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
                        
                        <section className="search-results">
                            <MobileSearch
                                sortedResults={ sortedResults }
                                handleSort={ this.handleSort }/>
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

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { reduxSort })(Search);