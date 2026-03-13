import { useEffect } from 'react';
import { useCart } from '../context/cartContext';
import { Link } from 'react-router-dom';

export default function Success() {
  const { clearCart } = useCart();
  useEffect(() => clearCart(), []);
  return (
    <div className="text-center py-24">
      <p className="text-6xl mb-4">🎉</p>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Order placed!</h1>
      <p className="text-gray-500 mb-6">Thanks for your purchase. You'll get a confirmation email shortly.</p>
      <Link to="/" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-indigo-700">
        Keep shopping
      </Link>
    </div>
  );
}
