import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { get_user } from '../../ducks/users';


class Loader extends Component {
    constructor() {
        super();
        this.state = {
            userDataLoaded: false
        }
    }

    componentDidMount() {
        const { get_user, history } = this.props
            , { userDataLoaded } = this.state;
        
        get_user().then( () => {
            history.push('/loading/user_data')
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
export default withRouter(connect(mapStateToProps, { get_user })(Loader));