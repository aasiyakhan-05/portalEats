import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Al Busthan Kababi</h4>
          <p>🍖 Authentic Persian Kabab</p>
          <p>Experience the finest grilled kababs in Abu Dhabi</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📍 Al Tarkhees St, Madinat Al Riyad, Abu Dhabi</p>
          <p>📞 02 546 6229</p>
          <p>✉️ info@albusthan.com</p>
        </div>

        <div className="footer-section">
          <h4>Hours</h4>
          <p>Monday - Sunday</p>
          <p>11:00 AM - 12:00 AM</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>📘 Facebook | 📷 Instagram | 🐦 Twitter</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Al Busthan Kababi. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;