import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { post_user_preferences } from '../../ducks/users';

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
            pace_list: ['Not quite sure...', '12:00', '11:30', '11:00', '10:30', '10:00', '9:30', '9:00', '8:30', '8:00', '7:30', '7:00', '6:30', '6:00', '5:30', '5:00'],
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

    savePreferences() {
        const { userid } = this.props.users.user;
        const userGenrePrefs = this.state.genre_list.filter( genre => genre.selected).map( filtered_g => filtered_g.name)

        this.props.post_user_preferences(userid, userGenrePrefs, this.state.user_pace);
        this.setState({
            redirect: true
        })
        // setTimeout(() => { this.props.history.push('/profile')}, 500);
    }
    
    render() {
        if(this.state.redirect) {
            return <Redirect to='/profile'/>
        }

        const checklist = this.state.genre_list.map( (genre, index) => {
            return (
            <div key={ index }>
                <label>{ genre.name }</label>
                <input type="checkbox" name={ genre.name } checked={ genre.selected } onChange={ e => this.handleInput(e, index) }/>
            </div>)
        })

        const paceSelector = this.state.pace_list.map( (pace, i) => {
            return(
                    i === 0
                        ? <option defaultValue={ pace } key={ pace } type="pace">{ pace }</option>
                        : <option value={ pace } key={ pace } type="pace">{ pace }</option>
            )
        } );


        return(
            <main>
                <header>
                    <h1>Preferences</h1>
                </header>
                
                <form onSubmit={ e => {
                    e.preventDefault()
                    this.savePreferences() }}>
                    <h2>What genre(s) do you like?</h2>
                    { checklist }
                    

                    <h2>What is your goal pace?</h2>
                    <select type="select" name="user_pace" value={ this.state.user_pace } onChange={ e => this.handleInput(e) }>
                        { paceSelector }
                    </select>
                    <footer>
                        <button type="submit">Save</button>
                    </footer>
                </form>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, { post_user_preferences })(Questionnaire);