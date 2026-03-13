import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navBar';
import Home from './pages/home';
import ProductDetail from './pages/productDetails';
import Cart from './pages/cart';
import Login from './pages/login';
import Register from './pages/register';
import Orders from './pages/orders';
import Success from './pages/success';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
    </div>
  );
}