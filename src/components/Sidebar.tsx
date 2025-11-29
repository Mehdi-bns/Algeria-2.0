import { LayoutDashboard, Sprout, CloudSun, BarChart3, User } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  language: 'en' | 'ar';
}

export function Sidebar({ activeSection, onSectionChange, language }: SidebarProps) {
  const menuItems = {
    en: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'crops', label: 'Crop Management', icon: Sprout },
      { id: 'weather', label: 'Weather', icon: CloudSun },
      { id: 'profile', label: 'Farm Profile', icon: User },
    ],
    ar: [
      { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
      { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
      { id: 'crops', label: 'إدارة المحاصيل', icon: Sprout },
      { id: 'weather', label: 'الطقس', icon: CloudSun },
      { id: 'profile', label: 'ملف المزرعة', icon: User },
    ],
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-green-600">FarmWise</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems[language].map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
