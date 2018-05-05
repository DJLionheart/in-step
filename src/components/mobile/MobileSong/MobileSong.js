import React from 'react';

import { Card, CardActions, CardHeader, CardText, FlatButton, Avatar } from 'material-ui';

import { PlayArrow, PlaylistAdd, FavoriteBorder, Delete } from '@material-ui/icons'

import './MobileSong.css';


function MobileSong (props) {
    const { playlist_track_number, bpm, track_name, artist_name, track_genre, addBtn, rmvBtn } = props;
    return(
        <Card className="song-container">
            {
                playlist_track_number !== ''
                    ? <Avatar>{ playlist_track_number }</Avatar>
                    : null
            }
            <CardHeader title={ track_name } subtitle={ artist_name }/>
            <CardText expandable={ false }>
                Tempo: {bpm}BPM
                Genre: {track_genre}
            </CardText>
            <CardActions>
            <FlatButton><PlayArrow/></FlatButton>
            <FlatButton><FavoriteBorder/></FlatButton>
            {
                addBtn ? <FlatButton><PlaylistAdd/></FlatButton> : null
            }

            {
                rmvBtn ? <FlatButton><Delete/></FlatButton> : null
            }
            </CardActions>
        </Card>
    )
}

export default MobileSong;
