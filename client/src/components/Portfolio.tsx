// components/Portfolio.tsx
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import ecommerceLogo from '../assets/bigfishinghub.png';
import corporate from '../assets/tolatiles.svg';

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // For detecting when element is in view
  const { ref: projectsRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  // Update scroll progress and active project based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // If section is not visible, do nothing
      if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) {
        return;
      }
      
      // Calculate scroll progress through the section (0 to 1)
      const progress = Math.min(
        Math.max(
          (windowHeight - sectionTop) / (sectionHeight + windowHeight * 0.5),
          0
        ),
        1
      );
      
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Project data
  const projects = [
    {
      image: ecommerceLogo,
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A complete online shopping solution for a local retail business that specializes in Albanian handicrafts. This platform includes responsive design, secure payment integration, inventory management, and analytics dashboard.",
      client: "Artisan Crafts Albania",
      year: "2024",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      link: "#",
      bgColor: "from-blue-600 to-blue-900"
    },
    {
      image: corporate,
      title: "Corporate Portfolio",
      category: "Web Design",
      description: "Professional web presence for a multinational corporation with offices in Tirana. The website features modern design, multilingual support, interactive components, and integrated CMS for easy content updates.",
      client: "Tirana Financial Group",
      year: "2024",
      technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Sanity CMS"],
      link: "#",
      bgColor: "from-indigo-600 to-purple-800"
    }
  ];

  return (
    <section 
      id="portfolio" 
      className="py-24 bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Glowing particles */}
        <div className="absolute w-2 h-2 rounded-full bg-blue-400/30 top-1/4 left-1/5 animate-ping-slow"></div>
        <div className="absolute w-2 h-2 rounded-full bg-blue-300/20 bottom-1/3 right-1/4 animate-ping-slow" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute w-2 h-2 rounded-full bg-indigo-400/20 top-2/3 left-2/3 animate-ping-slow" style={{ animationDelay: '2.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with animation */}
        <div 
          className={`text-center mb-20 transform transition-all duration-1000 
            ${scrollProgress > 0.1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">
            OUR WORK
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-blue-100/70 text-lg max-w-2xl mx-auto">
            Discover our recent work and see how we've helped businesses transform their digital presence
          </p>
        </div>
        
        {/* Projects Section with ref for intersection observer */}
        <div ref={projectsRef} className="space-y-32">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`relative transform transition-all duration-1000 
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
              }}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex flex-col lg:flex-row items-center gap-16">
                {/* Project Image with animated container */}
                <div className="w-full lg:w-3/5 relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} blur-xl opacity-20 
                    transform transition-all duration-500 
                    ${activeProject === index ? 'scale-105 opacity-30' : 'scale-100'}`}></div>
                  
                  {/* Main Image */}
                  <div className="relative overflow-hidden rounded-xl group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} opacity-70 mix-blend-multiply
                      transition-opacity duration-500 ${activeProject === index ? 'opacity-60' : 'opacity-75'}`}></div>
                    
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={`w-full object-cover rounded-xl shadow-2xl transform transition-all duration-700 
                        ${activeProject === index ? 'scale-105 rotate-1' : 'scale-100'}
                        h-[300px] md:h-[400px] lg:h-[500px]`}
                    />
                    
                    {/* Overlay elements - only visible on hover/active */}
                    <div className={`absolute inset-0 flex items-center justify-center 
                      transition-opacity duration-500 ${activeProject === index ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-lg 
                        border border-white/20 transform transition-all duration-500
                        hover:scale-105">
                        <a href={project.link} className="text-white font-semibold">
                          View Project
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Technology pills - positioned on image */}
                  <div className={`absolute bottom-6 left-6 flex flex-wrap gap-2 
                    transition-all duration-500 ${activeProject === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-3 py-1 bg-gray-900/70 backdrop-blur-sm text-blue-300 
                          text-xs rounded-full border border-blue-500/20"
                        style={{ transitionDelay: `${techIndex * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Project Info - text content */}
                <div className="w-full lg:w-2/5 space-y-6">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3
                      bg-gradient-to-r ${project.bgColor} text-white`}>
                      {project.category}
                    </span>
                    <h3 className={`text-3xl font-bold mb-3 text-white transform transition-all duration-500
                      ${activeProject === index ? 'translate-x-2 text-blue-300' : 'translate-x-0'}`}>
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-blue-400 text-sm font-medium mb-1">Client</h4>
                      <p className="text-white">{project.client}</p>
                    </div>
                    <div>
                      <h4 className="text-blue-400 text-sm font-medium mb-1">Year</h4>
                      <p className="text-white">{project.year}</p>
                    </div>
                  </div>
                  
                  {/* Button with animated arrow */}
                  <div className="pt-6">
                    <a 
                      href={project.link} 
                      className={`group flex items-center space-x-2 text-lg font-medium 
                        transition-all duration-300 ${activeProject === index ? 'text-blue-300' : 'text-white'}`}
                    >
                      <span>View Case Study</span>
                      <svg 
                        className={`w-5 h-5 transform transition-all duration-500 
                          ${activeProject === index ? 'translate-x-2' : 'translate-x-0'} 
                          group-hover:translate-x-3`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Animated decorative elements - only visible when project is active */}
              {index === 0 && (
                <>
                  <div className={`absolute -top-10 -left-10 w-20 h-20 border border-blue-500/20 rounded-full 
                    transition-all duration-700 ${activeProject === index ? 'opacity-100 rotate-45' : 'opacity-0 rotate-0'}`}></div>
                  <div className={`absolute top-1/4 -right-10 w-32 h-32 border-2 border-blue-400/10 rounded-full 
                    transition-all duration-700 ${activeProject === index ? 'opacity-70 scale-100' : 'opacity-0 scale-75'}`}></div>
                </>
              )}
              
              {index === 1 && (
                <>
                  <div className={`absolute bottom-20 -left-16 w-24 h-24 border border-indigo-500/20 rounded-full 
                    transition-all duration-700 ${activeProject === index ? 'opacity-100 rotate-90' : 'opacity-0 rotate-0'}`}></div>
                  <div className={`absolute -bottom-10 right-1/3 w-16 h-16 border-2 border-indigo-400/10 rounded-full 
                    transition-all duration-700 ${activeProject === index ? 'opacity-70 scale-100' : 'opacity-0 scale-75'}`}></div>
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className={`text-center mt-24 transform transition-all duration-1000 
          ${scrollProgress > 0.8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-blue-900/30 backdrop-blur-sm p-10 rounded-xl border border-blue-800/50 
            max-w-3xl mx-auto transform transition-all duration-500 hover:shadow-xl hover:shadow-blue-600/10">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-blue-200 mb-8">
              Let's transform your vision into a stunning digital reality. Our team is ready to create
              a custom solution tailored to your specific needs.
            </p>
            <a 
              href="/contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 
                text-white rounded-lg font-medium transition-all duration-300 transform 
                hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Let's Discuss Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio