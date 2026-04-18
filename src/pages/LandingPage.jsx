import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <section className="hero-panel fade-in">
      <div className="hero-copy">
        <p className="eyebrow">AI Career Compass</p>
        <h1>Your career OS for learning, readiness, and hiring</h1>
        <p>
          Match to career tracks, identify skill gaps, generate mini projects, and land role-fit opportunities with
          explainable AI recommendations.
        </p>
        <div className="hero-actions">
          <Link className="cta-btn" to="/register">Start Building Profile</Link>
          <Link className="ghost-btn hero-ghost" to="/login">Sign In</Link>
        </div>
        <div className="hero-metrics">
          <div>
            <strong>95%</strong>
            <span>Recommendation Relevance</span>
          </div>
          <div>
            <strong>Top 5</strong>
            <span>Career Paths Ranked</span>
          </div>
          <div>
            <strong>0-100</strong>
            <span>Job Readiness Score</span>
          </div>
        </div>
      </div>
      <div className="hero-grid">
        <div className="feature-tile">
          <h3>Career Match</h3>
          <p>Top 3-5 paths with explainable percentage match.</p>
        </div>
        <div className="feature-tile">
          <h3>Skill Gap</h3>
          <p>Find missing skills for each job and recommended courses.</p>
        </div>
        <div className="feature-tile">
          <h3>Resume AI</h3>
          <p>Upload PDF, extract skills, and get a score with suggestions.</p>
        </div>
        <div className="feature-tile">
          <h3>Recruiter Hub</h3>
          <p>Post jobs, track applicants, and shortlist faster.</p>
        </div>
        <div className="feature-tile feature-highlight">
          <h3>Interview Simulator</h3>
          <p>Timer-based mock interview with feedback on answer quality and role fit.</p>
        </div>
        <div className="feature-tile feature-highlight">
          <h3>Portfolio Project Engine</h3>
          <p>Generate practical mini projects based on target role and missing competencies.</p>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
