import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaCreditCard,
  FaCheckCircle,
  FaExclamationCircle,
  FaShoppingCart
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart, isCartEmpty } = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Sepet boşsa ana sayfaya yönlendir
  if (isCartEmpty()) {
    return (
      <div className="checkout-page">
        <div className="empty-cart-container">
          <FaShoppingCart className="empty-cart-icon" />
          <h2>Sepetiniz Boş</h2>
          <p>Ödeme yapabilmek için sepetinizde ürün bulunmalıdır.</p>
          <Link to="/" className="continue-shopping-button">
            Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  // Form input değişikliklerini handle et
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Hata varsa temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form doğrulama
  const validateForm = () => {
    const newErrors = {};

    // Ad kontrolü
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ad alanı zorunludur';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'Ad en az 2 karakter olmalıdır';
    }

    // Soyad kontrolü
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad alanı zorunludur';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Soyad en az 2 karakter olmalıdır';
    }

    // Email kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email alanı zorunludur';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz';
    }

    // Telefon kontrolü
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon alanı zorunludur';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Telefon numarası 10 haneli olmalıdır';
    }

    // Adres kontrolü
    if (!formData.address.trim()) {
      newErrors.address = 'Adres alanı zorunludur';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Adres en az 10 karakter olmalıdır';
    }

    // Şehir kontrolü
    if (!formData.city.trim()) {
      newErrors.city = 'Şehir alanı zorunludur';
    }

    // Posta kodu kontrolü
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Posta kodu zorunludur';
    } else if (!/^[0-9]{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Posta kodu 5 haneli olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form gönderimi
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simüle edilmiş ödeme işlemi
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Başarılı ödeme
      setIsOrderComplete(true);
      clearCart(); // Sepeti temizle
      
      // 5 saniye sonra ana sayfaya yönlendir
      setTimeout(() => {
        navigate('/');
      }, 5000);
      
    } catch (error) {
      alert('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Başarılı sipariş ekranı
  if (isOrderComplete) {
    return (
      <div className="checkout-page">
        <div className="order-success-container">
          <FaCheckCircle className="success-icon" />
          <h1>Siparişiniz Başarıyla Tamamlandı!</h1>
          <p>Teşekkür ederiz. Siparişiniz alındı ve işleme alındı.</p>
          <div className="order-details">
            <p><strong>Sipariş Tutarı:</strong> {getTotalPrice().toFixed(2)} TL</p>
            <p><strong>Teslimat Adresi:</strong> {formData.address}, {formData.city}</p>
          </div>
          <p className="redirect-message">
            5 saniye sonra ana sayfaya yönlendirileceksiniz...
          </p>
          <Link to="/" className="back-home-button">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      {/* Header */}
      <div className="checkout-header">
        <Link to="/cart" className="back-link">
          <FaArrowLeft />
          <span>Sepete Dön</span>
        </Link>
        <h1>Ödeme</h1>
      </div>

      <div className="checkout-content">
        {/* Sol Taraf - Form */}
        <div className="checkout-form-section">
          <div className="form-container">
            <h2>Kullanıcı Bilgileri</h2>
            
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">
                    <FaUser />
                    Ad *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                    placeholder="Adınız"
                  />
                  {errors.firstName && (
                    <span className="error-message">
                      <FaExclamationCircle />
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    <FaUser />
                    Soyad *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                    placeholder="Soyadınız"
                  />
                  {errors.lastName && (
                    <span className="error-message">
                      <FaExclamationCircle />
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <span className="error-message">
                      <FaExclamationCircle />
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone />
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="5XX XXX XX XX"
                  />
                  {errors.phone && (
                    <span className="error-message">
                      <FaExclamationCircle />
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  <FaMapMarkerAlt />
                  Adres *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="Tam adresinizi giriniz"
                  rows="3"
                />
                {errors.address && (
                  <span className="error-message">
                    <FaExclamationCircle />
                    {errors.address}
                  </span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">
                    <FaMapMarkerAlt />
                    Şehir *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                    placeholder="Şehir"
                  />
                  {errors.city && (
                    <span className="error-message">
                      <FaExclamationCircle />
                      {errors.city}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">
                    <FaMapMarkerAlt />
                    Posta Kodu *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'error' : ''}
                    placeholder="34000"
                    maxLength="5"
                  />
                  {errors.zipCode && (
                    <span className="error-message">
                      <FaExclamationCircle />
                      {errors.zipCode}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    İşleniyor...
                  </>
                ) : (
                  <>
                    <FaCreditCard />
                    Ödemeyi Tamamla
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Sağ Taraf - Sipariş Özeti */}
        <div className="order-summary-section">
          <div className="order-summary-card">
            <h3>Sipariş Özeti</h3>
            
            <div className="order-items">
              {cartItems.map((item) => {
                const { book, quantity } = item;
                const { volumeInfo } = book;
                
                // Kitap fiyatını hesapla
                const basePrice = 50;
                const ratingBonus = (volumeInfo.averageRating || 0) * 10;
                const bookPrice = basePrice + ratingBonus;
                const totalPrice = bookPrice * quantity;

                return (
                  <div key={book.id} className="order-item">
                    <div className="item-info">
                      <h4>{volumeInfo.title}</h4>
                      <p>{volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Bilinmeyen Yazar'}</p>
                      <span className="item-quantity">Adet: {quantity}</span>
                    </div>
                    <div className="item-price">
                      {totalPrice.toFixed(2)} TL
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="order-total">
              <span>Toplam Tutar:</span>
              <span className="total-price">{getTotalPrice().toFixed(2)} TL</span>
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

export default CheckoutPage; 