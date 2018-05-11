import React, { Component } from 'react';
import { connect } from 'react-redux';
import { includes } from 'lodash';

import { TableRow, TableCell } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import PlayArrow from '@material-ui/icons/PlayArrow';

import AddBtn from '../../buttons/AddBtn/AddBtn';
import RmvBtn from '../../buttons/RmvBtn/RmvBtn';
import FavBtn from '../../buttons/FavBtn/FavBtn';

import './DesktopSong.css';

import { get_playlists, get_favorites } from '../../../ducks/users';

const songFunctions = require('../../songFunctions/songFunctions');

class DesktopSong extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.favorite = this.favorite.bind(this);
    }

    add(songid) {
        const { indexMatrix, current_index, userid } = this.props.user_data
            , { get_playlists } = this.props;

        songFunctions.addSong(indexMatrix, current_index, userid, songid).then( () => {
            get_playlists(userid)
        }).catch(err => console.log('Get favorites error: ', err))
    }

    remove(songid) {
        const { indexMatrix, current_index, userid } = this.props.user_data
            , { get_playlists } = this.props;

        songFunctions.removeSong(indexMatrix, current_index, userid, songid).then( () => {
            get_playlists(userid)
        }).catch(err => console.log('Get favorites error: ', err))
    }

    favorite(songid) {
        const { userid, favorite_tracks } = this.props.user_data
            , { get_favorites } = this.props

        songFunctions.handleFavorite(userid, songid, favorite_tracks).then( () => {
            get_favorites(userid)
        }).catch(err => console.log('Get favorites error: ', err))
    }

    handleClick(icon) {
        const { playlists, current_index } = this.props.user_data
            // , { track_id, playlist_id } = this.props;
        switch( icon ) {
            case 'favorite':
                this.setState({
                    favorite: this.state.favorite ? false : true
                })
                break;

            case 'playlist':
                if( !includes(playlists[current_index].track_id, ) ) {
                    this.setState({
                        playlist: this.state.playlist ? false : true
                    })
                    // add_song(playlist_id, track_id)
                } else {
                    this.openAlert('addedWarning')
                }

                break;
            
            default:
                break;
        }
    }

    render() {
        const { track_num, bpm, track_name, order_num, track_id, artist_name, track_genre,  addBtn, rmvBtn } = this.props;
        return(
            <TableRow>
                {
                    order_num !== ''
                        ? <TableCell>{ track_num }</TableCell>
                        : null
                }
                <TableCell numeric>{ bpm }</TableCell>
                <TableCell>{ track_name }</TableCell>
                <TableCell>{ artist_name }</TableCell>
                <TableCell>{ track_genre }</TableCell>
                <TableCell>
                    <IconButton aria-label="Play" color="primary"><PlayArrow/></IconButton>
                    <FavBtn track_id={ track_id } btnFunc={ this.favorite }/>
                    {
                        addBtn ? <AddBtn track_id={ track_id } btnFunc={ this.add }/> : null
                    }
    
                    {
                        rmvBtn ? <RmvBtn track_num={ track_num } btnFunc={ this.remove }/> : null
                    }
                </TableCell>
            </TableRow>            
        )
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps, { get_playlists, get_favorites })(DesktopSong);
