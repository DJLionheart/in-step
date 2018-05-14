import React from 'react';

import { TableRow, TableCell } from 'material-ui/Table';

import PlayBtn from '../../buttons/PlayBtn/PlayBtn';
import AddBtn from '../../buttons/AddBtn/AddBtn';
import RmvBtn from '../../buttons/RmvBtn/RmvBtn';
import FavBtn from '../../buttons/FavBtn/FavBtn';

import './DesktopSong.css';

function DesktopSong(props) {
    const { track, addBtn, rmvBtn, order_num} = props
        , { bpm, track_name, artist_name, track_genre } = track;

    return(
        <TableRow>
            {
                order_num !== ''
                    ? <TableCell>{ order_num }</TableCell>
                    : null
            }
            <TableCell numeric>{ bpm }</TableCell>
            <TableCell>{ track_name }</TableCell>
            <TableCell>{ artist_name }</TableCell>
            <TableCell>{ track_genre }</TableCell>
            <TableCell>
                <div className="song-controls">
                    <PlayBtn track={ track }/>
                    <FavBtn track={ track }/>
                    {
                        addBtn ? <AddBtn track={ track }/> : null
                    }
    
                    {
                        rmvBtn ? <RmvBtn track={ track }/> : null
                    }
                </div>
            </TableCell>
        </TableRow>            
    )
}

export default DesktopSong;
