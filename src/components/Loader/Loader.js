import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { get_user, get_playlists, get_preferences } from '../../ducks/users';

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
        const { get_user, get_playlists, get_preferences, history } = this.props;

        axios.get(REACT_APP_AUTH_ME).then( res => {
            console.log('USER: ', res.data)
            
            get_user(res.data)
            const { userid } = res.data;

            axios.get(`${REACT_APP_PLAYLISTS}/${userid}`).then( resp => {
                if(resp.data.length === 0) {
                    axios.post(`${REACT_APP_PLAYLISTS}/${userid}`, {playlist_name: 'Playlist 1'})
                    .then( result => {
                        // const { playlist_id } = result.data[0]
                        console.log(result)
                        get_playlists(userid)
                        // get_matrix({0: playlist_id})

                    }
                    ).catch(err => console.log('Error creating playlist: ', err))
                } else {
                    // let indexMatrix = {};
                    // res.data.forEach( playlist => {
                    //     const { playlist_id, playlist_index } = playlist 
                    //     indexMatrix[playlist_index] = playlist_id
                    // })
                    // get_matrix(indexMatrix)
                    get_playlists(userid)
                }
            })
            axios.get(`${REACT_APP_USERS}?userid=${userid}`).then( response => {
                console.log('Resp from user_preference call: ', response)
                const { user_genres, user_pace } = response.data;

                get_preferences(userid);

                !user_genres || !user_pace
                // user_genres === [] || user_pace === ''
                    ? history.push('/questionnaire')
                    : history.push('/profile')  
            })
        })
    }

    render() {
        return(
            <main>
                <h1>Loading Screen</h1>
                <Link to="/questionnaire"><button>Questionnaire</button></Link>
                <Link to="/profile"><button>Profile</button></Link>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return state
}
export default withRouter(connect(mapStateToProps, { get_user, get_playlists, get_preferences })(Loader));