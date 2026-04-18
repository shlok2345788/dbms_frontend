import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'job_seeker' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login({ token: data.token, user: data.user });
      if (data.user.role === 'recruiter') {
        navigate('/recruiter');
      } else {
        navigate('/form');
      }
    } catch (err) {
      const serverMessage = err.response?.data?.message;
      const isNetworkError = err.code === 'ERR_NETWORK' || !err.response;
      setError(
        serverMessage ||
          (isNetworkError
            ? 'Cannot reach backend server. Start backend on port 5000 and try again.'
            : 'Unable to login.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white border dark:bg-gray-800">
      
      {/* Left Side: Welcome + Illustration */}
      <div className="md:w-1/2 bg-[#8371F5] dark:bg-blue-600 text-white flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="mb-6 text-center">Sign in to continue to your dashboard and enjoy seamless experience.</p>
        <img
          src="https://images.unsplash.com/photo-1633356095582-c2e4abc69e0e?w=200&q=80"
          alt="Login Illustration"
          className="w-24 h-24"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center bg-white text-slate-900">
        <h3 className="text-2xl font-semibold mb-6 text-slate-900">Sign In</h3>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email" className="text-slate-700">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="you@example.com" 
              value={form.email}
              onChange={onChange}
              className="mt-1 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-200" 
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-slate-700">Password</Label>
            <Input 
              id="password" 
              name="password"
              type="password" 
              placeholder="••••••••" 
              value={form.password}
              onChange={onChange}
              className="mt-1 bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-200" 
              required
            />
          </div>

          <div className="mt-4">
            <Label className="text-slate-700">Login as</Label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="role" 
                  value="job_seeker" 
                  checked={form.role === 'job_seeker'} 
                  onChange={onChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-700">Job Seeker</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="role" 
                  value="recruiter" 
                  checked={form.role === 'recruiter'} 
                  onChange={onChange}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-700">Recruiter</span>
              </label>
            </div>
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">{error}</div>}
          <Button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</Button>
        </form>

        <p className="mt-4 text-sm text-slate-500 text-center">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
