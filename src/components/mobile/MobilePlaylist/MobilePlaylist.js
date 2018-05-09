import React from 'react';
import Typography from 'material-ui/Typography';

import MobileSong from '../MobileSong/MobileSong';


function MobilePlaylist(props) {
    const { playlist } = props
        , { playlist_name, playlist_id, tracks } = playlist;
    
    const playlistSongs = tracks.map( (track, i) => {
        const { bpm, track_name, artist_name, track_genre, track_id } = track;
        return(
            <MobileSong
                playlist_id={ playlist_id }
                track_num={ i+1 } 
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
            <Typography variant="headline">{ playlist_name }</Typography>
            { playlistSongs }
        </div>
    )
}

export default MobilePlaylist;