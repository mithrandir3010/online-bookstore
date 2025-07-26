import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaStar, 
  FaUser, 
  FaCalendar, 
  FaTag, 
  FaShoppingCart, 
  FaArrowLeft,
  FaSpinner,
  FaExclamationTriangle,
  FaBook
} from 'react-icons/fa';
import { fetchBookById } from '../services/bookService';
import { useCart } from '../context/CartContext';
import './BookDetailsPage.css';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, getItemQuantity } = useCart();

  useEffect(() => {
    loadBookDetails();
  }, [id]);

  const loadBookDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const bookData = await fetchBookById(id);
      
      if (bookData) {
        setBook(bookData);
      } else {
        setError('Kitap bulunamadı');
      }
    } catch (err) {
      setError('Kitap detayları yüklenirken bir hata oluştu');
      console.error('Kitap detay hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (book) {
      addToCart(book);
      // Başarı mesajı göster
      const message = `${book.volumeInfo.title} sepete eklendi!`;
      showNotification(message);
    }
  };

  const showNotification = (message) => {
    // Basit bir bildirim sistemi
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #27ae60;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  };

  // Loading durumu
  if (loading) {
    return (
      <div className="book-details-page">
        <div className="loading-container">
          <FaSpinner className="loading-spinner" />
          <h2>Kitap detayları yükleniyor...</h2>
        </div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="book-details-page">
        <div className="error-container">
          <FaExclamationTriangle className="error-icon" />
          <h2>Bir Hata Oluştu</h2>
          <p>{error}</p>
          <Link to="/" className="back-button">
            <FaArrowLeft />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  // Kitap bulunamadı durumu
  if (!book) {
    return (
      <div className="book-details-page">
        <div className="not-found-container">
          <FaBook className="not-found-icon" />
          <h2>Kitap Bulunamadı</h2>
          <p>Aradığınız kitap mevcut değil veya kaldırılmış olabilir.</p>
          <Link to="/" className="back-button">
            <FaArrowLeft />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const { volumeInfo } = book;
  const {
    title,
    authors,
    description,
    imageLinks,
    publishedDate,
    pageCount,
    categories,
    averageRating,
    ratingsCount,
    language,
    publisher
  } = volumeInfo;

  // Varsayılan kitap kapağı
  const coverImage = imageLinks?.large || 
                    imageLinks?.medium || 
                    imageLinks?.thumbnail || 
                    'https://via.placeholder.com/300x450/CCCCCC/666666?text=Kitap+Kapağı';

  // Yazar bilgisini formatla
  const authorText = authors ? authors.join(', ') : 'Bilinmeyen Yazar';

  // Yayın yılını formatla
  const year = publishedDate ? publishedDate.split('-')[0] : 'Bilinmiyor';

  // Kategori bilgisini formatla
  const categoryText = categories ? categories.join(', ') : 'Genel';

  // Açıklamayı formatla
  const formattedDescription = description 
    ? description.replace(/<[^>]*>/g, '') // HTML tag'lerini temizle
    : 'Bu kitap için açıklama bulunmuyor.';

  // Sepetteki miktar
  const cartQuantity = getItemQuantity(book.id);

  return (
    <div className="book-details-page">
      {/* Geri Dön Butonu */}
      <div className="back-section">
        <Link to="/" className="back-link">
          <FaArrowLeft />
          <span>Ana Sayfaya Dön</span>
        </Link>
      </div>

      {/* Kitap Detayları */}
      <div className="book-details-container">
        {/* Sol Taraf - Kitap Kapağı */}
        <div className="book-cover-section">
          <div className="book-cover-wrapper">
            <img 
              src={coverImage} 
              alt={title}
              className="book-cover-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x450/CCCCCC/666666?text=Kitap+Kapağı';
              }}
            />
            {averageRating && (
              <div className="rating-badge">
                <FaStar className="star-icon" />
                <span>{averageRating.toFixed(1)}</span>
                {ratingsCount && (
                  <span className="rating-count">({ratingsCount})</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sağ Taraf - Kitap Bilgileri */}
        <div className="book-info-section">
          <div className="book-header">
            <h1 className="book-title">{title}</h1>
            <div className="book-author">
              <FaUser className="author-icon" />
              <span>{authorText}</span>
            </div>
          </div>

          {/* Kitap Meta Bilgileri */}
          <div className="book-meta">
            <div className="meta-item">
              <FaCalendar className="meta-icon" />
              <span>Yayın Yılı: {year}</span>
            </div>
            {pageCount && (
              <div className="meta-item">
                <FaBook className="meta-icon" />
                <span>Sayfa Sayısı: {pageCount}</span>
              </div>
            )}
            <div className="meta-item">
              <FaTag className="meta-icon" />
              <span>Kategori: {categoryText}</span>
            </div>
            {language && (
              <div className="meta-item">
                <span>Dil: {language.toUpperCase()}</span>
              </div>
            )}
            {publisher && (
              <div className="meta-item">
                <span>Yayınevi: {publisher}</span>
              </div>
            )}
          </div>

          {/* Kitap Açıklaması */}
          <div className="book-description">
            <h3>Kitap Hakkında</h3>
            <p>{formattedDescription}</p>
          </div>

          {/* Sepete Ekle Bölümü */}
          <div className="add-to-cart-section">
            {cartQuantity > 0 && (
              <div className="cart-quantity-info">
                <span>Sepette: {cartQuantity} adet</span>
              </div>
            )}
            <button 
              onClick={handleAddToCart}
              className="add-to-cart-button"
            >
              <FaShoppingCart />
              <span>
                {cartQuantity > 0 ? 'Sepete Ekle (+1)' : 'Sepete Ekle'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* CSS Animasyonları için style tag */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BookDetailsPage; 