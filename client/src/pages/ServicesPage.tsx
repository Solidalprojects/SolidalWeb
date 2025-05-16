// src/pages/ServicesPage.tsx
import { useEffect } from 'react';
import Services from '../components/Services';

const ServicesPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Our Services | Solidal Web Development';
  }, []);
  
  return (
    <main>
      <Services />
    </main>
  );
};

export default ServicesPage;