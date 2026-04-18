/**
 * Career Card Component
 * Displays a career option with match percentage, skills, and action buttons
 * 
 * Usage:
 * <CareerCard 
 *   title="Data Scientist"
 *   description="Analyze data and build predictive models"
 *   matchPercentage={85}
 *   salary="₹6-15 LPA"
 *   skills={['Python', 'SQL', 'Statistics']}
 *   onViewRoadmap={() => navigate('/roadmap')}
 * />
 */

import React, { useState } from 'react';
import Button from './Button';

const CareerCard = ({
  id,
  icon = '💼',
  title,
  description,
  matchPercentage,
  salary,
  location = 'Remote',
  experience = '1-2 years',
  skills = [],
  tags = [],
  onViewRoadmap,
  onSave,
  isSaved = false,
  compact = false // For grid view
}) => {
  const [saved, setSaved] = useState(isSaved);

  const handleSave = () => {
    setSaved(!saved);
    onSave && onSave(id, !saved);
  };

  // Color mapping for match percentage
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return '#22C55E'; // Green
    if (percentage >= 60) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  if (compact) {
    return (
      <div className="card" style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{icon}</div>
            <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>{title}</h4>
          </div>
          <div
            className="badge badge-primary"
            style={{
              background: `linear-gradient(135deg, ${getMatchColor(matchPercentage)}, ${getMatchColor(matchPercentage)})`,
              fontSize: '12px',
              padding: '8px 12px'
            }}
          >
            {matchPercentage}% MATCH
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#6B7280', marginTop: '12px' }}>
          <span>💼 {salary}</span>
          <span>📍 {location}</span>
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={onViewRoadmap}
          style={{ marginTop: '16px' }}
        >
          View Roadmap
        </Button>
      </div>
    );
  }

  // Full card view
  return (
    <div className="card">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
          <div style={{ fontSize: '48px' }}>{icon}</div>
          <div>
            <h3 style={{ margin: 0, marginBottom: '4px' }}>{title}</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Tech Industry • Full-Time</p>
          </div>
        </div>
        <div
          className="badge badge-success"
          style={{
            background: `linear-gradient(135deg, ${getMatchColor(matchPercentage)}, ${getMatchColor(matchPercentage)})`,
            color: 'white',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: 600
          }}
        >
          {matchPercentage}% MATCH
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="chip"
              style={{
                background: 'rgba(37, 99, 235, 0.1)',
                color: '#2563EB',
                padding: '6px 12px',
                fontSize: '12px',
                borderRadius: '20px'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '16px', color: '#6B7280' }}>
        {description}
      </p>

      {/* Salary & Location */}
      <div style={{ display: 'flex', gap: '24px', fontSize: '12px', color: '#6B7280', marginBottom: '16px' }}>
        <span>💼 {salary}</span>
        <span>📍 {location}</span>
        <span>⏱️ {experience}</span>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>Skills needed:</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                style={{
                  background: '#F3F4F6',
                  color: '#2563EB',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}
              >
                {skill}
              </span>
            ))}
            {skills.length > 4 && (
              <span style={{ fontSize: '12px', color: '#6B7280' }}>+{skills.length - 4} more</span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <Button variant="primary" onClick={onViewRoadmap} fullWidth>
          View Roadmap
        </Button>
        <Button
          variant="secondary"
          onClick={handleSave}
          style={{ flex: '0 0 auto', minWidth: '48px' }}
        >
          {saved ? '💾' : '🔖'}
        </Button>
      </div>

      {/* Footer */}
      <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '12px', borderTop: '1px solid #E5E7EB', paddingTop: '12px', margin: '12px 0 0 0' }}>
        Matched at {new Date().toLocaleDateString()} • 2,385 professionals in this role
      </p>
    </div>
  );
};

export default CareerCard;
