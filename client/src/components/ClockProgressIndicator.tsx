// src/components/AdvancedClockProgressIndicator.tsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles/ClockProgressIndicator.css';

interface AdvancedClockProgressIndicatorProps {
  size?: number;
  thickness?: number;
  color?: string;
  secondaryColor?: string;
  numSections?: number;
  showNumbers?: boolean;
  glowIntensity?: number;
  className?: string;
}

const AdvancedClockProgressIndicator: React.FC<AdvancedClockProgressIndicatorProps> = ({
  size = 120,
  thickness = 3,
  color = '#3b82f6', // Tailwind blue-500
  secondaryColor = '#10b981', // Tailwind green-500
  numSections = 12,
  showNumbers = true,
  glowIntensity = 6,
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const glowSize = Math.max(1, Math.min(10, glowIntensity)) * 4;
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      
      // Calculate progress percentage
      const progress = Math.min(100, Math.max(0, (scrolled / windowHeight) * 100));
      setScrollProgress(progress);
      
      // Calculate which section is active
      const newActiveSection = Math.floor((progress / 100) * numSections);
      setActiveSection(newActiveSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [numSections]);
  
  // Generate tick marks and numbers around the circle
  const ticks = [];
  const numbers = [];
  
  for (let i = 0; i < numSections; i++) {
    const angle = (i / numSections) * 360;
    const isActive = i <= activeSection;
    
    // Add tick mark
    ticks.push(
      <div
        key={`tick-${i}`}
        className="tick"
        style={{
          '--tick-angle': angle,
          '--tick-opacity': isActive ? 1 : 0.3,
          '--tick-color': isActive ? secondaryColor : 'rgba(255, 255, 255, 0.2)',
          '--tick-glow-size': `${glowSize / 2}px`,
          transition: `all ${0.2 + i * 0.05}s ease-out`
        } as React.CSSProperties}
      />
    );
    
    // Add number
    if (showNumbers) {
      const numberAngle = ((i / numSections) * Math.PI * 2) - Math.PI / 2;
      const numberRadius = (size / 2) - 25;
      const numX = Math.cos(numberAngle) * numberRadius + (size / 2);
      const numY = Math.sin(numberAngle) * numberRadius + (size / 2);
      
      numbers.push(
        <div
          key={`number-${i}`}
          className={`number ${isActive ? 'active' : ''}`}
          style={{
            position: 'absolute',
            top: `${numY}px`,
            left: `${numX}px`,
            transform: 'translate(-50%, -50%)',
            '--number-color': isActive ? secondaryColor : 'rgba(255, 255, 255, 0.4)',
            '--number-glow-size': `${glowSize / 2}px`,
            transition: `all ${0.2 + i * 0.05}s ease-out`
          } as React.CSSProperties}
        >
          {i + 1}
        </div>
      );
    }
  }
  
  // Calculate progress angle for the indicator
  const progressAngle = -90 + (scrollProgress / 100) * 360;
  
  // Dynamic styles for the neon glow effect
  const glowStyle = {
    '--progress-color': color,
    '--secondary-color': secondaryColor,
    '--glow-size': `${glowSize}px`,
    '--indicator-size': `${size}px`,
    '--stroke-thickness': `${thickness}px`,
    '--progress-angle': `${progressAngle}deg`,
    '--progress-percentage': Math.round(scrollProgress)
  } as React.CSSProperties;
  
  return (
    <div 
      ref={indicatorRef}
      className={`clock-progress-indicator ${className}`}
      style={glowStyle}
    >
      {/* Container for ticks */}
      <div className="tick-container">
        {ticks}
      </div>
      
      {/* Numbers */}
      {numbers}
      
      {/* Progress circle with conic gradient */}
      <div className="progress-circle-container"></div>
      
      {/* SVG fallback for browsers that don't support conic gradients */}
      <svg
        className="progress-clock"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: 'none' }}
      >
        {/* Background circle */}
        <circle
          className="progress-clock-bg"
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) - (thickness / 2) - 10}
          strokeWidth={thickness}
        />
        
        {/* Progress arc */}
        <circle
          className="progress-clock-circle"
          cx={size / 2}
          cy={size / 2}
          r={(size / 2) - (thickness / 2) - 10}
          strokeWidth={thickness}
          strokeDasharray={(2 * Math.PI * ((size / 2) - (thickness / 2) - 10))}
          strokeDashoffset={(2 * Math.PI * ((size / 2) - (thickness / 2) - 10)) * (1 - scrollProgress / 100)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      
      {/* Progress indicator dot */}
      <div className="progress-indicator-dot"></div>
      
      {/* Percentage inside */}
      <div className="progress-percentage">
        <span className="percentage-value"></span>
        <span className="percentage-symbol">%</span>
      </div>
    </div>
  );
};

export default AdvancedClockProgressIndicator;