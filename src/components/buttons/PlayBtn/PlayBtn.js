import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import { get_playlists } from '../../../ducks/users';


class PlayBtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notOnSpotify: false
        }

        this.searchSpotify = this.searchSpotify.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    searchSpotify(track, artist) {
        const { access_token } = this.props.user_data.user;
        const config = {
            headers: {'Authorization': 'Bearer ' + access_token }
        }

        axios.get(`https://api.spotify.com/v1/search?q=track:'${track}'%20artist:'${artist}'&type=track&limit=5`, config)
            .then( res => {
                let spotifyResults = res.data.tracks.items[0];
                console.log('Spotify results: ', res.data.tracks.items[0])
                if(spotifyResults) {
                    let spotifyUrl = spotifyResults.external_urls.spotify;
                    window.open(spotifyUrl)
                } else {
                    this.openDialog()
                }
        }).catch(err => console.log('Play button error: ', err));
    }

    searchYoutube(track, artist) {
        this.closeDialog()

    }

    openDialog() {
        this.setState({
            notOnSpotify: true
        })
    }
    
    closeDialog() {
        this.setState({
            notOnSpotify: false
        })
    }

    render() {
        const { track } = this.props
            , { track_name, artist_name } = track
            , { notOnSpotify } = this.state;

        return(
            <IconButton
                aria-label="Play"
                color="primary" onClick={ () => this.searchSpotify(track_name, artist_name) }
            >
                <PlayArrow/>
            <Dialog
                open={ notOnSpotify }
                onClose={ this.closeDialog }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Not on Spotify'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        We're having trouble locating that track on Spotify. Do you want to see if it's on YouTube instead?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={ () => this.searchYoutube(track_name, artist_name) }>
                        Sure
                    </Button>
                    <Button color="default" onClick={ () => this.closeDialog }>
                        No Thanks
                    </Button>
                </DialogActions>
            </Dialog>
            </IconButton>   
        )
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps, { get_playlists })(PlayBtn);





// curl -X "GET" "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQDciR4cGC6m5LgeHNABuoF50iNIfxrOxu72JBu2E0Z8Hv7fYYBzC8Sor_iga9vjFkVwrpkOumlnQar_SrX7hxnI_qPhMwNHfBXKP61HGpgrIfRFmIokOf9wEe2X3udfl7KA125xie4"