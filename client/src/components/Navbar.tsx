// components/Navbar.tsx
import { useState, useEffect } from 'react';
import logo from '../assets/solidal_logo.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-800/95 shadow-lg shadow-gray-900/20 backdrop-blur-md py-2' 
        : 'bg-gray-900/80 py-2'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="w-40">
          <img src={logo} alt="Solidal Web Development" className="max-h-10" />
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            mobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : 'mb-1.5'
          }`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-0' : 'mb-1.5'
          }`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            mobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''
          }`}></span>
        </button>
        
        {/* Navigation Links */}
        <nav className={`${
          mobileMenuOpen ? 'flex' : 'hidden'
        } md:flex fixed md:relative inset-0 md:inset-auto top-16 md:top-0 flex-col md:flex-row items-center justify-center md:justify-end pt-20 md:pt-0 bg-gray-900/95 md:bg-transparent md:backdrop-blur-none backdrop-blur-md md:shadow-none z-40 transition-all duration-300`}>
          <ul className="flex flex-col md:flex-row items-center gap-8 md:gap-6">
            {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item, index) => (
              <li key={index}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="text-white hover:text-blue-400 text-lg md:text-base font-medium transition-colors duration-300 relative group py-2 px-1 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;