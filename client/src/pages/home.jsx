import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/productCard';

const API = import.meta.env.VITE_API_URL || '/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/products`, { params: { search, category, sort } })
      .then(r => { setProducts(r.data); setLoading(false); });
  }, [search, category, sort]);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Products</h1>
        <p className="text-gray-500">Everything you need, delivered fast.</p>
      </div>
      <div className="flex flex-wrap gap-3 mb-8">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search products..." className="flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
        <select value={category} onChange={e => setCategory(e.target.value)}
          className="border rounded-xl px-4 py-2 text-sm focus:outline-none">
          <option value="">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}
          className="border rounded-xl px-4 py-2 text-sm focus:outline-none">
          <option value="">Sort: Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse"/>)}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400 py-20">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p._id} product={p}/>)}
        </div>
      )}
    </div>
  );
}