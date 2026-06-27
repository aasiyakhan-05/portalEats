import React, { useState, useEffect } from 'react';
import '../styles/ordertracking.css';

function OrderTrackingPage({ setCurrentPage }) {
  const [order, setOrder] = useState(null);
  const [trackingId, setTrackingId] = useState('');

  useEffect(() => {
    // Initialize on component mount
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
      setTrackingId(JSON.parse(savedOrder).id);
    }
  }, []);

  const handleTrack = (e) => {
    e.preventDefault();
    // Simulate tracking
    const mockOrder = {
      id: trackingId,
      status: 'preparing',
      items: ['Kabab', 'Rice'],
      total: 150,
      estimatedTime: '30 mins'
    };
    setOrder(mockOrder);
  };

  if (!order) {
    return (
      <div className="order-tracking-container">
        <h1>Track Your Order</h1>
        <form onSubmit={handleTrack} className="tracking-form">
          <input
            type="text"
            placeholder="Enter tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            required
          />
          <button type="submit">Track Order</button>
        </form>
      </div>
    );
  }

  return (
    <div className="order-tracking-container">
      <h1>Order Tracking</h1>
      <div className="tracking-info">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Estimated Time:</strong> {order.estimatedTime}</p>
        <p><strong>Total:</strong> AED {order.total}</p>
      </div>

      <div className="order-timeline">
        <div className="timeline-step active">
          <div className="timeline-dot"></div>
          <p>Order Confirmed</p>
        </div>
        <div className={`timeline-step ${order.status === 'preparing' ? 'active' : ''}`}>
          <div className="timeline-dot"></div>
          <p>Preparing</p>
        </div>
        <div className={`timeline-step ${order.status === 'ready' ? 'active' : ''}`}>
          <div className="timeline-dot"></div>
          <p>Ready for Pickup</p>
        </div>
        <div className={`timeline-step ${order.status === 'delivered' ? 'active' : ''}`}>
          <div className="timeline-dot"></div>
          <p>Delivered</p>
        </div>
      </div>

      <button onClick={() => setCurrentPage('home')} className="back-btn">
        Back to Home
      </button>
    </div>
  );
}

export default OrderTrackingPage;