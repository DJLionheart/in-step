import React from 'react';
import { connect } from 'react-redux'; 
import { Toolbar, ToolbarGroup, ToolbarTitle, DropDownMenu, MenuItem } from 'material-ui';

import MobileSong from '../MobileSong/MobileSong';


function MobileSearch(props) {
    const searchResults = props.sortedResults.map( (song, i) => {
        const { bpm, track_name, artist_name, track_genre, track_id } = song;
        
        return (
            <MobileSong
                playlist_track_number={ '' } 
                bpm={ bpm }
                track_name={ track_name }
                artist_name={ artist_name }
                track_genre={ track_genre }
                track_id={ track_id }
                key={ track_id }/>
        )
    } );

    const { sortBy } = props.search;
    // const { sortBy } = 'props.search';


    return(
        <div className="mobile-search-container">
        <Toolbar className="search-tools">
                            <ToolbarGroup firstChild={ true }>
                                <ToolbarTitle text="Sort by:"/>
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <DropDownMenu 
                                    value={ sortBy }
                                    onChange={ props.handleSort }>
                                    <MenuItem value="bpm" primaryText="BPM"/>
                                    <MenuItem value="track_name" primaryText="Track Name"/>
                                    <MenuItem value="artist_name" primaryText="Artist"/>
                                    <MenuItem value="track_genre" primaryText="Genre"/>
                                </DropDownMenu>
                            </ToolbarGroup>
                        </Toolbar>
            { searchResults }
        </div>
    )

}

function mapStateToProps(state) {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(MobileSearch);