import { Menu } from "lucide-react";

export function ContactPage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
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
        <h1 className="text-xl font-semibold">Contact Us</h1>
      </div>

      {/* Content */}
      <div className="space-y-4 text-neutral-700">
        <p>If you need any support, feel free to reach out:</p>

        <p><strong>Email:</strong> support@homegridx.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
      </div>
    </div>
  );
}
