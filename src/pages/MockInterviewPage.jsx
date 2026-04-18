import { useState } from 'react';
import api from '../api';

const MockInterviewPage = () => {
  const [career, setCareer] = useState('web developer');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(300);
  const [running, setRunning] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeResult, setResumeResult] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [error, setError] = useState('');

  const questionBank = [
    'Tell me about yourself and your project experience.',
    'Why are you interested in this role?',
    'What is a challenge you solved recently?',
    'Which technical skills are you strongest in?',
    'How do you handle feedback or deadlines?',
    'Describe a project that you are proud of.'
  ];

  const interviewTips = [
    'Keep answers structured: situation, action, result.',
    'Use metrics where possible to show impact.',
    'Match your answers to the target career path.'
  ];

  const startInterview = async () => {
    try {
      setError('');
      const { data } = await api.get('/mock-interview/questions', { params: { career } });
      setQuestions(data.questions || []);
      setAnswers(new Array((data.questions || []).length).fill(''));
      setFeedback(null);
      setTimer(data.durationSeconds || 300);
      setRunning(true);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError('Unable to start mock interview.');
    }
  };

  const submitInterview = async () => {
    try {
      const { data } = await api.post('/mock-interview/feedback', { answers });
      setFeedback(data);
      setRunning(false);
    } catch (err) {
      setError('Unable to submit interview answers.');
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();

    if (!resumeFile) {
      setError('Please choose a PDF, DOC, or DOCX resume file.');
      return;
    }

    try {
      setError('');
      setUploadingResume(true);
      const formData = new FormData();
      formData.append('resume', resumeFile);
      const { data } = await api.post('/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResumeResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to upload resume.');
    } finally {
      setUploadingResume(false);
    }
  };

  return (
    <div className="panel fade-in">
      <h2>Mock Interview</h2>
      <p>Generate timed questions by career path and receive automated feedback.</p>

      <div className="stack">
        <h3>Resume Upload</h3>
        <form onSubmit={uploadResume} className="cards-grid">
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          />
          <button type="submit" disabled={uploadingResume}>
            {uploadingResume ? 'Uploading Resume...' : 'Upload Resume'}
          </button>
        </form>

        {resumeResult && (
          <div className="stack">
            <h4>Resume Score: {resumeResult.resumeScore}%</h4>
            <p><strong>Extracted Skills:</strong> {resumeResult.extractedSkills?.join(', ') || 'None detected'}</p>
            <p><strong>Education:</strong> {resumeResult.education?.join(', ') || 'Not detected'}</p>
          </div>
        )}
      </div>

      <div className="stack">
        <h3>Question List</h3>
        <div className="cards-grid">
          {questionBank.map((question) => (
            <article className="career-tile" key={question}>
              <p>{question}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="stack">
        <h3>Interview Tips</h3>
        <ul className="cc-resources">
          {interviewTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </div>

      <div className="cards-grid">
        <input value={career} onChange={(e) => setCareer(e.target.value)} placeholder="Career, e.g. data scientist" />
        <button onClick={startInterview}>Generate Questions</button>
      </div>

      <p className="metric-label">Timer: {timer}s</p>

      {questions.map((q, idx) => (
        <div className="stack" key={`${q}-${idx}`}>
          <strong>Q{idx + 1}. {q}</strong>
          <textarea
            rows={3}
            value={answers[idx] || ''}
            onChange={(e) => {
              const copy = [...answers];
              copy[idx] = e.target.value;
              setAnswers(copy);
            }}
          />
        </div>
      ))}

      {questions.length > 0 && (
        <button onClick={submitInterview} disabled={!running}>Submit Interview</button>
      )}

      {feedback && (
        <div className="stack">
          <h3>Interview Score: {feedback.score}%</h3>
          <ul>
            {(feedback.feedback || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default MockInterviewPage;
