// src/components/Services.tsx
import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TechStackItem {
  name: string;
  icon: string;
  color: string;
}

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  technologies: string[];
}

const Services = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const controlsHeader = useAnimation();
  const controlsIntro = useAnimation();
  const controlsTech = useAnimation();
  const controlsServices = useAnimation();
  
  const [refHeader, inViewHeader] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [refIntro, inViewIntro] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [refTech, inViewTech] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  const [refServices, inViewServices] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inViewHeader) controlsHeader.start('visible');
    if (inViewIntro) controlsIntro.start('visible');
    if (inViewTech) controlsTech.start('visible');
    if (inViewServices) controlsServices.start('visible');
  }, [inViewHeader, inViewIntro, inViewTech, inViewServices, controlsHeader, controlsIntro, controlsTech, controlsServices]);
  
  // Auto-rotate through service tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Technology stack we use
  const techStack: TechStackItem[] = [
    { 
      name: "React", 
      icon: "fab fa-react", 
      color: "text-blue-400" 
    },
    { 
      name: "TypeScript", 
      icon: "fab fa-js-square", 
      color: "text-blue-600" 
    },
    { 
      name: "Django", 
      icon: "fab fa-python", 
      color: "text-green-500" 
    },
    { 
      name: "Tailwind CSS", 
      icon: "fab fa-css3", 
      color: "text-cyan-400" 
    },
    { 
      name: "PostgreSQL", 
      icon: "fas fa-database", 
      color: "text-indigo-500" 
    },
    { 
      name: "Git", 
      icon: "fab fa-git-alt", 
      color: "text-orange-600" 
    },
    { 
      name: "Docker", 
      icon: "fab fa-docker", 
      color: "text-blue-500" 
    },
    { 
      name: "AWS", 
      icon: "fab fa-aws", 
      color: "text-yellow-500" 
    }
  ];
  
  // Our services
  const services: ServiceItem[] = [
    {
      id: 1,
      title: "Custom Web Development",
      description: "We build tailored websites and web applications from scratch, ensuring they perfectly match your business needs and brand identity. Our custom solutions are scalable, secure, and designed with your users in mind.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      technologies: ["React", "TypeScript", "Django", "PostgreSQL"]
    },
    {
      id: 2,
      title: "E-Commerce Solutions",
      description: "Transform your business with our powerful online store solutions. We create seamless shopping experiences with secure payment processing, inventory management, and beautiful product showcases that convert visitors into customers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      technologies: ["Django", "React", "Stripe API", "PostgreSQL"]
    },
    {
      id: 3,
      title: "Responsive Web Design",
      description: "Ensure your website looks and functions flawlessly across all devices with our responsive design approach. We create adaptive layouts that provide optimal viewing experiences from desktops to smartphones.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      technologies: ["Tailwind CSS", "React", "CSS Grid", "Flexbox"]
    },
    {
      id: 4,
      title: "Content Management Systems",
      description: "Take control of your website content with our custom CMS solutions. We build intuitive admin interfaces that make managing your website's content easy, even for non-technical users.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      technologies: ["Django Admin", "React", "RESTful API", "TypeScript"]
    },
    {
      id: 5,
      title: "Web Application Development",
      description: "From SaaS platforms to internal tools, we develop sophisticated web applications that solve complex business problems. Our applications are built with scalability and performance in mind, using modern architecture patterns.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      technologies: ["React", "Django", "RESTful API", "WebSockets"]
    },
    {
      id: 6,
      title: "SEO & Performance Optimization",
      description: "Maximize your online visibility with our SEO and performance optimization services. We implement technical best practices to ensure your website ranks well in search engines and loads quickly for users.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      technologies: ["Lighthouse", "Next.js", "Lazy Loading", "CDN Integration"]
    }
  ];

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const introVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
        duration: 0.5
      }
    }
  };
  
  const introItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  const techStackVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const techItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };
  
  const servicesVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };
  

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-blue-950 relative overflow-hidden">
      {/* Background Elements */}
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
        <motion.div 
          ref={refHeader}
          initial="hidden"
          animate={controlsHeader}
          variants={headerVariants}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <span className="h-px w-10 bg-blue-600"></span>
            <span className="mx-2 text-blue-400 font-medium">OUR SERVICES</span>
            <span className="h-px w-10 bg-blue-600"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transforming Ideas Into 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 ml-2">
              Digital Experiences
            </span>
          </h2>
        </motion.div>

        {/* Introduction Section */}
        <motion.div 
          ref={refIntro}
          initial="hidden"
          animate={controlsIntro}
          variants={introVariants}
          className="max-w-4xl mx-auto mb-16"
        >
          <motion.div variants={introItemVariants} className="text-center mb-8">
            <p className="text-xl text-gray-300 leading-relaxed">
              At Solidal Web Development, we create exceptional digital experiences that help businesses thrive in today's competitive landscape. Our team of skilled developers, designers, and strategists combines creativity with technical expertise to deliver solutions that exceed expectations.
            </p>
          </motion.div>
          
          <motion.div variants={introItemVariants} className="bg-blue-900/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-800/30">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/4 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl">
                  <i className="fas fa-laptop-code"></i>
                </div>
              </div>
              <div className="w-full md:w-3/4">
                <h3 className="text-2xl font-bold text-white mb-3">Our Modern Tech Stack</h3>
                <p className="text-gray-300 mb-4">
                  We leverage cutting-edge technologies to build fast, secure, and scalable web solutions. Our stack combines the best of both worlds: powerful backend frameworks and modern frontend libraries.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium">Django</span>
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium">React</span>
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium">TypeScript</span>
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium">Tailwind CSS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Technology Stack Section */}
        <motion.div 
          ref={refTech}
          initial="hidden"
          animate={controlsTech}
          variants={techStackVariants}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Technologies We Master
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                variants={techItemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:border-blue-700/30"
              >
                <div className={`text-3xl mb-3 ${tech.color}`}>
                  <i className={tech.icon}></i>
                </div>
                <h4 className="text-white font-medium">{tech.name}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Services Section */}
        <motion.div 
          ref={refServices}
          initial="hidden"
          animate={controlsServices}
          variants={servicesVariants}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-4">
            What We Offer
          </h3>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Our comprehensive range of services is designed to meet all your digital needs, from concept to deployment and beyond.
          </p>
          
          {/* Services Nav Tabs */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === index 
                    ? 'bg-blue-600 text-white' 
                    : hoverIndex === index
                      ? 'bg-blue-700/30 text-blue-300'
                      : 'bg-gray-800/70 text-gray-400 hover:text-gray-300'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
          
          {/* Service Details */}
          <div className="max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeTab === index ? 1 : 0,
                  y: activeTab === index ? 0 : 20,
                  pointerEvents: activeTab === index ? 'auto' : 'none',
                  position: activeTab === index ? 'relative' : 'absolute'
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`w-full ${activeTab !== index ? 'hidden' : ''}`}
              >
                <div className="bg-gradient-to-br from-gray-800/80 to-blue-900/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-800/20 shadow-xl">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/3">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-300">
                          {service.icon}
                        </div>
                        <h4 className="text-2xl font-bold text-white">{service.title}</h4>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {service.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1">
                        Learn More 
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="w-full md:w-1/3 relative">
                      <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-blue-800/20 to-indigo-900/40 backdrop-blur-sm flex items-center justify-center p-6">
                        <div className="text-6xl text-blue-400 animate-float">
                          {service.icon}
                        </div>
                        
                        {/* Decorative circles */}
                        <div className="absolute top-5 right-5 w-4 h-4 rounded-full bg-blue-500/50 animate-ping-slow"></div>
                        <div className="absolute bottom-5 left-5 w-6 h-6 rounded-full bg-indigo-500/30 animate-pulse-slow"></div>
                        
                        {/* Connection lines */}
                        <div className="absolute w-20 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent top-1/4 left-1/2 transform -translate-x-1/2"></div>
                        <div className="absolute w-px h-20 bg-gradient-to-b from-transparent via-blue-500/40 to-transparent left-1/4 top-1/2 transform -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-sm p-10 rounded-2xl border border-blue-800/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Project?</h3>
            <p className="text-gray-300 mb-8">
              Let's discuss how our technical expertise can help bring your vision to life. Our team is ready to create a custom solution tailored to your specific needs.
            </p>
            <a 
              href="#contact" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 transform hover:-translate-y-1"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;