import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Auth extends Component {
    render() {
        return(
            <main>
                <Link to="/about"><button>Login</button></Link>
                
            </main>
        )
    }
}

export default Auth;