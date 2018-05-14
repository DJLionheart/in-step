import React from 'react';
import Typography from 'material-ui/Typography';

import MobileSong from '../MobileSong/MobileSong';


function MobilePlaylist(props) {
    const { playlist } = props
        , { playlist_name, playlist_id, tracks } = playlist;
    
    const playlistSongs = tracks.map( (track, i) => {
        const { track_num } = track;
        return(
            <MobileSong
                track={ track }
                playlist_id={ playlist_id }
                order_num={ i+1 }
                addBtn={ false }
                rmvBtn={ true }
                key={ track_num }/>
        )
        
    })
    return(
        <div className="playlist-main">
            <div className="playlist-title">
                <Typography variant="headline">{ playlist_name }</Typography>
            </div>
            { playlistSongs }
        </div>
    )
}

export default MobilePlaylist;