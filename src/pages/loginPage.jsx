import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../components/userSlice';
// import logo from '/assets/urbantechs.svg';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    // <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
    //   <h2>Login</h2>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    //   {isAuthenticated ? (
    //     <>
    //       <p>Welcome! You’re logged in.</p>
    //       <button onClick={() => dispatch(logoutUser())}>Logout</button>
    //     </>
    //   ) : (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="/urbantechs.svg" alt="Logo" width={200} className='mx-auto'/>
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-700">Email address</label>
            <div class="mt-2">
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                autocomplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base border-1 border-gray-300 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-700">Password</label>
            <div class="mt-2">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                autocomplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base border-1 border-gray-300 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>

  )
};

export default LoginPage;
