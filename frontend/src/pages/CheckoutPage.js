import React, { useState } from 'react';
import { getCurrentUser } from '../services/authService';
import '../styles/checkoutpage.css';
import { showToast } from '../services/notificationService';

function CheckoutPage({ cart, setCurrentPage }) {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    postalCode: '',
    paymentMethod: 'cash',
    specialInstructions: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 15;
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  // Validation
  if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city) {
    setError('All fields are required');
    showToast('Please fill all required fields', 'warning');
    setLoading(false);
    return;
  }

  try {
    // Create order object
    const orderData = {
      user: {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      },
      delivery: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      items: cart,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      tax: tax,
      total: total,
      paymentMethod: formData.paymentMethod,
      specialInstructions: formData.specialInstructions,
      status: 'Pending',
      orderDate: new Date(),
    };

    // Send to backend
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    // ✅ SUCCESS - ADD NOTIFICATIONS HERE
    if (response.ok) {
      showToast('✅ Order placed successfully!', 'success');
      showToast('📧 Confirmation email sent to ' + formData.email, 'info');
      showToast('📱 You will receive SMS updates on ' + formData.phone, 'info');
      
      setOrderPlaced(true);
      setOrderId(data.orderId || 'ORD-' + Date.now());
      
      // Redirect after 3 seconds
      setTimeout(() => {
        setCurrentPage('home');
      }, 3000);
    } 
    // ❌ ERROR - ADD ERROR NOTIFICATION HERE
    else {
      setError(data.message || 'Failed to place order');
      showToast('❌ ' + (data.message || 'Error placing order'), 'error');
    }
  } catch (err) {
    const errorMsg = 'Error placing order: ' + err.message;
    setError(errorMsg);
    showToast('❌ ' + errorMsg, 'error');
  }

  setLoading(false);
};

  // Order confirmation screen
  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="order-confirmation">
          <div className="confirmation-icon">✅</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your order, {formData.fullName}!</p>
          
          <div className="order-details">
            <p><strong>Order ID:</strong> {orderId}</p>
            <p><strong>Delivery Address:</strong> {formData.address}, {formData.city}</p>
            <p><strong>Total Amount:</strong> {total.toFixed(2)} AED</p>
            <p><strong>Estimated Delivery:</strong> 30-45 minutes</p>
          </div>

          <p className="confirmation-message">
            You will receive an SMS confirmation shortly.
          </p>

          <button 
            className="continue-btn"
            onClick={() => setCurrentPage('home')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Checkout form
  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart-message">
          <p>Your cart is empty. Add items before checkout!</p>
          <button 
            className="continue-btn"
            onClick={() => setCurrentPage('menu')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="checkout-content">
        {/* DELIVERY FORM */}
        <div className="checkout-form-section">
          <h2>Delivery Information</h2>
          
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g., Villa 123, Street Name"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Abu Dhabi"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label>Postal Code (Optional)</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="payment-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                  />
                  <span>💵 Cash on Delivery</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <span>💳 Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleChange}
                  />
                  <span>📱 Online Payment</span>
                </label>
              </div>
            </div>

            {/* SPECIAL INSTRUCTIONS */}
            <div className="form-group">
              <label>Special Instructions (Optional)</label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                placeholder="e.g., Extra spicy, no onions, etc."
                className="form-textarea"
                rows="3"
              />
            </div>

            <button 
              type="submit" 
              className="place-order-btn"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="order-summary-section">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-qty">x {item.quantity}</p>
                </div>
                <p className="item-total">{(item.price * item.quantity).toFixed(2)} AED</p>
              </div>
            ))}
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)} AED</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee:</span>
            <span>{deliveryFee} AED</span>
          </div>

          <div className="summary-row">
            <span>Tax (5%):</span>
            <span>{tax.toFixed(2)} AED</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total:</span>
            <span>{total.toFixed(2)} AED</span>
          </div>

          <div className="note">
            <p>📍 Estimated delivery time: <strong>30-45 minutes</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;