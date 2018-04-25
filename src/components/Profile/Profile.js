import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../../ducks/user';

class Profile extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        return(
            <main>
                <h1>Profile</h1>

                <section>
                    <h2>How about these tracks?</h2>
                </section>

                <section>
                    <h2>Favorites</h2>
                </section>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { getUser })(Profile);