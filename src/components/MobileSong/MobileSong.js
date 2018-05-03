import React from 'react';

import { Card, CardActions, CardHeader, CardText, FlatButton } from 'material-ui';

import { PlayArrow, PlaylistAdd, FavoriteBorder } from '@material-ui/icons'

import './MobileSong.css';


function MobileSong (props) {
    const { bpm, track_name, artist_name, track_genre } = props;
    return(
        <Card className="song-container">
            <CardHeader title={ track_name } subtitle={ artist_name }/>
            <CardText expandable={ false }>
                Tempo: {bpm}BPM
                Genre: {track_genre}
            </CardText>
            <CardActions>
            <FlatButton><PlayArrow/></FlatButton>
            <FlatButton><FavoriteBorder/></FlatButton>
            <FlatButton><PlaylistAdd/></FlatButton>
            </CardActions>
        </Card>
    )
}

export default MobileSong;
