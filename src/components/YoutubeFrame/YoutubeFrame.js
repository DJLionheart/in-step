import React from 'react';
import YouTube from 'react-youtube';


function YoutubeFrame(props) {
    const { vidId } = props
    let height = '';
    let width = '';

    if(window.matchMedia("(max-width: 375px)").matches) {
        height = '200';
        width = '250';
    } else if (window.matchMedia("(max-width: 414px)").matches) {
        height = '300';
        width = '300';
    } else if(window.matchMedia("(max-width: 768px)").matches) {
        height = '550';
        width = '550';
    }

    const opts = {
        height: height,
        width: width,
        playerVars: {
            'autoplay': 1,
            'controls': 1
        }
    }

    return(
        <YouTube
            videoId={ vidId }
            opts={ opts }
        />
    )
}



export default YoutubeFrame;


