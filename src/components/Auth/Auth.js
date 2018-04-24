import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Auth extends Component {
    render() {
        return(
            <main>
                <Link to="/questionnaire"><button>Login</button></Link>
                
            </main>
        )
    }
}

export default Auth;