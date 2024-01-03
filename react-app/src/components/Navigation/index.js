import React from 'react';
import { useSelector } from 'react-redux';
import LoggedInHomeNavigation from './LoggedIn';
import LoggedOutHomeNavigation from './LoggedOut';

import './Navigation.css';

function Navigation(){
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <div id="all-navi-cont">
        <img className="logo" src={'/logo.png'} alt="Logo" />
        {user ? <LoggedInHomeNavigation /> : <LoggedOutHomeNavigation />}
      </div>
      
    </>	
	)		
}

export default Navigation;
