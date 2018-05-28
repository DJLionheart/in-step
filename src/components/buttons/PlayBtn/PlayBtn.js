import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';

import { handle_modal } from '../../../ducks/modals';
import { playBtn_search } from '../../../ducks/search';


function PlayBtn(props) {
    const { handle_modal, playBtn_search, user_data, track } = props
        , { access_token } = user_data.user
        , { track_name, artist_name } = track

    const searchSpotify = (track, artist) => {
        const config = {
            headers: {'Authorization': 'Bearer ' + access_token }
        }

        playBtn_search(track, artist);
        axios.get(`https://api.spotify.com/v1/search?q=track:'${track}'%20artist:${artist}&type=track&limit=5`, config)
            .then( res => {
                let spotifyResults = res.data.tracks.items[0];
                // console.log('Spotify results: ', res.data)
                if(spotifyResults) {
                    let spotifyUrl = spotifyResults.external_urls.spotify;
                    window.open(spotifyUrl)
                } else {
                    handle_modal('notOnSpotify', true)
                }
        }).catch(err => console.log('Play button error: ', err));
    }

    return(
        <IconButton
            aria-label="Play"
            color="primary" onClick={ () => searchSpotify(track_name, artist_name) }
        >
            <PlayArrow/>
        
        </IconButton>   
    )
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps, { handle_modal, playBtn_search })(PlayBtn);





// curl -X "GET" "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQDciR4cGC6m5LgeHNABuoF50iNIfxrOxu72JBu2E0Z8Hv7fYYBzC8Sor_iga9vjFkVwrpkOumlnQar_SrX7hxnI_qPhMwNHfBXKP61HGpgrIfRFmIokOf9wEe2X3udfl7KA125xie4"