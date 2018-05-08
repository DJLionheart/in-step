import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { get_user, get_playlists, get_preferences } from '../../ducks/users';


class LoaderTwo extends Component {
    constructor() {
        super();
        this.state = {
            questionnaireCompleted: false
        }
    }

    componentDidMount() {
        const { get_playlists, get_preferences, history } = this.props
            , { user, user_preferences } = this.props.user_data
            , { user_genres, user_pace } = user_preferences
            , { userid } = user
        console.log('loader', this.props);
        
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
export default withRouter(connect(mapStateToProps, { get_user, get_playlists, get_preferences })(LoaderTwo));