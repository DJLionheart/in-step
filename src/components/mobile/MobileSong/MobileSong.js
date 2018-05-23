import React from 'react';

import { Card, CardContent, Typography, Avatar } from 'material-ui';
import PlayBtn from '../../buttons/PlayBtn/PlayBtn';
import AddBtn from '../../buttons/AddBtn/AddBtn';
import RmvBtn from '../../buttons/RmvBtn/RmvBtn';

import './MobileSong.css';

//  <FavBtn track={ track }/>
function MobileSong(props) {
    const { track, addBtn, rmvBtn, order_num } = props
        , { bpm, track_name, artist_name, track_genre } = track;

    return(
        <div>
            <Card className="mobile-song">
                <CardContent>
                    <Typography variant="headline">{track_name}</Typography>
                    <Typography variant="title">{ artist_name }</Typography>
                    <br/>
                    <Typography variant="subheading">{ bpm } BPM</Typography>
                    <Typography variant="subheading">{ track_genre }</Typography>
                </CardContent>
                <div className="song-controls">
                    <PlayBtn track={ track }/>
                    {
                    order_num !== ''
                        ? <Avatar id="order-num">{ order_num }</Avatar>
                        : null
                    }   
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
