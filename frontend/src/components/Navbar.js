import React from 'react';
import '../styles/navbar.css';

function Navbar({ currentPage, setCurrentPage, cartCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <div className="navbar-logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-icon">🍖</span>
          <span className="logo-text">PortalEats</span>
        </div>

        {/* CENTER NAV LINKS */}
        <div className="nav-links">
          <a 
            onClick={() => setCurrentPage('home')}
            className={currentPage === 'home' ? 'active' : ''}
          >
            Home
          </a>
          <a 
            onClick={() => setCurrentPage('menu')}
            className={currentPage === 'menu' ? 'active' : ''}
          >
            Menu
          </a>
          <a 
            onClick={() => setCurrentPage('reserve')}
            className={currentPage === 'reserve' ? 'active' : ''}
          >
            Reserve
          </a>
          <a 
            onClick={() => setCurrentPage('reviews')}
            className={currentPage === 'reviews' ? 'active' : ''}
          >
            Reviews
          </a>
          <a 
            onClick={() => setCurrentPage('contact')}
            className={currentPage === 'contact' ? 'active' : ''}
          >
            Contact
          </a>
          <a 
            onClick={() => setCurrentPage('notifications')}
            className={currentPage === 'notifications' ? 'active' : ''}
          >
            Notifications 🔔
          </a>
          <a 
            onClick={() => setCurrentPage('orders')}
            className={currentPage === 'orders' ? 'active' : ''}
          >
            Orders
          </a>
          <a 
            onClick={() => setCurrentPage('admin')}
            className={currentPage === 'admin' ? 'active' : ''}
          >
            👨‍💼 Admin
          </a>
        </div>

        {/* CART BUTTON - RIGHT SIDE */}
        <button 
          className="cart-btn"
          onClick={() => setCurrentPage('cart')}
        >
          🛒 Cart ({cartCount})
        </button>
      </div>
    </nav>
  );
}

export default Navbar;