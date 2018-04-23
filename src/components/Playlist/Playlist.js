import React from 'react';
import Tabs from './Tabs/Tabs';
import ButtonBar from './ButtonBar/ButtonBar';

function Playlist (props) {
    return(
        <main>
            <h1>Playlist</h1>
            <Tabs/>
            <ButtonBar/>
        </main>
    )
}

export default Playlist;
