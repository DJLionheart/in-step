import React from 'react';

import { Card, CardContent, Typography, Avatar } from 'material-ui';

import PlayBtn from '../../buttons/PlayBtn/PlayBtn';
import AddBtn from '../../buttons/AddBtn/AddBtn';
import RmvBtn from '../../buttons/RmvBtn/RmvBtn';
// import FavBtn from '../../buttons/FavBtn/FavBtn';

import './MobileSong.css';

//  <FavBtn track={ track }/>
function MobileSong(props) {
    const { track, addBtn, rmvBtn, order_num } = props
        , { bpm, track_name, artist_name, track_genre } = track;

    return(
        <div>
            <Card className="mobile-song">
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
                <div className="song-controls">
                    <PlayBtn track={ track }/>
                    {
                        addBtn ? <AddBtn track={ track }/> : null
                    }
    
                    {
                        rmvBtn ? <RmvBtn track={ track }/> : null
                    }
                </div>
            </Card>
        </div>
    )
}

export default MobileSong;
