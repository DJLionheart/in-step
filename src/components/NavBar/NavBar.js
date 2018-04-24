import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return(
            <main>
                <Link to="/profile"><button>Profile</button></Link>
                <Link to="/pace"><button>Find Your Pace</button></Link>
                <Link to="/search"><button>Search</button></Link>
                <Link to="/playlist"><button>Playlist Management</button></Link>
                <Link to="/"><button>Logout</button></Link>
            </main>
        )
    }
}

export default NavBar;