// src/components/ScrollProgressIndicator.tsx
import React, { useState, useEffect, useRef } from 'react';
import './ScrollProgressIndicator.css';

interface ScrollProgressIndicatorProps {
  size?: number;       // Size of the indicator in pixels
  thickness?: number;  // Thickness of the progress line
  color?: string;      // Primary color (will be used for glow effect)
  showPercentage?: boolean; // Whether to show the percentage in the middle
  glowIntensity?: number; // Intensity of the neon glow (1-10)
  className?: string;  // Additional CSS classes
}

const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  size = 70,
  thickness = 4,
  color = '#3b82f6', // Tailwind blue-500
  showPercentage = true,
  glowIntensity = 5,
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const glowSize = Math.max(1, Math.min(10, glowIntensity)) * 5; // Convert 1-10 scale to pixel values
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the page the user has scrolled
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      
      // Set the scroll progress percentage (0-100)
      const progress = Math.min(100, Math.max(0, (scrolled / windowHeight) * 100));
      setScrollProgress(progress);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Run once on mount to set initial position
    handleScroll();
    
    // Clean up event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate circle properties
  const radius = (size / 2) - (thickness / 2);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;
  
  // Dynamic styles for the neon glow effect
  const glowStyle = {
    '--progress-color': color,
    '--glow-size': `${glowSize}px`,
    '--indicator-size': `${size}px`,
    '--stroke-thickness': `${thickness}px`,
  } as React.CSSProperties;
  
  return (
    <div 
      ref={indicatorRef}
      className={`scroll-progress-indicator ${className}`}
      style={glowStyle}
    >
      <svg
        className="progress-ring"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          className="progress-ring-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
        />
        
        {/* Progress arc */}
        <circle
          className="progress-ring-circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={thickness}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      
      {/* Percentage text in the middle */}
      {showPercentage && (
        <div className="percentage-display">
          <span className="percentage-text">{Math.round(scrollProgress)}</span>
          <span className="percentage-symbol">%</span>
        </div>
      )}
    </div>
  );
};

export default ScrollProgressIndicator;