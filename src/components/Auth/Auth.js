import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Auth extends Component {
    render() {
        return(
            <main>
                <Link to="/loading"><button>Login</button></Link>
                <a href={ process.env.REACT_APP_LOGIN_A }><button>Auth0 - Test Login</button></a>
                <a href={ process.env.REACT_APP_LOGIN_S }><button>Spotify - Test Login</button></a>
                
            </main>
        )
    }
}

export default Auth;