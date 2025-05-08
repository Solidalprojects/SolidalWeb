// pages/dashboard/WebsiteManagement.tsx
import { useState, useEffect } from 'react';
import { websiteService } from '../../services/websiteService';
import { WebsiteSection } from '../../types/website';

const WebsiteManagement = () => {
  const [sections, setSections] = useState<WebsiteSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<WebsiteSection | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await websiteService.getWebsiteSections();
        setSections(data);
        if (data.length > 0) {
          setActiveSection(data[0]);
        }
      } catch (error) {
        console.error('Error fetching website sections:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSections();
  }, []);
  
  const handleSectionChange = (section: WebsiteSection) => {
    setActiveSection(section);
    setIsEditing(false);
  };
  
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  
  const handleSave = async () => {
    if (!activeSection) return;
    
    try {
      await websiteService.updateWebsiteSection(activeSection.id, activeSection);
      setIsEditing(false);
      
      // Update the sections list
      setSections(prevSections => 
        prevSections.map(section => 
          section.id === activeSection.id ? activeSection : section
        )
      );
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!activeSection) return;
    
    const { name, value } = e.target;
    setActiveSection({
      ...activeSection,
      content: {
        ...activeSection.content,
        [name]: value
      }
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Website Management</h1>
        {activeSection && (
          <button
            onClick={isEditing ? handleSave : toggleEditMode}
            className={`px-4 py-2 rounded-lg font-medium ${
              isEditing 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isEditing ? 'Save Changes' : 'Edit Content'}
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">Website Sections</h3>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleSectionChange(section)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection?.id === section.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {section.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Content editor */}
        <div className="md:col-span-3">
          {activeSection ? (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">{activeSection.name}</h2>
              
              {isEditing ? (
                <div className="space-y-6">
                  {Object.entries(activeSection.content).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-300 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      {typeof value === 'string' && value.length > 100 ? (
                        <textarea
                          name={key}
                          value={value}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <input
                          type="text"
                          name={key}
                          value={value as string}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(activeSection.content).map(([key, value]) => (
                    <div key={key}>
                      <h4 className="text-sm font-medium text-gray-400 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <p className="text-gray-200 whitespace-pre-wrap">{value as string}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6 flex justify-center items-center h-64">
              <p className="text-gray-400">Select a section to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteManagement;