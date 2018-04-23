import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
        return(
            <main>
                <Link to="/about"><button>About</button></Link>
                <Link to="/pace"><button>Pace</button></Link>
                <Link to="/search"><button>Search</button></Link>
                <Link to="/playlist"><button>Playlist Management</button></Link>
                <Link to="/"><button>Logout</button></Link>
            </main>
        )
    }
}

export default NavBar;