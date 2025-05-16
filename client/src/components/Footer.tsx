// components/Footer.tsx
import logo from '../assets/solidal_logo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <img src={logo} alt="Solidal Web Development" className="h-10 mb-4" />
            <p className="text-gray-400 mb-4">
              Professional web development services in Albania, 
              creating stunning and functional websites for businesses 
              of all sizes.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-400"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-blue-400"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-blue-400">Home</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-blue-400">Services</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-blue-400">Portfolio</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-blue-400">About</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Website Development</li>
              <li>E-Commerce Solutions</li>
              <li>Web Applications</li>
              <li>Responsive Design</li>
              <li>SEO Optimization</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to receive updates and digital insights</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your Email" 
                required 
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 text-white"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 md:mb-0">© {new Date().getFullYear()} Solidal Web Development. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;