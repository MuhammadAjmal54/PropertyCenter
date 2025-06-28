
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';

const UserIcon = () => (
  <svg
    className="w-12 h-12 mb-2 text-blue-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a7 7 0 0113 0" />
  </svg>
);

const AdminIcon = () => (
  <svg
    className="w-12 h-12 mb-2 text-red-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M12 3v4m0 0a4 4 0 014 4v3a4 4 0 01-4 4v4m0-15a4 4 0 00-4 4v3a4 4 0 004 4" />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const SignupPage = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState(null); // null or 'user'

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const selectUserRole = (selectedRole) => {
    if (selectedRole === 'admin') {
      navigate('/admin/login');
    } else {
      setRole('user');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Signup failed');
      } else {
        navigate('/user');
      }
    } catch {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Create an Account</h2>

        {/* Role selection cards always visible */}
        <div className="flex justify-center space-x-8 mb-8">
          <button
            onClick={() => selectUserRole('user')}
            className={`flex flex-col items-center cursor-pointer border-2 rounded-lg p-4 w-32 transition
              ${
                role === 'user'
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:bg-blue-50 hover:text-blue-700'
              }
            `}
          >
            <UserIcon />
            <span className="font-medium">User</span>
          </button>

          <button
            onClick={() => selectUserRole('admin')}
            className="flex flex-col items-center cursor-pointer border-2 border-red-600 rounded-lg p-4 w-32 hover:bg-red-50 hover:text-red-700 transition"
          >
            <AdminIcon />
            <span className="font-medium">Admin</span>
          </button>
        </div>

        {/* Signup form visible only if user selected */}
        {role === 'user' && (
          <>
            {error && <div className="mb-4 text-red-600">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Button type="submit" variant="primary" fullWidth disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </form>

            <p className="mt-6 text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
