// components/About.tsx
import heroimage from '../assets/heroimage.png';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img src={heroimage} alt="Solidal Web Development Team" className="rounded-lg shadow-lg w-full" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-white">About Solidal Web Development</h2>
            <p className="text-gray-300 mb-4">
              Founded in Albania with a passion for creating exceptional web experiences, 
              Solidal Web Development has grown into a trusted partner for businesses 
              seeking to establish a powerful online presence.
            </p>
            <p className="text-gray-300 mb-6">
              Our team of skilled developers, designers, and digital strategists work 
              together to deliver websites and applications that not only look stunning 
              but also drive real business results.
            </p>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Why Choose Us?</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Local expertise with global standards</li>
              <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Transparent communication and processes</li>
              <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Tailored solutions for your specific needs</li>
              <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Long-term support and partnership</li>
              <li className="flex items-center"><span className="text-blue-400 mr-2">✓</span> Affordable pricing without compromising quality</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;