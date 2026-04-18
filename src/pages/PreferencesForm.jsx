import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const PreferencesForm = () => {
  const careerGoalOptions = [
    'Get a job in tech',
    'Switch career to data science',
    'Explore options and find best-fit path',
    'Land an internship',
    'Become a full-stack developer',
    'Move into product management'
  ];

  const skillIcons = {
    Python: '🐍',
    React: '⚛️',
    JavaScript: '🟨',
    SQL: '🗄️',
    Docker: '🐳',
    AWS: '☁️',
    Communication: '💬',
    Leadership: '🧭',
    'Machine Learning': '🤖',
    'Data Analysis': '📊',
    'Project Management': '🧩',
    'HTML/CSS': '🎨',
    'Node.js': '🟢'
  };

  const interestIcons = {
    'AI & Machine Learning': '🤖',
    'Data Science': '📈',
    'Web Development': '🌐',
    'Cloud Computing': '☁️',
    Cybersecurity: '🛡️',
    'Product Management': '📦',
    'UI/UX Design': '✨',
    'Mobile Development': '📱'
  };

  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [careerGoal, setCareerGoal] = useState('');
  const [goalPreset, setGoalPreset] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [customSkills, setCustomSkills] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [skillRes, interestRes, profileRes] = await Promise.all([
          api.get('/skills'),
          api.get('/interests'),
          api.get('/users/me')
        ]);
        setSkills(skillRes.data);
        setInterests(interestRes.data);
        setCareerGoal(profileRes.data.career_goal || '');
      } catch (err) {
        setError('Failed to load form data. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  const toggleSelection = (id, selected, setter) => {
    if (selected.includes(id)) {
      setter(selected.filter((item) => item !== id));
    } else {
      setter([...selected, id]);
    }
  };

  const toggleCustomSkill = (skillName) => {
    if (customSkills.includes(skillName)) {
      setCustomSkills(customSkills.filter((name) => name !== skillName));
    } else {
      setCustomSkills([...customSkills, skillName]);
    }
  };

  const addCustomSkill = () => {
    const normalized = customSkill.trim();
    if (!normalized) return;
    if (!customSkills.includes(normalized)) {
      setCustomSkills([...customSkills, normalized]);
    }
    setCustomSkill('');
  };

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const selectedSkillNames = skills
    .filter((skill) => selectedSkills.includes(skill.id))
    .map((skill) => skill.name);

  const recommendationHint = (() => {
    const allSkillNames = [...selectedSkillNames, ...customSkills].map((name) => name.toLowerCase());
    const hasDataStack = ['python', 'sql', 'machine learning', 'data analysis'].filter((s) => allSkillNames.includes(s)).length >= 2;
    const hasWebStack = ['javascript', 'react', 'node.js', 'html/css'].filter((s) => allSkillNames.includes(s)).length >= 2;

    if (hasDataStack) return 'Based on your skills, you might like Data Science.';
    if (hasWebStack) return 'Based on your skills, you might like Full Stack Development.';
    if (selectedInterests.length > 0) return 'Nice profile direction. Add one more technical skill to improve recommendations.';
    return 'Tip: select at least 3 skills to unlock stronger AI guidance.';
  })();

  const totalSteps = 3;
  const completedSteps =
    (selectedSkills.length >= 3 ? 1 : 0) +
    (selectedInterests.length > 0 ? 1 : 0) +
    (careerGoal.trim().length > 0 ? 1 : 0);
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');
    setValidationError('');

    if (selectedSkills.length < 3) {
      setValidationError('Please select at least 3 skills before continuing.');
      return;
    }

    if (selectedInterests.length === 0) {
      setValidationError('Please choose at least 1 interest.');
      return;
    }

    const combinedGoal = [
      goalPreset,
      careerGoal.trim(),
      customSkills.length ? `Custom Skills: ${customSkills.join(', ')}` : ''
    ]
      .filter(Boolean)
      .join(' | ');

    try {
      await api.post('/preferences/me', {
        skillIds: selectedSkills,
        interestIds: selectedInterests,
        careerGoal: combinedGoal || careerGoal
      });
      setStatus('Preferences saved. Generating recommendations...');
      setTimeout(() => navigate('/dashboard'), 700);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save preferences.');
    }
  };

  if (loading) return <div className="center-card">Loading form...</div>;

  return (
    <div className="profile-form-shell fade-in">
      <div className="profile-form-card">
        <div className="profile-header">
          <span className="profile-kicker">Profile Setup</span>
          <h2>Tell us about your profile</h2>
          <p>Select your current skills, interests, and future goal.</p>
        </div>

        <div className="profile-progress-wrap">
          <div className="profile-progress-labels">
            <span className={selectedSkills.length >= 3 ? 'done' : ''}>Step 1: Skills</span>
            <span className={selectedInterests.length > 0 ? 'done' : ''}>Step 2: Interests</span>
            <span className={careerGoal.trim().length > 0 ? 'done' : ''}>Step 3: Goal</span>
          </div>
          <div className="profile-progress-track">
            <div className="profile-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <form onSubmit={onSubmit} className="profile-form-grid">
          <section className="profile-section">
            <div className="section-head">
              <h3>Skills</h3>
              <span>{selectedSkills.length + customSkills.length} selected</span>
            </div>

            <input
              className="cc-search"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Search skills..."
            />

            <div className="chip-grid">
              {filteredSkills.map((skill) => (
                <button
                  type="button"
                  key={skill.id}
                  className={`chip ${selectedSkills.includes(skill.id) ? 'active' : ''}`}
                  onClick={() => toggleSelection(skill.id, selectedSkills, setSelectedSkills)}
                >
                  <span>{skillIcons[skill.name] || '🧠'}</span>
                  {skill.name}
                </button>
              ))}
            </div>

            <div className="custom-skill-row">
              <input
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="+ Add Custom Skill"
              />
              <button type="button" className="cc-btn-ghost" onClick={addCustomSkill}>Add</button>
            </div>

            {!!customSkills.length && (
              <div className="chip-grid">
                {customSkills.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={`chip custom-chip ${customSkills.includes(name) ? 'active' : ''}`}
                    onClick={() => toggleCustomSkill(name)}
                  >
                    <span>✨</span>
                    {name}
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="profile-section">
            <div className="section-head">
              <h3>Interests</h3>
              <span>{selectedInterests.length} selected</span>
            </div>

            <div className="chip-grid">
              {interests.map((interest) => (
                <button
                  type="button"
                  key={interest.id}
                  className={`chip ${selectedInterests.includes(interest.id) ? 'active' : ''}`}
                  onClick={() => toggleSelection(interest.id, selectedInterests, setSelectedInterests)}
                >
                  <span>{interestIcons[interest.name] || '🎯'}</span>
                  {interest.name}
                </button>
              ))}
            </div>
          </section>

          <section className="profile-section profile-goal-section">
            <div className="section-head">
              <h3>Career Goal</h3>
              <span>{careerGoal.length}/180</span>
            </div>

            <select
              value={goalPreset}
              onChange={(e) => {
                setGoalPreset(e.target.value);
                if (!careerGoal.trim()) setCareerGoal(e.target.value);
              }}
              aria-label="Career goal suggestion"
            >
              <option value="">Choose a goal suggestion</option>
              {careerGoalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <p className="goal-hint">AI hint: Describe your goal clearly.</p>

            <textarea
              value={careerGoal}
              maxLength={180}
              onChange={(e) => setCareerGoal(e.target.value)}
              placeholder="Example: I want to become a data scientist in sports analytics."
              rows={4}
            />
          </section>

          <div className="profile-suggestion">👉 {recommendationHint}</div>

          {validationError && <div className="error">{validationError}</div>}
          {error && <div className="error">{error}</div>}
          {status && <div className="success">{status}</div>}

          <button type="submit" className="profile-submit-btn">🚀 Get AI Recommendations</button>
        </form>
      </div>
    </div>
  );
};

export default PreferencesForm;
