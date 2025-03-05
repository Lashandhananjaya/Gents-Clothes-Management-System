import React, { useState } from 'react';
import './Login.css'; // Make sure to create this CSS file to apply styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic (e.g., authentication)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-wrapper">
       
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">Next</button>

          <div className="additional-links">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
