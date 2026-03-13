import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || '/api';

export default function Orders() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) return navigate('/login');
    axios.get(`${API}/orders/my`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setOrders(r.data));
  }, [token]);

  if (orders.length === 0) return (
    <div className="text-center py-20 text-gray-400">No orders yet.</div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order._id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <span>Order ID: {order._id.slice(-8)}</span>
              <span className={`font-semibold capitalize ${order.status === 'pending' ? 'text-amber-500' : 'text-green-500'}`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.product?.name || 'Product'} × {item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}