import { useEffect, useState } from 'react';
import api from '../api';

const initialJob = {
  title: '',
  company_name: '',
  description: '',
  skills_required: '',
  location: '',
  job_type: 'Internship',
  salary_min: '',
  salary_max: ''
};

const RecruiterDashboard = () => {
  const [jobForm, setJobForm] = useState(initialJob);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [jobRes, appRes] = await Promise.all([
        api.get('/recruiter/jobs'),
        api.get('/applications')
      ]);
      setJobs(jobRes.data || []);
      setApplications(appRes.data || []);
    } catch (err) {
      setError('Failed to load recruiter data.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createJob = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await api.post('/jobs', jobForm);
      setMessage('Job posted successfully.');
      setJobForm(initialJob);
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create job.');
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await api.delete(`/jobs/${jobId}`);
      loadData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete job.');
    }
  };

  const updateApplication = async (applicationId, status) => {
    try {
      await api.put(`/applications/${applicationId}`, { status });
      loadData();
    } catch (err) {
      setError('Failed to update application status.');
    }
  };

  return (
    <div className="stack-lg">
      <div className="panel">
        <h2>Recruiter Dashboard</h2>
        <p>Create jobs and track candidate applications with match score visibility.</p>
      </div>

      <div className="panel">
        <h3>Post a Job</h3>
        <form onSubmit={createJob} className="stack">
          <input placeholder="Job title" value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} required />
          <input placeholder="Company" value={jobForm.company_name} onChange={(e) => setJobForm({ ...jobForm, company_name: e.target.value })} required />
          <textarea placeholder="Description" rows={4} value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} required />
          <input placeholder="Skills required (comma separated)" value={jobForm.skills_required} onChange={(e) => setJobForm({ ...jobForm, skills_required: e.target.value })} required />
          <div className="cards-grid">
            <input placeholder="Location" value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} required />
            <select value={jobForm.job_type} onChange={(e) => setJobForm({ ...jobForm, job_type: e.target.value })}>
              <option>Internship</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
            </select>
            <input placeholder="Salary min" value={jobForm.salary_min} onChange={(e) => setJobForm({ ...jobForm, salary_min: e.target.value })} />
            <input placeholder="Salary max" value={jobForm.salary_max} onChange={(e) => setJobForm({ ...jobForm, salary_max: e.target.value })} />
          </div>
          <button type="submit">Post Job</button>
        </form>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>

      <div className="panel">
        <h3>My Jobs</h3>
        <div className="cards-grid">
          {jobs.map((job) => (
            <article key={job.id} className="career-tile">
              <h4>{job.title}</h4>
              <p>{job.company_name}</p>
              <p>{job.location} · {job.job_type}</p>
              <button className="ghost-btn" onClick={() => deleteJob(job.id)}>Delete</button>
            </article>
          ))}
        </div>
      </div>

      <div className="panel">
        <h3>Applicants</h3>
        <div className="cards-grid">
          {applications.map((app) => (
            <article key={app.id} className="career-tile">
              <h4>{app.name}</h4>
              <p>{app.title}</p>
              <p>Match {app.match_percentage || 0}%</p>
              <p>Status: {app.status}</p>
              <select value={app.status} onChange={(e) => updateApplication(app.id, e.target.value)}>
                <option value="applied">applied</option>
                <option value="shortlisted">shortlisted</option>
                <option value="interview">interview</option>
                <option value="offered">offered</option>
                <option value="rejected">rejected</option>
              </select>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
