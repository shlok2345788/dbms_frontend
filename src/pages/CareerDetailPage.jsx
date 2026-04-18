import { Link, useParams } from 'react-router-dom';
import { careers } from '../data/careerData';

const CareerDetailPage = () => {
  const { careerId } = useParams();
  const career = careers.find((item) => item.id === careerId);

  if (!career) {
    return (
      <section className="cc-panel">
        <h2>Career not found</h2>
        <Link className="cc-inline-link" to="/careers">Back to explorer</Link>
      </section>
    );
  }

  const related = careers.filter((item) => career.related.includes(item.id));

  return (
    <div className="cc-stack">
      <section className="cc-panel">
        <div className="cc-card-head">
          <span className="cc-pill">{career.category}</span>
          <span className="cc-level">{career.experience}</span>
        </div>
        <h2>{career.title}</h2>
        <p>{career.description}</p>
      </section>

      <section className="cc-detail-grid">
        <article className="cc-panel">
          <h3>Role Snapshot</h3>
          <div className="cc-stat-cards">
            <div><strong>{career.salary}</strong><span>Salary Range</span></div>
            <div><strong>{career.growth}</strong><span>Growth Outlook</span></div>
            <div><strong>{career.experience}</strong><span>Experience Level</span></div>
          </div>

          <h3>Key Responsibilities</h3>
          <ol className="cc-numbered">
            {career.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>

          <h3>Required Skills</h3>
          <div className="cc-skill-list">
            {career.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>

          <h3>Tools and Technologies</h3>
          <div className="cc-skill-list">
            {career.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </article>

        <aside className="cc-panel cc-sidebar">
          <h3>Education Requirements</h3>
          <ul>
            {career.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>Related Careers</h3>
          <div className="cc-related">
            {related.map((item) => (
              <Link key={item.id} to={`/careers/${item.id}`}>{item.title}</Link>
            ))}
          </div>

          <div className="cc-cta">
            <h4>Ready to move forward?</h4>
            <p>Take the assessment to see how strongly you match this role and what to learn next.</p>
            <Link className="cc-btn" to="/assessment">Take Assessment</Link>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default CareerDetailPage;
