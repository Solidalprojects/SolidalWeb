// client/src/pages/dashboard/Settings.tsx
import { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { UserSettings } from '../../types/user';
import { useAuth } from '../../hooks/useAuth';

const Settings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    email: '',
    phone: '',
    company: '',
    emailNotifications: true,
    marketingEmails: false,
    language: 'en',
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await userService.getUserSettings();
        setSettings(data);
      } catch (err) {
        console.error('Error fetching user settings:', err);
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  // Pre-fill name and email from the auth user if settings aren't loaded yet
  useEffect(() => {
    if (user && loading) {
      setSettings(prevSettings => ({
        ...prevSettings,
        name: user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.username,
        email: user.email || ''
      }));
    }
  }, [user, loading]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError(null);
    
    try {
      await userService.updateUserSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error updating settings:', err);
      setError('Failed to update settings');
    } finally {
      setSaving(false);
    }
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
      <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6">
          Settings saved successfully!
        </div>
      )}
      
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={settings.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={settings.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                Company Name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={settings.company}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="sq">Albanian</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium text-white mb-3">Notification Settings</h3>
            
            <div className="flex items-center">
              <input
                id="emailNotifications"
                name="emailNotifications"
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-300">
                Receive email notifications for account updates and website changes
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="marketingEmails"
                name="marketingEmails"
                type="checkbox"
                checked={settings.marketingEmails}
                onChange={handleChange}
                className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="marketingEmails" className="ml-2 block text-sm text-gray-300">
                Receive marketing emails about new features and offers
              </label>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6">
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all ${
                saving ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {saving ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Security</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              Update Password
            </button>
          </div>
          
          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-white mb-3">Two-Factor Authentication</h3>
            <p className="text-gray-300 mb-3">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all"
            >
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;