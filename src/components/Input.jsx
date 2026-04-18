/**
 * Input Component
 * Reusable form input with validation states
 * 
 * Usage:
 * <Input 
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error="Invalid email address"
 * />
 */

import React from 'react';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onBlur,
  error = null,
  success = false,
  disabled = false,
  required = false,
  hint = '',
  icon = null,
  maxLength = null,
  className = ''
}) => {
  const inputId = `input-${name || label?.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <span
            style={{
              position: 'absolute',
              left: '12px',
              fontSize: '18px',
              pointerEvents: 'none'
            }}
          >
            {icon}
          </span>
        )}

        <input
          id={inputId}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          maxLength={maxLength}
          className={`
            ${error ? 'error' : ''}
            ${success ? 'success' : ''}
            ${className}
          `}
          style={{
            paddingLeft: icon ? '40px' : undefined,
            paddingRight: (error || success) ? '40px' : undefined
          }}
        />

        {/* Status Icon */}
        {error && (
          <span
            style={{
              position: 'absolute',
              right: '12px',
              fontSize: '18px',
              color: '#EF4444'
            }}
          >
            ⚠️
          </span>
        )}
        {success && (
          <span
            style={{
              position: 'absolute',
              right: '12px',
              fontSize: '18px',
              color: '#22C55E'
            }}
          >
            ✓
          </span>
        )}
      </div>

      {error && <div className="form-error">⚠️ {error}</div>}
      {hint && !error && <div className="form-help">{hint}</div>}

      {maxLength && (
        <div
          style={{
            marginTop: '4px',
            fontSize: '12px',
            color: 'var(--color-text-tertiary)'
          }}
        >
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
};

export default Input;
