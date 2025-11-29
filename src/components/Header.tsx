import { Search, Bell, User, Globe } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  language: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
}

export function Header({ onSearch, language, onLanguageChange }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: '1', message: 'Corn field irrigation completed', time: '5 min ago', read: false },
    { id: '2', message: 'Tomato harvest ready in 3 weeks', time: '1 hour ago', read: false },
    { id: '3', message: 'Weather alert: Heavy rain tomorrow', time: '2 hours ago', read: true },
    { id: '4', message: 'Fertilizer application scheduled', time: '1 day ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const t = {
    en: {
      search: 'Search crops, activities, reports...',
      notifications: 'Notifications',
      viewAll: 'View all notifications',
      profile: 'My Profile',
      settings: 'Settings',
      help: 'Help & Support',
      signOut: 'Sign Out',
    },
    ar: {
      search: 'البحث عن المحاصيل والأنشطة والتقارير...',
      notifications: 'الإشعارات',
      viewAll: 'عرض جميع الإشعارات',
      profile: 'ملفي الشخصي',
      settings: 'الإعدادات',
      help: 'المساعدة والدعم',
      signOut: 'تسجيل الخروج',
    },
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-30" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between gap-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} size={20} />
            <input
              type="text"
              placeholder={t[language].search}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                language === 'en'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ar')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                language === 'ar'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              AR
            </button>
          </div>
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell size={24} className="text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowNotifications(false)}
                ></div>
                <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-2 z-40 max-h-96 overflow-y-auto`}>
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-gray-900">{t[language].notifications}</h3>
                  </div>
                  <div className="py-2">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notif.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <p className="text-gray-900 text-sm mb-1">{notif.message}</p>
                        <p className="text-gray-500 text-xs">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-green-600 text-sm hover:text-green-700">
                      {t[language].viewAll}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white">
                <User size={20} />
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowProfile(false)}
                ></div>
                <div className={`absolute ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 py-2 z-40`}>
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-gray-900">{language === 'ar' ? 'جون المزارع' : 'John Farmer'}</p>
                    <p className="text-gray-500 text-sm">john@greenvalley.com</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                      {t[language].profile}
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                      {t[language].settings}
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                      {t[language].help}
                    </button>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-red-600 text-sm hover:text-red-700">
                      {t[language].signOut}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
