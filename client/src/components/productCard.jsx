import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden group">
      <Link to={`/product/${product._id}`}>
        <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"/>
      </Link>
      <div className="p-4">
        <span className="text-xs text-indigo-500 font-semibold uppercase tracking-wide">{product.category}</span>
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-800 mt-1 hover:text-indigo-600">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-indigo-700 transition">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}