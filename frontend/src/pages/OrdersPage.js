import React, { useState, useEffect } from 'react';
import '../styles/orderspage.css';

function OrdersPage({ setCurrentPage }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage or fetch from API
    const savedOrders = localStorage.getItem('userOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Sample orders if none exist
      const sampleOrders = [
        {
          id: '001',
          date: '2024-06-25',
          total: 150,
          status: 'delivered',
          items: ['Kabab', 'Rice', 'Salad']
        },
        {
          id: '002',
          date: '2024-06-24',
          total: 200,
          status: 'completed',
          items: ['Chicken Tikka', 'Bread', 'Yogurt']
        }
      ];
      setOrders(sampleOrders);
    }
  }, []);

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders yet</p>
          <button onClick={() => setCurrentPage('menu')}>
            Start Ordering
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status ${order.status}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-details">
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Items:</strong> {order.items.join(', ')}</p>
                <p><strong>Total:</strong> AED {order.total}</p>
              </div>
              <div className="order-actions">
                <button onClick={() => setCurrentPage('track-order')}>
                  Track Order
                </button>
                <button onClick={() => setCurrentPage('menu')}>
                  Order Again
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;