import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try { await register(form.name, form.email, form.password); navigate('/'); }
    catch { setError('Registration failed. Email may already be in use.'); }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create account</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={submit} className="space-y-4">
          {['name','email','password'].map(f => (
            <input key={f} type={f === 'password' ? 'password' : f === 'email' ? 'email' : 'text'}
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)} required value={form[f]}
              onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
          ))}
          <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition">
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Have an account? <Link to="/login" className="text-indigo-600 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}