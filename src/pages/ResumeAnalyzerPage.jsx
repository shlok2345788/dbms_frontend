import { useState } from 'react';
import api from '../api';

const ResumeAnalyzerPage = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please choose a PDF, DOC, or DOCX resume file.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      const { data } = await api.post('/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel fade-in">
      <h2>Resume Analyzer</h2>
      <p>Upload your PDF/DOC/DOCX resume and get score, extracted skills, and improvements.</p>

      <form onSubmit={onSubmit} className="stack">
        <input
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button type="submit" disabled={loading}>{loading ? 'Analyzing...' : 'Analyze Resume'}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="stack">
          <h3>Resume Score: {result.resumeScore}%</h3>
          <p><strong>Extracted Skills:</strong> {result.extractedSkills?.join(', ') || 'None detected'}</p>
          <ul>
            {(result.suggestions || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzerPage;
