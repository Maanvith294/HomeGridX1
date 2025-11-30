import { Home, Zap } from 'lucide-react';
import { Button } from './ui/button';

type WelcomePageProps = {
  onLogin: () => void;
  onSignUp: () => void;
};

export function WelcomePage({ onLogin, onSignUp }: WelcomePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-3xl flex items-center justify-center shadow-lg">
              <Home className="w-12 h-12 text-emerald-700" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 text-amber-700" />
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="space-y-3">
          <h1 className="text-neutral-800">HomeGridX</h1>
          <p className="text-neutral-600">
            Managing your energy efficiently
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4 pt-8">
          <Button
            onClick={onLogin}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-md transition-all"
          >
            Log In
          </Button>
          <Button
            onClick={onSignUp}
            variant="outline"
            className="w-full h-12 border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 rounded-2xl transition-all"
          >
            Sign Up
          </Button>
        </div>

        {/* Decorative element */}
        <div className="pt-12 opacity-60">
          <p className="text-neutral-500 text-sm">
            Smart home automation made simple
          </p>
        </div>
      </div>
    </div>
  );
}
