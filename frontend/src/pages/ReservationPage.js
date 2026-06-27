import React, { useState } from 'react';
import '../styles/reservationpage.css';

function ReservationPage({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [reserved, setReserved] = useState(false);

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

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      // Simulate sending to backend
      await new Promise(resolve => setTimeout(resolve, 1000));

      setReserved(true);
      setMessage('✅ Reservation confirmed! Check your email for details.');

      setTimeout(() => {
        setCurrentPage('home');
      }, 2000);
    } catch (err) {
      setError('Error making reservation: ' + err.message);
    }

    setLoading(false);
  };

  if (reserved) {
    return (
      <div className="reservation-container">
        <div className="reservation-confirmation">
          <h1>🎉 Reservation Confirmed!</h1>
          <p>Thank you, {formData.name}!</p>
          <div className="confirmation-details">
            <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {formData.time}</p>
            <p><strong>Guests:</strong> {formData.guests} people</p>
          </div>
          <p>You'll receive a confirmation email shortly.</p>
          <button onClick={() => setCurrentPage('home')} className="back-home-btn">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-container">
      <h1 className="page-title">Make a Reservation</h1>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <div className="reservation-content">
        {/* FORM */}
        <div className="reservation-form-section">
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
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
                <label>Email *</label>
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

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Number of Guests *</label>
                <select name="guests" value={formData.guests} onChange={handleChange} className="form-input">
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="7">7+ Guests</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="e.g., window seat, celebration, dietary restrictions..."
                className="form-textarea"
                rows="4"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Confirming...' : 'Confirm Reservation'}
            </button>
          </form>
        </div>

        {/* INFO SECTION */}
        <div className="reservation-info-section">
          <div className="info-card">
            <h3>📞 Quick Call</h3>
            <p>Call us to make a reservation:</p>
            <a href="tel:0254662299" className="phone-link">
              02 546 6229
            </a>
          </div>

          <div className="info-card">
            <h3>🕐 Hours</h3>
            <p>Daily: Open until 12:00 AM</p>
            <p>Perfect for lunch & dinner!</p>
          </div>

          <div className="info-card">
            <h3>📍 Location</h3>
            <p>Al Tarkhees St</p>
            <p>Madinat Al Riyad</p>
            <p>Abu Dhabi</p>
          </div>

          <div className="info-card">
            <h3>⭐ Rating</h3>
            <p className="rating">4.7 ★</p>
            <p>Persian Restaurant</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationPage;