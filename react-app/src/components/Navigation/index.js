import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation(){
	return (
    <>
      <div id="navigation-bar-cont">
        <NavLink id="navigation-bar" exact to="/">SoundUp</NavLink>
      </div>  
    </>	
	)		
}

export default Navigation;
