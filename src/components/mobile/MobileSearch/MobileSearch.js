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

import { sort_results } from '../../../ducks/search';

import './MobileSearch.css'

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
        this.props.sort_results(sort);
        this.setState({
            anchorEl: null
        })
    }
    
    render() {
        const searchResults = this.props.sortedResults.map( (song, i) => {
            const { track_id } = song;
            
            return (
                <MobileSong
                    track={ song }
                    order_num={ '' }
                    addBtn={ true }
                    key={ track_id }/>
            )
        } );

        const { anchorEl } = this.state;
    
    
        return(
            <Paper>
                <div>
                    <div className="search-button">
                        {
                            this.props.showControl
                                ? <Button
                                    variant="raised"
                                    color="secondary"
                                    aria-owns={ anchorEl ? 'sort-menu' : null }
                                    aria-haspopup="true"
                                    onClick={ this.handleClick }
                                >
                                    Sort
                                </Button>
                                : null
                        }     
                    </div>

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
                <div className="m-search-results">
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

export default connect(mapStateToProps, { sort_results })(MobileSearch);