import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// import Checkbox from './Checkbox';

class Questionnaire extends Component {
    constructor() {
        super();
        this.state = {
            // genre_list: ['Pop', 'JPop', 'KPop', 'Dance', 'Electronica', 'Country', 'Alternative', 'Rock', 'Metal'],
            pop: false,
            jPop: false,
            kPop: false,
            latinPop: false,
            dance: false, 
            electronica: false,
            country: false,
            alternative: false,
            rock: false,
            metal: false,
            pace_list: ['12:00', '11:30', '11:00', '10:30', '10:00', '9:30', '9:00', '8:30', '8:00', '7:30', '7:00', '6:30', '6:00', '5:30', '5:00'],
            user_pace: ''
        }
    }
    
    handleInput(evt) {
        const inputValue = evt.target.type === 'checkbox'
                                ? evt.target.checked
                                : evt.target.value

        this.setState({
            [evt.target.name]: inputValue
        })
    }

    // createCheckbox(label) {
    //     return(
    //         <div>
    //             <label>{ label }</label>
    //             <checkbox label={ label } key={ label } value={ label } type="genre"/>
    //         </div>
    //     )
    // }

    // createChecklist = () => {
    //     return this.state.genre.map( this.createCheckbox )
    // }
    
    render() {
        // const genreList = this.state.genre.map( (genre, i) => {
        //     return this.createCheckbox(genre)
        // })

        const paceSelector = this.state.pace_list.map( (pace, i) => {
            return(
                    i === 0
                        ? <option defaultValue={ pace } key={ pace } type="pace">{ pace }</option>
                        : <option value={ pace } key={ pace } type="pace">{ pace }</option>
            )
        } );

        const { pop, jPop, kPop, latinPop, dance, electronica, country, alternative, rock, metal} = this.state;

        return(
            <main>
                <h1>Preferences</h1>
                
                <form>
                    <h2>What genre(s) do you like?</h2>
                    <label>Pop</label>
                    <input name="pop" type="checkbox" checked={ pop } onChange={ e => this.handleInput(e) }/>

                    <label>J-Pop</label>
                    <input name="jPop" type="checkbox" checked={ jPop } onChange={ e => this.handleInput(e) }/>

                    <label>K-Pop</label>
                    <input name="kPop" type="checkbox" checked={ kPop } onChange={ e => this.handleInput(e) }/>

                    <label>Latin Pop</label>
                    <input name="latinPop" type="checkbox" checked={ latinPop } onChange={ e => this.handleInput(e) }/>

                    <label>Dance</label>
                    <input name="dance" type="checkbox" checked={ dance } onChange={ e => this.handleInput(e) }/>

                    <label>Electronica</label>
                    <input name="electronica" type="checkbox" checked={ electronica } onChange={ e => this.handleInput(e) }/>

                    <label>Country</label>
                    <input name="country" type="checkbox" checked={ country } onChange={ e => this.handleInput(e) }/>

                    <label>Alternative</label>
                    <input name="alternative" type="checkbox" checked={ alternative } onChange={ e => this.handleInpop(e) }/>

                    <label>Rock</label>
                    <input name="rock" type="checkbox" checked={ rock } onChange={ e => this.handleInput(e) }/>

                    <label>Metal</label>
                    <input name="metal" type="checkbox" checked={ metal } onChange={ e => this.handleInput(e) }/>

                    What is your goal pace?
                    <select name="user_pace" value={ this.state.user_pace } onChange={ e => this.handleInput(e) }>
                        { paceSelector }
                    </select>

                    <button type="submit">Save</button>
                </form>
            </main>
        )
    }
}

export default Questionnaire;