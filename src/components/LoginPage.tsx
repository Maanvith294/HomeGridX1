// import { useState } from 'react';
// import { ArrowLeft } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { toast } from 'sonner@2.0.3';

// type LoginPageProps = {
//   onLogin: (email: string, password: string) => void;
//   onBackToWelcome: () => void;
//   onGoToSignUp: () => void;
// };

// export function LoginPage({ onLogin, onBackToWelcome, onGoToSignUp }: LoginPageProps) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !password) {
//       toast.error('Please fill in all fields');
//       return;
//     }
//     toast.success('Login successful!');
//     onLogin(email, password);
//   };

//   const handleForgotPassword = () => {
//     if (!email) {
//       toast.error('Please enter your email first');
//       return;
//     }
//     toast.success('Password reset link sent to your email');
//   };

//   return (
//     <div className="min-h-screen flex flex-col p-6">
//       {/* Header */}
//       <div className="flex items-center mb-8">
//         <button
//           onClick={onBackToWelcome}
//           className="p-2 hover:bg-white/50 rounded-xl transition-colors"
//         >
//           <ArrowLeft className="w-6 h-6 text-neutral-700" />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex-1 flex items-center justify-center">
//         <div className="w-full max-w-md space-y-6">
//           <div className="space-y-2">
//             <h2 className="text-neutral-800">Welcome Back</h2>
//             <p className="text-neutral-600">
//               Log in to manage your smart home
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-2">
//               <Label htmlFor="email" className="text-neutral-700">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your.email@example.com"
//                 className="h-12 rounded-xl border-neutral-300 focus:border-emerald-500"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password" className="text-neutral-700">
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="h-12 rounded-xl border-neutral-300 focus:border-emerald-500"
//               />
//             </div>

//             <button
//               type="button"
//               onClick={handleForgotPassword}
//               className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
//             >
//               Forgot Password?
//             </button>

//             <Button
//               type="submit"
//               className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-md transition-all mt-6"
//             >
//               Log In
//             </Button>
//           </form>

//           <div className="text-center pt-4">
//             <p className="text-neutral-600">
//               Don't have an account?{' '}
//               <button
//                 onClick={onGoToSignUp}
//                 className="text-emerald-600 hover:text-emerald-700 transition-colors"
//               >
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import react from 'react';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth , db as database } from '../firebase/firebaseConfig'; // <-- import your Firebase Auth

type LoginPageProps = {
  onLogin: (email: string, password: string) => void;
  onBackToWelcome: () => void;
  onGoToSignUp: () => void;
};

export function LoginPage({ onLogin, onBackToWelcome, onGoToSignUp }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      onLogin(email, password);
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found for this email.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email format.');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email first');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset link sent to your email!');
    } catch (error: any) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        toast.error('No user found with this email.');
      } else {
        toast.error('Failed to send reset email. Try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={onBackToWelcome}
          className="p-2 hover:bg-white/50 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-neutral-700" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h2 className="text-neutral-800">Welcome Back</h2>
            <p className="text-neutral-600">
              Log in to manage your smart home
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="h-12 rounded-xl border-neutral-300 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 rounded-xl border-neutral-300 focus:border-emerald-500"
              />
            </div>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
              disabled={loading}
            >
              Forgot Password?
            </button>

            <Button
              type="submit"
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-md transition-all mt-6"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-neutral-600">
              Don't have an account?{' '}
              <span>
                <button onClick={onGoToSignUp} className="text-emerald-600 hover:text-emerald-700 transition-colors">
                  Sign Up
                </button>
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
