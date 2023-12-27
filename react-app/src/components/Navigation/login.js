import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function LoginNavigation () {
  return (
    <div id="login-navigation-bar-cont">
      <NavLink id="login-navigation-bar" exact to="/">SoundUp</NavLink>
    </div>  
  )
}

export default LoginNavigation;