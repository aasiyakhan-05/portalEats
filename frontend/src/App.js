
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// PAGES
import AuthSplashPage from './pages/AuthSplashPage';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import NotificationsPage from './pages/NotificationsPage';
import ReservationPage from './pages/ReservationPage';
import ReviewsPage from './pages/ReviewsPage';
import ContactPage from './pages/ContactPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import AdminDashboard from './pages/AdminDashboard';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAddToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(itemId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // IF NOT AUTHENTICATED, SHOW SPLASH PAGE
  if (!isAuthenticated) {
    return (
      <AuthSplashPage 
        setCurrentPage={setCurrentPage}
        setIsAuthenticated={setIsAuthenticated}
      />
    );
  }

  // MAIN APP (After authentication)
  return (
    <div className="App">
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cart.length}
      />

      <Toast />

      <div className="page-container">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'menu' && (
          <MenuPage onAddToCart={handleAddToCart} setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'cart' && (
          <CartPage 
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'checkout' && (
          <CheckoutPage 
            cart={cart}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'orders' && <OrdersPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'notifications' && <NotificationsPage />}
        {currentPage === 'reserve' && <ReservationPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'reviews' && <ReviewsPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'track-order' && <OrderTrackingPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'admin' && <AdminDashboard setCurrentPage={setCurrentPage} />}
        {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'register' && <RegisterPage setCurrentPage={setCurrentPage} />}
      </div>

      <Footer />
    </div>
  );
}

export default App;