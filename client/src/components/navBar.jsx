import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/authContext';

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">ShopX</Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-indigo-600">Shop</Link>
          {user ? (
            <>
              <Link to="/orders" className="hover:text-indigo-600">Orders</Link>
              <button onClick={logout} className="hover:text-red-500">Logout</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-indigo-600">Login</Link>
          )}
          <Link to="/cart" className="relative hover:text-indigo-600">
            🛒
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full px-1">{count}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}