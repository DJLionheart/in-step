import React, { Component } from 'react';
import { Button } from 'material-ui';


class ButtonBar extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return(
            <section>
                    <Button variant="raised" color="secondary">
                        Rename
                    </Button>
                    <Button variant="raised">
                        Clear    
                    </Button> 
                    <Button variant="raised" color="primary">
                        Export
                    </Button>
            </section>
        )
    }
}

export default ButtonBar;