// src/components/WhyFamousSection.tsx
import { useState, useEffect, useRef } from 'react';

interface ServiceTabProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const ServiceTab: React.FC<ServiceTabProps> = ({ title, description, icon, isActive, onClick }) => {
  return (
    <div 
      className={`transition-all duration-500 cursor-pointer rounded-xl overflow-hidden ${
        isActive 
          ? 'bg-gradient-to-br from-blue-700 to-indigo-800 shadow-lg shadow-blue-700/20' 
          : 'bg-gray-800/60 hover:bg-gray-800'
      }`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg ${
            isActive 
              ? 'bg-blue-600/30 text-blue-300' 
              : 'bg-blue-900/20 text-gray-400'
          }`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-gray-200'
            }`}>
              {title}
            </h3>
            {isActive && (
              <p className="text-gray-200 opacity-90 text-base leading-relaxed transition-all duration-500 animate-fadeIn">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const WhyFamousSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Custom Web Design",
      description: "Every brand has a story — we make yours unforgettable. At Solidal, we craft fully custom websites designed to reflect your brand's identity and engage your audience. From initial concept to launch, our team creates visually striking, user-centered designs that turn visitors into loyal customers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Responsive Web Design",
      description: "Today's users demand seamless experiences — and we deliver. Solidal builds fully responsive websites that perform flawlessly across all screen sizes and devices. Whether desktop, tablet, or mobile, your website will adapt smoothly, ensuring every user has a consistent and intuitive experience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Website Redesign",
      description: "Ready for a digital refresh? Whether your current site feels outdated or underperforms, Solidal transforms it into a modern, high-converting powerhouse. We analyze performance metrics, identify areas for improvement, and deliver a new design that elevates your brand and user experience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      title: "UX/UI Design",
      description: "Design is more than visuals — it's the journey. Our UX/UI experts combine data-driven design thinking with stunning aesthetics to create smooth, engaging digital experiences. Whether starting from scratch or revamping an existing interface, we align user needs with business goals to deliver intuitive, beautiful designs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "Search Engine Optimization (SEO)",
      description: "What's a great website without visibility? Our SEO services help your brand climb the search engine ranks and attract the right traffic. From keyword strategy and content optimization to technical audits, Solidal implements SEO best practices that improve your organic performance and grow your online presence.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "eCommerce Design & Development",
      description: "From product browsing to checkout, we build seamless eCommerce experiences that sell. Solidal specializes in designing and developing custom eCommerce solutions on platforms like Shopify, WooCommerce, and Magento. We ensure your online store is fast, secure, mobile-optimized, and built to scale.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
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
      setActiveTab((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearInterval(interval);
    };
  }, [services.length]);

  return (
    <section 
      ref={sectionRef}
      className={`py-20 bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-indigo-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Light grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Glowing particles */}
        <div className="absolute w-1 h-1 rounded-full bg-blue-400/30 top-1/4 left-1/5 animate-ping-slow"></div>
        <div className="absolute w-1 h-1 rounded-full bg-blue-300/20 bottom-1/4 right-1/4 animate-ping-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-1 h-1 rounded-full bg-indigo-400/20 top-2/3 left-2/3 animate-ping-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="h-px w-10 bg-blue-600"></span>
            <span className="mx-2 text-blue-400 font-medium">OUR EXPERTISE</span>
            <span className="h-px w-10 bg-blue-600"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-4">
            Why Solidal?
          </h2>
          <p className="text-xl text-blue-100/80 leading-relaxed">
            Your All-in-One Web Design & Digital Solutions Partner
          </p>
          <p className="mt-4 text-gray-300">
            At Solidal, we're more than just a web design agency — we're your dedicated digital partner. From strategy to execution, our full-service team delivers impactful web design, UX/UI, SEO, and eCommerce solutions under one roof.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-16">
          {/* Section Title */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white inline-block relative">
              Explore Our Core Services
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full"></span>
            </h3>
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <ServiceTab
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                isActive={activeTab === index}
                onClick={() => setActiveTab(index)}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <a 
              href="#contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1"
            >
              Discuss Your Project With Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyFamousSection;