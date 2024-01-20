import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../store/session';
import OpenModalButton from '../../OpenModalButton';
import UploadSong from '../../Upload';
import '../Navigation.css';


function LoggedInHomeNavigation () {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <div id="navigation-bar-cont">
      <NavLink className="navigation-bar" exact to="/">SoundUp</NavLink>
      <div id="navigation-logged-in-leftside">
        <OpenModalButton 
          buttonText={"Upload"}
          modalComponent={<UploadSong />}
        />
        <button id="homepage-logout-btn" onClick={handleLogout}>Log Out</button>
      </div>  
    </div>  
  )
}

export default LoggedInHomeNavigation