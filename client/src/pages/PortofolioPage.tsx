// pages/PortfolioPage.tsx
import { useEffect } from 'react';
import Portfolio from '../components/Portofolio';

const PortfolioPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Portfolio | Solidal Web Development';
  }, []);
  
  return (
    <main>
      <div className="pt-20 bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-white text-center">Our Portfolio</h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mt-4">
            Explore our recent projects and success stories
          </p>
        </div>
      </div>
      <Portfolio />
    </main>
  );
};

export default PortfolioPage;