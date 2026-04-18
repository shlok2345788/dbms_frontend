import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const JobSeekerDashboard = () => {
  const [careers, setCareers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [readiness, setReadiness] = useState({ score: 0, level: 'Beginner', notifications: [] });
  const [skillGap, setSkillGap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const topJob = useMemo(() => jobs[0], [jobs]);
  const internshipJobs = useMemo(() => jobs.filter((job) => String(job.job_type || '').toLowerCase() === 'internship'), [jobs]);
  const fullTimeJobs = useMemo(() => jobs.filter((job) => String(job.job_type || '').toLowerCase() !== 'internship'), [jobs]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [careerRes, courseRes, certRes, jobsRes, readinessRes] = await Promise.all([
          api.get('/recommend-career'),
          api.get('/recommendations/courses'),
          api.get('/recommendations/certifications'),
          api.get('/jobs/recommended/list'),
          api.get('/job-readiness')
        ]);

        setCareers(careerRes.data || []);
        setCourses(courseRes.data || []);
        setCertifications(certRes.data || []);
        setJobs(jobsRes.data || []);
        setReadiness(readinessRes.data || readiness);

        if (jobsRes.data?.length) {
          const gapRes = await api.get(`/skill-gap/${jobsRes.data[0].id}`);
          setSkillGap(gapRes.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data. Please fill profile form first.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const applyForJob = async (jobId) => {
    try {
      await api.post(`/apply/${jobId}`, { cover_letter: 'Interested in this opportunity.' });
      alert('Application submitted.');
    } catch (err) {
      alert(err.response?.data?.error || 'Unable to apply for this job.');
    }
  };

  if (loading) return <div className="center-card">Loading dashboard...</div>;
  if (error) return <div className="center-card error">{error}</div>;

  return (
    <div className="stack-lg">
      <div className="panel">
        <h2>Job Seeker Dashboard</h2>
        <p>Track your progress, discover career paths, and apply to smart-matched jobs.</p>
        <div className="score-wrap">
          <div>
            <p className="metric-label">Job Readiness</p>
            <h3>{readiness.score}%</h3>
            <p>{readiness.level}</p>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${readiness.score}%` }} />
          </div>
        </div>
        {readiness.notifications?.map((note) => (
          <p className="notice" key={note}>{note}</p>
        ))}
      </div>

      <div className="panel">
        <h3>Top Career Recommendations</h3>
        <div className="cards-grid">
          {careers.slice(0, 5).map((career) => (
            <article className="career-tile" key={career.id}>
              <h4>{career.title}</h4>
              <p>{career.description}</p>
              <span className="badge">Match {career.matchPercentage || career.match_percentage || 0}%</span>
            </article>
          ))}
        </div>
      </div>

      {skillGap && (
        <div className="panel">
          <h3>Skill Gap Analyzer</h3>
          <p>Based on: {skillGap.job?.title || topJob?.title}</p>
          <div className="meta-row">
            <span>Matching: {skillGap.matchingSkills?.join(', ') || 'None'}</span>
            <span>Missing: {skillGap.missingSkills?.join(', ') || 'None'}</span>
            <span>Match: {skillGap.matchPercentage || 0}%</span>
          </div>
        </div>
      )}

      <div className="panel">
        <h3>Courses and Certifications</h3>
        <div className="cards-grid">
          {courses.slice(0, 4).map((course) => (
            <article className="career-tile" key={`course-${course.id}`}>
              <h4>{course.title}</h4>
              <p>{course.provider} · {course.level}</p>
              {course.url ? (
                <a
                  className="cc-inline-link"
                  href={course.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Apply / Open Course
                </a>
              ) : (
                <span className="cc-inline-link">Course link unavailable</span>
              )}
            </article>
          ))}
          {certifications.slice(0, 4).map((cert) => (
            <article className="career-tile" key={`cert-${cert.id}`}>
              <h4>{cert.title}</h4>
              <p>{cert.provider}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3>Smart Job Matching</h3>
        <div className="cc-stack">
          <div>
            <h4>Internships</h4>
            <div className="cards-grid">
              {internshipJobs.slice(0, 3).map((job) => (
                <article className="career-tile" key={`internship-${job.id}`}>
                  <h4>{job.title}</h4>
                  <p>{job.company_name} · {job.location}</p>
                  <p>Why you match: {job.match_percentage || 0}% skill overlap</p>
                  <Link className="cc-inline-link" to={`/job-match-analysis?jobId=${job.id}`}>
                    Apply for Internship
                  </Link>
                  <button onClick={() => applyForJob(job.id)}>Quick Apply</button>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h4>Jobs</h4>
            <div className="cards-grid">
              {fullTimeJobs.slice(0, 3).map((job) => (
                <article className="career-tile" key={`job-${job.id}`}>
                  <h4>{job.title}</h4>
                  <p>{job.company_name} · {job.location}</p>
                  <p>Why you match: {job.match_percentage || 0}% skill overlap</p>
                  <Link className="cc-inline-link" to={`/job-match-analysis?jobId=${job.id}`}>
                    Apply for Job
                  </Link>
                  <button onClick={() => applyForJob(job.id)}>Quick Apply</button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
