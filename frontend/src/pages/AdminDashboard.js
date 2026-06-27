import React, { useState, useEffect } from 'react';
import '../styles/admindashboard.css';

function AdminDashboard({ setCurrentPage }) {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      // For demo, we'll use sample data
      setSampleAdminData();
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setSampleAdminData();
    }
    setLoading(false);
  };

  const setSampleAdminData = () => {
    const sampleOrders = [
      {
        _id: '1',
        orderId: 'ORD-001',
        customerName: 'Aasiya Khan',
        phone: '0501234567',
        items: [
          { name: 'Kabab Koobideh', quantity: 2, price: 35 },
          { name: 'Roman Rice', quantity: 1, price: 15 },
        ],
        total: 85,
        status: 'Delivered',
        orderDate: new Date('2024-06-20T10:00:00'),
        deliveryAddress: 'Villa 123, Street Name, Abu Dhabi',
      },
      {
        _id: '2',
        orderId: 'ORD-002',
        customerName: 'John Doe',
        phone: '0509876543',
        items: [
          { name: 'Chicken Tikka', quantity: 1, price: 40 },
          { name: 'Mix Grilled (2 Person)', quantity: 1, price: 90 },
        ],
        total: 145,
        status: 'Out for Delivery',
        orderDate: new Date('2024-06-23T14:30:00'),
        deliveryAddress: 'Apartment 456, Building XYZ, Abu Dhabi',
      },
      {
        _id: '3',
        orderId: 'ORD-003',
        customerName: 'Sarah Ahmed',
        phone: '0505555555',
        items: [
          { name: 'Sheesh Tawook', quantity: 2, price: 38 },
        ],
        total: 92,
        status: 'Preparing',
        orderDate: new Date('2024-06-24T18:45:00'),
        deliveryAddress: 'Villa 789, Street ABC, Abu Dhabi',
      },
    ];

    setOrders(sampleOrders);

    const totalRevenue = sampleOrders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = sampleOrders.filter(o => o.status === 'Pending').length;
    const completedOrders = sampleOrders.filter(o => o.status === 'Delivered').length;

    setStats({
      totalOrders: sampleOrders.length,
      totalRevenue: totalRevenue,
      pendingOrders: pendingOrders,
      completedOrders: completedOrders,
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'pending';
      case 'Preparing':
        return 'preparing';
      case 'Ready':
        return 'ready';
      case 'Out for Delivery':
        return 'delivery';
      case 'Delivered':
        return 'delivered';
      default:
        return 'pending';
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* ADMIN HEADER */}
      <div className="admin-header">
        <h1>👨‍💼 Admin Dashboard</h1>
        <button 
          className="logout-admin-btn"
          onClick={() => setCurrentPage('home')}
        >
          Back to Home
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>📦 Total Orders</h3>
          <p className="stat-number">{stats.totalOrders}</p>
          <span className="stat-label">All time</span>
        </div>

        <div className="stat-card">
          <h3>💰 Total Revenue</h3>
          <p className="stat-number">{stats.totalRevenue.toFixed(0)} AED</p>
          <span className="stat-label">All time</span>
        </div>

        <div className="stat-card">
          <h3>⏳ Pending Orders</h3>
          <p className="stat-number">{stats.pendingOrders}</p>
          <span className="stat-label">Need attention</span>
        </div>

        <div className="stat-card">
          <h3>✅ Completed Orders</h3>
          <p className="stat-number">{stats.completedOrders}</p>
          <span className="stat-label">This month</span>
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="orders-table-section">
        <h2>Recent Orders</h2>

        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td className="order-id">{order.orderId}</td>
                  <td>
                    <div className="customer-info">
                      <p className="customer-name">{order.customerName}</p>
                      <p className="customer-phone">{order.phone}</p>
                    </div>
                  </td>
                  <td className="items-cell">
                    {order.items.map((item, idx) => (
                      <p key={idx}>{item.name} x{item.quantity}</p>
                    ))}
                  </td>
                  <td className="amount">{order.total} AED</td>
                  <td>
                    <span className={`status-badge ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="date">
                    {order.orderDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelectedOrder(order._id === selectedOrder ? null : order._id)}
                    >
                      {selectedOrder === order._id ? 'Hide' : 'Update'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ORDER UPDATE SECTION */}
        {selectedOrder && (
          <div className="order-update-section">
            {orders
              .filter(o => o._id === selectedOrder)
              .map(order => (
                <div key={order._id} className="update-card">
                  <div className="update-header">
                    <h3>Update Order {order.orderId}</h3>
                    <button
                      className="close-btn"
                      onClick={() => setSelectedOrder(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="update-info">
                    <p><strong>Customer:</strong> {order.customerName}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                    <p><strong>Current Status:</strong> {order.status}</p>
                  </div>

                  <div className="status-buttons">
                    <button
                      className="status-btn pending"
                      onClick={() => updateOrderStatus(order._id, 'Pending')}
                    >
                      ⏳ Pending
                    </button>
                    <button
                      className="status-btn preparing"
                      onClick={() => updateOrderStatus(order._id, 'Preparing')}
                    >
                      👨‍🍳 Preparing
                    </button>
                    <button
                      className="status-btn ready"
                      onClick={() => updateOrderStatus(order._id, 'Ready')}
                    >
                      ✅ Ready
                    </button>
                    <button
                      className="status-btn delivery"
                      onClick={() => updateOrderStatus(order._id, 'Out for Delivery')}
                    >
                      🚚 Out for Delivery
                    </button>
                    <button
                      className="status-btn delivered"
                      onClick={() => updateOrderStatus(order._id, 'Delivered')}
                    >
                      📦 Delivered
                    </button>
                  </div>

                  <div className="order-items-detail">
                    <h4>Order Items</h4>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="item-detail">
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                        <span>{(item.price * item.quantity).toFixed(2)} AED</span>
                      </div>
                    ))}
                    <div className="item-detail total">
                      <span>Total:</span>
                      <span></span>
                      <span>{order.total.toFixed(2)} AED</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;