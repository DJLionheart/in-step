import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Typography, FormControl, FormGroup, FormControlLabel, Checkbox } from 'material-ui';
import { Select, InputLabel, MenuItem, Button } from 'material-ui';


import { post_user_preferences, put_prefs } from '../../ducks/users';

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
            user_pace: ''
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
        const { userid } = this.props.user_data.user;
        const userGenrePrefs = this.state.genre_list.filter( genre => genre.selected).map( filtered_g => filtered_g.name)

        this.props.post_user_preferences(userid, userGenrePrefs, this.state.user_pace);
        this.setState({
            redirect: true
        })
        // setTimeout(() => { this.props.history.push('/profile')}, 500);
    }

    putPreferences() {
        const { userid } = this.props.user_data.user;
        const userGenrePrefs = this.state.genre_list.filter( genre => genre.selected).map( filtered_g => filtered_g.name)

        this.props.post_user_preferences(userid, userGenrePrefs, this.state.user_pace);
        this.setState({
            redirect: true
        })
        // setTimeout(() => { this.props.history.push('/profile')}, 500);
    }
    
    render() {
        const { classes } = this.props;
        if(this.state.redirect) {
            return <Redirect to='/profile'/>
        }
        
        // const checklist = this.state.genre_list.map( (genre, index) => {
        //     return (
        //     <div key={ index }>
        //         <label>{ genre.name }</label>
        //         <input type="checkbox" name={ genre.name } checked={ genre.selected } onChange={ e => this.handleInput(e, index) }/>
        //     </div>)
        // })

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
            // return(
            //         i === 0
            //             ? <option defaultValue={ pace } key={ pace } type="pace">{ pace }</option>
            //             : <option value={ pace } key={ pace } type="pace">{ pace }</option>
            // )
        } );


        return(
            <main className="q gradient">
                <Typography variant="headline" className="q-header-text">Favorite Genres</Typography>
                <br/>
                <FormControl>
                    <FormGroup>
                        <form onSubmit={ e => {
                            e.preventDefault()
                            this.savePreferences() }}>

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
                                    >
                                        { paceSelector }
                                    </Select>
                            </FormControl>
                            <footer>
                                <Button variant="raised" color="primary" type="submit">Save</Button>
                            </footer>
                        </form>
                    </FormGroup>
                </FormControl>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { post_user_preferences })(Questionnaire);