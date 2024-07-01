import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { useNavigate } from "react-router-dom";
import '../index.css'
import logo from '../images/wtvision-image.png'


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useApi();
  const navigate = useNavigate()

  const isDataValidated = (credentials) => {
    for (let key in credentials) {
      if (credentials.hasOwnProperty(key)) {
        if (credentials[key] === null || credentials[key] === undefined || credentials[key] === "") {
          return false;
        }
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isDataValidated({ username, password })) {
      const minLength = 3;
      const maxLength = 20;
      const allowedCharacters = /^[a-zA-Z0-9_.@\-+]+$/;
      if (username.length < minLength || username.length > maxLength) {
        alert(`Username must be between ${minLength} and ${maxLength} characters.`);
        return;
      }
      if (!allowedCharacters.test(username)) {
        alert("Username can only contain letters, numbers, and underscores.");
        return;
      }
      if (password.length < 5 || password.length > maxLength) {
        alert(`Password must be between 5 and ${maxLength} characters.`)
        return;
      }
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard')
      } else {
        console.log('Login failed');
      }
    } else {
      alert('Fill all the fields')
    }
  };


  return (
    <>
      <div className='wtvision-logo'>
        <img src={logo} alt='wt-vision' />
      </div>
      <div className="signup-container">
        <form onSubmit={handleSubmit} className='login'>
          <h3>Login</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
