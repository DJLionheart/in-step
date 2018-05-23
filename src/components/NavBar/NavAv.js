import React from 'react';
import './NavAv.css';

function NavAv(props) {
    const { src, alt } = props;
    return(
        <img src={ src } alt={ alt } id="avatar"/>
    )
}

export default NavAv;