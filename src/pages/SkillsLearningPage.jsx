import { useMemo, useState } from 'react';
import { skillCategories, skills } from '../data/careerData';

const SkillsLearningPage = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory = activeCategory === 'All' || skill.category === activeCategory;
      const hay = `${skill.name} ${skill.description} ${skill.path.join(' ')}`.toLowerCase();
      const matchesQuery = hay.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div className="cc-stack">
      <section className="cc-panel">
        <h2>Skills and Learning</h2>
        <p>Browse in-demand AI/ML skills, structured learning paths, and trusted resources.</p>
        <input
          className="cc-search"
          placeholder="Search skills, concepts, or tools"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="cc-tabs">
          {skillCategories.map((category) => (
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

      <section className="cc-skills-grid">
        {filtered.map((skill) => (
          <article key={skill.id} className="cc-skill-card">
            <div className="cc-card-head">
              <h3>{skill.name}</h3>
              <span className="cc-pill">{skill.category}</span>
            </div>
            <p>{skill.description}</p>
            <div className="cc-demand">
              <div className="cc-demand-row">
                <span>Market Demand</span>
                <strong>{skill.demand}%</strong>
              </div>
              <div className="cc-progress-track">
                <div className="cc-progress-fill" style={{ width: `${skill.demand}%` }} />
              </div>
            </div>

            <div className="cc-learning-columns">
              <div>
                <h4>Learning Path</h4>
                <ol className="cc-numbered">
                  {skill.path.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h4>Resources</h4>
                <ul className="cc-resources">
                  {skill.resources.map((resource) => (
                    <li key={resource.label}>
                      <a href={resource.url} target="_blank" rel="noreferrer">{resource.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default SkillsLearningPage;
