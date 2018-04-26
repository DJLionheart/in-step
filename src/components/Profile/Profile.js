import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUser } from '../../ducks/users';

class Profile extends Component {
    componentDidMount() {
        
        this.props.user_data.user.username
            ? this.props.getUser()
            : null
        // setTimeout( () => console.log(this.props), 1500)
    }

    render() {
        const { username, profile_pic, profile_url } = this.props.user_data.user;
        console.log(this.props);
        
        // let { display}
        return(
            <div>
                {
                    username
                        ? (
                            <main>
                                <header>
                                <h2>Welcome, { username }!</h2>
                                <img src={ profile_pic } alt="profile"/>

                                </header>

                                <section>
                                    <h2>How about these tracks?</h2>
                                    
                                </section>

                                <section>
                                    <h2>Favorites</h2>
                                </section>
                                <footer>
                                    {
                                        profile_url
                                            ? (
                                                <a href={ profile_url } target="_blank" rel="noopener noreferrer"><p>Visit your Spotify Profile</p></a>
                                            )
                                            : (
                                                <a href="https://play.google.com/store/music" target="_blank" rel="noopener noreferrer"><p>Check out Google Play</p></a>
                                            ) 
                                    }
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

export default connect(mapStateToProps, { getUser })(Profile);