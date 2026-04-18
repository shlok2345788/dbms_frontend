import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import PreferencesForm from './pages/PreferencesForm';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import CareersPage from './pages/CareersPage';
import CareerDetailPage from './pages/CareerDetailPage';
import SkillsLearningPage from './pages/SkillsLearningPage';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import MockInterviewPage from './pages/MockInterviewPage';
import BackgroundPathsPage from './pages/BackgroundPathsPage';
import SplitLoginCardPage from './pages/SplitLoginCardPage';
import JobMatchAnalysisPage from './pages/JobMatchAnalysisPage';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'recruiter' ? '/recruiter' : '/dashboard'} replace />;
  }
  return children;
};

const App = () => {
  return (
    <div className="app-shell">
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-grid" />
      <Navbar />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:careerId" element={<CareerDetailPage />} />
          <Route path="/skills-learning" element={<SkillsLearningPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/form"
            element={
              <ProtectedRoute allowedRoles={['job_seeker']}>
                <PreferencesForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['job_seeker']}>
                <JobSeekerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter"
            element={
              <ProtectedRoute allowedRoles={['recruiter']}>
                <RecruiterDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resume-analyzer"
            element={
              <ProtectedRoute allowedRoles={['job_seeker']}>
                <ResumeAnalyzerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/job-match-analysis"
            element={
              <ProtectedRoute allowedRoles={['job_seeker']}>
                <JobMatchAnalysisPage />
              </ProtectedRoute>
            }
          />
          <Route path="/background-paths" element={<BackgroundPathsPage />} />
          <Route path="/split-login-card" element={<SplitLoginCardPage />} />
          <Route
            path="/mock-interview"
            element={
              <ProtectedRoute allowedRoles={['job_seeker']}>
                <MockInterviewPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
