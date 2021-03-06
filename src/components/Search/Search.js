import React from 'react';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import MediaQuery from 'react-responsive';

import { TextField, Paper, Button, FormControl, FormControlLabel, Radio, RadioGroup } from 'material-ui';

import './Search.css'

import { reduxSort, sort_results, get_input, get_type, get_results } from '../../ducks/search';
import { get_playlists } from '../../ducks/users';
import MobileSearch from '../mobile/MobileSearch/MobileSearch';
import DesktopSearch from '../desktop/DesktopSearch/DesktopSearch';
import { Typography } from 'material-ui';


function Search(props) {
    const { sortBy, sortDirection, search_input, search_type, results } = props.search
        , { user } = props.user_data
        , { username } = user
        , { get_input, get_type, get_results } = props


    const sortedResults = orderBy( results, sortBy, sortDirection );

    return(
        <Paper>
            {
                username !== 'User'
                    ?(<div>
                        <div className="search-controls">
                            <TextField name="searchInput" value={ search_input } onChange={ e => get_input(e) } placeholder="What are you looking for?" fullWidth margin="normal" id="search-field"/>
                            <Button variant="raised" children="Search" color="primary" onClick={ () => get_results(search_type, search_input) }/>
                            <br/>
                            <div className="search-options">
                                <FormControl>
                                    <RadioGroup name="searchType" value={ search_type } onChange={ e => get_type(e) }>
                                            <FormControlLabel value="bpm" control={<Radio color="primary"/>} label="BPM"/>
                                            <FormControlLabel value="track_name" control={<Radio color="primary"/>} label="Track"/>
                                            <FormControlLabel value="artist_name" control={<Radio color="primary"/>} label="Artist"/>
                                            <FormControlLabel value="track_genre" control={<Radio color="primary"/>} label="Genre"/>
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <div>
                            <main className="search-results">
                                <MediaQuery query="(max-device-width: 767px)">
                                    
                                    <section className="search-results">
                                        <MobileSearch
                                            sortedResults={ sortedResults }
                                            showControl={ sortedResults === [] ? false : true }/>
                                    </section>
                                </MediaQuery>

                                <MediaQuery query="(min-device-width: 768px)">
                    
                                    <DesktopSearch
                                        sortedResults={ sortedResults }/>
                                </MediaQuery>
                            </main>
                        </div>
                    </div>
                    )
                    :<Typography variant="headline" id="pl-log">Please log in</Typography>
            }
        </Paper>
    )
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { reduxSort, sort_results, get_input, get_type, get_results, get_playlists })(Search);