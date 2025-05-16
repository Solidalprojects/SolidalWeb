
// pages/ServicesPage.tsx
import { useEffect } from 'react';
import WebsiteDesignProject from '../components/WebsiteDesignProject';

const ServicesPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Our Process | Solidal Web Development';
  }, []);
  
  return (
    <main>
      <div className="pt-20 bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-white text-center">Our Website Design Process</h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mt-4">
            Explore our comprehensive approach to creating exceptional websites
          </p>
        </div>
      </div>
      <WebsiteDesignProject />
    </main>
  );
};

export default ServicesPage;