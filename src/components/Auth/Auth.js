import React from 'react';
import Typography from 'material-ui/Typography';


import spotifyLogo from '../../logos/spotify.png';

import './Auth.css'


function Auth() {

    return(
        <main className="auth-page" color="error">
            <header>
                <Typography variant="display4">
                    InStep
                </Typography>
            </header>
            <section className="login">
                <a href={ process.env.REACT_APP_LOGIN }> <img src={ spotifyLogo } alt="spotify logo"/></a>
            </section>

            
            
        </main>
    )
}

export default Auth;