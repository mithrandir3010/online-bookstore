import axios from 'axios';

const GOOGLE_BOOKS_API_BASE_URL = 'https://www.googleapis.com/books/v1';

// Google Books API'den kitap verilerini çek
export const fetchBooks = async (query = 'subject:fiction', maxResults = 20) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API_BASE_URL}/volumes`, {
      params: {
        q: query,
        maxResults: maxResults,
        key: process.env.REACT_APP_GOOGLE_BOOKS_API_KEY || '', // Opsiyonel API key
      },
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Kitap verileri çekilirken hata oluştu:', error);
    
    // API hatası durumunda mock veri döndür
    return getMockBooks();
  }
};

// Belirli bir kitabın detaylarını getir
export const fetchBookById = async (bookId) => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API_BASE_URL}/volumes/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Kitap detayı çekilirken hata oluştu:', error);
    return null;
  }
};

// Mock kitap verileri (API çalışmadığında kullanılır)
const getMockBooks = () => {
  return [
    {
      id: '1',
      volumeInfo: {
        title: 'Suç ve Ceza',
        authors: ['Fyodor Dostoyevski'],
        description: 'Rus edebiyatının en önemli eserlerinden biri olan Suç ve Ceza, insan psikolojisinin derinliklerine inen bir başyapıttır.',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192/4A90E2/FFFFFF?text=Suç+ve+Ceza'
        },
        publishedDate: '1866',
        pageCount: 671,
        categories: ['Roman', 'Klasik'],
        averageRating: 4.5,
        ratingsCount: 1250
      }
    },
    {
      id: '2',
      volumeInfo: {
        title: '1984',
        authors: ['George Orwell'],
        description: 'Distopik bir gelecek tasarımı olan 1984, totaliter rejimlerin tehlikelerini gözler önüne serer.',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192/E74C3C/FFFFFF?text=1984'
        },
        publishedDate: '1949',
        pageCount: 328,
        categories: ['Distopya', 'Politik'],
        averageRating: 4.3,
        ratingsCount: 2100
      }
    },
    {
      id: '3',
      volumeInfo: {
        title: 'Küçük Prens',
        authors: ['Antoine de Saint-Exupéry'],
        description: 'Çocuklar ve yetişkinler için yazılmış bu felsefi masal, sevgi ve dostluğun önemini anlatır.',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192/F39C12/FFFFFF?text=Küçük+Prens'
        },
        publishedDate: '1943',
        pageCount: 96,
        categories: ['Masal', 'Felsefe'],
        averageRating: 4.7,
        ratingsCount: 3500
      }
    },
    {
      id: '4',
      volumeInfo: {
        title: 'Dönüşüm',
        authors: ['Franz Kafka'],
        description: 'Gregor Samsa\'nın bir sabah kendini dev bir böceğe dönüşmüş bulmasıyla başlayan absürd hikaye.',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192/9B59B6/FFFFFF?text=Dönüşüm'
        },
        publishedDate: '1915',
        pageCount: 201,
        categories: ['Roman', 'Absürd'],
        averageRating: 4.2,
        ratingsCount: 890
      }
    },
    {
      id: '5',
      volumeInfo: {
        title: 'Fareler ve İnsanlar',
        authors: ['John Steinbeck'],
        description: 'Büyük Buhran döneminde iki arkadaşın umut ve hayal kırıklığı dolu yolculuğu.',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192/27AE60/FFFFFF?text=Fareler+ve+İnsanlar'
        },
        publishedDate: '1937',
        pageCount: 187,
        categories: ['Roman', 'Drama'],
        averageRating: 4.4,
        ratingsCount: 1560
      }
    },
    {
      id: '6',
      volumeInfo: {
        title: 'Şeker Portakalı',
        authors: ['José Mauro de Vasconcelos'],
        description: 'Beş yaşındaki Zeze\'nin yoksulluk içinde geçen çocukluğu ve hayal gücü.',
        imageLinks: {
          thumbnail: 'https://via.placeholder.com/128x192/E67E22/FFFFFF?text=Şeker+Portakalı'
        },
        publishedDate: '1968',
        pageCount: 192,
        categories: ['Roman', 'Çocuk'],
        averageRating: 4.6,
        ratingsCount: 2300
      }
    }
  ];
};

// Kitap arama fonksiyonu
export const searchBooks = async (searchTerm, maxResults = 20) => {
  if (!searchTerm.trim()) {
    return fetchBooks('subject:fiction', maxResults);
  }
  
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API_BASE_URL}/volumes`, {
      params: {
        q: searchTerm,
        maxResults: maxResults,
        key: process.env.REACT_APP_GOOGLE_BOOKS_API_KEY || '',
      },
    });

    return response.data.items || [];
  } catch (error) {
    console.error('Kitap arama hatası:', error);
    return getMockBooks().filter(book => 
      book.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.volumeInfo.authors?.some(author => 
        author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }
}; 