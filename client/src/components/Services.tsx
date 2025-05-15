// components/Services.tsx
import { useState, useEffect } from 'react';

const Services = () => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  useEffect(() => {
    // Set initial animations with staggered timing
    const timer = setTimeout(() => {
      for (let i = 0; i < services.length; i++) {
        setTimeout(() => {
          setActiveIndices(prev => [...prev, i]);
        }, i * 150);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const services = [
    {
      icon: "💻",
      title: "Website Development",
      description: "Custom websites built from scratch with modern technologies that load fast and look great on all devices."
    },
    {
      icon: "🛒",
      title: "E-Commerce Solutions",
      description: "Online stores with secure payment processing, inventory management, and user-friendly shopping experiences."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Mobile-first designs that ensure your website works flawlessly across all devices and screen sizes."
    },
    {
      icon: "🔍",
      title: "SEO Optimization",
      description: "Improve your visibility on search engines with our technical SEO implementation and best practices."
    },
    {
      icon: "🚀",
      title: "Web App Development",
      description: "Dynamic web applications with advanced functionality and interactive user experiences."
    },
    {
      icon: "🛠️",
      title: "Maintenance & Support",
      description: "Ongoing support, updates, and maintenance to keep your website secure and running smoothly."
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">
            WHAT WE OFFER
          </span>     
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              className={`relative bg-gray-800 bg-opacity-80 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-all duration-500 group
                ${activeIndices.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                ${hoveredIndex === index ? 'transform -translate-y-2' : ''}
              `}
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Border gradient effect */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 blur group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
              
              <div className="flex flex-col h-full">
                <div className="mb-6 transition-transform duration-300 transform group-hover:scale-110">
                  <div className="text-4xl bg-blue-600/10 rounded-full w-16 h-16 flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;