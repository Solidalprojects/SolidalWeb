// pages/AboutPage.tsx
import { useEffect } from 'react';
import About from '../components/About';
import Testimonials from '../components/Testimonials';

const AboutPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'About Us | Solidal Web Development';
  }, []);
  
  return (
    <main>
      <div className="pt-20 bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-white text-center">About Us</h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mt-4">
            Learn more about Solidal Web Development and our team
          </p>
        </div>
      </div>
      <About />
      <Testimonials />
    </main>
  );
};

export default AboutPage;