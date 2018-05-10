import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { get_user, get_playlists, get_preferences } from '../../ducks/users';


class Loader extends Component {
    constructor() {
        super();
        this.state = {
            userDataLoaded: false
        }
    }

    componentDidMount() {
        const { get_user, get_playlists, get_preferences, history } = this.props;

        // const { get_user, history } = this.props
        //     , { userDataLoaded } = this.state;
        axios.get('/api/auth/me').then( res => {

            console.log(res.data)
            get_user(res.data)
            const { userid } = res.data;

            axios.get(`/api/playlists/${userid}`).then( res => {
                if(!res.data) {
                    axios.post(`/api/playlists/${userid}`, {playlist_name: 'Playlist 1'})
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
            axios.get(`/api/user_preferences?userid=${userid}`).then( resp => {
                console.log('Resp from user_preference call: ', resp)
                const { user_genres, user_pace } = resp.data;

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