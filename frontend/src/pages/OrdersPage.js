import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import '../styles/orderspage.css';

function OrdersPage({ setCurrentPage }) {
  const user = getCurrentUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/my-orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || 'Failed to load orders');
      }
    } catch (err) {
      setError('Error loading orders: ' + err.message);
      // For demo, show sample orders
      setSampleOrders();
    }
    setLoading(false);
  };

  const setSampleOrders = () => {
    setOrders([
      {
        _id: '1',
        orderId: 'ORD-001',
        items: [
          { name: 'Kabab Koobideh', price: 35, quantity: 2 },
          { name: 'Roman Rice', price: 15, quantity: 1 },
        ],
        total: 85,
        status: 'Delivered',
        orderDate: new Date('2024-06-20'),
        delivery: { address: 'Villa 123, Street Name', city: 'Abu Dhabi' },
      },
      {
        _id: '2',
        orderId: 'ORD-002',
        items: [
          { name: 'Chicken Tikka', price: 40, quantity: 1 },
          { name: 'Mix Grilled (2 Person)', price: 90, quantity: 1 },
        ],
        total: 145,
        status: 'Processing',
        orderDate: new Date('2024-06-23'),
        delivery: { address: 'Villa 123, Street Name', city: 'Abu Dhabi' },
      },
    ]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'pending';
      case 'Processing':
        return 'processing';
      case 'Out for Delivery':
        return 'delivery';
      case 'Delivered':
        return 'delivered';
      case 'Cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return '⏳';
      case 'Processing':
        return '👨‍🍳';
      case 'Out for Delivery':
        return '🚚';
      case 'Delivered':
        return '✅';
      case 'Cancelled':
        return '❌';
      default:
        return '📦';
    }
  };

  const handleReorder = (order) => {
    // Logic to add items back to cart
    alert('Reorder feature coming soon!');
  };

  if (!user) {
    return (
      <div className="orders-container">
        <div className="not-logged-in">
          <p>Please login to view your orders</p>
          <button 
            className="login-btn"
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-container">
        <p className="loading">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <h1 className="orders-title">My Orders</h1>
        <div className="no-orders">
          <div className="no-orders-icon">📦</div>
          <p>You haven't placed any orders yet</p>
          <button 
            className="order-btn"
            onClick={() => setCurrentPage('menu')}
          >
            Start Ordering
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="orders-list">
        {orders.map(order => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3 className="order-id">{order.orderId}</h3>
                <p className="order-date">
                  {new Date(order.orderDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="order-status">
                <span className={`status-badge ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)} {order.status}
                </span>
              </div>

              <div className="order-total">
                <p className="total-amount">{order.total.toFixed(2)} AED</p>
              </div>
            </div>

            {/* ITEMS PREVIEW */}
            <div className="order-items-preview">
              {order.items.slice(0, 2).map((item, idx) => (
                <p key={idx} className="item-preview">
                  • {item.name} x{item.quantity}
                </p>
              ))}
              {order.items.length > 2 && (
                <p className="more-items">+ {order.items.length - 2} more items</p>
              )}
            </div>

            {/* DELIVERY INFO */}
            <div className="order-delivery">
              <p className="delivery-label">📍 Delivery to:</p>
              <p className="delivery-address">
                {order.delivery.address}, {order.delivery.city}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="order-actions">
              <button
                className="details-btn"
                onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
              >
                {selectedOrder === order._id ? 'Hide' : 'View'} Details
              </button>
              <button
                className="reorder-btn"
                onClick={() => handleReorder(order)}
              >
                Reorder
              </button>
            </div>

            {/* EXPANDED DETAILS */}
            {selectedOrder === order._id && (
              <div className="order-details">
                <div className="details-header">
                  <h4>Order Details</h4>
                </div>

                <div className="items-list">
                  <h5>Items</h5>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="detail-item">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{(item.price * item.quantity).toFixed(2)} AED</span>
                    </div>
                  ))}
                </div>

                <div className="details-divider"></div>

                <div className="payment-info">
                  <h5>Payment Information</h5>
                  <div className="detail-item">
                    <span>Subtotal:</span>
                    <span>{(order.total * 0.85).toFixed(2)} AED</span>
                  </div>
                  <div className="detail-item">
                    <span>Delivery Fee:</span>
                    <span>15 AED</span>
                  </div>
                  <div className="detail-item">
                    <span>Tax:</span>
                    <span>{(order.total * 0.05).toFixed(2)} AED</span>
                  </div>
                  <div className="detail-item total">
                    <span>Total:</span>
                    <span>{order.total.toFixed(2)} AED</span>
                  </div>
                </div>

                <div className="details-divider"></div>

                <div className="tracking-info">
                  <h5>Tracking</h5>
                  <div className="timeline">
                    <div className={`timeline-item ${['Pending', 'Processing', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'completed' : ''}`}>
                      <div className="timeline-dot">✓</div>
                      <p>Order Placed</p>
                    </div>
                    <div className={`timeline-item ${['Processing', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'completed' : ''}`}>
                      <div className="timeline-dot">✓</div>
                      <p>Being Prepared</p>
                    </div>
                    <div className={`timeline-item ${['Out for Delivery', 'Delivered'].includes(order.status) ? 'completed' : ''}`}>
                      <div className="timeline-dot">✓</div>
                      <p>Out for Delivery</p>
                    </div>
                    <div className={`timeline-item ${order.status === 'Delivered' ? 'completed' : ''}`}>
                      <div className="timeline-dot">✓</div>
                      <p>Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;