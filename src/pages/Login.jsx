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
    <div className="auth-shell fade-in">
      <aside className="auth-aside">
        <div>
          <p className="auth-badge">Welcome back</p>
          <h1>Sign in to a sharper career dashboard.</h1>
          <p>
            Resume your path with personalized recommendations, smart job matching, and a progress view that feels built for momentum.
          </p>
        </div>

        <div className="auth-metrics">
          <article>
            <strong>Real-time</strong>
            <span>Recommendations based on your current profile</span>
          </article>
          <article>
            <strong>Focused</strong>
            <span>Everything in one guided workspace</span>
          </article>
          <article>
            <strong>Actionable</strong>
            <span>Know what to do next without noise</span>
          </article>
        </div>
      </aside>

      <section className="auth-card">
        <p className="eyebrow">Secure access</p>
        <h2>Sign in</h2>
        <p>Choose your role and continue to your personalized workspace.</p>

        <form onSubmit={onSubmit}>
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
            <Label>Login as</Label>
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

          {error && <div className="error">{error}</div>}
          <Button className="auth-submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</Button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
