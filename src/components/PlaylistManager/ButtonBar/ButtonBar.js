import React from 'react';
import { Button, IconButton } from 'material-ui';
import { connect } from 'react-redux';
import Create from '@material-ui/icons/Create';
import DeleteButton from '@material-ui/icons/Delete';
// import Share from '@material-ui/icons/Share';
import BorderColor from '@material-ui/icons/BorderColor';
import ClearAll from '@material-ui/icons/ClearAll';

import { handle_modal } from '../../../ducks/modals';

import './ButtonBar.css'
    // <IconButton color="secondary" onClick={ () => handle_modal('sharePl', true)}><Share/></IconButton>

function ButtonBar(props) {
    const { handle_modal } = props
        , { playlists } = props.user_data;
    
    const deleteFunc = () => playlists.length > 1 ? handle_modal('removePlaylist', true) : handle_modal('lastPlaylist', true);

    const addFunc = () => playlists.length === 3 ? handle_modal('tooManyPl', true) : handle_modal('createPlaylist', true);
    
    return(
        <section className="playlist-btn-bar">
                <Button variant="fab" color="secondary" onClick={ addFunc }>
                    <Create/>
                </Button>
                <IconButton color="secondary" onClick={ () => handle_modal('renamePlaylist', true)}><BorderColor/></IconButton>
                <IconButton color="secondary" onClick={ () => handle_modal('clearTracks', true)}><ClearAll/></IconButton>
                <IconButton onClick={ deleteFunc }><DeleteButton/></IconButton>
        </section>
    )

}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps, { handle_modal })(ButtonBar);