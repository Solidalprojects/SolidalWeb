// components/Portfolio.tsx
import { useState, useEffect } from 'react';
import ecommerceLogo from '../assets/ecommerce.png';
import restaurant from '../assets/restaurant.png';
import tourism from '../assets/tourism.png';
import corporate from '../assets/corporate.png';

const Portfolio = () => {
  const [active, setActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('portfolio');
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          setActive(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      image: ecommerceLogo,
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A complete online shopping solution for a local retail business."
    },
    {
      image: tourism,
      title: "Tourism Website",
      category: "Web Design",
      description: "Showcasing Albania's beautiful destinations for a travel agency."
    },
    {
      image: restaurant,
      title: "Restaurant Ordering System",
      category: "Web Application",
      description: "Online ordering and reservation system for a popular restaurant chain."
    },
    {
      image: corporate,
      title: "Corporate Portfolio",
      category: "Web Development",
      description: "Professional web presence for a multinational corporation."
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">OUR WORK</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <div 
              className={`bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:shadow-blue-500/10 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
              style={{ transitionDelay: `${index * 150}ms` }}
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-video overflow-hidden relative rounded-t-xl">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover object-bottom transition-transform duration-700 
                  hover:scale-105"
              />
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-60' : ''}`}></div>
              </div>
              <div className="p-6">
                <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 text-xs rounded-full mb-3">{project.category}</span>
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group"
                >
                  View Project 
                  <svg 
                    className="ml-2 w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <a 
            href="#contact" 
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-8 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/20"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;