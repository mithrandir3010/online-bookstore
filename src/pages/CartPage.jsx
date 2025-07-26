import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTrash, 
  FaShoppingCart, 
  FaArrowLeft, 
  FaMinus, 
  FaPlus,
  FaCreditCard,
  FaExclamationCircle
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems,
    isCartEmpty 
  } = useCart();

  const handleQuantityChange = (bookId, newQuantity) => {
    updateQuantity(bookId, newQuantity);
  };

  const handleRemoveItem = (bookId) => {
    removeFromCart(bookId);
  };

  const handleClearCart = () => {
    if (window.confirm('Sepeti temizlemek istediğinizden emin misiniz?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    // TODO: Checkout sayfasına yönlendirme
    alert('Ödeme sayfasına yönlendiriliyorsunuz...');
  };

  // Sepet boşsa
  if (isCartEmpty()) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <Link to="/" className="back-link">
            <FaArrowLeft />
            <span>Alışverişe Devam Et</span>
          </Link>
          <h1>Alışveriş Sepeti</h1>
        </div>
        
        <div className="empty-cart-container">
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Sepetiniz Boş</h2>
          <p>Sepetinizde henüz ürün bulunmuyor. Alışverişe başlamak için kitapları keşfedin!</p>
          <Link to="/" className="continue-shopping-button">
            Kitapları Keşfet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Header */}
      <div className="cart-header">
        <Link to="/" className="back-link">
          <FaArrowLeft />
          <span>Alışverişe Devam Et</span>
        </Link>
        <h1>Alışveriş Sepeti</h1>
        <div className="cart-summary">
          <span>{getTotalItems()} ürün</span>
        </div>
      </div>

      <div className="cart-content">
        {/* Sol Taraf - Ürün Listesi */}
        <div className="cart-items-section">
          <div className="cart-items-header">
            <h2>Sepetinizdeki Ürünler</h2>
            <button 
              onClick={handleClearCart}
              className="clear-cart-button"
            >
              <FaTrash />
              <span>Sepeti Temizle</span>
            </button>
          </div>

          <div className="cart-items-list">
            {cartItems.map((item) => {
              const { book, quantity } = item;
              const { volumeInfo } = book;
              
              // Kitap fiyatını hesapla
              const basePrice = 50;
              const ratingBonus = (volumeInfo.averageRating || 0) * 10;
              const bookPrice = basePrice + ratingBonus;
              const totalPrice = bookPrice * quantity;

              // Kitap kapağı
              const coverImage = volumeInfo.imageLinks?.thumbnail || 
                'https://via.placeholder.com/80x120/CCCCCC/666666?text=Kitap';

              return (
                <div key={book.id} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={coverImage} 
                      alt={volumeInfo.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x120/CCCCCC/666666?text=Kitap';
                      }}
                    />
                  </div>

                  <div className="item-details">
                    <div className="item-info">
                      <h3 className="item-title">
                        <Link to={`/book/${book.id}`}>
                          {volumeInfo.title}
                        </Link>
                      </h3>
                      <p className="item-author">
                        {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Bilinmeyen Yazar'}
                      </p>
                      <div className="item-price">
                        <span className="price-per-unit">{bookPrice.toFixed(2)} TL</span>
                        <span className="price-total">Toplam: {totalPrice.toFixed(2)} TL</span>
                      </div>
                    </div>

                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(book.id, quantity - 1)}
                          className="quantity-btn"
                          disabled={quantity <= 1}
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity-display">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(book.id, quantity + 1)}
                          className="quantity-btn"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(book.id)}
                        className="remove-item-button"
                        title="Ürünü kaldır"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sağ Taraf - Özet */}
        <div className="cart-summary-section">
          <div className="cart-summary-card">
            <h3>Sipariş Özeti</h3>
            
            <div className="summary-items">
              <div className="summary-item">
                <span>Ürün Sayısı:</span>
                <span>{getTotalItems()}</span>
              </div>
              <div className="summary-item">
                <span>Farklı Kitap:</span>
                <span>{cartItems.length}</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Toplam Tutar:</span>
              <span className="total-price">{getTotalPrice().toFixed(2)} TL</span>
            </div>

            <div className="summary-actions">
              <button 
                onClick={handleCheckout}
                className="checkout-button"
              >
                <FaCreditCard />
                <span>Satın Al</span>
              </button>
              
              <Link to="/" className="continue-shopping-link">
                Alışverişe Devam Et
              </Link>
            </div>

            <div className="shipping-info">
              <FaExclamationCircle />
              <span>Ücretsiz kargo 100 TL üzeri alışverişlerde!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 