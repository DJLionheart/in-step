import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Typography, FormControl, FormGroup, FormControlLabel, Checkbox } from 'material-ui';
import { Select, InputLabel, MenuItem, Button } from 'material-ui';
import Dialog, { DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui/Dialog';


import { get_user, post_user_preferences, put_user_preferences, save_initial } from '../../ducks/users';
import { handle_modal } from '../../ducks/modals';

import './Questionnaire.css';


class Questionnaire extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false,
            genre_list: [
                {name: 'Pop', selected: false},
                {name: 'J-Pop', selected: false},
                {name: 'K-Pop', selected: false},
                {name: 'Latin Pop', selected: false},
                {name: 'Dance', selected: false}, 
                {name: 'Electronica', selected: false},
                {name: 'Hip-Hop', selected: false},
                {name: 'Techno', selected: false},
                {name: 'Trance', selected: false},
                {name: 'Country', selected: false},
                {name: 'Alternative', selected: false},
                {name: 'Rock', selected: false},
                {name: 'Metal', selected: false}
            ],
            pace_list: ['Not sure', '12:00', '11:30', '11:00', '10:30', '10:00', '9:30', '9:00', '8:30', '8:00', '7:30', '7:00', '6:30', '6:00', '5:30', '5:00'],
            user_pace: '',
            prefs: false
        }
    }
    
    componentDidMount() {
        const { get_user, user_data } = this.props
            , { user, playlists } = user_data
            , { REACT_APP_AUTH_ME } = process.env;

        if( playlists.length === 0 || user === {}) {
                axios.get(REACT_APP_AUTH_ME).then( res => {
                get_user(res.data)
            }).catch(err => console.log("error getting user: ", err))
        }
    }

    handleInput(evt, index) {
        var inputValue = '';

        switch(evt.target.type) {
            case 'checkbox':
                
                inputValue = evt.target.checked;
                let newGenres = this.state.genre_list.slice();
                
                newGenres[index].selected = inputValue;
                
                this.setState({
                    genre_list: newGenres
                })
                break;
                
            default:
                inputValue = evt.target.value
                this.setState({
                    [evt.target.name]: inputValue
                })    
                break;   
        }        
    }
    
    // <select type="select" name="user_pace" value={ this.state.user_pace } onChange={ e => this.handleInput(e) }>
    //     { paceSelector }
    // </select>
    savePreferences() {
        const { handle_modal, user_data, post_user_preferences, save_initial } = this.props
            , { userid } = user_data.user
            , { user_pace, genre_list } = this.state
            , userGenrePrefs = genre_list.filter( genre => genre.selected).map( filtered_g => filtered_g.name);

        if(userGenrePrefs.length < 1 || !user_pace) {
            handle_modal('q_alert', true);
        } else {
            post_user_preferences(userid, userGenrePrefs, this.state.user_pace).then( () => {
                save_initial();
                this.setState({
                    redirect: true
                })
            })
        }
    }

    putPreferences() {
        const { user_data, handle_modal, put_user_preferences, save_initial } = this.props
            , { userid } = user_data.user
            , { user_pace, genre_list } = this.state
            , userGenrePrefs = genre_list.filter( genre => genre.selected).map( filtered_g => filtered_g.name);
        
        if(userGenrePrefs.length < 1 || !user_pace) {
            handle_modal('q_alert', true);
        } else {
            put_user_preferences(userid, userGenrePrefs, this.state.user_pace).then( () => {
                save_initial()
                this.setState({
                    redirect: true
                })
            })
        }
    }
    
    render() {
        const { user_data, modals, handle_modal } = this.props
            , { q_alert } = modals
            , { user } = user_data
            , { username } = user;
        
        if(this.state.redirect) {
            return <Redirect to='/profile'/>
        }

        const checklist = this.state.genre_list.map( (genre, index) => {
            return (
                <FormControlLabel key={ index }
                    control={
                        <Checkbox
                            name={ genre.name }
                            checked={ genre.selected }
                            onChange={ e => this.handleInput(e, index) }
                            color="primary"
                        />
                    }
                    label={ genre.name }
                />
            )
        })

        const paceSelector = this.state.pace_list.map( pace => {
            return <MenuItem value={ pace } key={ pace }>{ pace }</MenuItem>
        });


        return(
            <main className="q">
                {
                    username !== 'User'
                    ?(<div>

                        <Typography variant="headline" id="pace">Favorite Genres</Typography>
                        <br/>
                        <FormControl>
                            <FormGroup>
                                <form onSubmit={ e => {
                                    e.preventDefault()
                                    if(this.props.user_data.initialPrefsSaved){
                                        this.putPreferences()
                                    } else {
                                        this.savePreferences()
                                    }
                                    }}>

                                    { checklist }
                                    <Typography variant="headline" id="pace" className="q-header-text">Goal Pace</Typography>
                                    <FormControl id="pace-control">
                                        <InputLabel id="pace-helper" htmlFor="pace-helper">Pace</InputLabel>
                                            <Select
                                                name="user_pace"
                                                value={ this.state.user_pace }
                                                onChange={ e => this.handleInput(e)}
                                                inputProps={{
                                                    name: "user_pace"
                                                }}
                                                id="select"
                                            >
                                                { paceSelector }
                                            </Select>
                                    </FormControl>
                                    <footer id="q-foot">
                                        <Button variant="raised" color="primary" type="submit">Save</Button>
                                    </footer>
                                </form>
                            </FormGroup>
                        </FormControl>
                    </div>)
                    : <Typography variant="headline" id="pl-log">Please log in</Typography>
                }
                {
                    // Questionnaire Alert 
                }
                <Dialog
                    open={ q_alert }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Questionnaire Incomplete'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please answer both questions.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={ () => handle_modal('q_alert', false) }>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </main>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { get_user, post_user_preferences, put_user_preferences, handle_modal, save_initial })(Questionnaire);