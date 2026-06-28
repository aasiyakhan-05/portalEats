import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Portal Eats</h4>
          <p>🍖 Authentic Persian Kabab</p>
          <p>Experience the finest grilled kababs</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📍 xyz </p>
          <p>📞 000-000-0000</p>
          <p>✉️ info@portaleats.com</p>
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
        <p>© 2024 Portal Eats. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;