import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">AC</span>
        <span className="brand-copy">
          <strong>AI Career Compass</strong>
          <span>Strategy. Skills. Momentum.</span>
        </span>
      </Link>

      <div className="nav-links">
        <Link to="/"><span className="nav-ico">🏠</span>Home</Link>
        <Link to="/assessment"><span className="nav-ico">🧭</span>Assessment</Link>
        <Link to="/careers"><span className="nav-ico">💼</span>Careers</Link>
        <Link to="/skills-learning"><span className="nav-ico">🧠</span>Skills</Link>
        {user ? (
          user.role === 'recruiter' ? (
            <Link to="/recruiter"><span className="nav-ico">🏢</span>Recruiter</Link>
          ) : (
            <>
              <Link to="/dashboard"><span className="nav-ico">📊</span>Dashboard</Link>
              <Link to="/job-match-analysis"><span className="nav-ico">🎯</span>Job Match</Link>
            </>
          )
        ) : (
          <Link className="nav-cta" to="/login"><span className="nav-ico">🔐</span>Login</Link>
        )}
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="nav-user">{user.name || user.email}</span>
            <button className="ghost-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link className="ghost-btn" to="/register">Create account</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
