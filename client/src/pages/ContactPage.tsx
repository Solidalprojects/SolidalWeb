// pages/ContactPage.tsx
import { useEffect } from 'react';
import Contact from '../components/Contacts';

const ContactPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update page title
    document.title = 'Contact Us | Solidal Web Development';
  }, []);
  
  return (
    <main>
      <div className="pt-20 bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-white text-center">Contact Us</h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mt-4">
            Get in touch with our team to discuss your project
          </p>
        </div>
      </div>
      <Contact />
    </main>
  );
};

export default ContactPage;