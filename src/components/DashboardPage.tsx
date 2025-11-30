// import { useState } from 'react';
// import { Menu, Zap, Home, Lightbulb, Fan, Camera, Flame, Activity } from 'lucide-react';
// import { User, ApplianceType } from '../App';
// import { Card } from './ui/card';
// import { Switch } from './ui/switch';
// import { Badge } from './ui/badge';

// type DashboardPageProps = {
//   user: User;
//   onOpenSidebar: () => void;
// };

// export function DashboardPage({ user, onOpenSidebar }: DashboardPageProps) {
//   const [autoMode, setAutoMode] = useState(true);
//   const [appliances, setAppliances] = useState<ApplianceType[]>([
//     { name: 'Fan', status: 'ON', reading: '220V', icon: 'fan' },
//     { name: 'Light', status: 'ON', reading: '220V', icon: 'light' },
//     { name: 'Gas Sensor', status: 'OFF', reading: '0 ppm', icon: 'gas' },
//     { name: 'Camera', status: 'ON', reading: 'Active', icon: 'camera' },
//     { name: 'Motion (PIR)', status: 'ON', reading: 'Detected', icon: 'motion' },
//   ]);

//   const activeDevices = appliances.filter(a => a.status === 'ON').length;
//   const totalPower = 1.2; // kW

//   const toggleAppliance = (index: number) => {
//     if (autoMode) return;
//     const updated = [...appliances];
//     updated[index].status = updated[index].status === 'ON' ? 'OFF' : 'ON';
//     setAppliances(updated);
//   };

//   const getApplianceIcon = (iconType: string) => {
//     switch (iconType) {
//       case 'fan':
//         return <Fan className="w-6 h-6" />;
//       case 'light':
//         return <Lightbulb className="w-6 h-6" />;
//       case 'gas':
//         return <Flame className="w-6 h-6" />;
//       case 'camera':
//         return <Camera className="w-6 h-6" />;
//       case 'motion':
//         return <Activity className="w-6 h-6" />;
//       default:
//         return <Zap className="w-6 h-6" />;
//     }
//   };

//   return (
//     <div className="min-h-screen pb-8">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-6 pt-6 pb-24 rounded-b-3xl shadow-lg">
//         <div className="flex items-center justify-between mb-6">
//           <button
//             onClick={onOpenSidebar}
//             className="p-2 hover:bg-white/20 rounded-xl transition-colors"
//           >
//             <Menu className="w-6 h-6 text-white" />
//           </button>
//           <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
//             <p className="text-white text-sm">{user.houseId}</p>
//           </div>
//         </div>

//         <div className="space-y-1">
//           <h1 className="text-white">My Home</h1>
//           <p className="text-emerald-50">
//             Welcome back, manage your devices
//           </p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="px-6 -mt-16 mb-6">
//         <div className="grid grid-cols-2 gap-4">
//           <Card className="bg-white p-5 rounded-2xl shadow-md border-0">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
//                 <Zap className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-2xl text-neutral-800">{activeDevices}</p>
//                 <p className="text-sm text-neutral-600">Active Devices</p>
//               </div>
//             </div>
//           </Card>

//           <Card className="bg-white p-5 rounded-2xl shadow-md border-0">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
//                 <Activity className="w-6 h-6 text-amber-600" />
//               </div>
//               <div>
//                 <p className="text-2xl text-neutral-800">{totalPower} kW</p>
//                 <p className="text-sm text-neutral-600">Power Usage</p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       {/* Bedroom Card */}
//       <div className="px-6 space-y-6">
//         <Card className="bg-white p-6 rounded-2xl shadow-md border-0">
//           <div className="flex items-center justify-between mb-5">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
//                 <Home className="w-5 h-5 text-purple-600" />
//               </div>
//               <h3 className="text-neutral-800">Bedroom</h3>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-neutral-600">
//                 {autoMode ? 'Auto' : 'Manual'}
//               </span>
//               <Switch
//                 checked={autoMode}
//                 onCheckedChange={setAutoMode}
//                 className="data-[state=checked]:bg-emerald-600"
//               />
//             </div>
//           </div>

//           {autoMode && (
//             <div className="mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
//               <p className="text-sm text-emerald-700">
//                 Auto mode: Devices turn off after 10 min of no motion
//               </p>
//             </div>
//           )}

//           {/* Appliances */}
//           <div className="space-y-3">
//             {appliances.map((appliance, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                     appliance.status === 'ON' 
//                       ? 'bg-emerald-100 text-emerald-600' 
//                       : 'bg-neutral-200 text-neutral-500'
//                   }`}>
//                     {getApplianceIcon(appliance.icon)}
//                   </div>
//                   <div>
//                     <p className="text-neutral-800">{appliance.name}</p>
//                     <p className="text-sm text-neutral-500">{appliance.reading}</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => toggleAppliance(index)}
//                   disabled={autoMode}
//                   className="disabled:opacity-50"
//                 >
//                   <Badge
//                     variant={appliance.status === 'ON' ? 'default' : 'secondary'}
//                     className={`${
//                       appliance.status === 'ON'
//                         ? 'bg-emerald-600 hover:bg-emerald-700'
//                         : 'bg-neutral-300 hover:bg-neutral-400'
//                     } px-3 py-1 rounded-full`}
//                   >
//                     {appliance.status}
//                   </Badge>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </Card>

