import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import '../Navigation.css';

function LoggedOutHomeNavigation () {
  const history = useHistory();
  
  return (
    <div id="navigation-bar-cont">
      <NavLink id="navigation-bar" exact to="/">SoundUp</NavLink>
      <div id="homepage-right-side">
        <NavLink exact to="/signup">Sign up</NavLink>
        <button id="homepage-signup-btn" onClick={() => {history.push('/login')}}>Login</button>
      </div>
    </div>  
  )
}

export default LoggedOutHomeNavigation