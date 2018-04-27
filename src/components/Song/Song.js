import React from 'react';


function Song (props) {
    return(
        <main>
            <h1>Song</h1>
            <p>{ props.track_name }</p>
        </main>
    )
}

export default Song;
