import React from 'react';
import '../styles/homepage.css';

function HomePage({ setCurrentPage }) {
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>🍖 Authentic Persian Kabab</h1>
          <p>Experience the finest grilled kababs in Abu Dhabi</p>
          <button 
            className="cta-btn"
            onClick={() => setCurrentPage('menu')}
          >
            Order Now
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Why Choose PortalEats?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>4.7★ Rating</h3>
            <p>Loved by 26+ customers</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🚚</span>
            <h3>Fast Delivery</h3>
            <p>30 mins delivery guarantee</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔥</span>
            <h3>Fresh & Grilled</h3>
            <p>Cooked to perfection</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💯</span>
            <h3>Quality Assured</h3>
            <p>Premium ingredients</p>
          </div>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="menu-preview">
        <h2>Our Specialties</h2>
        <div className="preview-grid">
          <div className="preview-card">
            <span className="preview-icon">🍢</span>
            <h3>Kabab Koobideh</h3>
            <p>Ground meat perfection</p>
            <p className="price">From 35 AED</p>
          </div>
          <div className="preview-card">
            <span className="preview-icon">🍗</span>
            <h3>Grilled Chicken</h3>
            <p>Tender & juicy</p>
            <p className="price">From 40 AED</p>
          </div>
          <div className="preview-card">
            <span className="preview-icon">🥙</span>
            <h3>Special Plates</h3>
            <p>Complete meal deals</p>
            <p className="price">From 50 AED</p>
          </div>
        </div>
        <button 
          className="view-menu-btn"
          onClick={() => setCurrentPage('menu')}
        >
          View Full Menu
        </button>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>Customer Love</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="stars">⭐⭐⭐⭐⭐</p>
            <p>"The food was very delicious! The kabab was something else! 10/10"</p>
            <p className="author">- Rashad Acc</p>
          </div>
          <div className="testimonial-card">
            <p className="stars">⭐⭐⭐⭐⭐</p>
            <p>"Thank you for delicious food and great service. It was amazing!"</p>
            <p className="author">- Mohammad Farid</p>
          </div>
          <div className="testimonial-card">
            <p className="stars">⭐⭐⭐⭐⭐</p>
            <p>"Generous portions and excellent value for money. Great experience!"</p>
            <p className="author">- Mohamed Maher</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;