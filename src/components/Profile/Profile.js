import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import axios from 'axios';


import Typography from 'material-ui/Typography';
import { Table, Button, TableBody, TableHead, TableRow, TableCell, Card, CardContent } from 'material-ui';
// import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper'

import './Profile.css'
import placeholder from '../../images/profile_ph.jpg';
import pace from './paceData';
// import { get_user, get_playlists, get_preferences } from '../../ducks/users';

const {
    REACT_APP_QUEST,
    REACT_APP_SHIVAR
} = process.env;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionaire: true
        }
    }

    render(){
        const { user, user_preferences  } = this.props.user_data
            , { username, profile_pic, profile_url } = user
            , { user_pace, user_genres } = user_preferences;

        const paceData = [
            {min: '12:00', mph: '05.00', bpm: '130'},
            {min: '11:30', mph: '05.22', bpm: '140'},
            {min: '11:30', mph: '05.22', bpm: '135'},
            {min: '11:00', mph: '05.45', bpm: '140'},
            {min: '10:30', mph: '05.71', bpm: '145'},
            {min: '10:00', mph: '06.00', bpm: '150'},
            {min: '09:30', mph: '06.32', bpm: '155'},
            {min: '09:00', mph: '06.67', bpm: '160'},
            {min: '08:30', mph: '07.06', bpm: '165'},
            {min: '08:00', mph: '07.50', bpm: '170'},
            {min: '07:30', mph: '08.00', bpm: '175'},
            {min: '07:00', mph: '08.57', bpm: '180'},
            {min: '06:30', mph: '09.23', bpm: '185'},
            {min: '06:00', mph: '10.00', bpm: '190'},
            {min: '05:30', mph: '10.91', bpm: '195'},
            {min: '05:00', mph: '12.00', bpm: '200'},
        ]  
        
        const user_rec = paceData.filter( val => val.min === user_pace);

        const rows = pace.data.map( (entry, i) => {
            return(
                <TableRow key={ i }>
                    <TableCell>{entry.bpm}</TableCell>
                    <TableCell>{entry.min}</TableCell>
                    <TableCell>{entry.mph}</TableCell>
                </TableRow>
            )
        })
        let num = Math.floor(Math.random() * user_genres.length );
        // const favGenres =  ( (genre, i) => {
        //     console.log('Genre: ', genre)
        //     return <ListItemText key={ i } primary={ genre }/> 

        // })        
        
        return(
            <div>
                {
                    username !== 'User'
                        ?(<Paper className="profile">
                            <Card>
                                <CardContent>
                                    {
                                        username !== 'User'
                                            ? <img src={ profile_pic } alt={ username } className="avatar" id="user"/>
                                            : <img src={ placeholder } alt="user profile" className="avatar" id="user"/>
                                    }
                                    <Typography variant="headline">Welcome, { username }!</Typography>
                                    <Typography variant="subheading">    
                                        How about searching for some { user_genres[num] } songs today?
                                    </Typography>    
                                </CardContent> 
                                <br/>
                            </Card>
                            <Card>
                                <CardContent>
                                    <br/>
                                    <Typography variant="title">
                                        Why BPM matters...
                                    </Typography>
                                    <Typography variant="subheading">
                                        According to <a href={REACT_APP_SHIVAR} target="_blank" rel="noopener noreferrer">Nate Shivar</a>, listening to music at a specific BPM (beats per minute) can help you stay on pace. Call it your own personal "Marathoner's Metronome" if you will.
                                    </Typography>
                                    <br/>
                                    {
                                        user_pace === 'Not sure'
                                            ? (
                                                <Typography variant="subheading">
                                                    Since you still need to figure out your target pace, take a look at the following pace calculations. Once you get a feel for the pace you want to run, try searching for songs near the related BPM.
                                                </Typography>
                                            )
                                            : (
                                                <Typography variant="subheading">
                                                    Because you're aiming for a { user_pace } pace, we recommend running at about { user_rec.bpm } BPM. Take a look at the following pace calculations:
                                                </Typography>
                                            )
                                    }
                                    <div className="pace-table">
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>BPM</TableCell>
                                                    <TableCell>Min/mile</TableCell>
                                                    <TableCell>MPH</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                { rows }
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                            <footer>
                                <Button variant="raised" color="primary" onClick={ () => window.open(profile_url)} id="profile-btn">Spotify Profile</Button>
                                <Link to={REACT_APP_QUEST}><Button variant="raised" color="secondary" id="profile-btn"> Preferences</Button></Link>
                            </footer>
                        </Paper>


                        )
                        :<Typography variant="headline" id="pl-log">Please log in</Typography>
                }

            </div>
        )
    }    
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Profile);