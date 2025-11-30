// import { useState } from 'react';
// import { ArrowLeft, CheckCircle } from 'lucide-react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { toast } from 'sonner@2.0.3';

// type SignUpPageProps = {
//   onSignUp: (email: string, password: string, phoneNumber: string) => void;
//   onBackToWelcome: () => void;
//   onGoToLogin: () => void;
// };

// export function SignUpPage({ onSignUp, onBackToWelcome, onGoToLogin }: SignUpPageProps) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [showHouseId, setShowHouseId] = useState(false);
//   const [generatedHouseId, setGeneratedHouseId] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email || !password || !phoneNumber) {
//       toast.error('Please fill in all fields');
//       return;
//     }
    
//     const houseId = `HGX-${Math.floor(10000 + Math.random() * 90000)}`;
//     setGeneratedHouseId(houseId);
//     setShowHouseId(true);
    
//     setTimeout(() => {
//       toast.success('Account created successfully!');
//       onSignUp(email, password, phoneNumber);
//     }, 2500);
//   };

//   if (showHouseId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center p-6">
//         <div className="w-full max-w-md space-y-6 text-center">
//           <div className="flex justify-center">
//             <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
//               <CheckCircle className="w-10 h-10 text-emerald-600" />
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <h2 className="text-neutral-800">Account Created!</h2>
//             <p className="text-neutral-600">
//               Your unique House ID has been generated
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200">
//             <p className="text-sm text-neutral-600 mb-2">Your House ID</p>
//             <p className="text-emerald-700 tracking-wider">{generatedHouseId}</p>
//             <p className="text-xs text-neutral-500 mt-3">
//               Save this ID for future reference
//             </p>
//           </div>

//           <p className="text-sm text-neutral-600">
//             Redirecting to dashboard...
//           </p>
//         </div>
//       </div>
//     );
//   }

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
//             <h2 className="text-neutral-800">Create Account</h2>
//             <p className="text-neutral-600">
//               Join HomeGridX to start saving energy
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
//               <Label htmlFor="phone" className="text-neutral-700">
//                 Phone Number
//               </Label>
//               <Input
//                 id="phone"
//                 type="tel"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="+1 (555) 000-0000"
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

//             <Button
//               type="submit"
//               className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-md transition-all mt-6"
//             >
//               Sign Up
//             </Button>
//           </form>

//           <div className="text-center pt-4">
//             <p className="text-neutral-600">
//               Already have an account?{' '}
//               <button
//                 onClick={onGoToLogin}
//                 className="text-emerald-600 hover:text-emerald-700 transition-colors"
//               >
//                 Log In
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { auth, db as database } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

type SignUpPageProps = {
  onSignUp: (email: string, password: string, phoneNumber: string) => void;
  onBackToWelcome: () => void;
  onGoToLogin: () => void;
};

export function SignUpPage({ onSignUp, onBackToWelcome, onGoToLogin }: SignUpPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showHouseId, setShowHouseId] = useState(false);
  const [generatedHouseId, setGeneratedHouseId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !phoneNumber) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generate unique House ID
      const houseId = `HGX-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedHouseId(houseId);
      setShowHouseId(true);

      // Store user data in Firebase Realtime Database
      await set(ref(database, `users/${user.uid}`), {
        email,
        phoneNumber,
        houseId,
        createdAt: new Date().toISOString(),
        sensors: {
          pir: "inactive",
          currentSensor: "0W",
          gasSensor: "normal",
          fan: "off",
          light: "off",
          camera: "inactive"
        }
      });

      toast.success('Account created successfully!');
      onSignUp(email, password, phoneNumber);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to sign up');
    }
  };

  if (showHouseId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-neutral-800">Account Created!</h2>
            <p className="text-neutral-600">Your unique House ID has been generated</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200">
            <p className="text-sm text-neutral-600 mb-2">Your House ID</p>
            <p className="text-emerald-700 tracking-wider">{generatedHouseId}</p>
            <p className="text-xs text-neutral-500 mt-3">Save this ID for future reference</p>
          </div>
          <p className="text-sm text-neutral-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="flex items-center mb-8">
        <button onClick={onBackToWelcome} className="p-2 hover:bg-white/50 rounded-xl transition-colors">
          <ArrowLeft className="w-6 h-6 text-neutral-700" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h2 className="text-neutral-800">Create Account</h2>
            <p className="text-neutral-600">Join HomeGridX to start saving energy</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-700">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com" className="h-12 rounded-xl border-neutral-300 focus:border-emerald-500" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-neutral-700">Phone Number</Label>
              <Input id="phone" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91 9876543210" className="h-12 rounded-xl border-neutral-300 focus:border-emerald-500" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-700">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" className="h-12 rounded-xl border-neutral-300 focus:border-emerald-500" />
            </div>

            <Button type="submit"
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-md transition-all mt-6">
              Sign Up
            </Button>
          </form>

          <div className="text-center pt-4">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <button onClick={onGoToLogin} className="text-emerald-600 hover:text-emerald-700 transition-colors">
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
