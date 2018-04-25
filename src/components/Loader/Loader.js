import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Loader extends Component {
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

export default Loader;