import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'job_seeker', status: 'student' });
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
      const { data } = await api.post('/auth/register', form);
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
            : 'Unable to register.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white border dark:bg-gray-800">
      
      {/* Left Side: Welcome + Illustration */}
      <div className="md:w-1/2 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700 text-white flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-4">Join Us Today!</h2>
        <p className="mb-6 text-center">Create your account and unlock your potential in the AI career path.</p>
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&q=80"
          alt="Register Illustration"
          className="w-24 h-24"
        />
      </div>

      {/* Right Side: Register Form */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-6">Create Account</h3>
        
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name"
              type="text" 
              placeholder="Your full name" 
              value={form.name}
              onChange={onChange}
              className="mt-1" 
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="you@example.com" 
              value={form.email}
              onChange={onChange}
              className="mt-1" 
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password"
              type="password" 
              placeholder="••••••••" 
              value={form.password}
              onChange={onChange}
              className="mt-1" 
              required
            />
          </div>

          <div className="mt-4">
            <Label>Account Type</Label>
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
                <span className="text-sm">Job Seeker</span>
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
                <span className="text-sm">Recruiter</span>
              </label>
            </div>
          </div>

          {form.role === 'job_seeker' && (
            <div>
              <Label htmlFor="status">Current Status</Label>
              <select 
                id="status"
                name="status" 
                value={form.status} 
                onChange={onChange}
                className="mt-1 flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="student">Student</option>
                <option value="internship">Looking for Internship</option>
                <option value="job_seeker">Looking for Job</option>
                <option value="confused">Confused</option>
              </select>
            </div>
          )}

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">{error}</div>}
          <Button className="mt-6 w-full" disabled={loading}>{loading ? 'Creating...' : 'Register'}</Button>
        </form>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-300 text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
