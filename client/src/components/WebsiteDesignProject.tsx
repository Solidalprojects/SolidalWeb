// src/components/WebsiteDesignProject.tsx - With More Responsive Clock Animations
import { useState, useEffect, useRef } from 'react';

interface DesignStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const WebsiteDesignProject = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Project design steps
  const designSteps: DesignStep[] = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We start by understanding your business, goals, and target audience. Through in-depth discussions and research, we create a comprehensive strategy that will guide the development of your website.",
      icon: "🔍"
    },
    {
      number: "02",
      title: "Planning & Architecture",
      description: "Based on our findings, we develop the site architecture, user flows, and content strategy. This blueprint ensures your website will be both user-friendly and effective at achieving your business goals.",
      icon: "📝"
    },
    {
      number: "03",
      title: "UI/UX Design",
      description: "Our designers create stunning visual concepts and interactive prototypes that bring your brand to life. Every element is carefully crafted to enhance user experience and drive engagement.",
      icon: "🎨"
    },
    {
      number: "04",
      title: "Development & Coding",
      description: "Our expert developers transform designs into functional reality, writing clean and efficient code. We build responsive, fast-loading websites optimized for performance across all devices.",
      icon: "💻"
    },
    {
      number: "05",
      title: "Testing & QA",
      description: "Rigorous testing across browsers, devices, and platforms ensures your website functions flawlessly. We analyze performance, accessibility, and user experience to catch any issues before launch.",
      icon: "🧪"
    },
    {
      number: "06",
      title: "Launch & Optimization",
      description: "After a successful launch, we monitor performance and gather user feedback. Our post-launch support ensures continuous optimization and improvements to maximize your website's effectiveness.",
      icon: "🚀"
    }
  ];

  // Initialize visible steps array
  useEffect(() => {
    setVisibleSteps(Array(designSteps.length).fill(false));
  }, [designSteps.length]);

  // More sensitive scroll-based animation with precise progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // If section is not visible at all, do nothing
      if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) {
        return;
      }
      
      // Calculate how far we've scrolled through the section (0 to 1)
      // More sensitive calculation that starts earlier and finishes later
      const progress = Math.min(
        Math.max(
          (windowHeight - sectionTop) / (sectionHeight + windowHeight * 0.7),
          0
        ),
        1
      );
      
      // Store the raw scroll progress for precise animations
      setScrollProgress(progress);
      
      // Determine active step based on progress
      // More sensitive thresholds for earlier activation
      const newIndex = Math.min(
        Math.floor(progress * (designSteps.length + 1.8)), // More sensitive multiplier
        designSteps.length - 1
      );
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
      
      // Update visibility with more granular thresholds
      setVisibleSteps(prev => {
        const newVisible = [...prev];
        designSteps.forEach((_, idx) => {
          // Lower threshold for earlier visibility
          const stepThreshold = idx / (designSteps.length + 4); // More sensitive
          newVisible[idx] = progress > stepThreshold;
        });
        return newVisible;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, designSteps.length]);

  // Helper function to create the clock-like SVG border
  const ClockBorder = ({ position, isActive }: { position: number, isActive: boolean }) => {
    // Calculate progress for this step (position from 0 to 1)
    const clockProgress = position / designSteps.length;
    
    return (
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
        {/* Full circle border - dim */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="none" 
          stroke="rgba(59, 130, 246, 0.2)" 
          strokeWidth="2" 
        />
        
        {/* Clock-like arc that shows progress - bright */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="none" 
          stroke="rgba(59, 130, 246, 0.8)" 
          strokeWidth="3"
          strokeDasharray={`${Math.min(301, 301 * clockProgress)} 301`}
          strokeDashoffset="0"
          transform="rotate(-90 50 50)"
          className="transition-all duration-500"
          strokeLinecap="round"
        />
        
        {/* Animated dot that travels along the arc */}
        <circle 
          cx="50"
          cy="2" 
          r="4"
          fill="white"
          className="animate-dot-move"
          transform={`rotate(${isActive ? 360 * clockProgress : 0} 50 50)`}
          style={{
            filter: "drop-shadow(0 0 3px rgba(59, 130, 246, 0.8))"
          }}
        />
      </svg>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-blue-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 filter blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-500/10 filter blur-3xl"></div>
      
      {/* Small animated particles */}
      <div className="absolute w-2 h-2 rounded-full bg-blue-400/30 top-1/3 left-1/5 animate-ping-slow"></div>
      <div className="absolute w-2 h-2 rounded-full bg-blue-300/20 bottom-1/3 right-1/5 animate-ping-slow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute w-2 h-2 rounded-full bg-indigo-400/20 top-2/3 left-2/3 animate-ping-slow" style={{ animationDelay: '3s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">
            OUR PROCESS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How We Design & Build <br />Your Perfect Website</h2>
          <p className="text-blue-300 text-xl max-w-3xl mx-auto">
            Our proven 6-step process ensures exceptional results and a smooth journey from concept to launch
          </p>
        </div>
        
        <div className="space-y-32 relative">
          {/* Timeline connector - The main vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-blue-600/20 hidden md:block"></div>
          
          {/* Active timeline - The glowing vertical line that grows */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-blue-500 hidden md:block transition-all duration-300 ease-in-out"
            style={{ 
              height: `${Math.min(100, scrollProgress * 100 * 1.1)}%`, // Direct use of scrollProgress for more sensitivity
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
              opacity: activeIndex >= 0 ? 1 : 0
            }}
          ></div>
          
          {designSteps.map((step, index) => {
            // Determine if this step should be active
            const isActive = index <= activeIndex;
            // Determine if this step should be visible (fading in)
            const isVisible = visibleSteps[index];
            
            return (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-center relative transition-all duration-700 
                  ${isVisible ? 'opacity-100' : 'opacity-0'} 
                  ${isVisible ? 'transform-none' : 'transform translate-y-10'}
                  ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Large step number - positioned differently based on even/odd */}
                <div className={`absolute -z-10 opacity-10 text-[180px] md:text-[250px] font-bold 
                  ${index % 2 === 0 ? 'left-0 md:-left-20' : 'right-0 md:-right-20'} 
                  top-0 text-blue-500 leading-none`}
                >
                  {step.number}
                </div>
                
                {/* Center circle connector with icon and clock border */}
                <div 
                  className={`absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full 
                    border-4 z-10 flex items-center justify-center text-2xl hidden md:flex
                    transition-all duration-500 ${
                      isActive 
                        ? 'border-blue-400 bg-blue-700 text-white scale-110' 
                        : 'border-blue-800/30 bg-blue-900/30 text-gray-400 scale-100'
                    }`}
                  style={{
                    boxShadow: isActive ? '0 0 15px rgba(59, 130, 246, 0.6)' : 'none'
                  }}
                >
                  {step.icon}
                  
                  {/* Clock-like border for icon */}
                  {isActive && <ClockBorder position={index + 1} isActive={isActive} />}
                </div>
                
                {/* Content - alternating sides */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                  {/* Mobile icon with clock border */}
                  <div 
                    className={`mb-4 md:hidden flex items-center justify-center w-16 h-16 mx-auto rounded-full border-4 text-2xl
                      transition-all duration-500 ${
                        isActive 
                          ? 'border-blue-400 bg-blue-700 text-white scale-110' 
                          : 'border-blue-800/30 bg-blue-900/30 text-gray-400 scale-100'
                      }`}
                    style={{
                      boxShadow: isActive ? '0 0 15px rgba(59, 130, 246, 0.6)' : 'none'
                    }}
                  >
                    {step.icon}
                    
                    {/* Clock border for mobile icon */}
                    {isActive && <ClockBorder position={index + 1} isActive={isActive} />}
                  </div>
                  
                  {/* Step number with clock border */}
                  <div className="hidden md:flex mb-4 items-center justify-center">
                    <div 
                      className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 mb-3
                        transition-all duration-500 ${
                          isActive 
                            ? 'border-blue-400 bg-blue-700/80 text-white scale-110 mr-3' 
                            : 'border-blue-800/30 bg-blue-900/30 text-gray-400 scale-100 mr-3'
                        }`}
                      style={{
                        boxShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.6)' : 'none'
                      }}
                    >
                      <span className="text-sm font-bold">{step.number}</span>
                      
                      {/* Clock border for step number */}
                      {isActive && <ClockBorder position={index + 1} isActive={isActive} />}
                    </div>
                  </div>
                  
                  {/* Enhanced title with transition effects */}
                  <h3 
                    className={`text-3xl font-bold mb-3 flex flex-col items-center justify-center ${index % 2 === 0 ? 'md:justify-end md:items-end' : 'md:justify-start md:items-start'}
                      transition-all duration-700 ${isActive ? 'text-blue-400 scale-105' : 'text-blue-600/70 scale-100'}`}
                    style={{
                      textShadow: isActive ? '0 0 15px rgba(59, 130, 246, 0.3)' : 'none'
                    }}
                  >
                    {/* Mobile number display */}
                    <div className="md:hidden relative mb-2 flex items-center justify-center">
                      <span 
                        className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-bold
                          transition-all duration-500 ${
                            isActive 
                              ? 'border-blue-400 bg-blue-700/80 text-white scale-110' 
                              : 'border-blue-800/30 bg-blue-900/30 text-gray-400 scale-100'
                          }`}
                        style={{
                          boxShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.6)' : 'none'
                        }}
                      >
                        {step.number}
                        
                        {/* Clock border for mobile number */}
                        {isActive && <ClockBorder position={index + 1} isActive={isActive} />}
                      </span>
                    </div>
                    
                    <span>{step.title}</span>
                  </h3>
                  
                  {/* Enhanced description with better visibility */}
                  <p 
                    className={`text-lg transition-all duration-700 
                      ${isActive ? 'text-white font-medium' : 'text-gray-500 font-normal'}
                      ${isActive ? 'leading-relaxed' : 'leading-normal'}`}
                  >
                    {step.description}
                  </p>
                </div>
                
                {/* Empty space for the alternating layout */}
                <div className="hidden md:block w-5/12"></div>
                
                {/* Connecting lines between steps */}
                {index < designSteps.length - 1 && (
                  <div 
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
                      w-1 h-16 hidden md:block transition-all duration-300 ease-out
                      ${isActive && index + 1 <= activeIndex ? 'bg-blue-500' : 'bg-blue-600/20'}`}
                    style={{
                      boxShadow: isActive && index + 1 <= activeIndex ? '0 0 10px rgba(59, 130, 246, 0.6)' : 'none'
                    }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Call to action */}
        <div className={`text-center mt-24 bg-blue-900/50 backdrop-blur-sm p-10 rounded-xl 
          border border-blue-800/50 max-w-2xl mx-auto transform transition-all duration-1000 
          hover:shadow-xl hover:shadow-blue-600/10 ${scrollProgress > 0.8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
          <p className="text-blue-300 mb-6">Let's bring your vision to life with our expert team and proven process</p>
          <a 
            href="#contact" 
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/20"
          >
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default WebsiteDesignProject;