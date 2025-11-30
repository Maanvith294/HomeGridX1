import { useState } from 'react';
import { Menu, User as UserIcon, Mail, Home, Moon, Sun, LogOut, Bell } from 'lucide-react';
import { User } from '../App';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

type SettingsPageProps = {
  user: User;
  onOpenSidebar: () => void;
  onLogout: () => void;
};

export function SettingsPage({ user, onOpenSidebar, onLogout }: SettingsPageProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [autoTurnOff, setAutoTurnOff] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 pt-6 pb-16 rounded-b-3xl shadow-lg">
        <div className="flex items-center mb-6">
          <button
            onClick={onOpenSidebar}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="space-y-1">
          <h1 className="text-white">Settings</h1>
          <p className="text-purple-50">
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-8 space-y-6">
        {/* Account Info */}
        <Card className="bg-white p-6 rounded-2xl shadow-md border-0">
          <h3 className="text-neutral-800 mb-4">Account Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <p className="text-neutral-800">{user.email}</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">House ID</p>
                <p className="text-neutral-800">{user.houseId}</p>
              </div>
            </div>

            {user.phoneNumber && (
              <>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Phone Number</p>
                    <p className="text-neutral-800">{user.phoneNumber}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Appearance */}
        <Card className="bg-white p-6 rounded-2xl shadow-md border-0">
          <h3 className="text-neutral-800 mb-4">Appearance</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-amber-600" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div>
                <p className="text-neutral-800">Dark Mode</p>
                <p className="text-sm text-neutral-500">Toggle dark theme</p>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={setDarkMode}
              className="data-[state=checked]:bg-emerald-600"
            />
          </div>
        </Card>

        {/* Automation Settings */}
        <Card className="bg-white p-6 rounded-2xl shadow-md border-0">
          <h3 className="text-neutral-800 mb-4">Automation</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-800">Auto Turn-Off Devices</p>
                <p className="text-sm text-neutral-500">
                  After 10 minutes of inactivity
                </p>
              </div>
              <Switch
                checked={autoTurnOff}
                onCheckedChange={setAutoTurnOff}
                className="data-[state=checked]:bg-emerald-600"
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-800">Notifications</p>
                <p className="text-sm text-neutral-500">
                  Energy alerts and updates
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                className="data-[state=checked]:bg-emerald-600"
              />
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-12 border-2 border-red-300 text-red-600 hover:bg-red-50 rounded-2xl transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
