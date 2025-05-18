import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./loginPage.css";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    console.log("Login form submitted", { username, password });
  };

  return (
    <div className="login-container">
      <h1>LOGIN</h1>
      
      {loginError && (
        <div className="error-message">
          {loginError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="show-password">
          <input
            type="checkbox"
            id="show-password"
            onChange={togglePasswordVisibility}
            checked={showPassword}
          />
          <label htmlFor="show-password">Show password</label>
        </div>

        <button type="submit" Linkto="/dashboard">
          LOGIN
        </button>
      </form>

      <div className="login-options">
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;