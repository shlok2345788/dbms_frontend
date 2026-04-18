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
    <div className="auth-shell fade-in">
      <aside className="auth-aside">
        <div>
          <p className="auth-badge">New account</p>
          <h1>Create a career workspace that actually helps.</h1>
          <p>
            Register once and unlock assessment, matching, analytics, and learning paths designed to keep your next step obvious.
          </p>
        </div>

        <div className="auth-metrics">
          <article>
            <strong>Guided</strong>
            <span>Start with your role and status</span>
          </article>
          <article>
            <strong>Personal</strong>
            <span>Recommendations shaped around your profile</span>
          </article>
          <article>
            <strong>Fast</strong>
            <span>Get from sign-up to insight in minutes</span>
          </article>
        </div>
      </aside>

      <section className="auth-card">
        <p className="eyebrow">Start here</p>
        <h2>Create account</h2>
        <p>Pick your role, fill in the basics, and we’ll tailor the experience from there.</p>

        <form onSubmit={onSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={onChange}
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
              required
            />
          </div>

          <div>
            <Label>Account Type</Label>
            <div className="auth-switches">
              <label className={form.role === 'job_seeker' ? 'auth-choice active' : 'auth-choice'}>
                <input
                  type="radio"
                  name="role"
                  value="job_seeker"
                  checked={form.role === 'job_seeker'}
                  onChange={onChange}
                />
                Job Seeker
              </label>
              <label className={form.role === 'recruiter' ? 'auth-choice active' : 'auth-choice'}>
                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={form.role === 'recruiter'}
                  onChange={onChange}
                />
                Recruiter
              </label>
            </div>
          </div>

          {form.role === 'job_seeker' && (
            <div>
              <Label htmlFor="status">Current Status</Label>
              <select id="status" name="status" value={form.status} onChange={onChange}>
                <option value="student">Student</option>
                <option value="internship">Looking for Internship</option>
                <option value="job_seeker">Looking for Job</option>
                <option value="confused">Confused</option>
              </select>
            </div>
          )}

          {error && <div className="error">{error}</div>}
          <Button className="auth-submit" disabled={loading}>{loading ? 'Creating...' : 'Register'}</Button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
