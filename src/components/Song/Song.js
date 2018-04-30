import React from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import fav from '../../icons/fav/ic_favorite_border_black_24px.svg'
// import fav_selected from '../../icons/fav/ic_favorite_black_24px.svg'
import play from '../../icons/play/ic_play_arrow_black_24px.svg'
import add from '../../icons/playlist/ic_playlist_add_black_24px.svg'
import added from '../../icons/playlist/ic_playlist_add_check_black_24px.svg'



function Song (props) {
    const { bpm, track_name, artist_name, track_mix, track_genre } = props;
    return(
        <TableRow>
            <TableRowColumn>{ bpm }</TableRowColumn>
            <TableRowColumn>{ track_name }</TableRowColumn>
            <TableRowColumn>{ artist_name }</TableRowColumn>
            {/* <TableRowColumn>{ track_mix }</TableRowColumn> */}
            <TableRowColumn>{ track_genre }</TableRowColumn>
            <TableRowColumn>
                 <img src={play} alt="play"/>
                <img src={fav} alt="favorite"/>
                <img src={add} alt="add"/>
            </TableRowColumn>
        </TableRow>            
    )
}

export default Song;
