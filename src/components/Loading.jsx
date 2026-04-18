/**
 * Loading Components
 * Skeleton loaders and spinners
 * 
 * Usage:
 * <Spinner />
 * <Skeleton count={3} />
 * <SkeletonCard />
 */

import React from 'react';

// Spinner Component
export const Spinner = ({ size = 'md', color = 'var(--color-primary)' }) => {
  const sizeMap = {
    sm: '24px',
    md: '40px',
    lg: '64px'
  };

  return (
    <div
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        border: '4px solid rgba(37, 99, 235, 0.1)',
        borderTop: `4px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
      role="status"
      aria-label="Loading"
    />
  );
};

// Skeleton Loader Component
export const Skeleton = ({ width = '100%', height = '16px', borderRadius = '8px', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="skeleton"
          style={{
            width,
            height,
            borderRadius,
            marginBottom: count > 1 && idx < count - 1 ? '12px' : 0
          }}
        />
      ))}
    </>
  );
};

// Skeleton Card Component
export const SkeletonCard = () => {
  return (
    <div className="card skeleton" style={{ height: '300px' }}>
      <Skeleton width="80px" height="80px" borderRadius="12px" />
      <Skeleton width="60%" height="20px" borderRadius="8px" style={{ marginTop: '16px' }} />
      <Skeleton width="100%" height="12px" borderRadius="8px" count={3} style={{ marginTop: '16px' }} />
      <Skeleton width="100%" height="44px" borderRadius="8px" style={{ marginTop: '24px' }} />
    </div>
  );
};

// Loading Page Component
export const LoadingPage = ({ message = 'Loading...' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--color-bg-primary)',
        gap: '24px'
      }}
    >
      <Spinner size="lg" />
      <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>{message}</p>
    </div>
  );
};

// Cards Grid Skeleton
export const SkeletonGrid = ({ count = 3 }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px'
      }}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
};

export default Spinner;
