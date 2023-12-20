import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import { login } from "../../store/session";
import Navigation from "../Navigation";
import Footer from "../Footer";
import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [demoUser, setDemoUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoUser = (checked) => {
    setDemoUser(checked);
    if (checked) {
      setEmail("demo@aa.io");
      setPassword("password");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  
  return (
    <>
      <Navigation />
      <div id="login-page">
        <div id="login-form-cont">
          <h1 style={{fontSize: "2.2rem"}}>Log in to SoundUp</h1>
          <form id="login-form" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div id="login-email-input-cont">
              <div>Email</div>
              <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="login-inputs"
                required
              />
            </div>
            <div id="login-password-input-cont">
              <div>Password</div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="login-inputs"
                required
              />
              <button type="button" onClick={toggleShowPassword}>
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash}/> : <FontAwesomeIcon icon={faEye} />}
              </button>
            </div>
            <div id="login-demouser-cont">
              <div id="login-demouser">
                <Switch
                  onChange={handleDemoUser}
                  checked={demoUser}
                  onColor="#1DB954"
                  offColor="#ccc" 
                  checkedIcon={false}
                  uncheckedIcon={false}
                />
                <label>Demo User</label>
              </div>  
            </div>
            <button id="login-btn" type="submit">Log In</button>
            <hr></hr>
            <span style={{fontSize: "0.8rem", color: "#6a6a6a", fontWeight: "bold"}}>
              Don't have an account?
              <Link style={{paddingLeft:"1rem" ,color: "white"}} to="/signup">Sign up for SoundUp</Link>
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginFormPage;
