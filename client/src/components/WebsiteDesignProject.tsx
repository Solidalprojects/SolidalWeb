// src/components/WebsiteDesignProject.tsx
import { useState, useEffect, useRef, RefCallback } from 'react';

interface DesignStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const WebsiteDesignProject = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const stepsRef = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLElement>(null);
  
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

  useEffect(() => {
    // Initialize refs array with correct length
    stepsRef.current = Array(designSteps.length).fill(null);
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      // Check if section is in viewport
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const isSectionVisible = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
      
      if (isSectionVisible) {
        // Check which step is most visible in the viewport
        stepsRef.current.forEach((stepEl, index) => {
          if (!stepEl) return;
          
          const rect = stepEl.getBoundingClientRect();
          const isStepVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
          
          if (isStepVisible) {
            setActiveStep(index);
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [designSteps.length]);

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
      
      {/* Connecting line that animates as you scroll */}
      <div className="absolute left-1/2 top-24 bottom-24 w-1 bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
      
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
          {/* Timeline connector */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-blue-600/20 hidden md:block"></div>
          
          {designSteps.map((step, index) => (
            <div 
              key={index} 
              ref={(el: HTMLDivElement | null) => {
                stepsRef.current[index] = el;
              }}
              className={`flex flex-col md:flex-row items-center relative transition-all duration-1000 
                ${activeStep === index ? 'opacity-100' : 'opacity-30'}
                ${activeStep === index ? 'scale-100' : 'scale-95'}
                ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
              `}
            >
              {/* Large step number - positioned differently based on even/odd */}
              <div className={`absolute -z-10 opacity-10 text-[180px] md:text-[250px] font-bold ${
                index % 2 === 0 ? 'left-0 md:-left-20' : 'right-0 md:-right-20'
              } top-0 text-blue-500 leading-none`}>
                {step.number}
              </div>
              
              {/* Center circle connector with icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-blue-900 border-4 border-blue-600 z-10 flex items-center justify-center text-2xl hidden md:flex">
                {step.icon}
              </div>
              
              {/* Content - alternating sides */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                <div className="mb-4 md:hidden flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-blue-900 border-4 border-blue-600 text-2xl">
                  {step.icon}
                </div>
                
                <h3 className="text-3xl font-bold text-blue-400 mb-3 flex items-center justify-center md:justify-start">
                  <span className="md:hidden mr-2 text-xl bg-blue-600/20 rounded-full w-8 h-8 flex items-center justify-center">
                    {step.number}
                  </span>
                  {step.title}
                </h3>
                <p className="text-gray-300 text-lg">
                  {step.description}
                </p>
              </div>
              
              {/* Empty space for the alternating layout */}
              <div className="hidden md:block w-5/12"></div>
              
              {/* Animated lines that extend as you scroll to each step */}
              {index < designSteps.length - 1 && (
                <div className={`
                  absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-16 
                  w-1 h-0 bg-gradient-to-b from-blue-600 to-blue-400
                  transition-all duration-1000 ease-out hidden md:block
                  ${activeStep === index ? 'h-16' : 'h-0'}
                `}></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-24 bg-blue-900/30 backdrop-blur-sm p-10 rounded-xl border border-blue-800/50 max-w-2xl mx-auto transform transition-all hover:shadow-xl hover:shadow-blue-600/10">
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