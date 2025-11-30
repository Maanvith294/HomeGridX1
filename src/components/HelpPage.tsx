import { Menu } from "lucide-react";

export function HelpPage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="p-6">
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-xl hover:bg-neutral-200 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Help</h1>
      </div>

      {/* Content */}
      <div className="p-6">
    <h1 className="text-2xl font-semibold mb-4">Help</h1>

    <p className="text-neutral-700 mb-4">
      HomeGridX is a smart home automation system designed to help you
      monitor, control, and optimize energy usage effortlessly.
    </p>

    <h2 className="text-lg font-medium mt-4 mb-2">How HomeGridX Works</h2>
    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
      <li>Uses an ESP32 microcontroller as the central controller.</li>
      <li>Monitors human presence using PIR motion sensors.</li>
      <li>Automatically turns lights and fans OFF when no motion is detected.</li>
      <li>Uses relay modules to control home appliances safely.</li>
      <li>Continuously uploads power usage, alerts, and automation logs to Firebase Realtime Database.</li>
      <li>Displays real-time device status and motion alerts inside the HomeGridX app.</li>
      <li>Allows energy monitoring, automation rules, and voice/AI support via the AI Bot.</li>
    </ul>

    <h2 className="text-lg font-medium mt-6 mb-2">Why We Built HomeGridX</h2>
    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
      <li>To save electricity through smart human-presence-based automation.</li>
      <li>To make home monitoring easy, efficient, and accessible to everyone.</li>
      <li>To provide real-time visibility of energy consumption room-by-room.</li>
      <li>To increase safety using motion alerts and remote appliance control.</li>
      <li>To help users understand and manage their power usage with AI assistance.</li>
    </ul>

    <h2 className="text-lg font-medium mt-6 mb-2">Features Included</h2>
    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
      <li>Motion detection with automatic power saving.</li>
      <li>Room-wise appliance status monitoring.</li>
      <li>Automation rules stored in Firebase.</li>
      <li>AI-powered energy assistant to answer questions and guide usage.</li>
      <li>User-friendly dashboard with real-time updates.</li>
    </ul>
  </div>
    </div>
  );
}
