/**
 * Chip Component
 * Reusable chip/tag for selections (skills, interests, tags)
 * 
 * Usage:
 * <Chip 
 *   label="Python"
 *   selected={true}
 *   onClick={() => toggleSkill('Python')}
 *   onRemove={() => removeSkill('Python')}
 * />
 */

import React from 'react';

const Chip = ({
  label,
  icon = null,
  selected = false,
  onClick,
  onRemove,
  disabled = false,
  variant = 'default', // default, primary, success
  showRemove = false,
  className = ''
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          background: selected ? 'var(--color-primary)' : 'rgba(37, 99, 235, 0.1)',
          color: selected ? 'white' : 'var(--color-primary)',
          border: selected ? 'none' : '1px solid var(--color-primary)'
        };
      case 'success':
        return {
          background: selected ? 'var(--color-accent)' : 'rgba(34, 197, 94, 0.1)',
          color: selected ? 'white' : 'var(--color-accent)',
          border: selected ? 'none' : '1px solid var(--color-accent)'
        };
      default:
        return {
          background: selected ? 'var(--color-primary)' : 'rgba(37, 99, 235, 0.1)',
          color: selected ? 'white' : 'var(--color-primary)',
          border: selected ? 'none' : '1px solid rgba(37, 99, 235, 0.2)'
        };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`chip ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: '999px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all var(--transition-fast)',
        border: 'none',
        opacity: disabled ? 0.5 : 1,
        ...getVariantStyle()
      }}
      title={label}
    >
      {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
      <span>{label}</span>
      {selected && !showRemove && <span style={{ fontSize: '14px' }}>✓</span>}
      {showRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove && onRemove();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            marginLeft: '4px',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            opacity: 0.7,
            transition: 'opacity var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.target.style.opacity = 1}
          onMouseLeave={(e) => e.target.style.opacity = 0.7}
        >
          ✕
        </button>
      )}
    </button>
  );
};

export default Chip;
