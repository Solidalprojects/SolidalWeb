// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/solidal_logo.png';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Navigation items - can be adjusted as needed
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  
  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-blue-950/80 backdrop-blur-md py-3' // Darker blue when scrolled
          : 'bg-transparent border-b border-white/20 py-4'
      }`}>
        <div className="container mx-auto px-2 flex items-center justify-between">
          {/* Logo - Positioned at the very left with less space */}
          <Link to="/" className="pl-0">
            <img src={logo} alt="Solidal Web Development" className="max-h-10" />
          </Link>
          
          {/* Menu Button */}
          <button 
            className="flex items-center space-x-2 text-white focus:outline-none z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="text-sm font-medium uppercase tracking-wider">MENU</span>
            <div className="flex flex-col justify-center items-center w-8 h-8">
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'transform rotate-45 translate-y-1' : 'mb-1.5'
              }`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'mb-1.5'
              }`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'transform -rotate-45 -translate-y-1' : ''
              }`}></span>
            </div>
          </button>
        </div>
      </header>
      
      {/* Side Menu - Fixed position independent of header */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-full md:w-96 bg-blue-950 z-40 transform transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Close button at top-right */}
        <div className="flex justify-end p-6">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-blue-300 focus:outline-none"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Menu content - Positioned correctly with flexbox */}
        <div className="flex-1 flex flex-col justify-center p-8 overflow-y-auto">
          <nav>
            <ul className="space-y-6">
              {navItems.map((item, index) => (
                <li key={index} className="overflow-hidden">
                  <Link 
                    to={item.path}
                    className="text-3xl font-bold text-white hover:text-blue-300 transition-colors duration-300 inline-block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Social Media Icons in Menu */}
          <div className="mt-12 flex justify-start space-x-6">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, index) => (
              <a 
                href="#" 
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-blue-950 transition-all duration-300"
                key={index}
              >
                <i className={`fab fa-${social} text-xl`}></i>
              </a>
            ))}
          </div>
          
          {/* Login/Logout in Menu */}
          <div className="mt-12">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/dashboard"
                  className="text-white hover:text-blue-300 transition-colors duration-300 flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-2">Dashboard</span>
                  {user && (
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-sm font-semibold">
                      {user.first_name ? user.first_name.charAt(0) : user.email.charAt(0)}
                    </div>
                  )}
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-white text-blue-950 rounded-lg hover:bg-blue-100 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/client-login"
                className="px-6 py-3 bg-white text-blue-950 rounded-lg font-medium hover:bg-blue-100 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Client Login
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Dark overlay behind side menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;