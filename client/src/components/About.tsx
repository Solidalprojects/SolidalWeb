// components/ImprovedAbout.tsx
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import heroimage from '../assets/heroimage.png';

// Team member interface
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  image: string;
}

const ImprovedAbout = () => {
  const [] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // For detecting when element is in view
  const { ref: storyRef, inView: storyInView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  
  const { ref: visionRef, inView: visionInView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });
  
  const { ref: teamRef, inView: teamInView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  // Update scroll progress based on scroll position
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

  // Company journey milestones
  const milestones = [
    {
      year: "2022",
      title: "The Beginning",
      description: "Three high school friends with a shared passion for web technologies come together to create their first website for a local business."
    },
    {
      year: "2023",
      title: "Official Launch",
      description: "After several successful projects, Solidal Web Development is officially established as Albania's youth-driven web agency."
    },
    {
      year: "2024",
      title: "Growth & Recognition", 
      description: "The team expands their skill set and client base, gaining recognition for innovative web solutions throughout Tirana and beyond."
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Continuing to push boundaries in web development while mentoring the next generation of young Albanian developers."
    }
  ];

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: "Rubin",
      role: "Backend Developer & Co-Founder",
      bio: "Coding enthusiast since the age of 13, Rubin brings technical expertise and innovative problem-solving to every project. His passion for clean code and optimal performance drives Solidal's development standards.",
      skills: ["React", "TypeScript", "Node.js", "MongoDB"],
      image: heroimage // Replace with actual team member image
    },
    {
      name: "Aron",
      role: "UI/UX Designer & Co-Founder",
      bio: "With an eye for aesthetics and user experience, Aron transforms concepts into visually stunning interfaces. Self-taught in design principles, she balances creativity with functionality in every project.",
      skills: ["UI Design", "Figma", "Tailwind CSS", "Motion Design"],
      image: heroimage // Replace with actual team member image
    },
    {
      name: "Rexhino",
      role: "Frontend Developer & Co-Founder",
      bio: "The strategic mind behind Solidal's operations, Rexhino excels at client communication and project coordination. His business acumen and vision help guide the company's growth while ensuring client satisfaction.",
      skills: ["Project Management", "Client Relations", "Marketing", "SEO"],
      image: heroimage // Replace with actual team member image
    }
  ];

  // Core values
  const values = [
    {
      title: "Youth-Driven Innovation",
      description: "We bring fresh perspectives and cutting-edge approaches to web development, unbound by conventional limitations.",
      icon: "🚀"
    },
    {
      title: "Educational Growth",
      description: "While building professional solutions, we continuously learn and evolve, balancing academics with practical experience.",
      icon: "📚"
    },
    {
      title: "Local Empowerment",
      description: "We're committed to strengthening Albania's digital presence by helping local businesses thrive online.",
      icon: "🌱"
    },
    {
      title: "Quality Craftsmanship",
      description: "Despite our youth, we maintain exceptional standards, delivering polished, professional web solutions.",
      icon: "⭐"
    }
  ];

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-950 to-blue-950 relative overflow-hidden">
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
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div 
                className={`transform transition-all duration-1000 
                  ${scrollProgress > 0.1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">
                  OUR STORY
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Young Minds,
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 ml-2">
                    Bold Vision
                  </span>
                </h2>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  Born from the creativity and determination of three high school students in Tirana, 
                  Solidal Web Development represents the next generation of Albanian digital innovation. 
                  What began as a passionate after-school project has evolved into a professional web 
                  development agency, proving that age is no barrier to excellence.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="px-4 py-2 bg-blue-900/30 rounded-lg border border-blue-700/30">
                    <span className="text-blue-300 font-medium">Est. 2023</span>
                  </div>
                  <div className="px-4 py-2 bg-blue-900/30 rounded-lg border border-blue-700/30">
                    <span className="text-blue-300 font-medium">Tirana, Albania</span>
                  </div>
                  <div className="px-4 py-2 bg-blue-900/30 rounded-lg border border-blue-700/30">
                    <span className="text-blue-300 font-medium">Youth-Driven</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div 
                className={`relative transform transition-all duration-1000 
                  ${scrollProgress > 0.15 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-xl opacity-20"></div>
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={heroimage} 
                    alt="Solidal Team" 
                    className="w-full rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105"
                  />
                  
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 m-6">
                    <div className="bg-gray-900/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-blue-500/20">
                      <p className="text-white text-sm">Young developers with a passion for web excellence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section 
        ref={storyRef}
        className="py-24 bg-gradient-to-b from-blue-950 to-gray-900 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-blue-900/5 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">
              THE JOURNEY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              From Classroom to Clients
            </h2>
            <p className="text-blue-100/70 text-lg max-w-3xl mx-auto">
              Our unique journey from high school students to professional web developers
            </p>
          </div>
          
          {/* Timeline of company journey */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-700/20"></div>
            
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row items-center mb-12 last:mb-0 relative
                  ${storyInView ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Year bubble */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-14 h-14 rounded-full bg-blue-800 border-4 border-blue-600/30 flex items-center justify-center text-white font-bold">
                    {milestone.year}
                  </div>
                </div>
                
                {/* Content cards - alternating sides */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-16 md:text-right md:self-end' : 'md:pl-16 md:self-start md:ml-auto'}`}>
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700/20 shadow-lg transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Story content */}
          <div className="mt-20 max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-blue-800/30 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">The Solidal Story</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                In the bustling city of Tirana, three high school classmates – Rexhino, Rubin, and Aron – 
                shared a common fascination with web technologies and digital design. What began as 
                collaborative projects for school quickly evolved into something more ambitious.
              </p>
              <p>
                While balancing their studies, the trio took on their first real client – a local 
                café needing a digital presence. The success of this project sparked a realization: 
                their combined skills could fill a gap in Albania's web development market. Despite 
                their young age, they possessed a fresh perspective and eagerness to master cutting-edge technologies.
              </p>
              <p>
                Officially founding Solidal Web Development in 2023, they transformed their after-school 
                passion into a legitimate business. Their unique position as young developers became 
                their strength – bringing energetic innovation while dismantling the stereotype that 
                professional web development required decades of experience.
              </p>
              <p>
                Today, Solidal stands as a testament to youth empowerment in Albania's tech sector, 
                delivering professional web solutions while inspiring other young Albanians to pursue 
                their technological aspirations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision & Values Section */}
      <section 
        ref={visionRef}
        className="py-24 bg-gradient-to-b from-gray-800 to-blue-950 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Vision */}
            <div className="w-full lg:w-1/2">
              <div className={`${visionInView ? 'animate-fadeInLeft' : 'opacity-0'}`}>
                <span className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">
                  OUR VISION
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Young Innovators Shaping Albania's Digital Future
                </h2>
                <div className="space-y-6 text-gray-300">
                  <p>
                    At Solidal, we envision a digital landscape where Albania's businesses thrive online through 
                    innovative web solutions. As young developers, we aim to bring fresh perspectives and modern 
                    approaches to web development while proving that excellence knows no age.
                  </p>
                  <p>
                    We're committed to bridging the gap between traditional business and digital transformation, 
                    making web technology accessible to all Albanian enterprises regardless of their size or technical background.
                  </p>
                  <p>
                    Beyond our commercial goals, we're passionate about inspiring the next generation of Albanian 
                    developers. We aim to demonstrate that with dedication and passion, young people in our country 
                    can build successful tech ventures without leaving Albania.
                  </p>
                  
                  <div className="pt-4">
                    <div className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg text-white font-medium transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-700/30">
                      <span>Read Our Full Story</span>
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Values */}
            <div className="w-full lg:w-1/2">
              <div className={`${visionInView ? 'animate-fadeInRight' : 'opacity-0'}`}>
                <span className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">
                  OUR VALUES
                </span>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Core Principles That Guide Us
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700/20 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-600/10"
                    >
                      <div className="text-3xl mb-4">{value.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                      <p className="text-gray-300">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        ref={teamRef}
        className="py-24 bg-blue-950 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,64,175,0.05)_0%,rgba(25,35,80,0)_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(49,46,129,0.05)_0%,rgba(25,35,80,0)_60%)]"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">
              THE FOUNDERS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Meet Our Young Team
            </h2>
            <p className="text-blue-100/70 text-lg max-w-3xl mx-auto">
              Three high school friends turned entrepreneurs, combining youth with professional excellence
            </p>
          </div>
          
          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-800/30 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl hover:shadow-blue-900/30
                  ${teamInView ? 'animate-fadeInUp' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-blue-300">{member.role}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-300 mb-6">{member.bio}</p>
                  
                  <h4 className="text-sm font-medium text-blue-400 mb-3">SKILLS</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="px-3 py-1 bg-blue-900/40 text-blue-300 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Team Quote */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm p-8 rounded-xl border border-blue-800/20">
              <div className="text-5xl text-blue-500 font-serif mb-4">"</div>
              <p className="text-xl text-white italic mb-6">
                We may be young, but our vision is vast. We're not just building websites; 
                we're proving that Albania's youth can compete on the global digital stage.
              </p>
              <div className="text-blue-300">— The Solidal Founders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-blue-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-600/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-blue-600/10 text-blue-400 text-sm font-medium mb-4">
              WORK WITH US
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Web Presence?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Let our young, energetic team bring fresh ideas to your digital presence. 
              Experience the perfect balance of youthful innovation and professional excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="/contact" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30"
              >
                Start Your Project
              </a>
              <a 
                href="/portfolio" 
                className="px-8 py-4 bg-transparent border-2 border-blue-500 text-blue-400 rounded-lg font-medium transition-all duration-300 hover:bg-blue-500/10"
              >
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImprovedAbout;