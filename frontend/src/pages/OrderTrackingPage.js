import React, { useState, useEffect } from 'react';
import '../styles/ordertracking.css';

function OrderTrackingPage({ orderId, setCurrentPage }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchOrderDetails, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrderDetails = async () => {
    try {
      // For demo, we'll use sample data
      setSampleOrderData();
    } catch (err) {
      console.error('Error fetching order:', err);
      setSampleOrderData();
    }
    setLoading(false);
  };

  const setSampleOrderData = () => {
    setOrder({
      _id: '1',
      orderId: 'ORD-001',
      status: 'Out for Delivery',
      items: [
        { name: 'Kabab Koobideh', quantity: 2, price: 35 },
        { name: 'Roman Rice', quantity: 1, price: 15 },
      ],
      total: 85,
      estimatedDelivery: '25 mins',
      rider: {
        name: 'Ahmed',
        phone: '+971501234567',
        rating: 4.8,
      },
      delivery: {
        address: 'Villa 123, Street Name, Abu Dhabi',
      },
      timeline: [
        {
          status: 'Ordered',
          time: '10:00 AM',
          completed: true,
          icon: '✅',
        },
        {
          status: 'Confirmed',
          time: '10:01 AM',
          completed: true,
          icon: '✅',
        },
        {
          status: 'Preparing',
          time: '10:05 AM',
          completed: true,
          icon: '👨‍🍳',
        },
        {
          status: 'Ready',
          time: '10:25 AM',
          completed: true,
          icon: '✅',
        },
        {
          status: 'Out for Delivery',
          time: '10:30 AM',
          completed: true,
          icon: '🚚',
        },
        {
          status: 'Delivered',
          time: 'In progress...',
          completed: false,
          icon: '📦',
        },
      ],
    });
  };

  if (loading) {
    return (
      <div className="tracking-container">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="tracking-container">
        <p>Order not found</p>
      </div>
    );
  }

  return (
    <div className="tracking-container">
      <button className="back-btn" onClick={() => setCurrentPage('orders')}>
        ← Back to Orders
      </button>

      {/* ORDER HEADER */}
      <div className="tracking-header">
        <div>
          <h1>{order.orderId}</h1>
          <p className="order-status">Status: <span className="status-active">{order.status}</span></p>
        </div>
        <div className="eta">
          <span className="eta-icon">⏱️</span>
          <span className="eta-time">Estimated in {order.estimatedDelivery}</span>
        </div>
      </div>

      <div className="tracking-content">
        {/* LEFT SECTION - TIMELINE */}
        <div className="tracking-timeline-section">
          <h2>Order Timeline</h2>
          <div className="timeline">
            {order.timeline.map((step, idx) => (
              <div key={idx} className={`timeline-step ${step.completed ? 'completed' : ''}`}>
                <div className="timeline-marker">
                  <span className="marker-icon">{step.icon}</span>
                </div>
                <div className="timeline-content">
                  <h3>{step.status}</h3>
                  <p>{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - DETAILS */}
        <div className="tracking-details-section">
          {/* RIDER INFO */}
          <div className="card rider-card">
            <h3>🚚 Your Rider</h3>
            <div className="rider-info">
              <div className="rider-avatar">👤</div>
              <div className="rider-details">
                <p className="rider-name">{order.rider.name}</p>
                <p className="rider-rating">⭐ {order.rider.rating} rating</p>
                <p className="rider-phone">{order.rider.phone}</p>
              </div>
            </div>
            <button className="contact-btn">📞 Call Rider</button>
          </div>

          {/* DELIVERY ADDRESS */}
          <div className="card address-card">
            <h3>📍 Delivering To</h3>
            <p className="address-text">{order.delivery.address}</p>
            <button className="map-btn">View on Map</button>
          </div>

          {/* ORDER SUMMARY */}
          <div className="card summary-card">
            <h3>📋 Order Summary</h3>
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="summary-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)} AED</span>
                </div>
              ))}
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total:</span>
              <span>{order.total.toFixed(2)} AED</span>
            </div>
          </div>

          {/* HELP SECTION */}
          <div className="card help-card">
            <h3>❓ Need Help?</h3>
            <button className="help-btn">📞 Contact Support</button>
            <button className="help-btn">📧 Email Us</button>
            <button className="help-btn">💬 Chat with Us</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTrackingPage;