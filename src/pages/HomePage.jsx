import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="cc-stack">
      <section className="cc-hero">
        <div className="cc-hero-copy">
          <p className="cc-kicker">Future-Proof Your Career</p>
          <h1><span>AI Career Compass</span></h1>
          <p>
            Discover your best AI career path, close skill gaps, and follow a structured learning plan with market-driven insights.
          </p>
          <div className="cc-actions">
            <Link to="/assessment" className="cc-btn">Take Assessment</Link>
            <Link to="/careers" className="cc-btn cc-btn-ghost">Explore Careers</Link>
          </div>
        </div>
        <div className="cc-hero-cards">
          <article>
            <h3>Career Assessment</h3>
            <p>Match your strengths with top AI roles in minutes.</p>
          </article>
          <article>
            <h3>Career Paths</h3>
            <p>Compare responsibilities, salaries, and growth outlooks.</p>
          </article>
          <article>
            <h3>Skills and Learning</h3>
            <p>Build a practical roadmap with curated resources.</p>
          </article>
        </div>
      </section>

      <section className="cc-stats-card">
        <h2>AI Industry Snapshot</h2>
        <div className="cc-stats-grid">
          <div>
            <strong>$1.8T</strong>
            <span>Projected AI market size by 2030</span>
          </div>
          <div>
            <strong>+38%</strong>
            <span>Average growth in AI/ML roles</span>
          </div>
          <div>
            <strong>$145k</strong>
            <span>Median annual salary in AI careers</span>
          </div>
          <div>
            <strong>12M+</strong>
            <span>New AI-enabled jobs expected globally</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
