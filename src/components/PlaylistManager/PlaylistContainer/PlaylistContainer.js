import React from 'react';
import MediaQuery from 'react-responsive';

import MobilePlaylist from '../../mobile/MobilePlaylist/MobilePlaylist';
import DesktopPlaylist from '../../desktop/DesktopPlaylist/DesktopPlaylist';


function PlaylistContainer(props) {
    const { playlist } = props;

    return (
        <div>
        <MediaQuery query="(max-device-width: 1223px)">
            <MobilePlaylist name={ playlist.name } tracks={ playlist.tracks }/>
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1224px)">
            <DesktopPlaylist name={ playlist.name } tracks={ playlist.tracks }/>
        </MediaQuery>
        </div>
    )
}

export default PlaylistContainer;

