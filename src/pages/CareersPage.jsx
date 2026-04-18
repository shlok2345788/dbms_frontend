import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { careers, categories } from '../data/careerData';

const CareersPage = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return careers.filter((career) => {
      const hay = `${career.title} ${career.description} ${career.skills.join(' ')}`.toLowerCase();
      const matchesSearch = hay.includes(query.toLowerCase());
      const matchesCategory = activeCategory === 'All' || career.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="cc-stack">
      <section className="cc-panel">
        <h2>Career Paths Explorer</h2>
        <p>Search and compare AI careers by role, required skills, and growth potential.</p>
        <input
          className="cc-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, description, or skills"
        />
        <div className="cc-tabs">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? 'cc-tab active' : 'cc-tab'}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="cc-career-grid">
        {filtered.map((career) => (
          <article key={career.id} className="cc-career-card">
            <div className="cc-card-head">
              <span className="cc-pill">{career.category}</span>
              <span className="cc-level">{career.experience}</span>
            </div>
            <h3>{career.title}</h3>
            <p>{career.description}</p>
            <div className="cc-mini-stats">
              <span>{career.salary}</span>
              <span>{career.growth}</span>
            </div>
            <div className="cc-skill-list">
              {career.skills.slice(0, 4).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <Link className="cc-inline-link" to={`/careers/${career.id}`}>Open Details</Link>
          </article>
        ))}
      </section>
    </div>
  );
};

export default CareersPage;
