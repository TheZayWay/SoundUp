import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Switch from 'react-switch';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [demoUser, setDemoUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

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
      <h1>Log In to SoundUp!</h1>

      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div id="login-email-input-cont">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div id="login-password-input-cont">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Demo User</label>
          <div id="login-demo-cont">
            <Switch
              onChange={handleDemoUser}
              checked={demoUser}
              onColor="#1DB954"
              offColor="#ccc" 
              checkedIcon={false}
              uncheckedIcon={false}
            />
          </div>
          
        </div>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormPage;
