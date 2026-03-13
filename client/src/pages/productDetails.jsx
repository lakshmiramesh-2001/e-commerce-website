import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/cartContext';

const API = import.meta.env.VITE_API_URL || '/api';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${API}/products/${id}`).then(r => setProduct(r.data));
  }, [id]);

  if (!product) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
        <img src={product.image || 'https://via.placeholder.com/400'}
          className="w-full md:w-1/2 h-80 object-cover"/>
        <div className="p-8 flex flex-col justify-center gap-4">
          <span className="text-xs text-indigo-500 font-semibold uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-500">{product.description}</p>
          <p className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)}
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}