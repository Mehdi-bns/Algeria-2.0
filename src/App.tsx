import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CropManagement } from './components/CropManagement';
import { Weather } from './components/Weather';
import { Analytics } from './components/Analytics';
import { FarmProfile } from './components/FarmProfile';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-green-50/30 overflow-hidden">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} language={language} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header onSearch={setSearchQuery} language={language} onLanguageChange={setLanguage} />
        <main className="flex-1 overflow-y-auto">
          {activeSection === 'overview' && <Dashboard language={language} />}
          {activeSection === 'analytics' && <Analytics language={language} />}
          {activeSection === 'crops' && <CropManagement searchQuery={searchQuery} language={language} />}
          {activeSection === 'weather' && <Weather language={language} />}
          {activeSection === 'profile' && <FarmProfile language={language} />}
        </main>
      </div>
    </div>
  );
}
