import { createContext, useContext, useState } from 'react';
import { cartItems as initialCart } from '../data/dummy';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState(initialCart);
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([1, 5, 7]);

  const toggleDark = () => {
    setDarkMode(d => !d);
    document.documentElement.classList.toggle('dark');
  };

  const addToCart = (product) => {
    setCart(c => {
      const existing = c.find(i => i.id === product.id);
      if (existing) return c.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...c, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(c => c.filter(i => i.id !== id));

  const updateQty = (id, delta) => {
    setCart(c => c.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i).filter(i => i.quantity > 0));
  };

  const toggleWishlist = (id) => setWishlist(w => w.includes(id) ? w.filter(i => i !== id) : [...w, id]);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AppContext.Provider value={{ darkMode, toggleDark, cart, addToCart, removeFromCart, updateQty, cartTotal, cartCount, user, setUser, wishlist, toggleWishlist }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
