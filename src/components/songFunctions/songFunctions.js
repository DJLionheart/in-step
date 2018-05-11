const axios = require('axios')
    , filter = require('lodash/filter');

const {
    REACT_APP_PLAYLISTS,
    REACT_APP_FAVS
} = process.env;


// Song Controlls

// Add
module.exports = {
    addSong: (indexMatrix, current_index, userid, songid, get_playlists) => {
        const plId = indexMatrix[current_index];
        
        axios.post(`${REACT_APP_PLAYLISTS}/manage/${plId}`, {track_id: songid}).then( () => {
            console.log(`Track ${songid} added to playlist ${plId}`)
            get_playlists(userid)
        }).catch(err => console.log('Add to playlist error: ', err))
    },

    // Remove
    removeSong: (indexMatrix, current_index, userid, tracknum, getPlaylists) => {      
        const plId = indexMatrix[current_index];
        
        axios.delete(`${REACT_APP_PLAYLISTS}/manage/${plId}?track_num=${tracknum}`).then( () => {
        }).catch(err => console.log('Remove from playlist error: ', err))
    },

    // Favorite
    handleFavorite: (userid, songid, favorite_tracks) => {
        let inFavorites = filter( favorite_tracks, {track_id: songid});
        if( inFavorites ) {
            axios.delete(`${REACT_APP_FAVS}/${songid}?userid=${userid}`).then( results => {
                console.log('Delete request: ', results)
            }).catch(err => console.log('Un-Fav error: ', err))

        } else {
            axios.post(`${REACT_APP_FAVS}/${songid}?userid=${userid}`)
        }
    }

    // }

    // Favorite
    
    
    // UnFavorite





}

