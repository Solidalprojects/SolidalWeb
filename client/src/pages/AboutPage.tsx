// pages/AboutPage.tsx
import { useEffect } from 'react';
import ImprovedAbout from '../components/About';
import Testimonials from '../components/Testimonials';

const AboutPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Our Story | Solidal Web Development';
  }, []);
  
  return (
    <main>
      {/* Hero Banner - Note the updated background gradient to match ImprovedAbout */}
      <div className="pt-20 bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient blobs */}
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center relative">
            <div className="inline-block mb-4 overflow-hidden">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-sm font-medium animate-fadeInUp">
                OUR STORY
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 relative overflow-hidden">
              <span className="block animate-fadeInUp" style={{ animationDelay: '0.1s' }}>About Solidal</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                Web Development
              </span>
            </h1>
            <div className="overflow-hidden">
              <p className="text-gray-300 text-xl max-w-2xl mx-auto mt-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                Young innovators creating exceptional digital experiences in Albania
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content - ImprovedAbout starts with bg-gradient-to-b from-gray-900 to-gray-800 */}
      <ImprovedAbout />
      
      {/* Testimonials */}
      <Testimonials />
    </main>
  );
};

export default AboutPage;