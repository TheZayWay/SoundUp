import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function SignupNavigation () {
  return (
    <div id="signup-navigation-bar-cont">
      <NavLink id="signup-navigation-bar" exact to="/">SoundUp</NavLink>
    </div>  
  )
}

export default SignupNavigation;