//         {/* Energy Tip */}
//         <Card className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl shadow-md border-0">
//           <div className="flex items-start gap-3">
//             <div className="w-10 h-10 bg-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
//               <Lightbulb className="w-5 h-5 text-blue-700" />
//             </div>
//             <div>
//               <h4 className="text-neutral-800 mb-2">Energy Tip</h4>
//               <p className="text-sm text-neutral-700">
//                 Your current power usage is optimal. Consider turning off unused devices 
//                 during peak hours to save even more energy.
//               </p>
//             </div>
//           </div>
//         </Card>

//         {/* Future Expansion Placeholder */}
//         <Card className="bg-white/50 p-6 rounded-2xl border-2 border-dashed border-neutral-300">
//           <p className="text-center text-neutral-500">
//             Future sensors (temperature, humidity) will appear here
//           </p>
//         </Card>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
// import { Menu, Zap, Home, Lightbulb, Fan, Camera, Flame, Activity } from 'lucide-react';

// import { Card } from './ui/card';
// import { Switch } from './ui/switch';
// import { Badge } from './ui/badge';
// import { db } from './firebase';
// import { ref, onValue, update } from 'firebase/database';


import { User, ApplianceType } from '../App';
import { useEffect, useState } from 'react';
import { Menu, Zap, Home, Lightbulb, Fan, Camera, Flame, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { database } from '../firebase/firebase';
import { ref, onValue, update } from 'firebase/database';

// ⭐ Keep the hook — but do NOT render any debug UI
import { useDevices } from "../hooks/useDevices";

type DashboardPageProps = {
  user: User;
  onOpenSidebar: () => void;
};

export function DashboardPage({ user, onOpenSidebar }: DashboardPageProps) {
  const [autoMode, setAutoMode] = useState(true);
  const [appliances, setAppliances] = useState<ApplianceType[]>([]);

  // ⭐ Read the full devices tree (used internally; not rendered)
  const devices = useDevices();

  // -------------------------------
  // 🔧 Helper: Update a single device
  // -------------------------------
  const updateDevice = (deviceName: string, data: any) => {
    const deviceRef = ref(database, `users/${user.houseId}/appliances/${deviceName}`);
    return update(deviceRef, data);
  };

  // 🧠 1. Fetch appliances list
  useEffect(() => {
    const appliancesRef = ref(database, `users/${user.houseId}/appliances`);
    const unsubscribe = onValue(appliancesRef, (snapshot) => {
      if (snapshot.exists()) {
        setAppliances(snapshot.val());
      }
    });
    return () => unsubscribe();
  }, [user.houseId]);

  // 🧠 2. Toggle device (manual)
  const toggleAppliance = (index: number) => {
    if (autoMode) return;

    const updatedStatus = appliances[index].status === 'ON' ? 'OFF' : 'ON';

    update(
      ref(database, `users/${user.houseId}/appliances/${index}`),
      { status: updatedStatus }
    );
  };

  // 🧠 3. Sync auto mode
  useEffect(() => {
    update(ref(database, `users/${user.houseId}/settings/autoMode`), { enabled: autoMode });
  }, [autoMode, user.houseId]);

  const totalPower = appliances.reduce((sum: number, a: ApplianceType) => sum + (parseFloat(a.reading) || 0), 0);
  const activeDevices = appliances.filter(a => a.status === 'ON').length;

  const getApplianceIcon = (iconType: string) => {
    switch (iconType) {
      case 'fan': return <Fan className="w-6 h-6" />;
      case 'light': return <Lightbulb className="w-6 h-6" />;
      case 'gas': return <Flame className="w-6 h-6" />;
      case 'camera': return <Camera className="w-6 h-6" />;
      case 'motion': return <Activity className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen pb-8">

      {/* ======= Original UI ======= */}

      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-6 pt-6 pb-24 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onOpenSidebar} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
            <Menu className="w-6 h-6 text-white" />
          </button>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
            <p className="text-white text-sm">{user.houseId}</p>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-white">My Home</h1>
          <p className="text-emerald-50">Welcome back, manage your devices</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 -mt-16 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white p-5 rounded-2xl shadow-md border-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl text-neutral-800">{activeDevices}</p>
                <p className="text-sm text-neutral-600">Active Devices</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white p-5 rounded-2xl shadow-md border-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl text-neutral-800">{totalPower.toFixed(1)} kW</p>
                <p className="text-sm text-neutral-600">Power Usage</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Appliances section */}
      <div className="px-6 space-y-6">
        <Card className="bg-white p-6 rounded-2xl shadow-md border-0">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-neutral-800">Bedroom</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-600">
                {autoMode ? 'Auto' : 'Manual'}
              </span>
              <Switch
                checked={autoMode}
                onCheckedChange={setAutoMode}
                className="data-[state=checked]:bg-emerald-600"
              />
            </div>
          </div>

          {/* Auto Mode Info */}
          {autoMode && (
            <div className="mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-sm text-emerald-700">
                Auto mode: Devices turn off after 10 min of no motion
              </p>
            </div>
          )}

          {/* Device list */}
          <div className="space-y-3">
            {appliances.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      a.status === 'ON'
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-neutral-200 text-neutral-500'
                    }`}
                  >
                    {getApplianceIcon(a.icon)}
                  </div>
                  <div>
                    <p className="text-neutral-800">{a.name}</p>
                    <p className="text-sm text-neutral-500">{a.reading}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleAppliance(i)}
                  disabled={autoMode}
                  className="disabled:opacity-50"
                >
                  <Badge
                    variant={a.status === 'ON' ? 'default' : 'secondary'}
                    className={`${
                      a.status === 'ON'
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-neutral-300 hover:bg-neutral-400'
                    } px-3 py-1 rounded-full`}
                  >
                    {a.status}
                  </Badge>
                </button>
              </div>
            ))}
          </div>

        </Card>
      </div>

    </div>
  );
}
