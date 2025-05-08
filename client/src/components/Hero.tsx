// components/Hero.tsx
import { useEffect, useRef } from 'react';
import heroimage from '../assets/heroimage.png';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );
    
    // Target elements for animation
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
    
    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden" ref={heroRef}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-blue-500/10 animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 rounded-full bg-blue-500/5 animate-float"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-blue-400/5 animate-ping-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-indigo-500/5 animate-float-delayed"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2 reveal">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              <span className="block">Professional</span> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Web Development</span> 
              <span className="block">in Albania</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-medium mb-6 text-blue-400">
              Transform Your Business with Modern Digital Solutions
            </h2>
            <p className="text-gray-300 mb-8 text-lg max-w-xl">
              Solidal Web Development delivers exceptional websites and web applications
              tailored to your business needs. We combine stunning design with
              powerful functionality to help your business thrive online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="btn-primary py-4 px-8 rounded-lg font-medium text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30"
              >
                Get Started
              </a>
              <a 
                href="#portfolio" 
                className="btn-secondary py-4 px-8 rounded-lg font-medium text-center"
              >
                View Our Work
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 reveal">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <img 
                src={heroimage} 
                alt="Web Development" 
                className="relative w-full rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:rotate-1"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12 md:h-16">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.91,118.92,175.24,64.91,321.39,56.44Z" className="fill-gray-800"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;