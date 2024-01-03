import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import SignupNavigation from "../Navigation/signup";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  let passwordError = "";
  let emailError = "";
  let usernameError = "";
  let confirmError = "";
  const caution = <svg role="img" height="24" width="24" aria-hidden="false" aria-label="Error:" className="Svg-sc-ytk21e-0 uPxdw Icon-sc-1mveit9-0 fOutFo" viewBox="0 0 24 24" data-encore-id="icon" style={{ fill: 'white' }}><title>Error:</title><path d="M11 18v-2h2v2h-2zm0-4V6h2v8h-2z"></path><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path></svg>;
  const eyeslash = <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 uPxdw" style={{ fill: 'white' }}><path d="M22.207 2.824a1 1 0 1 0-1.414-1.414L17.15 5.053C15.621 4.363 13.92 4 12 4 8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453.278.246.562.479.853.697L1.793 20.41a1 1 0 1 0 1.414 1.414l3.126-3.126.003.002 1.503-1.503-.004-.001 1.73-1.73.004.001 1.567-1.567h-.004l4.68-4.681.001.004 1.595-1.595-.002-.003.11-.109.002.002 1.444-1.444-.003-.002 3.248-3.248zM14.884 7.32l-5.57 5.57A4.035 4.035 0 0 1 8.113 10c0-2.23 1.761-4 3.886-4 1.137 0 2.17.506 2.884 1.319zM7.9 14.304l-1.873 1.873a11.319 11.319 0 0 1-.957-.763C4.396 14.818 3.3 13.621 2.387 12c.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204A6.073 6.073 0 0 0 6.113 10c0 1.681.682 3.21 1.786 4.304zm11.568-5.2 1.415-1.415a16.503 16.503 0 0 1 2.756 3.853l.236.458-.236.458c-1.082 2.1-2.485 3.659-3.381 4.453C18.004 18.908 15.328 20 12 20a13.22 13.22 0 0 1-3.08-.348l1.726-1.726c.435.05.886.074 1.354.074 2.833 0 5.037-.907 6.931-2.586.674-.596 1.77-1.793 2.683-3.414a14.515 14.515 0 0 0-2.146-2.896z"></path><path d="M17.843 10.729c-.328 2.755-2.494 4.956-5.24 5.24l5.24-5.24z"></path></svg>
  const eye = <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 uPxdw" style={{ fill: 'white' }}><path d="M6.703 7.382A6.073 6.073 0 0 0 6.113 10c0 3.292 2.614 6 5.887 6 3.273 0 5.886-2.708 5.886-6 0-.936-.211-1.825-.589-2.618.573.341 1.115.744 1.634 1.204.674.596 1.77 1.793 2.683 3.414-.913 1.62-2.01 2.818-2.683 3.414C17.037 17.093 14.833 18 12 18s-5.037-.907-6.931-2.586c-.674-.596-1.77-1.793-2.683-3.414.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204zM12 4C8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453C5.996 18.908 8.672 20 12 20c3.329 0 6.004-1.091 8.258-3.089.896-.794 2.3-2.353 3.38-4.453l.237-.458-.236-.458c-1.082-2.1-2.485-3.659-3.381-4.453C18.004 5.09 15.328 4 12 4zm0 2c2.125 0 3.886 1.77 3.886 4S14.125 14 12 14s-3.886-1.77-3.886-4S9.875 6 12 6z"></path></svg>

  for (let i = 0; i < errors.length; i++) {
    if (errors[i].includes("password")) {
      passwordError = errors[i].slice(11)
    }
    if (errors[i].includes("email")) {
      emailError = errors[i].slice(8)
    }
    if (errors[i].includes("username")) {
      usernameError = errors[i].slice(11)
    }
    if (errors[i].includes("match")) {
      confirmError = errors[i]
    }
  }

  if (sessionUser) return <Redirect to="/" />;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Passwords must match']);
    }
  };

  return (
    <>
      <SignupNavigation />  
      <form id="signup-form" onSubmit={handleSubmit}>
        <div id="form-data-cont">
          <h1 id="signup-title">Sign up to SoundUp</h1>
          {errors.length > 0 ? (<div className="login-errors-cont"><span className="login-errors">{caution}<span style={{paddingLeft: "1rem"}}>An Error Occurred.</span></span></div> ): ""}
          <div className="signup-input-label">Email Address</div>
          {emailError !== "" ? <span className="signup-error-labels">{emailError}</span> : ""}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-inputs"
            placeholder="Email Address"
            required
          />
          <div className="signup-input-label">First Name</div>
          {usernameError !== "" ? <span className="signup-error-labels">{usernameError}</span> : ""}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-inputs"
            placeholder="First Name"
            required
          />
          <div className="signup-input-label">Password</div>
          {passwordError !== "" ? <span className="signup-error-labels">{passwordError}</span> : ""}
          <div id="signup-input-cont">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-inputs"
              placeholder="Password"
              required
            />
            <button id="signup-password-input" type="button" onClick={toggleShowPassword}>
              {showPassword ? eye : eyeslash}
            </button>
          </div>
          
          <div className="signup-input-label">Confirm password</div>
          {confirmError !== "" ? <span className="signup-error-labels">{confirmError}</span> : ""}
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-inputs"
            placeholder="Confirm password"
            required
          />
          <button id="signup-btn" type="submit">Sign Up</button>
          <hr id="signup-hr"></hr>
          <span style={{fontSize: "0.9rem", color: "#6a6a6a", fontWeight: "bold", marginBottom: "2rem"}}>
            Already have an account?
            <Link id="login-to-signup" to="/login"> Log in here.</Link>
          </span>
          <span style={{fontSize: "0.55rem", color: "#6a6a6a", fontWeight: "bold"}}>This site is protected by reCAPTCHA and the Google</span>
          <span style={{fontSize: "0.55rem", color: "#6a6a6a", fontWeight: "bold"}}>Privacy Policy and Terms of Service apply.</span>
        </div>
      </form>
    </>
  );
}

export default SignupFormPage;
