import React, { Component } from 'react';
import { connect } from 'react-redux';
import { includes } from 'lodash';

import { Card, CardContent, Typography, Avatar } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import './MobileSong.css';

import { add_song, remove_song } from '../../../ducks/users';


class MobileSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false,
            playlist: false,
            'addedSnackbarOpen': false,
            'removedSnackbarOpen': false,
            'addedWarning': false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(icon) {
        const { playlists, current_index } = this.props.user_data
            , { trackData, add_song } = this.props;
        switch( icon ) {
            case 'favorite':
                this.setState({
                    favorite: this.state.favorite ? false : true
                })
                break;

            case 'playlist':
                if( !includes(playlists[current_index].tracks, trackData) ) {
                    this.setState({
                        playlist: this.state.playlist ? false : true
                    })
                    add_song(trackData)
                } else {
                    this.openAlert('addedWarning')
                }

                break;
            
            default:
                break;
        }
    }

    openAlert(alert) {
        this.setState({
            [alert]: true
        })
    } 

    closeAlert(alert) {
        this.setState({
            [alert]: false
        })
    }
    // handleSnackBar(value) {

    // }

    render() {
        const { favorite, playlist, addedWarning } = this.state 
            , { bpm, track_name, artist_name, track_genre, playlist_track_number, addBtn, rmvBtn, trackData } = this.props;

        return(
            <div>
                <Card>
                    {
                        playlist_track_number !== ''
                            ? <Avatar>{ playlist_track_number }</Avatar>
                            : null
                    }
                    <CardContent>
                        <Typography variant="headline">{track_name}</Typography>
                        <Typography variant="subheading">{ artist_name }</Typography>
                        <Typography variant="subheading">{ bpm } BPM</Typography>
                        <Typography variant="subheading">{ track_genre }</Typography>
                    </CardContent>
                    <div className="mobile-song-controlls">
                        <IconButton aria-label="Play" color="primary"><PlayArrow/></IconButton>
                        <IconButton aria-label="Favorite" color={ favorite ? 'primary' : 'default'} onClick={ () => this.handleClick('favorite') }>{ favorite ? <Favorite/> : <FavoriteBorder/> }</IconButton>
                        {
                            addBtn ? <IconButton aria-label="Add to playlist" color={ playlist ? 'secondary' : 'default' } onClick={ () => this.handleClick('playlist') }><PlaylistAdd/></IconButton> : null
                        }
        
                        {
                            rmvBtn ? <IconButton aria-label="Remove from playlist" color="default" value="remove" onClick={ this.handleClick }><DeleteIcon/></IconButton> : null
                        }
                    </div>
                </Card>
                <Dialog
                    open={ addedWarning }
                    onClose={ () => this.closeAlert('addedWarning') }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Duplicate'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You have already added that track to the current playlist
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={ () => this.closeAlert('addedWarning') }>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps, { add_song, remove_song })(MobileSong);
