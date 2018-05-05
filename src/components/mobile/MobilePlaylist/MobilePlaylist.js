import React from 'react';


import MobileSong from '../MobileSong/MobileSong';


function MobilePlaylist(props) {
    const { name, tracks } = props;
    
    const playlistSongs = tracks.map( (track, i) => {
        const { bpm, track_name, artist_name, track_genre, track_id } = track;
        return(
            <MobileSong
                playlist_track_number={ i+1 } 
                bpm={ bpm }
                track_name={ track_name }
                artist_name={ artist_name }
                track_genre={ track_genre }
                track_id={ track_id }
                addBtn={ false }
                rmvBtn={ true }
                key={ i }/>
        )
        
    })
    return(
        <div className="playlist-contents">
            <h2>{ name }</h2>
            { playlistSongs }
        </div>
    )
}

export default MobilePlaylist;