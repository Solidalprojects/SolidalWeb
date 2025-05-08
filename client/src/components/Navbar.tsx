// components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/solidal_logo.png';
import { useAuth } from '../hooks/useAuth';

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
        ? 'bg-gray-800/95 shadow-lg shadow-gray-900/20 backdrop-blur-md py-2' 
        : 'bg-gray-900/80 py-2'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="w-40">
          <img src={logo} alt="Solidal Web Development" className="max-h-10" />
        </Link>
        
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
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.path} 
                  className={`text-white hover:text-blue-400 text-lg md:text-base font-medium transition-colors duration-300 relative group py-2 px-1 block
                    ${location.pathname === item.path ? 'text-blue-400' : ''}
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-400 transition-all duration-300
                    ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}
                  `}></span>
                </Link>
              </li>
            ))}

            {/* Auth Links */}
            <li className="md:ml-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <Link 
                    to="/dashboard"
                    className="text-white hover:text-blue-400 transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={logout}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-600/20 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <Link 
                    to="/login"
                    className="text-white hover:text-blue-400 transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-600/20 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;