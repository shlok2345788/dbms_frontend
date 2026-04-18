/**
 * Button Component
 * Reusable button with multiple variants
 * 
 * Usage:
 * <Button variant="primary" size="lg">Click me</Button>
 * <Button variant="secondary" disabled>Disabled</Button>
 */

import React from 'react';
import styles from './Button.module.css';

export const Button = ({
  children,
  variant = 'primary', // primary, secondary, ghost
  size = 'md', // sm, md, lg
  disabled = false,
  isLoading = false,
  icon = null,
  fullWidth = false,
  onClick,
  className = '',
  type = 'button'
}) => {
  const buttonClass = `
    btn 
    btn-${variant}
    btn-${size}
    ${fullWidth ? 'btn-block' : ''}
    ${className}
  `.trim().split(/\s+/).join(' ');

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={buttonClass}
    >
      {isLoading ? (
        <span className="animate-spin">⚙️</span>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
