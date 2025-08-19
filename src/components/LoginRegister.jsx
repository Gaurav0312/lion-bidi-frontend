import React, { useState } from 'react';
import '../styles/Login.css';

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(`${formType} form submitted`);
  };

  return (
    <div className={`container ${isActive ? 'active' : ''}`}>
      {/* Login Form */}
      <div className="form-box login">
        <form onSubmit={(e) => handleSubmit(e, 'login')}>
          <h1>Login</h1>
          <p>Please enter your login details below</p>
          
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <i className="bx bxs-envelope"></i>
          </div>
          
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          
          <div className="forgot-link">
            <a href="#">Forgot your password?</a>
          </div>
          
          <button type="submit" className="btn">Login</button>
          
          <p>or login with</p>
          
          <div className="social-icons">
            <a href="#"><i className="bx bxl-google"></i></a>
            <a href="#"><i className="bx bxl-facebook"></i></a>
            <a href="#"><i className="bx bxl-github"></i></a>
            <a href="#"><i className="bx bxl-linkedin"></i></a>
          </div>
        </form>
      </div>

      {/* Register Form */}
      <div className="form-box register">
        <form onSubmit={(e) => handleSubmit(e, 'register')}>
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account</p>
          
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <i className="bx bxs-user"></i>
          </div>
          
          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <i className="bx bxs-envelope"></i>
          </div>
          
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <i className="bx bxs-lock-alt"></i>
          </div>
          
          <button type="submit" className="btn">Sign Up</button>
          
          <p>or register with</p>
          
          <div className="social-icons">
            <a href="#"><i className="bx bxl-google"></i></a>
            <a href="#"><i className="bx bxl-facebook"></i></a>
            <a href="#"><i className="bx bxl-github"></i></a>
            <a href="#"><i className="bx bxl-linkedin"></i></a>
          </div>
        </form>
      </div>

      {/* Toggle Box */}
      <div className="toggle-box">
        <div className="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <button className="btn register-btn" onClick={handleRegisterClick}>
            Sign Up
          </button>
        </div>
        
        <div className="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button className="btn login-btn" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
