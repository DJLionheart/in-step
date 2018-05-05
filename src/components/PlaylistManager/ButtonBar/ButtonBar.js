import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, RaisedButton } from 'material-ui';


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
                    <ToolbarGroup firstChild={ true }>
                        <RaisedButton label="Rename"/>
                        <RaisedButton label="Clear"/>
                        <RaisedButton label="Export"/>
                    </ToolbarGroup>
                </Toolbar>
            </nav>
        )
    }
}

export default ButtonBar;