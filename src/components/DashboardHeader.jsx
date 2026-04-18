/**
 * Dashboard Header Component
 * Main header with search, user avatar, and theme toggle
 * 
 * Usage:
 * <DashboardHeader 
 *   userName="John Doe"
 *   userAvatar="https://..."
 *   onSearch={handleSearch}
 *   onThemeToggle={toggleTheme}
 * />
 */

import React, { useState } from 'react';
import Button from './Button';

const DashboardHeader = ({
  userName = 'User',
  userAvatar = null,
  onSearch,
  onThemeToggle,
  onLogout,
  isDarkMode = false
}) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch && onSearch(value);
  };

  return (
    <header
      style={{
        background: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '16px 48px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{ fontSize: '32px' }}>🎯</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>AI Career Compass</h3>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-bg-tertiary)', borderRadius: '8px', padding: '8px 12px' }}>
            <span style={{ fontSize: '18px', marginRight: '8px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search careers, skills..."
              value={searchValue}
              onChange={handleSearch}
              onFocus={() => setSearchActive(true)}
              onBlur={() => setTimeout(() => setSearchActive(false), 200)}
              style={{
                border: 'none',
                background: 'transparent',
                flex: 1,
                outline: 'none',
                fontSize: '14px',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>

          {/* Search Dropdown */}
          {searchActive && searchValue && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '12px',
                right: '12px',
                marginTop: '4px',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                maxHeight: '400px',
                overflowY: 'auto',
                zIndex: 100,
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {/* Search results would go here */}
              <div style={{ padding: '12px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Searching for "{searchValue}"...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Dark Mode Toggle */}
          <button
            onClick={onThemeToggle}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background var(--transition-fast)'
            }}
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {/* User Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px'
              }}
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '999px',
                    objectFit: 'cover',
                    border: '2px solid var(--color-primary)'
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '999px',
                    background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <span style={{ fontSize: '18px' }}>▼</span>
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  minWidth: '200px',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 100,
                  overflow: 'hidden'
                }}
              >
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--color-border)' }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>{userName}</p>
                </div>

                <a
                  href="/profile"
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    transition: 'background var(--transition-fast)',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'var(--color-bg-tertiary)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  👤 Profile
                </a>

                <a
                  href="/settings"
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    transition: 'background var(--transition-fast)',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'var(--color-bg-tertiary)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  ⚙️ Settings
                </a>

                <a
                  href="/help"
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: 'var(--color-text-primary)',
                    textDecoration: 'none',
                    transition: 'background var(--transition-fast)',
                    borderBottom: '1px solid var(--color-border)'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'var(--color-bg-tertiary)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  ❓ Help
                </a>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout && onLogout();
                  }}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    background: 'transparent',
                    color: '#EF4444',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background var(--transition-fast)',
                    fontWeight: 600
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'var(--color-bg-tertiary)'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
