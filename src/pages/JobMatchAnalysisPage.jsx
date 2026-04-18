import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const JobMatchAnalysisPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [file, setFile] = useState(null);
  const [resumeResult, setResumeResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoadingJobs(true);
        const { data } = await api.get('/jobs');
        setJobs(data || []);
        const requestedJobId = searchParams.get('jobId');
        if (requestedJobId && data?.some((job) => String(job.id) === String(requestedJobId))) {
          setSelectedJobId(String(requestedJobId));
        } else if (data?.length) {
          setSelectedJobId(String(data[0].id));
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load jobs for analysis.');
      } finally {
        setLoadingJobs(false);
      }
    };

    loadJobs();
  }, [searchParams]);

  const selectedJob = useMemo(
    () => jobs.find((job) => String(job.id) === String(selectedJobId)),
    [jobs, selectedJobId]
  );

  const uploadResume = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please upload a PDF, DOC, or DOCX resume first.');
      return;
    }

    try {
      setError('');
      setUploading(true);
      const formData = new FormData();
      formData.append('resume', file);
      const { data } = await api.post('/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResumeResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Resume upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const runAnalysis = async () => {
    if (!selectedJobId) {
      setError('Please select a job or internship first.');
      return;
    }

    if (!user?.id) {
      setError('Please log in again to continue analysis.');
      return;
    }

    try {
      setError('');
      setAnalyzing(true);
      const [analysisRes, recommendationRes] = await Promise.all([
        api.get(`/analyze-resume/${selectedJobId}`),
        api.get(`/recommend-courses/${user.id}/${selectedJobId}`)
      ]);
      setAnalysis(analysisRes.data);
      setRecommendation(recommendationRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate job match analysis.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="cc-stack fade-in">
      <section className="panel">
        <h2>Job Match Analysis</h2>
        <p>Upload your resume, compare skills with a target role, and get a guided improvement plan.</p>

        <div className="cc-options">
          <label htmlFor="jobSelector">Select Job / Internship</label>
          <select
            id="jobSelector"
            value={selectedJobId}
            onChange={(event) => setSelectedJobId(event.target.value)}
            disabled={loadingJobs}
          >
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} ({job.job_type || 'Role'})
              </option>
            ))}
          </select>
        </div>

        <form className="cc-options" onSubmit={uploadResume}>
          <label htmlFor="resumeUpload">Upload Resume (PDF/DOC/DOCX)</label>
          <input
            id="resumeUpload"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
          />
          <button type="submit" disabled={uploading}>{uploading ? 'Uploading Resume...' : 'Upload Resume'}</button>
        </form>

        <div className="cc-actions">
          <button onClick={runAnalysis} disabled={analyzing || !selectedJobId}>
            {analyzing ? 'Analyzing...' : 'Analyze Resume Match'}
          </button>
          <button className="cc-btn-ghost" onClick={() => navigate('/dashboard')}>Reapply Later</button>
        </div>

        {error && <p className="error">{error}</p>}
      </section>

      {resumeResult && (
        <section className="panel">
          <h3>Resume Score</h3>
          <div className="cc-progress-row">
            <span>{resumeResult.resumeScore || 0}% Resume Strength</span>
            <span>{selectedJob?.title || 'Selected role'}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${resumeResult.resumeScore || 0}%` }} />
          </div>
          <div className="meta-row">
            <span>Education: {(resumeResult.education || []).slice(0, 2).join(' | ') || 'Not detected'}</span>
            <span>Experience: {resumeResult.experience || 'Not detected'}</span>
          </div>
          <p>Extracted Skills: {(resumeResult.extractedSkills || []).join(', ') || 'No skills extracted'}</p>
        </section>
      )}

      {analysis && (
        <section className="panel">
          <h3>Skill Comparison</h3>
          <div className="cc-progress-row">
            <span>Match Percentage</span>
            <span>{analysis.matchPercentage}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${analysis.matchPercentage || 0}%` }} />
          </div>

          <div className="cards-grid" style={{ marginTop: '12px' }}>
            <article className="career-tile">
              <h4>Matching Skills</h4>
              <ul className="cc-resources">
                {(analysis.matchingSkills || []).map((skill) => (
                  <li key={skill}>✔ {skill}</li>
                ))}
                {!analysis.matchingSkills?.length && <li>No matching skills detected.</li>}
              </ul>
            </article>
            <article className="career-tile">
              <h4>Missing Skills</h4>
              <ul className="cc-resources">
                {(analysis.missingSkills || []).map((skill) => (
                  <li key={skill}>❌ {skill}</li>
                ))}
                {!analysis.missingSkills?.length && <li>No skill gaps found.</li>}
              </ul>
            </article>
          </div>

          <p className="notice" style={{ marginTop: '12px' }}>
            {analysis.motivationalMessage}
          </p>
          {!!analysis.missingSkills?.length && analysis.missingSkills.length <= 2 && (
            <p className="success">You are close! Just learn {analysis.missingSkills.length} more skill(s) to qualify.</p>
          )}
        </section>
      )}

      {(recommendation?.recommendations || analysis?.recommendations)?.length ? (
        <section className="panel">
          <h3>Improvement Section</h3>
          <p>Course recommendations, certification goals, and mini projects to close your skill gap.</p>

          <div className="cards-grid">
            {(recommendation?.recommendations || analysis?.recommendations || []).map((item) => (
              <article className="career-tile" key={item.skill}>
                <h4>{item.skill}</h4>
                <p className="badge">Priority Skill</p>

                <strong>Courses</strong>
                <ul className="cc-resources">
                  {(item.courses || []).map((course) => (
                    <li key={`${item.skill}-course-${course.id}`}>
                      {course.course_name} ({course.provider || 'Provider N/A'})
                    </li>
                  ))}
                  {!item.courses?.length && <li>No course mapped yet.</li>}
                </ul>

                <strong>Certifications</strong>
                <ul className="cc-resources">
                  {(item.certifications || []).map((cert) => (
                    <li key={`${item.skill}-cert-${cert.id}`}>
                      {cert.certification_name} ({cert.provider || 'Provider N/A'})
                    </li>
                  ))}
                  {!item.certifications?.length && <li>No certification mapped yet.</li>}
                </ul>

                <strong>Mini Projects</strong>
                <ul className="cc-resources">
                  {(item.projects || []).map((project) => (
                    <li key={`${item.skill}-project-${project}`}>{project}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="cc-cta">
            <p><strong>Fastest Learning Path:</strong> {(recommendation?.fastestLearningPath || analysis?.fastestLearningPath || []).join(' → ') || 'No gaps detected'}</p>
            <div className="cc-actions">
              <button onClick={() => navigate('/skills-learning')}>Improve Skills</button>
              <button className="cc-btn-ghost" onClick={() => navigate('/dashboard')}>Reapply Later</button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default JobMatchAnalysisPage;
