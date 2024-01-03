import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import '../Navigation.css';

function LoggedInHomeNavigation () {
  const dispatch = useDispatch();
  const handleLogOut = async (e) => {
      dispatch(logout())
  }
  
  return (
    <div id="navigation-bar-cont">
      <NavLink id="navigation-bar" exact to="/">SoundUp</NavLink>
      <div id="navigation-logged-in-leftside">
        <button id="homepage-logout-btn" onClick={handleLogOut}>Log Out</button>
      </div>  
    </div>  
  )
}

export default LoggedInHomeNavigation