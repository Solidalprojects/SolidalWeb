// pages/ServicesPage.tsx
import { useEffect } from 'react';
import Services from '../components/Services';

const ServicesPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Services | Solidal Web Development';
  }, []);
  
  return (
    <main>
      <div className="pt-20 bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-white text-center">Our Services</h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mt-4">
            Comprehensive web solutions to help your business thrive online
          </p>
        </div>
      </div>
      <Services />
    </main>
  );
};

export default ServicesPage;