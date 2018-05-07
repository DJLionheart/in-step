import React, { Component } from 'react';
import { Button, IconButton } from 'material-ui';
import { connect } from 'react-redux';
import NoteAdd from '@material-ui/icons/NoteAdd';
import DeleteButton from '@material-ui/icons/Delete';



class ButtonBar extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { addPlaylist, removePlaylist } = this.props
            , { currentIndex } = this.props.user_data;

        return(
            <section>
                    <IconButton color="primary" onClick={ addPlaylist }><NoteAdd/></IconButton>
                    <Button variant="raised" color="secondary">
                        Rename
                    </Button>
                    <Button variant="raised">
                        Clear    
                    </Button> 
                    <Button variant="raised" color="primary">
                        Export
                    </Button>
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