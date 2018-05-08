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
        const { get_user, get_playlists, get_preferences, history } = this.props
            , { user_preferences } = this.props.user_data
            , { user_genres, user_pace } = user_preferences;
        // const { get_user, history } = this.props
        //     , { userDataLoaded } = this.state;
        axios.get('/api/auth/me').then( res => {
            console.log(res.data)
            get_user(res.data)
            const { userid } = res.data;
            let stack = []
    
            stack.push(get_playlists(userid).then( console.log('Playlist data retrieved'))
                .catch(err => console.log(err)))
            stack.push(get_preferences(userid).then( console.log('User preferences retrieved'))
                .catch(err => console.log(err)))
    
            Promise.all(stack).then( () => {
                !user_genres || !user_pace
                    ? history.push('/questionnaire')
                    : history.push('/profile')
            }).catch(err => console.log(err))
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