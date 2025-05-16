// src/components/ClientLogoSlider.tsx
import { useRef, useEffect } from 'react';

// Import client logos (replace with your actual client logos)
import clientLogo1 from '../assets/tolatiles.svg';
import clientLogo2 from '../assets/fishinghub.svg';
import clientLogo3 from '../assets/solidal_logo.png';
import clientLogo4 from '../assets/tolatiles.svg';
import clientLogo5 from '../assets/fishinghub.svg';
import clientLogo6 from '../assets/solidal_logo.png';

interface ClientLogo {
  src: string;
  alt: string;
}

const ClientLogoSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Create client logos array with consistent sizing properties
  const clientLogos: ClientLogo[] = [
    { src: clientLogo1, alt: 'Client 1' },
    { src: clientLogo2, alt: 'Client 2' },
    { src: clientLogo3, alt: 'Client 3' },
    { src: clientLogo4, alt: 'Client 4' },
    { src: clientLogo5, alt: 'Client 5' },
    { src: clientLogo6, alt: 'Client 6' },
  ];

  // Create multiple duplications of logos for a truly infinite effect
  // 4 sets is enough to ensure seamless looping with the shorter animation distance
  const allLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

  // Pause animation on hover
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleMouseEnter = () => {
      slider.style.animationPlayState = 'paused';
    };

    const handleMouseLeave = () => {
      slider.style.animationPlayState = 'running';
    };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative z-10 h-[10vh] bg-gradient-to-r from-blue-900 to-blue-950 flex items-center justify-center overflow-hidden">
      {/* Background Bleed Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,64,175,0.05)_0%,rgba(25,35,80,0)_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(49,46,129,0.05)_0%,rgba(25,35,80,0)_60%)]"></div>
      
      {/* Soft horizontal lines */}
      <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-400/10 to-transparent top-1/3"></div>
      <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-blue-400/5 to-transparent bottom-1/3"></div>
      
      {/* Glowing particles */}
      <div className="absolute w-1 h-1 rounded-full bg-blue-400/30 top-1/4 left-1/5 animate-ping-slow"></div>
      <div className="absolute w-1 h-1 rounded-full bg-blue-300/20 bottom-1/4 right-1/4 animate-ping-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute w-1 h-1 rounded-full bg-indigo-400/20 top-2/3 left-2/3 animate-ping-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Edge gradient overlays */}
      <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-900/95 to-transparent w-24 z-10"></div>
      <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-blue-950/95 to-transparent w-24 z-10"></div>
      
      {/* Logo slider container */}
      <div className="w-full h-full overflow-hidden relative z-10 flex items-center justify-center">
        <div 
          ref={sliderRef}
          className="animate-marquee flex items-center"
        >
          {allLogos.map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-32 h-10 mx-8 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:brightness-125"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="max-h-9 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogoSlider;