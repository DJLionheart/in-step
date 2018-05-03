import React from 'react';

import MobileSong from '../../MobileSong/MobileSong';


function MobileSearch(props) {
    const searchResults = props.sortedResults.map( (song, i) => {
        const { bpm, track_name, artist_name, track_genre, track_id } = song;
        
        return (
            <MobileSong 
                bpm={ bpm }
                track_name={ track_name }
                artist_name={ artist_name }
                track_genre={ track_genre }
                track_id={ track_id }
                key={ track_id }/>
        )
    } );


    return(
        <div className="mobile-search-container">
            { searchResults }
        </div>
    )

}

export default MobileSearch;