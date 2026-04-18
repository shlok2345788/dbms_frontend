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
          <div className="hero-metrics">
            <article>
              <strong>Personalized</strong>
              <span>Role recommendations tuned to your skills and interests</span>
            </article>
            <article>
              <strong>Market-aware</strong>
              <span>See salaries, growth signals, and in-demand skills</span>
            </article>
            <article>
              <strong>Actionable</strong>
              <span>Get a roadmap that turns confusion into a plan</span>
            </article>
          </div>
        </div>
        <div className="cc-hero-visual">
          <div className="cc-spotlight">
            <p className="eyebrow">Career Intelligence Engine</p>
            <h2>Everything you need to choose the right role faster.</h2>
            <p>
              Compare AI careers, understand skill gaps, and move from uncertainty to a focused learning path.
            </p>
            <div className="cc-stat-strip">
              <article>
                <strong>01</strong>
                <span>Take the assessment</span>
              </article>
              <article>
                <strong>02</strong>
                <span>Review matched careers</span>
              </article>
              <article>
                <strong>03</strong>
                <span>Build your roadmap</span>
              </article>
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
        </div>
      </section>

      <section className="cc-stats-card">
        <h2>AI Industry Snapshot</h2>
        <p>Use these signals to orient your next move in a market that is changing fast.</p>
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
