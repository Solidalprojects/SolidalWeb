// client/src/pages/dashboard/WebsiteManagement.tsx
import { useState, useEffect } from 'react';
import { websiteService } from '../../services/websiteService';
import { WebsiteSection } from '../../types/website';

interface WebsiteManagementProps {
  websiteId: number;
}

const WebsiteManagement: React.FC<WebsiteManagementProps> = ({ websiteId }) => {
  const [sections, setSections] = useState<WebsiteSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<WebsiteSection | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await websiteService.getWebsiteSections(websiteId);
        setSections(data);
        if (data.length > 0) {
          setActiveSection(data[0]);
        }
      } catch (error) {
        console.error('Error fetching website sections:', error);
        setError('Failed to load website sections. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSections();
  }, [websiteId]);
  
  const handleSectionChange = (section: WebsiteSection) => {
    setActiveSection(section);
    setIsEditing(false);
    // Clear any messages
    setSuccessMessage(null);
    setError(null);
  };
  
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    // Clear any messages
    setSuccessMessage(null);
    setError(null);
  };
  
  const handleSave = async () => {
    if (!activeSection) return;
    
    setSaveLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const updatedSection = await websiteService.updateWebsiteSection(
        websiteId, 
        activeSection.id, 
        activeSection
      );
      
      // Update the sections list
      setSections(prevSections => 
        prevSections.map(section => 
          section.id === updatedSection.id ? updatedSection : section
        )
      );
      
      setIsEditing(false);
      setSuccessMessage('Section updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error updating section:', error);
      setError('Failed to update section. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!activeSection) return;
    
    const { name, value } = e.target;
    
    // Parse name to access nested properties
    const nameParts = name.split('.');
    
    if (nameParts.length === 1) {
      // Direct property of activeSection
      setActiveSection({
        ...activeSection,
        [name]: value
      });
    } else if (nameParts.length === 2 && nameParts[0] === 'content') {
      // Property of activeSection.content
      setActiveSection({
        ...activeSection,
        content: {
          ...activeSection.content,
          [nameParts[1]]: value
        }
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  
  if (error && !activeSection) {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg">
        <p className="font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-white">Website Management</h1>
        {activeSection && (
          <button
            onClick={isEditing ? handleSave : toggleEditMode}
            disabled={saveLoading}
            className={`px-4 py-2 rounded-lg font-medium ${
              isEditing 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            } ${saveLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {saveLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              isEditing ? 'Save Changes' : 'Edit Content'
            )}
          </button>
        )}
      </div>
      
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}
      
      {error && activeSection && (
        <div className="mb-6 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">Website Sections</h3>
          {sections.length > 0 ? (
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
          ) : (
            <p className="text-gray-400 text-center p-4">No editable sections found</p>
          )}
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
                          name={`content.${key}`}
                          value={value}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <input
                          type="text"
                          name={`content.${key}`}
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