import React, { useState } from 'react';
import '../styles/reviewspage.css';

function ReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Aasiya Khan',
      rating: 5,
      text: 'Amazing Persian cuisine! The Kabab Koobideh is absolutely delicious. Best restaurant in Abu Dhabi!',
      date: '2024-06-20',
      verified: true,
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      rating: 5,
      text: 'Excellent food quality and super fast delivery. Highly recommended!',
      date: '2024-06-18',
      verified: true,
    },
    {
      id: 3,
      name: 'Sarah Ahmed',
      rating: 4,
      text: 'Great flavors and good portions. A bit spicy but loved it!',
      date: '2024-06-15',
      verified: true,
    },
    {
      id: 4,
      name: 'Mohammed Ali',
      rating: 5,
      text: 'Traditional Persian flavors, authentic taste. Worth every dirham!',
      date: '2024-06-10',
      verified: true,
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!newReview.name || !newReview.text) {
      setMessage('Please fill all fields');
      setLoading(false);
      return;
    }

    // Simulate adding review
    await new Promise(resolve => setTimeout(resolve, 500));

    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split('T')[0],
      verified: false,
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, text: '' });
    setMessage('✅ Thank you! Your review has been submitted.');

    setTimeout(() => setMessage(''), 3000);
    setLoading(false);
  };

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="reviews-container">
      <h1 className="page-title">Customer Reviews</h1>

      {message && <div className="message">{message}</div>}

      <div className="reviews-content">
        {/* STATS */}
        <div className="reviews-stats">
          <div className="stat">
            <p className="stat-number">{averageRating}</p>
            <div className="stars">{'⭐'.repeat(Math.round(averageRating))}</div>
            <p className="stat-label">Average Rating</p>
          </div>
          <div className="stat">
            <p className="stat-number">{reviews.length}</p>
            <p className="stat-label">Total Reviews</p>
          </div>
        </div>

        {/* SUBMIT REVIEW FORM */}
        <div className="submit-review-section">
          <h2>Share Your Experience</h2>
          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={newReview.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Rating</label>
                <select
                  name="rating"
                  value={newReview.rating}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                  <option value="4">⭐⭐⭐⭐ Very Good</option>
                  <option value="3">⭐⭐⭐ Good</option>
                  <option value="2">⭐⭐ Fair</option>
                  <option value="1">⭐ Poor</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Your Review</label>
              <textarea
                name="text"
                value={newReview.text}
                onChange={handleChange}
                placeholder="Share your experience at Al Busthan Kababi..."
                className="form-textarea"
                rows="4"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>

        {/* REVIEWS LIST */}
        <div className="reviews-list">
          <h2>All Reviews</h2>
          {reviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <h3 className="reviewer-name">{review.name}</h3>
                  {review.verified && <span className="verified-badge">✅ Verified</span>}
                </div>
                <div className="review-rating">
                  {'⭐'.repeat(review.rating)}
                </div>
              </div>

              <p className="review-text">{review.text}</p>

              <p className="review-date">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;