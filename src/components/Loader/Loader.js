import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getUser } from '../../ducks/users';


class Loader extends Component {
    constructor() {
        super();
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        console.log('loader', this.props);
       
        this.props.getUser()

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
export default connect(mapStateToProps, { getUser })(Loader);