import React from 'react';
import { Button, IconButton } from 'material-ui';
import { connect } from 'react-redux';
import Create from '@material-ui/icons/Create';
import DeleteButton from '@material-ui/icons/Delete';
import Share from '@material-ui/icons/Share';
import BorderColor from '@material-ui/icons/BorderColor';
import ClearAll from '@material-ui/icons/ClearAll';


function ButtonBar(props) {
    const { openAlert } = props
        , { playlists } = props.user_data;
    
    const deleteFunc = () => playlists.length > 1 ? openAlert('plDeleteConf') : openAlert('lastPl');

    const addFunc = () => playlists.length === 3 ? openAlert('tooMany') : openAlert('namePl');
    
    return(
        <section>
                <Button variant="fab" color="secondary" onClick={ addFunc }>
                    <Create/>
                </Button>
                <IconButton color="secondary" onClick={ () => openAlert('sharePl')}><Share/></IconButton>
                <IconButton color="secondary" onClick={ () => openAlert('renamePl')}><BorderColor/></IconButton>
                <IconButton color="secondary" onClick={ () => openAlert('clearAllConf')}><ClearAll/></IconButton>
                <IconButton onClick={ deleteFunc }><DeleteButton/></IconButton>
        </section>
    )

}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps)(ButtonBar);