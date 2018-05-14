import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';

import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { Table, TableBody, TableHead, TableRow, TableCell, Card, CardContent, CardMedia } from 'material-ui';
import Paper from 'material-ui/Paper'

import pace from './paceData';

// import { get_user, get_playlists, get_preferences } from '../../ducks/users';
  

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionaire: true
        }
    }

    //<Card>
       // <CardMedia
          //  image={ profile_pic }
        //    title="Profile picture"/>
      //  <CardContent>
      //      <Typography variant="headline">Welcome, { username }!</Typography>
    //        <Typography variant="subheading">
            //    Goal Pace: { user_pace }
          //      Favorite Genres: { JSON.stringify(user_genres)}
        //    </Typography>
      //  </CardContent> 
    //</Card>

    render(){
        const { username, profile_pic, profile_url, user_preferences  } = this.props.user_data.user
            // , { user_genres, user_pace } = user_preferences
        
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

        const rows = paceData.map( entry => {
            return(
                 <TableRow key={ paceData.min }>
                    <TableCell>{entry.bpm}</TableCell>
                    <TableCell>{entry.min}</TableCell>
                    <TableCell>{entry.mph}</TableCell>
                </TableRow>
            )
        })        

        return(
            <div>
                <Paper>
                    
                    <Card>
                        <CardContent>
                            <Typography variant="title">
                                Why BPM matters...
                            </Typography>
                            <Typography variant="subheading">
                                According to <a href="https://www.nateshivar.com/1182/how-i-cut-157-off-my-average-5k-time-by-tweaking-my-playlist/" target="_blank">Nate Shivar</a>, listening to music at a specific BPM (beats per minute) can help you stay on pace. Call it your own personal "Marathoner's Metronome" if you will.
                            </Typography>
                            <Typography variant="subheading">
                                Take a look at the following pace calculations:
                            </Typography>
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
                        </CardContent>
                    </Card>
                    <footer>
                        <a href={ profile_url } target="_blank" rel="noopener noreferrer"><p>Visit your Spotify Profile</p></a>      
                    </footer>
                </Paper>
            </div>
        )
    }    
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps)(Profile);