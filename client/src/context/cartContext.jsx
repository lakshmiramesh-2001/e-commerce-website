import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  const save = (items) => { setCart(items); localStorage.setItem('cart', JSON.stringify(items)); };

  const addToCart = (product) => {
    const existing = cart.find(i => i._id === product._id);
    save(existing
      ? cart.map(i => i._id === product._id ? { ...i, qty: i.qty + 1 } : i)
      : [...cart, { ...product, qty: 1 }]
    );
  };

  const removeFromCart = (id) => save(cart.filter(i => i._id !== id));
  const updateQty = (id, qty) => qty < 1 ? removeFromCart(id) : save(cart.map(i => i._id === id ? { ...i, qty } : i));
  const clearCart = () => save([]);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);