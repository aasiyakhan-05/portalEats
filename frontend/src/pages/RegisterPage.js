import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import '../styles/authpage.css';

function RegisterPage({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Remove leading/trailing spaces automatically
    setFormData(prev => ({
      ...prev,
      [name]: value.trim(),
    }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setMessage('');

  const { name, email, phone, password, passwordConfirm } = formData;

  // Validation
  if (!name || !email || !password || !passwordConfirm) {
    setError('All fields are required');
    setLoading(false);
    return;
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address (e.g., user@example.com)');
    setLoading(false);
    return;
  }

  if (password !== passwordConfirm) {
    setError('Passwords do not match');
    setLoading(false);
    return;
  }

  if (password.length < 6) {
    setError('Password must be at least 6 characters');
    setLoading(false);
    return;
  }

  // Register
  const result = await registerUser(name, email, password, passwordConfirm, phone);

  if (result.success) {
    setMessage('✅ Registration successful! Redirecting...');
    setTimeout(() => {
      setCurrentPage('home');
    }, 1500);
  } else {
    setError(result.message || 'Registration failed');
  }

  setLoading(false);
};

  const password = formData.password;
  const passwordConfirm = formData.passwordConfirm;
  
  const passwordsMatch = password.length > 0 && passwordConfirm.length > 0 && password === passwordConfirm;
  const passwordsDontMatch = password.length > 0 && passwordConfirm.length > 0 && password !== passwordConfirm;
  const passwordValid = password.length >= 6;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join Al Busthan Kababi</p>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="form-input"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {password.length > 0 && password.length < 6 && (
              <p className="password-note weak">
                ⚠️ Password must be at least 6 characters
              </p>
            )}
            
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="form-input"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {passwordsDontMatch && (
              <p className="password-note error">
                ❌ Passwords do not match
              </p>
            )}
            {passwordsMatch && (
              <p className="password-note success">
                ✅ Passwords match perfectly!
              </p>
            )}
          </div>

          <button 
            type="submit" 
            className="auth-btn"
            disabled={loading || passwordsDontMatch || !passwordValid}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <a href="#" className="link">Already have an account? Login</a>
      </div>
    </div>
  );
}

export default RegisterPage;