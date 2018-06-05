import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Typography from 'material-ui/Typography';
import { Table, Button, TableBody, TableHead, TableRow, TableCell, Card, CardContent } from 'material-ui';
import Paper from 'material-ui/Paper'

import './Profile.css'

import placeholder from '../../images/profile_ph.jpg';
import paceData from './paceData';

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
        const { user, user_preferences, bpmCalc } = this.props.user_data
        , { username, profile_pic, profile_url } = user
        , { user_pace, user_genres } = user_preferences;
        
        const rows = paceData.map( (entry, i) => {
            return(
                <TableRow key={ i }>
                    <TableCell>{entry.bpm}</TableCell>
                    <TableCell>{entry.min}</TableCell>
                    <TableCell>{entry.mph}</TableCell>
                </TableRow>
            )
        })
        let num = Math.floor(Math.random() * user_genres.length );       
        
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
                                                    Since you still need to figure out your target pace, take a look at the following table. Once you get a feel for the pace you want to run, try searching for songs near the related BPM.
                                                </Typography>
                                            )
                                            : (
                                                <Typography variant="subheading">
                                                    Because you're aiming for a { this.props.user_data.user_preferences.user_pace } pace, we recommend running at about { bpmCalc[this.props.user_data.user_preferences.user_pace] } BPM. Take a look at the following pace calculations:
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