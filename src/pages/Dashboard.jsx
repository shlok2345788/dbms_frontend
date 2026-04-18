import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';

const levelOrder = ['Beginner', 'Intermediate', 'Advanced'];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const res = await api.get('/recommendations/me');
        setData(res.data);
      } catch (err) {
        setError('Unable to fetch recommendations. Please submit profile form first.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [location]);

  if (loading) return <div className="center-card">Loading recommendations...</div>;
  if (error) return <div className="center-card error">{error}</div>;

  return (
    <div className="stack-lg fade-in">
      <div className="panel">
        <h2>Career Compass Dashboard</h2>
        <p>
          Matched for <strong>{data.user?.name}</strong> based on your selected skills and interests.
        </p>
        <div className="meta-row">
          <span>Skills: {data.selectedSkills.join(', ') || 'None selected'}</span>
          <span>Interests: {data.selectedInterests.join(', ') || 'None selected'}</span>
        </div>
      </div>

      {data.recommendations.length === 0 ? (
        <div className="panel">No recommendations found yet. Update your profile form.</div>
      ) : (
        data.recommendations.map((item, idx) => (
          <div className="panel stagger" style={{ animationDelay: `${idx * 80}ms` }} key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="match-row">
              <span>Match score: {item.score}</span>
              <span>Matched skills: {item.matchedSkills.join(', ') || 'None'}</span>
              <span>Matched interests: {item.matchedInterests.join(', ') || 'None'}</span>
            </div>

            <div className="roadmap-grid">
              {levelOrder.map((level) => (
                <div className="roadmap-column" key={level}>
                  <h4>{level}</h4>
                  <ol>
                    {(item.roadmap[level] || []).map((step) => (
                      <li key={`${level}-${step.order}`}>
                        <strong>{step.title}</strong>
                        <p>{step.description}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {data.advice && (
        <div className="panel advice-panel">
          <h3>💡 Career Guidance</h3>
          <p>{data.advice}</p>
        </div>
      )}

      {data.suggestedCourses && data.suggestedCourses.length > 0 && (
        <div className="panel">
          <h3>📚 Recommended Courses</h3>
          <div className="courses-grid">
            {data.suggestedCourses.map((course) => (
              <div className="course-card" key={course.id}>
                <h4>{course.title}</h4>
                <p className="course-desc">{course.description}</p>
                <div className="course-meta">
                  <span className="badge">{course.level}</span>
                  <span className="duration">{course.duration}</span>
                  <span className="provider">{course.provider}</span>
                </div>
                {course.url && (
                  <a href={course.url} target="_blank" rel="noopener noreferrer" className="course-link">
                    View Course →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
