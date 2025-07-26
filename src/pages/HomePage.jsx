import React, { useState, useEffect } from 'react';
import { FaSearch, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import BookCard from '../components/BookCard';
import { fetchBooks, searchBooks } from '../services/bookService';
import './HomePage.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  // İlk yükleme
  useEffect(() => {
    loadBooks();
  }, []);

  // Kitapları yükle
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const booksData = await fetchBooks();
      setBooks(booksData);
    } catch (err) {
      setError('Kitaplar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Kitap yükleme hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  // Kitap arama
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      loadBooks();
      return;
    }

    try {
      setSearching(true);
      setError(null);
      const searchResults = await searchBooks(searchTerm);
      setBooks(searchResults);
    } catch (err) {
      setError('Arama yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Arama hatası:', err);
    } finally {
      setSearching(false);
    }
  };

  // Arama terimini temizle
  const clearSearch = () => {
    setSearchTerm('');
    loadBooks();
  };

  // Loading skeleton kartları
  const LoadingSkeleton = () => (
    <div className="books-grid">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="book-card loading">
          <div className="book-card-inner">
            <div className="book-cover"></div>
            <div className="book-info"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error mesajı
  const ErrorMessage = () => (
    <div className="error-container">
      <FaExclamationTriangle className="error-icon" />
      <h3>Bir Hata Oluştu</h3>
      <p>{error}</p>
      <button onClick={loadBooks} className="retry-button">
        Tekrar Dene
      </button>
    </div>
  );

  // Boş sonuç mesajı
  const EmptyResults = () => (
    <div className="empty-container">
      <h3>Arama Sonucu Bulunamadı</h3>
      <p>"{searchTerm}" için sonuç bulunamadı. Farklı bir arama terimi deneyin.</p>
      <button onClick={clearSearch} className="clear-search-button">
        Tüm Kitapları Göster
      </button>
    </div>
  );

  return (
    <div className="home-page">
      {/* Header */}
      <div className="home-header">
        <h1>Online Kitapçı</h1>
        <p>Binlerce kitap arasından size en uygun olanını bulun</p>
      </div>

      {/* Arama Formu */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Kitap adı veya yazar ara..."
              className="search-input"
              disabled={loading || searching}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="clear-button"
                disabled={loading || searching}
              >
                ×
              </button>
            )}
          </div>
          <button
            type="submit"
            className="search-button"
            disabled={loading || searching}
          >
            {searching ? (
              <>
                <FaSpinner className="spinner" />
                Aranıyor...
              </>
            ) : (
              'Ara'
            )}
          </button>
        </form>
      </div>

      {/* İçerik */}
      <div className="content-section">
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage />
        ) : books.length === 0 ? (
          <EmptyResults />
        ) : (
          <>
            {/* Sonuç bilgisi */}
            <div className="results-info">
              <h2>
                {searchTerm ? `"${searchTerm}" için arama sonuçları` : 'Öne Çıkan Kitaplar'}
              </h2>
              <span className="book-count">{books.length} kitap bulundu</span>
            </div>

            {/* Kitaplar Grid */}
            <div className="books-grid">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage; 