import React, { Component } from 'react';
import Table, {TableBody, TableHeader, TableRow, TableHeaderColumn } from 'material-ui/Table';
// import IconMenu from 'material-ui/IconMenu';
// import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Paper } from 'material-ui';

import axios from 'axios';

import Song from '../Song/Song';

import TextField from 'material-ui/TextField';


// import search from '../../icons/search/ic_search_black_24px.svg';



// import Selector from './Selector/Selector';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            searchType: 'bpm',
            results: [],
            columnToSort: '',
            sortDirection: 'desc'
        }
        this.searchDb = this.searchDb.bind(this)
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    searchDb() {
        console.log(this.state);
        
        const { searchType, searchInput } = this.state;
        axios.get(`/api/search?type=${ searchType }&search=${ searchInput }`).then( res => {
            this.setState({
                results: res.data
            })
        }).catch( err => console.log(err))

    }


                // (<Toolbar>
                //     <ToolbarGroup firstChild={ true }>
                //         <ToolbarTitle text="Search by: "/>
                //         {/* <ToolbarSeparator/> */}
                //     </ToolbarGroup>
                //     <ToolbarGroup>
                //         <RaisedButton label="BPM" disabled={ bpm } primary={ true }onClick={ () => this.handleClick('bpm') }/>
                //         <RaisedButton label="Track" disabled={ track } onClick={ () => this.handleClick('track') } primary={ true }/>
                //         <RaisedButton label="Artist" disabled={ artist } onClick={ () => this.handleClick('artist') } primary={ true }/>
                //         <RaisedButton label="Genre" disabled={ genre } onClick={ () => this.handleClick('genre') } primary={ true }/>
                //     </ToolbarGroup>
                // </Toolbar>)
    
    /* <TextField value={ this.state.searchInput } hintText="What do you want to find?" fullWidth={true} onChange={ e => this.handleInput(e.target.value) }/> */
    render() {
        const { searchInput, searchType } = this.state;
        const searchResults = this.state.results.map( (song, i) => {
            const { bpm, track_name, artist_name, track_mix, track_genre, track_id } = song;
            return (
                <Song bpm={ bpm } track_name={ track_name } artist_name={ artist_name } track_mix={ track_mix } track_genre={ track_genre } track_id={ track_id } key={ track_id }/>
            )
        } );
        // const { bpm, track, artist, genre } = this.state;

        return(
            <Paper>
                <div>
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
                



                <Table>
                    <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                        <TableRow>
                            <TableHeaderColumn>BPM</TableHeaderColumn>
                            <TableHeaderColumn>Track Name</TableHeaderColumn>
                            <TableHeaderColumn>Artist</TableHeaderColumn>
                            {/* <TableHeaderColumn>Mix</TableHeaderColumn> */}
                            <TableHeaderColumn>Genre</TableHeaderColumn>
                            <TableHeaderColumn>Options</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={ false }>
                        { searchResults }
                    </TableBody>
                </Table>

            </Paper>
        )
    }
}

export default Search;