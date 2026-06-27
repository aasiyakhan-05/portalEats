import React, { useState } from 'react';
import '../styles/contactpage.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      // Simulate sending message
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage('✅ Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Error sending message: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="contact-container">
      <h1 className="page-title">Contact Us</h1>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <div className="contact-content">
        {/* CONTACT FORM */}
        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                className="form-textarea"
                rows="6"
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* CONTACT INFO */}
        <div className="contact-info-section">
          <div className="info-card">
            <h3>📍 Address</h3>
            <p>Al Tarkhees St</p>
            <p>Madinat Al Riyad</p>
            <p>Abu Dhabi, UAE</p>
          </div>

          <div className="info-card">
            <h3>📞 Phone</h3>
            <a href="tel:0254662299" className="contact-link">
              02 546 6229
            </a>
            <p>Available 24/7</p>
          </div>

          <div className="info-card">
            <h3>⏰ Hours</h3>
            <p>Every Day</p>
            <p>Open until 12:00 AM</p>
            <p>Fresh Persian Cuisine</p>
          </div>

          <div className="info-card">
            <h3>📧 Email</h3>
            <a href="mailto:info@albusthan.com" className="contact-link">
              info@albusthan.com
            </a>
            <p>We reply within 24 hours</p>
          </div>

          <div className="info-card">
            <h3>📱 Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-btn">Facebook</a>
              <a href="#" className="social-btn">Instagram</a>
              <a href="#" className="social-btn">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="map-section">
        <h2>Find Us</h2>
        <div className="map-placeholder">
          <p>📍 Al Busthan Kababi</p>
          <p>Al Tarkhees St, Madinat Al Riyad, Abu Dhabi</p>
          <p>Open in your maps app to navigate</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;