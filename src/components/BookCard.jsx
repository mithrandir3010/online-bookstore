import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUser } from 'react-icons/fa';
import './BookCard.css';

const BookCard = ({ book }) => {
  const { id, volumeInfo } = book;
  const {
    title,
    authors,
    imageLinks,
    averageRating,
    ratingsCount,
    publishedDate,
    categories
  } = volumeInfo;

  // Varsayılan kitap kapağı
  const coverImage = imageLinks?.thumbnail || 
    'https://via.placeholder.com/128x192/CCCCCC/666666?text=Kitap+Kapağı';

  // Yazar bilgisini formatla
  const authorText = authors ? authors.join(', ') : 'Bilinmeyen Yazar';

  // Yayın yılını formatla
  const year = publishedDate ? publishedDate.split('-')[0] : '';

  // Kategori bilgisini formatla
  const category = categories ? categories[0] : 'Genel';

  return (
    <Link to={`/book/${id}`} className="book-card">
      <div className="book-card-inner">
        <div className="book-cover">
          <img 
            src={coverImage} 
            alt={title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/128x192/CCCCCC/666666?text=Kitap+Kapağı';
            }}
          />
          {averageRating && (
            <div className="book-rating">
              <FaStar className="star-icon" />
              <span>{averageRating.toFixed(1)}</span>
              {ratingsCount && (
                <span className="rating-count">({ratingsCount})</span>
              )}
            </div>
          )}
        </div>
        
        <div className="book-info">
          <h3 className="book-title" title={title}>
            {title.length > 50 ? `${title.substring(0, 50)}...` : title}
          </h3>
          
          <div className="book-author">
            <FaUser className="author-icon" />
            <span title={authorText}>
              {authorText.length > 30 ? `${authorText.substring(0, 30)}...` : authorText}
            </span>
          </div>
          
          <div className="book-meta">
            {year && <span className="book-year">{year}</span>}
            <span className="book-category">{category}</span>
          </div>
        </div>
        
        <div className="book-hover-effect">
          <span>Detayları Gör</span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard; 