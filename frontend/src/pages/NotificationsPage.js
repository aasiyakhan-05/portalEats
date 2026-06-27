import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../services/notificationService';
import '../styles/notificationspage.css';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data.notifications || []);
    setLoading(false);
  };

  const handleMarkAsRead = async (id) => {
    await markNotificationAsRead(id);
    setNotifications(prev =>
      prev.map(notif =>
        notif._id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Sample notifications for demo
  const sampleNotifications = [
    {
      _id: '1',
      type: 'order_placed',
      title: 'Order Confirmed',
      message: 'Your order ORD-001 has been placed successfully!',
      timestamp: new Date('2024-06-20T10:00:00'),
      read: true,
      icon: '✅',
    },
    {
      _id: '2',
      type: 'order_preparing',
      title: 'Preparing Your Order',
      message: 'Your order is being prepared in our kitchen. Estimated time: 20 minutes',
      timestamp: new Date('2024-06-20T10:15:00'),
      read: true,
      icon: '👨‍🍳',
    },
    {
      _id: '3',
      type: 'out_for_delivery',
      title: 'Out for Delivery',
      message: 'Your order is on the way! Rider will arrive in 10-15 minutes',
      timestamp: new Date('2024-06-20T10:45:00'),
      read: false,
      icon: '🚚',
    },
    {
      _id: '4',
      type: 'delivered',
      title: 'Order Delivered',
      message: 'Your order has been delivered. Thank you for ordering from Al Busthan!',
      timestamp: new Date('2024-06-20T11:00:00'),
      read: false,
      icon: '📦',
    },
  ];

  const displayNotifications = notifications.length > 0 ? notifications : sampleNotifications;

  const filteredNotifications = displayNotifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = displayNotifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="notifications-container">
        <p className="loading">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>Notifications</h1>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount} new</span>
        )}
      </div>

      {/* FILTER TABS */}
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({displayNotifications.length})
        </button>
        <button
          className={`filter-tab ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
        <button
          className={`filter-tab ${filter === 'read' ? 'active' : ''}`}
          onClick={() => setFilter('read')}
        >
          Read ({displayNotifications.filter(n => n.read).length})
        </button>
      </div>

      {/* NOTIFICATIONS LIST */}
      {filteredNotifications.length === 0 ? (
        <div className="no-notifications">
          <p>📭 No notifications</p>
        </div>
      ) : (
        <div className="notifications-list">
          {filteredNotifications.map(notif => (
            <div
              key={notif._id}
              className={`notification-item ${!notif.read ? 'unread' : ''}`}
              onClick={() => !notif.read && handleMarkAsRead(notif._id)}
            >
              <div className="notification-icon">{notif.icon}</div>

              <div className="notification-content">
                <h3 className="notification-title">{notif.title}</h3>
                <p className="notification-message">{notif.message}</p>
                <span className="notification-time">
                  {new Date(notif.timestamp).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              {!notif.read && <div className="notification-indicator"></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationsPage;