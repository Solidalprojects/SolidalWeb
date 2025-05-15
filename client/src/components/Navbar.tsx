// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/solidal_logo.png'

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

  // Navigation items - can be adjusted as needed
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-blue-950/80 backdrop-blur-md py-3' // Darker blue when scrolled
        : 'bg-transparent border-b border-white/20 py-4'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="w-40">
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
        
        {/* Full-screen Menu */}
        <div 
          className={`fixed inset-0 bg-blue-950/95 backdrop-blur-lg z-40 transition-all duration-500 ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="container mx-auto px-6 py-20 h-full flex flex-col justify-center">
            <nav className="text-center">
              <ul className="space-y-8">
                {navItems.map((item, index) => (
                  <li key={index} className="overflow-hidden">
                    <Link 
                      to={item.path}
                      className="text-4xl sm:text-5xl font-bold text-white hover:text-blue-300 transition-colors duration-300 inline-block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Social Media Icons in Menu */}
            <div className="mt-16 flex justify-center space-x-6">
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
            <div className="mt-12 flex justify-center">
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
      </div>
    </header>
  );
};

export default Navbar;