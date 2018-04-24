import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {
        return(
            <main>
                <h1>Profile</h1>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Profile);