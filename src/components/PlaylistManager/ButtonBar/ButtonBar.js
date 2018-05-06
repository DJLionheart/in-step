import React, { Component } from 'react';
import { Toolbar, Button } from 'material-ui';


class ButtonBar extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return(
            <nav>
                <Toolbar>
                    <Button variant="raised" label="Rename"/>
                    <Button variant="raised" label="Clear"/>
                    <Button variant="raised" label="Export"/>
                </Toolbar>
            </nav>
        )
    }
}

export default ButtonBar;