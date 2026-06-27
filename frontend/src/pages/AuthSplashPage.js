import React, { useState } from 'react';
import '../styles/authsplash.css';

function AuthSplashPage({ setCurrentPage, setIsAuthenticated }) {
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const handleContinueAsGuest = () => {
    if (!phone.trim() || !location.trim()) {
      alert('Please enter phone and location!');
      return;
    }
    localStorage.setItem('guestPhone', phone);
    localStorage.setItem('guestLocation', location);
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogin = () => {
    setCurrentPage('login');
  };

  const handleRegister = () => {
    setCurrentPage('register');
  };

  return (
    <div className="auth-splash-container">
      <div className="splash-card">
        {/* Header */}
        <div className="splash-header">
          <div className="splash-logo">🍖</div>
          <h1> PortalEats</h1>
          <p className="subtitle">Welcome to Paradise</p>
        </div>

        {/* Guest Section */}
        <div className="splash-form-section">
          <h2>Continue as Guest</h2>
          <p>Provide your details to start ordering</p>
          
          <div className="form-group">
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="Delivery Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-input"
            />
          </div>
          
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleContinueAsGuest}
          >
            Start Ordering
          </button>
        </div>

        {/* Divider */}
        <div className="divider">
          <span>OR</span>
        </div>

        {/* Auth Buttons */}
        <div className="splash-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleLogin}
          >
            Login
          </button>
          
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleRegister}
          >
            Create Account
          </button>
        </div>

        {/* Footer */}
        <div className="splash-footer">
          <p>📞 02 546 6229</p>
          <p>Open until 12 AM Daily</p>
        </div>
      </div>
    </div>
  );
}

export default AuthSplashPage;