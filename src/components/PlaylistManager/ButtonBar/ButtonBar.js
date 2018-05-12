import React, { Component } from 'react';
import { Button, IconButton } from 'material-ui';
import { connect } from 'react-redux';
import Create from '@material-ui/icons/Create';
import DeleteButton from '@material-ui/icons/Delete';
import Share from '@material-ui/icons/Share';
import BorderColor from '@material-ui/icons/BorderColor';
import ClearAll from '@material-ui/icons/ClearAll';



class ButtonBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { openAlert } = this.props
            , { currentIndex } = this.props.user_data;

        return(
            <section>
                    <Button variant="fab" color="primary" onClick={ () => openAlert('namePl') }>
                        <Create/>
                    </Button>
                    <IconButton color="default"><Share/></IconButton>
                    <IconButton color="primary"><BorderColor/></IconButton>
                    <IconButton color="secondary" onClick={ () => openAlert('clearAllConf')}><ClearAll/></IconButton>
                    <IconButton onClick={ () => removePlaylist(currentIndex) }><DeleteButton/></IconButton>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user_data
    }
}

export default connect(mapStateToProps)(ButtonBar);