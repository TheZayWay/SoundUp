import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/session';
import OpenModalButton from '../../OpenModalButton';
import UploadSong from '../../Upload';
import '../Navigation.css';


function LoggedInHomeNavigation () {
  const dispatch = useDispatch();
  const handleLogOut = async (e) => {
      dispatch(logout())
  }
  
  return (
    <div id="navigation-bar-cont">
      <NavLink className="navigation-bar" exact to="/">SoundUp</NavLink>
      <div id="navigation-logged-in-leftside">
        <OpenModalButton 
          buttonText={"Upload"}
          modalComponent={<UploadSong />}
          className="upload-modal"
        />
        <button id="homepage-logout-btn" onClick={handleLogOut}>Log Out</button>
      </div>  
    </div>  
  )
}

export default LoggedInHomeNavigation