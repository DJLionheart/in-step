import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Auth extends Component {
    render() {
        return(
            <main>
                <header>
                    <h1>InStep</h1>
                    <h3>By logging in, you agree to let us access your Spotify profile and playlist information...</h3>
                    <h3>Don't worry, we promise not to misuse your data... *Cough* Cambridge *Cough* Analitica</h3>
                    <h4>(Too soon?)</h4>
                </header>
                <Link to="/loading"><button>Login</button></Link>
                <a href={ process.env.REACT_APP_LOGIN_A }><button>Auth0 - Test Login</button></a>
                <a href={ process.env.REACT_APP_LOGIN_S }><button>Spotify - Test Login</button></a>
                
            </main>
        )
    }
}

export default Auth;