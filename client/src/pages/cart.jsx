import { useCart } from '../context/cartContext';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || '/api';

export default function Cart() {
  const { cart, removeFromCart, updateQty, total } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const checkout = async () => {
    if (!token) return navigate('/login');
    const { data } = await axios.post(`${API}/orders/checkout`,
      { items: cart.map(i => ({ id: i._id, name: i.name, price: i.price, qty: i.qty, image: i.image })) },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    window.location.href = data.url;
  };

  if (cart.length === 0) return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">🛒</p>
      <p className="text-gray-500 text-lg">Your cart is empty</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item._id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <img src={item.image || 'https://via.placeholder.com/80'} className="w-20 h-20 object-cover rounded-xl"/>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-indigo-600 font-bold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(item._id, item.qty - 1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200">−</button>
              <span className="w-6 text-center">{item.qty}</span>
              <button onClick={() => updateQty(item._id, item.qty + 1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200">+</button>
            </div>
            <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600 text-xl">✕</button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
        <div className="flex justify-between text-lg font-bold mb-4">
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
        <button onClick={checkout} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}