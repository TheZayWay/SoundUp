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
  const [errors, setErrors] = useState([]);
  const caution = <svg role="img" height="24" width="24" aria-hidden="false" aria-label="Error:" className="Svg-sc-ytk21e-0 uPxdw Icon-sc-1mveit9-0 fOutFo" viewBox="0 0 24 24" data-encore-id="icon" style={{ fill: 'white' }}><title>Error:</title><path d="M11 18v-2h2v2h-2zm0-4V6h2v8h-2z"></path><path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z"></path></svg>;
  let passwordError = "";
  let emailError = "";
  let usernameError = "";
  let confirmError = "";

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
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-inputs"
            placeholder="Password"
            required
          />
          <div className="signup-input-label">Confirm password</div>
          {confirmError !== "" ? <span className="signup-error-labels">{confirmError}</span> : ""}
          <input
            type="password"
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
