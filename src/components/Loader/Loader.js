import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import CircularProgress from 'material-ui/Progress/CircularProgress'

import { get_user, get_playlists, apply_prefs, save_initial } from '../../ducks/users';

import './Loader.css';

const {
    REACT_APP_AUTH_ME,
    REACT_APP_PLAYLISTS,
    REACT_APP_USERS,


} = process.env;

class Loader extends Component {
    constructor() {
        super();
        this.state = {
            userDataLoaded: false
        }
    }

    componentDidMount() {
        const { get_user, get_playlists, apply_prefs, history } = this.props;

        axios.get(REACT_APP_AUTH_ME).then( res => {
            
            get_user(res.data)
            const { userid } = res.data;

            axios.get(`${REACT_APP_PLAYLISTS}/${userid}`).then( resp => {
                if(resp.data.length === 0) {
                    axios.post(`${REACT_APP_PLAYLISTS}/${userid}`, {playlist_name: 'Playlist 1'})
                    .then( result => {
                        // console.log(result)
                        get_playlists(userid)
                    }
                    ).catch(err => console.log('Error creating playlist: ', err))
                } else {
                    get_playlists(userid)
                }
            })
            axios.get(`${REACT_APP_USERS}?userid=${userid}`).then( response => {
                const { user_genres, user_pace } = response.data;
                if( !user_genres || !user_pace ) {
                    
                    history.push('/questionnaire')
                } else {
                    apply_prefs(response.data);
                    this.props.save_initial()
                    history.push('/profile');
                }
            })
        })
    }
    
    render() {
        let size = 85;

        if(window.matchMedia("(max-width: 375px)").matches) {
            size = 85;
        } else if (window.matchMedia("(max-width: 414px)").matches) {
            size = 100;
        } else if(window.matchMedia("(max-width: 1223px)").matches) {
            size = 200;
        }
        return(
            <main className="loader">
                <CircularProgress size={ size } color="secondary" />
            </main>
        )
    }
}

function mapStateToProps(state) {
    return state
}
export default withRouter(connect(mapStateToProps, { get_user, get_playlists, apply_prefs, save_initial })(Loader));
//<Button variant="raised" onClick={ () => this.props.history.push('/profile') }>Continue</Button>