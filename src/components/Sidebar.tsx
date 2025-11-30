import { Home, Settings, HelpCircle, Mail, Bot, X } from 'lucide-react';
import { Page } from '../App';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  currentPage: Page;
  navigateTo: (page: Page) => void;
};

export function Sidebar({ isOpen, onClose, currentPage, navigateTo }: SidebarProps) {
  const menuItems = [
    { page: 'dashboard' as Page, label: 'Home', icon: Home },
    { page: 'chatbot' as Page, label: 'AI Bot', icon: Bot },
    { page: 'settings' as Page, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white">HomeGridX</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="text-emerald-50 text-sm">
              Managing your energy efficiently
            </p>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;

              return (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* <div className="pt-4 mt-4 border-t border-neutral-200 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors">
                <HelpCircle className="w-5 h-5" />
                <span>Help</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors">
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
              </button>
            </div> */}

            <div className="pt-4 mt-4 border-t border-neutral-200 space-y-2">
              <button
                onClick={() => navigateTo('help')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Help</span>
              </button>

              <button
                onClick={() => navigateTo('contact')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
              </button>
            </div>

          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-neutral-200">
            <p className="text-xs text-neutral-500 text-center">
              HomeGridX v1.0
              <br />
              Smart Home Automation
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
