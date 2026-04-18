import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { assessmentQuestions, careers } from '../data/careerData';

const scoreCareer = (career, answers) => {
  let score = 50;
  const text = answers.join(' ').toLowerCase();
  const skillText = career.skills.join(' ').toLowerCase();

  if (text.includes('research') && career.category === 'Research') score += 24;
  if (text.includes('product') && career.category === 'Product') score += 22;
  if (text.includes('data') && career.category === 'Analytics') score += 20;
  if (text.includes('coding') && career.category === 'Engineering') score += 18;

  if (text.includes('beginner') && career.experience === 'Entry-Level') score += 12;
  if (text.includes('advanced') && career.experience !== 'Entry-Level') score += 10;
  if (text.includes('consult') && career.id === 'ai-consultant') score += 15;
  if (text.includes('algorithms') && career.id === 'ai-research-scientist') score += 18;

  const overlap = career.skills.filter((s) => text.includes(s.toLowerCase()) || skillText.includes(s.toLowerCase())).length;
  score += overlap * 2;

  return Math.min(98, score);
};

const AssessmentPage = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(assessmentQuestions.length).fill(''));
  const isComplete = step === assessmentQuestions.length;

  const progress = useMemo(() => Math.round((step / assessmentQuestions.length) * 100), [step]);

  const results = useMemo(() => {
    if (!isComplete) return [];
    return careers
      .map((career) => ({ ...career, match: scoreCareer(career, answers) }))
      .sort((a, b) => b.match - a.match)
      .slice(0, 5);
  }, [answers, isComplete]);

  const current = assessmentQuestions[step];

  const pickOption = (value) => {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);
  };

  const nextStep = () => {
    if (!answers[step]) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));

  if (isComplete) {
    return (
      <div className="cc-stack">
        <section className="cc-panel">
          <h2>Your Top Career Matches</h2>
          <p>Based on your answers, these are the highest-fit AI careers for you.</p>
        </section>

        <section className="cc-results-grid">
          {results.map((career) => (
            <article key={career.id} className="cc-result-card">
              <div className="cc-result-head">
                <h3>{career.title}</h3>
                <span className="cc-match-badge">{career.match}% Match</span>
              </div>
              <p>{career.description}</p>
              <div className="cc-mini-stats">
                <span>Salary: {career.salary}</span>
                <span>Growth: {career.growth}</span>
              </div>
              <div className="cc-skill-list">
                {career.skills.slice(0, 5).map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <Link className="cc-inline-link" to={`/careers/${career.id}`}>View Career Details</Link>
            </article>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="cc-stack">
      <section className="cc-panel">
        <div className="cc-progress-row">
          <p>Question {step + 1} of {assessmentQuestions.length}</p>
          <p>{progress}%</p>
        </div>
        <div className="cc-progress-track">
          <div className="cc-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <h2>{current.title}</h2>
        <div className="cc-options">
          {current.options.map((option) => (
            <button
              type="button"
              key={option}
              className={answers[step] === option ? 'cc-option active' : 'cc-option'}
              onClick={() => pickOption(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="cc-nav-row">
          <button type="button" className="cc-btn cc-btn-ghost" onClick={prevStep} disabled={step === 0}>Back</button>
          <button type="button" className="cc-btn" onClick={nextStep} disabled={!answers[step]}>Next</button>
        </div>
      </section>
    </div>
  );
};

export default AssessmentPage;
