import React from 'react';
import '../styles/cartpage.css';

function CartPage({ cart, onRemoveFromCart, onUpdateQuantity, onClearCart, setCurrentPage }) {
  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Add delicious items from our menu!</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => setCurrentPage('menu')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-content">
        {/* CART ITEMS */}
        <div className="cart-items-section">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id} className="cart-item-row">
                  <td className="item-info">
                    <span className="item-emoji">🍖</span>
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="item-desc">{item.description}</p>
                    </div>
                  </td>
                  <td className="item-price">{item.price} AED</td>
                  <td className="item-quantity">
                    <div className="quantity-control">
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="item-total">
                    {item.price * item.quantity} AED
                  </td>
                  <td className="item-action">
                    <button
                      className="remove-btn"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-actions">
            <button 
              className="clear-cart-btn"
              onClick={onClearCart}
            >
              Clear Cart
            </button>
            <button 
              className="continue-btn"
              onClick={() => setCurrentPage('menu')}
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{totalPrice} AED</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee:</span>
            <span>15 AED</span>
          </div>

          <div className="summary-row">
            <span>Taxes (5%):</span>
            <span>{(totalPrice * 0.05).toFixed(2)} AED</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total:</span>
            <span>{(totalPrice + 15 + (totalPrice * 0.05)).toFixed(2)} AED</span>
          </div>

          <div className="promo-section">
            <input 
              type="text" 
              placeholder="Enter promo code (optional)"
              className="promo-input"
            />
            <button className="promo-btn">Apply</button>
          </div>

          <button 
  className="checkout-btn"
  onClick={() => setCurrentPage('checkout')}
>
  Proceed to Checkout
</button>

          <div className="payment-methods">
            <p>We Accept:</p>
            <div className="payment-icons">
              💳 💰 📱
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;