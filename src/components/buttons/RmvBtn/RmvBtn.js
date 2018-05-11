import React from 'react';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export default function RmvBtn(props) {
    const { track_id, btnFunc } = props;

    return(

        <IconButton
            aria-label="Remove from playlist"
            color="default"
            onClick={ () => btnFunc(track_id) }
        >
            <DeleteIcon/>
        </IconButton>
    )
}

