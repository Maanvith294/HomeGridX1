import { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { LoginPage } from './components/LoginPage';
import { SignUpPage } from './components/SignUpPage';
import { DashboardPage } from './components/DashboardPage';
import { SettingsPage } from './components/SettingsPage';
import { ChatbotPage } from './components/ChatbotPage';
import { HelpPage } from './components/HelpPage';
import { ContactPage } from './components/ContactPage';
import { Sidebar } from './components/Sidebar';
import { Toaster } from './components/ui/sonner';

export type User = {
  email: string;
  houseId: string;
  phoneNumber?: string;
};

export type ApplianceType = {
  name: string;
  status: 'ON' | 'OFF';
  reading: string;
  icon: string;
};

export type Page = 'welcome' | 'login' | 'signup' | 'dashboard' | 'settings' | 'chatbot' | 'help' | 'contact';


export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in production this would authenticate with backend
    const mockUser: User = {
      email,
      houseId: 'HGX-12345',
    };
    setUser(mockUser);
    setCurrentPage('dashboard');
  };

  const handleSignUp = (email: string, password: string, phoneNumber: string) => {
    // Mock signup - generate unique house ID
    const houseId = `HGX-${Math.floor(10000 + Math.random() * 90000)}`;
    const newUser: User = {
      email,
      houseId,
      phoneNumber,
    };
    setUser(newUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('welcome');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-blue-50 to-purple-50">
      <Toaster />
      
      {user && currentPage !== 'welcome' && currentPage !== 'login' && currentPage !== 'signup' && (
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentPage={currentPage}
          navigateTo={navigateTo}
        />
      )}

      {currentPage === 'welcome' && (
        <WelcomePage
          onLogin={() => setCurrentPage('login')}
          onSignUp={() => setCurrentPage('signup')}
        />
      )}

      {currentPage === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onBackToWelcome={() => setCurrentPage('welcome')}
          onGoToSignUp={() => setCurrentPage('signup')}
        />
      )}

      {currentPage === 'signup' && (
        <SignUpPage
          onSignUp={handleSignUp}
          onBackToWelcome={() => setCurrentPage('welcome')}
          onGoToLogin={() => setCurrentPage('login')}
        />
      )}

      {currentPage === 'dashboard' && user && (
        <DashboardPage
          user={user}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      )}

      {currentPage === 'settings' && user && (
        <SettingsPage
          user={user}
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'chatbot' && user && (
        <ChatbotPage
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      )}

      {currentPage === 'help' && user && (
        <HelpPage
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      )}

      {currentPage === 'contact' && user && (
        <ContactPage
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      )}
    </div>
  );
}
