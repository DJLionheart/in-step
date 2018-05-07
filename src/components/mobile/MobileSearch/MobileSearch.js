import React, { Component } from 'react';
import { connect } from 'react-redux'; 
// import Toolbar from 'material-ui/Toolbar';
import { Button } from 'material-ui';
import Menu, { MenuItem } from 'material-ui/Menu';
// import List, { ListItem, ListItemText } from 'material-ui/List';
// import ListSubheader from 'material-ui/List/ListSubheader';
import Paper from 'material-ui/Paper';

// import { reduxSort } from '../../../ducks/search';
import MobileSong from '../MobileSong/MobileSong';

class MobileSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }


    handleClick(evt) {
        this.setState({
            anchorEl: evt.currentTarget
        })
    }

    handleClose(sort) {
        this.props.handleSort(sort);
        this.setState({
            anchorEl: null
        })
    }

    render() {

        const searchResults = this.props.sortedResults.map( (song, i) => {
            const { bpm, track_name, artist_name, track_genre, track_id } = song;
            
            return (
                <MobileSong
                    playlist_track_number={ '' } 
                    bpm={ bpm }
                    track_name={ track_name }
                    artist_name={ artist_name }
                    track_genre={ track_genre }
                    track_id={ track_id }
                    addBtn={ true }
                    key={ track_id }/>
            )
        } );

        const { anchorEl } = this.state;
    
    
        return(
            <Paper>
                <div>
                {
                    this.props.showControl
                        ? <Button
                            aria-owns={ anchorEl ? 'simple-menu' : null }
                            aria-haspopup="true"
                            onClick={ this.handleClick }
                        >
                            Sort
                            </Button>
                        : null
                }     

                    <Menu
                        anchorEl={ anchorEl }
                        open={ Boolean(anchorEl)}
                        onClose={ this.handleClose }
                    >
                        <MenuItem onClick={ () => this.handleClose('bpm') }>BPM</MenuItem>
                        <MenuItem onClick={ () => this.handleClose('track_name') }>Track</MenuItem>
                        <MenuItem onClick={ () => this.handleClose('artist_name') }>Artist</MenuItem>
                        <MenuItem onClick={ () => this.handleClose('track_genre') }>Genre</MenuItem>
                    </Menu>
                </div>
                <div>
                    { searchResults }
                </div>
            </Paper>
        )        
    }
}

function mapStateToProps(state) {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(MobileSearch);