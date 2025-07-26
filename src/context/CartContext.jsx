import React, { createContext, useContext, useReducer } from 'react';

// Context oluştur
const CartContext = createContext();

// Action types
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

// Initial state
const initialState = {
  cartItems: []
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { book } = action.payload;
      const existingItem = state.cartItems.find(item => item.book.id === book.id);
      
      if (existingItem) {
        // Eğer kitap zaten sepette varsa, miktarını artır
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.book.id === book.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        // Yeni kitap ekle
        return {
          ...state,
          cartItems: [...state.cartItems, { book, quantity: 1 }]
        };
      }
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const { bookId } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.book.id !== bookId)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { bookId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Miktar 0 veya daha azsa, kitabı sepetten çıkar
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.book.id !== bookId)
        };
      }
      
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.book.id === bookId
            ? { ...item, quantity }
            : item
        )
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      };

    default:
      return state;
  }
};

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Sepete kitap ekle
  const addToCart = (book) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { book }
    });
  };

  // Sepetten kitap çıkar
  const removeFromCart = (bookId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { bookId }
    });
  };

  // Kitap miktarını güncelle
  const updateQuantity = (bookId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { bookId, quantity }
    });
  };

  // Sepeti temizle
  const clearCart = () => {
    dispatch({
      type: CART_ACTIONS.CLEAR_CART
    });
  };

  // Toplam fiyatı hesapla
  const getTotalPrice = () => {
    return state.cartItems.reduce((total, item) => {
      // Mock fiyat: Her kitap için 50 TL + rating * 10 TL
      const basePrice = 50;
      const ratingBonus = (item.book.volumeInfo.averageRating || 0) * 10;
      const bookPrice = basePrice + ratingBonus;
      return total + (bookPrice * item.quantity);
    }, 0);
  };

  // Sepetteki toplam kitap sayısı
  const getTotalItems = () => {
    return state.cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Sepet boş mu kontrolü
  const isCartEmpty = () => {
    return state.cartItems.length === 0;
  };

  // Belirli bir kitabın sepetteki miktarı
  const getItemQuantity = (bookId) => {
    const item = state.cartItems.find(item => item.book.id === bookId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isCartEmpty,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 