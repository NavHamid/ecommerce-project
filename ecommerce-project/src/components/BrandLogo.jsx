import React from 'react';
import './BrandLogo.css';

export function BrandLogo({ theme = 'dark' }) {
  return (
    <div className={`brand-logo-container ${theme}`} role="img" aria-label="SmileStore Logo">
      <svg className="brand-logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sleek, premium shopping bag that integrates a smile */}
        <path 
          d="M16 6V5C16 2.79086 14.2091 1 12 1C9.79086 1 8 2.79086 8 5V6" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round"
        />
        <path 
          d="M3 9C3 7.89543 3.89543 7 5 7H19C20.1046 7 21 7.89543 21 9V17C21 19.7614 18.7614 22 16 22H8C5.23858 22 3 19.7614 3 17V9Z" 
          fill="currentColor"
        />
        <path 
          d="M8 12.5C8 14.7091 9.79086 16.5 12 16.5C14.2091 16.5 16 12.5 16 12.5" 
          stroke="var(--brand-accent)" 
          strokeWidth="2.2" 
          strokeLinecap="round"
        />
      </svg>
      <span className="brand-logo-text">
        Smile<span className="brand-logo-text-accent">Store</span>
      </span>
    </div>
  );
}
