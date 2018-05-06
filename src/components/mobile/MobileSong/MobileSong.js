import React from 'react';

import { Card, CardContent, CardMedia, Typography, Avatar, IconButton } from 'material-ui';

import { PlayArrow, PlaylistAdd, FavoriteBorder, Delete } from '@material-ui/icons'

import './MobileSong.css';


function MobileSong (props) {
    const { playlist_track_number, bpm, track_name, artist_name, track_genre, addBtn, rmvBtn } = props;
    return(
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
                <IconButton><PlayArrow/></IconButton>
                <IconButton><FavoriteBorder/></IconButton>
                {
                    addBtn ? <IconButton><PlaylistAdd/></IconButton> : null
                }

                {
                    rmvBtn ? <IconButton><Delete/></IconButton> : null
                }
            </div>
            {
                playlist_track_number !== ''
                    ? <CardMedia component={ <Avatar>{playlist_track_number}</Avatar>}/>
                    : null
            }
        </Card>
    )
}

export default MobileSong;
