import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, CardContent, Typography, Avatar } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';

import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import AddBtn from '../../buttons/AddBtn/AddBtn';
import RmvBtn from '../../buttons/RmvBtn/RmvBtn';
import FavBtn from '../../buttons/FavBtn/FavBtn';

import { get_playlists, get_favorites } from '../../../ducks/users';
import { get_results } from '../../../ducks/search';

import './MobileSong.css';

const songFunctions = require('../../songFunctions/songFunctions');


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
        // this.add = this.add.bind(this);
        // this.remove = this.remove.bind(this);
        // this.favorite = this.favorite.bind(this);
    }

    // add(songid) {
    //     const { indexMatrix, current_index, userid } = this.props.user_data
    //         , { search_input, search_type } = this.props.search
    //         , { get_playlists, get_results } = this.props;

    //     songFunctions.addSong(search_input, search_type, indexMatrix, current_index, userid, songid, get_playlists, get_results) 
    // }

    // remove(songid) {
    //     const { indexMatrix, current_index, userid } = this.props.user_data
    //         , { get_playlists } = this.props;

    //     songFunctions.removeSong(indexMatrix, current_index, userid, songid).then( () => {
    //         get_playlists(userid)
    //     }).catch(err => console.log('Get favorites error: ', err))
    // }

    favorite(songid) {
        const { userid, favorite_tracks } = this.props.user_data
            , { get_favorites } = this.props

        songFunctions.handleFavorite(userid, songid, favorite_tracks).then( () => {
            get_favorites(userid)
        }).catch(err => console.log('Get favorites error: ', err))
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
        const { addedWarning } = this.state
            , { track, addBtn, rmvBtn, order_num } = this.props
            , { bpm, track_name, artist_name, track_genre } = track;

        return(
            <div>
                <Card>
                    {
                        order_num !== ''
                            ? <Avatar>{ order_num }</Avatar>
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
                        <FavBtn track={ track }/>
                        {
                            addBtn ? <AddBtn track={ track }/> : null
                        }
        
                        {
                            rmvBtn ? <RmvBtn track={ track }/> : null
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
    return state
}

export default connect(mapStateToProps, { get_playlists, get_favorites, get_results })(MobileSong);
