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

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <SignupNavigation />  
      <form id="signup-form" onSubmit={handleSubmit}>
        <div id="form-data-cont">
          <h1 id="signup-title">Sign up to SoundUp</h1>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="signup-input-label">Email Address</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-inputs"
            required
          />
          <div className="signup-input-label">First Name</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-inputs"
            required
          />
          <div className="signup-input-label">Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-inputs"
            required
          />
          <div className="signup-input-label">Confirm password</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-inputs"
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
