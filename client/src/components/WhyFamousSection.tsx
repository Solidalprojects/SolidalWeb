// src/components/WhyFamousSection.tsx
import { useState, useEffect, useRef } from 'react';

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

const WhyFamousSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features: FeatureItem[] = [
    {
      title: "Exceptional Web Experiences",
      description: "We craft websites that don't just look stunning but deliver exceptional performance, accessibility, and user engagement. Every pixel and interaction is optimized for maximum impact.",
      icon: "✨"
    },
    {
      title: "Custom Development Solutions",
      description: "Our developers create bespoke solutions tailored to your unique business challenges. From complex web applications to integrated platforms, we build technology that drives your business forward.",
      icon: "🛠️"
    },
    {
      title: "Strategic Digital Growth",
      description: "Beyond beautiful websites, we implement data-driven strategies that convert visitors into customers. Our approach combines creative design with proven marketing techniques.",
      icon: "📈"
    },
    {
      title: "Responsive Support & Maintenance",
      description: "We don't disappear after launch. Our dedicated support team ensures your digital presence remains secure, up-to-date, and optimized for continued success.",
      icon: "🔄"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Auto-rotate through tabs
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === features.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearInterval(interval);
    };
  }, [features.length]);

  return (
    <section 
      ref={sectionRef}
      className={`py-20 bg-gradient-to-b from-blue-950 to-blue-900 relative overflow-hidden transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Background Bleed Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-700/5 filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-500/5 filter blur-3xl"></div>
      
      {/* Small glow particles */}
      <div className="absolute w-2 h-2 rounded-full bg-blue-400/30 top-1/4 left-1/5 animate-ping-slow"></div>
      <div className="absolute w-2 h-2 rounded-full bg-blue-300/20 bottom-1/4 right-1/4 animate-ping-slow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute w-2 h-2 rounded-full bg-indigo-400/20 top-2/3 left-2/3 animate-ping-slow" style={{ animationDelay: '2.8s' }}></div>
      
      {/* Section Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why We Are Famous For</h2>
          <p className="text-blue-300 text-xl max-w-3xl mx-auto">
            Our expertise and commitment to excellence has earned us recognition in the digital world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Feature Tabs */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`transition-all duration-300 cursor-pointer bg-gradient-to-r p-px rounded-lg ${
                  activeTab === index 
                    ? 'from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20' 
                    : 'from-transparent to-transparent hover:from-blue-800 hover:to-blue-800'
                }`}
                onClick={() => setActiveTab(index)}
              >
                <div className={`p-6 rounded-lg ${
                  activeTab === index 
                    ? 'bg-gradient-to-r from-blue-900/80 to-blue-950/80' 
                    : 'bg-blue-900/20'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h3 className={`text-xl font-semibold mb-1 ${
                        activeTab === index ? 'text-blue-300' : 'text-white'
                      }`}>
                        {feature.title}
                      </h3>
                      {activeTab === index && (
                        <p className="text-gray-300 mt-2 transition-all duration-300">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right Side: Achievements */}
          <div className="bg-blue-900/30 backdrop-blur-sm p-8 rounded-xl border border-blue-800/50 relative">
            {/* Animated Corner Accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-blue-400 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-blue-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-blue-400 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-blue-400 rounded-br-lg"></div>
            
            <h3 className="text-2xl font-bold text-white mb-6">Our Recognition</h3>
            
            <div className="space-y-5">
              {[
                "Top-rated Web Development Agency in 2023",
                "95% client satisfaction rate across 200+ projects",
                "Award-winning designs recognized in multiple competitions",
                "Technical expertise across 15+ platforms and frameworks",
                "Industry-leading site performance and optimization"
              ].map((achievement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-blue-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-200">{achievement}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-blue-800/30">
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Node.js', 'Tailwind', 'WordPress', 'E-Commerce'].map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-800/30 text-blue-300 text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyFamousSection;