import React from 'react';
import { useSelector } from 'react-redux';
import LoggedInHomeNavigation from './LoggedIn';
import LoggedOutHomeNavigation from './LoggedOut';
import './Navigation.css';

function Navigation(){
  const user = useSelector((state) => state.session.user);

  return (
    <>
      {user ? <LoggedInHomeNavigation /> : <LoggedOutHomeNavigation />}
    </>	
	)		
}

export default Navigation;
