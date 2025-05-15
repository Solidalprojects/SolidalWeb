// src/components/MainHomeComponent.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/navlogo.svg';

// Import video file
import backgroundVideo from '../assets/background-video.mp4'; 

const MainHomeComponent = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detect if page has been scrolled
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative h-[90vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Gradient overlay - darker navy blue from left fading to transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/60 to-blue-950/20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-blue-300 text-xl md:text-2xl font-medium mb-4">Premium Web Development Agency</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
              YOU ARE IN THE RIGHT HANDS!
            </h1>
            <p className="text-white text-xl md:text-2xl mb-8">
              Custom Websites, Branding & Hosting
            </p>
            <Link 
              to="/contact" 
              className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-bold text-lg shadow-lg shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-700/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              REQUEST A QUOTE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHomeComponent;