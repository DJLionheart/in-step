import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getUser } from '../../ducks/users';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            songs_collected: false
        }
    }
   
    
    componentDidMount() {
        
        this.props.user_data.user.username
            ? this.props.getUser()
            : null
        // setTimeout( () => console.log(this.props), 1500)
    }

    findIds() {
        const { access_token } = this.props.user_data.user
        axios.post('/api/ids', {token: access_token}).then( res => {
            // this.setState({
            //     songs_collected: true
            // })
            console.log('request complete', res.data);
            
        })

    }

    render() {
        const { username, profile_pic, profile_url } = this.props.user_data.user;
        console.log("User found", this.props);
        
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
                                    <button onClick={ () => this.findIds(this.props) }>Find Ids</button>
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

export default connect(mapStateToProps, { getUser })(Profile);