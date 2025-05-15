// src/components/MainHomeComponent.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/navlogo.svg'; // Make sure you have this asset

// Import video and client logos
// You'll need to add the actual video file to your assets folder
import backgroundVideo from '../assets/background-video.mp4'; 
// Import client logos (replace with your actual client logos)
import clientLogo1 from '../assets/corporate.png';
import clientLogo2 from '../assets/ecommerce.png';
import clientLogo3 from '../assets/heroimage.png';
import clientLogo4 from '../assets/restaurant.png';
import clientLogo5 from '../assets/tourism.png';
import clientLogo6 from '../assets/solidal_logo.png';

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

  // Array of client logos
  const clientLogos = [
    { src: clientLogo1, alt: 'Client 1' },
    { src: clientLogo2, alt: 'Client 2' },
    { src: clientLogo3, alt: 'Client 3' },
    { src: clientLogo4, alt: 'Client 4' },
    { src: clientLogo5, alt: 'Client 5' },
    { src: clientLogo6, alt: 'Client 6' },
    // Duplicate logos to create an infinite effect
    { src: clientLogo1, alt: 'Client 1' },
    { src: clientLogo2, alt: 'Client 2' },
  ];

  return (
    <div className="relative h-screen overflow-hidden">
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
        
        {/* Gradient overlay - navy blue from left fading to transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/50 to-transparent"></div>
      </div>

      

      {/* Main Content - 80% of viewport height */}
      <div className="relative z-10 h-[80vh] flex items-center">
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
              className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              REQUEST A QUOTE
            </Link>
          </div>
        </div>
      </div>

      {/* Client Logo Slider - 20% of viewport height */}
      <div className="relative z-10 h-[20vh] bg-gray-900/50 backdrop-blur-sm flex items-center overflow-hidden">
        <div className="py-8 flex items-center">
          <div className="animate-marquee flex space-x-16">
            {clientLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 h-16">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHomeComponent;