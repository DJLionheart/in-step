import React from 'react';

export default function Checkbox(props) {
    return(
        <div className="checklist-item">
            <label>{ props.label }</label>
            <input type="checkbox" value={ props.value } checked={ props.checked }/>
        </div>
    )
}
