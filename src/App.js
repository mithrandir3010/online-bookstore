import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import './App.css';

// Placeholder components for pages (will be created later)
const CartPage = () => (
  <div className="page">
    <h1>Sepet</h1>
    <p>Sepetinizdeki ürünler burada görünecek</p>
  </div>
);

const CheckoutPage = () => (
  <div className="page">
    <h1>Ödeme</h1>
    <p>Ödeme formu burada olacak</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
