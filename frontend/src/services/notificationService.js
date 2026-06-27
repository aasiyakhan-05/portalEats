// Toast notification (in-app)
export const showToast = (message, type = 'success') => {
  const event = new CustomEvent('toast', {
    detail: { message, type }
  });
  window.dispatchEvent(event);
};

// Email notification
export const sendEmailNotification = async (email, type, data) => {
  try {
    const response = await fetch('http://localhost:5000/api/notifications/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        email,
        type, // order_placed, order_confirmed, order_preparing, out_for_delivery, delivered
        data,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// SMS notification
export const sendSMSNotification = async (phone, message) => {
  try {
    const response = await fetch('http://localhost:5000/api/notifications/sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        phone,
        message,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

// Get notifications
export const getNotifications = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/notifications/my-notifications', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { notifications: [] };
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};