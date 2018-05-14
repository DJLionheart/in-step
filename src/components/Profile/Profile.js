import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            
            songs_collected: false
        }
    }
        

    render() {
        const { username, profile_pic, profile_url } = this.props.user_data.user;
        
        // let { display}
        return(
            <div>
                {
                    username
                        ? (
                            <main>
                                <header>
                                <Typography variant="headline">Welcome, { username }!</Typography>
                                <Avatar src={ profile_pic } alt="profile"/>

                                </header>

                                <section>
                                    <h2>How about these tracks?</h2>
                                    
                                </section>

                                <section>
                                    <h2>Favorites</h2>
                                </section>
                                <footer>
                                    <a href={ profile_url } target="_blank" rel="noopener noreferrer"><p>Visit your Spotify Profile</p></a>      
                                </footer>
                            </main>

                        )
                        : <h3>Please login</h3>
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Profile);