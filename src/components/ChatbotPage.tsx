// import { useState } from 'react';
// import { Menu, Send, Bot, User } from 'lucide-react';
// import { Card } from './ui/card';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { ScrollArea } from './ui/scroll-area';
// import { GoogleGenerativeAI } from "@google/generative-ai";


// type ChatbotPageProps = {
//   onOpenSidebar: () => void;
// };

// type Message = {
//   role: 'user' | 'ai';
//   content: string;
//   timestamp: Date;
// };

// export function ChatbotPage({ onOpenSidebar }: ChatbotPageProps) {
//   async function callGemini(message: string) {
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: message }] }],
//         }),
//       }
//     );

//     const data = await response.json();
//     console.log("Gemini response:", data);

//     if (!response.ok) {
//       throw new Error(data.error?.message || "AI error");
//     }

//     return data.candidates[0].content.parts[0].text;
//   } catch (err) {
//     console.error(err);
//     return "Sorry, I couldn’t connect to the AI service right now.";
//   }
// }



//   // const handleSend = () => {
//   //   if (!input.trim()) return;

//   //   const userMessage: Message = {
//   //     role: 'user',
//   //     content: input,
//   //     timestamp: new Date(),
//   //   };

//   //   setMessages(prev => [...prev, userMessage]);
//   //   setInput('');

//   //   // Simulate AI response
//   //   setTimeout(() => {
//   //     const aiResponse = getAIResponse(input);
//   //     setMessages(prev => [
//   //       ...prev,
//   //       {
//   //         role: 'ai',
//   //         content: aiResponse,
//   //         timestamp: new Date(),
//   //       },
//   //     ]);
//   //   }, 1000);
//   // };

//   const handleSend = async () => {
//   if (!input.trim()) return;

//   const userMessage: Message = {
//     role: 'user',
//     content: input,
//     timestamp: new Date(),
//   };

//   setMessages(prev => [...prev, userMessage]);
//   const userInputCopy = input;
//   setInput('');

//   // Call Gemini API
//   const aiText = await callGemini(userInputCopy);

//   setMessages(prev => [
//     ...prev,
//     {
//       role: 'ai',
//       content: aiText,
//       timestamp: new Date(),
//     },
//   ]);
// };



//   // const getAIResponse = (userInput: string): string => {
//   //   const lower = userInput.toLowerCase();

//   //   if (lower.includes('save') || lower.includes('energy')) {
//   //     return 'Here are some energy-saving tips:\n\n1. Use Auto Mode to automatically turn off devices when not in use\n2. Monitor your peak usage hours and avoid heavy consumption during those times\n3. Keep your devices well-maintained for optimal efficiency\n4. Consider using LED bulbs for your lighting\n\nYour current usage of 1.2 kW is quite efficient!';
//   //   }

//   //   if (lower.includes('device') || lower.includes('appliance')) {
//   //     return 'You currently have 5 devices in your Bedroom:\n- Fan (ON - 220V)\n- Light (ON - 220V)\n- Gas Sensor (OFF - 0 ppm)\n- Camera (Active)\n- Motion Detector (PIR - Detected)\n\nWould you like to know more about any specific device?';
//   //   }

//   //   if (lower.includes('power') || lower.includes('usage')) {
//   //     return 'Your current power consumption is 1.2 kW with 4 active devices. This is within normal range. To reduce usage, consider:\n\n- Turning off the fan when the room is cool\n- Using natural light during daytime\n- Enabling Auto Mode for automatic power management';
//   //   }

//   //   return 'I can help you with:\n- Energy-saving tips and recommendations\n- Device status and control insights\n- Power usage analysis\n- Automation suggestions\n\nWhat would you like to know more about?';
//   // };

//   // const getAIResponse = async (userInput: string): Promise<string> => {
//   //   try {
//   //     const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

//   //     const model = genAI.getGenerativeModel({
//   //       model: "gemini-1.5-flash",
//   //     });

//   //     const result = await model.generateContent(userInput);
//   //     return result.response.text();

//   //   } catch (error) {
//   //     console.error(error);
//   //     return "Sorry, I couldn’t connect to the AI service right now.";
//   //   }
//   // };




//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 pt-6 pb-6 rounded-b-3xl shadow-lg">
//         <div className="flex items-center mb-4">
//           <button
//             onClick={onOpenSidebar}
//             className="p-2 hover:bg-white/20 rounded-xl transition-colors"
//           >
//             <Menu className="w-6 h-6 text-white" />
//           </button>
//         </div>

//         <div className="space-y-1">
//           <h1 className="text-white">AI Assistant</h1>
//           <p className="text-blue-50">
//             Get personalized energy insights
//           </p>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 px-6 py-6 overflow-hidden">
//         <ScrollArea className="h-[calc(100vh-280px)]">
//           <div className="space-y-4">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
//                   }`}
//               >
//                 <div
//                   className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${message.role === 'user'
//                     ? 'bg-emerald-100'
//                     : 'bg-blue-100'
//                     }`}
//                 >
//                   {message.role === 'user' ? (
//                     <User className="w-5 h-5 text-emerald-600" />
//                   ) : (
//                     <Bot className="w-5 h-5 text-blue-600" />
//                   )}
//                 </div>
//                 <div
//                   className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : 'text-left'
//                     }`}
//                 >
//                   <Card
//                     className={`inline-block p-4 rounded-2xl shadow-md border-0 ${message.role === 'user'
//                       ? 'bg-emerald-600 text-white'
//                       : 'bg-white text-neutral-800'
//                       }`}
//                   >
//                     <p className="text-sm whitespace-pre-line">{message.content}</p>
//                   </Card>
//                   <p className="text-xs text-neutral-500 mt-1 px-2">
//                     {message.timestamp.toLocaleTimeString([], {
//                       hour: '2-digit',
//                       minute: '2-digit',
//                     })}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//       </div>

//       {/* Input */}
//       <div className="px-6 pb-6">
//         <div className="flex gap-2">
//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//             placeholder="Ask about energy tips..."
//             className="h-12 rounded-2xl border-neutral-300 focus:border-emerald-500"
//           />
//           <Button
//             onClick={handleSend}
//             className="h-12 w-12 bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-md flex items-center justify-center"
//           >
//             <Send className="w-5 h-5" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { Menu, Send, Bot, User } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

type ChatbotPageProps = {
  onOpenSidebar: () => void;
};

type Message = {
  role: 'user' | 'ai';
  
  content: string;
  timestamp: Date;
};

export function ChatbotPage({ onOpenSidebar }: ChatbotPageProps) {

  // ------------------ GEMINI API CALL ------------------
  async function callGemini(message: string) {
  try {
    const response = await fetch(
      "/gemini/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        import.meta.env.local.VITE_GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "AI service error");
    }

    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't generate a response."
    );
  } catch (err) {
    console.error("Fetch failed:", err);
    return "Sorry, I couldn’t connect to the AI service right now.";
  }
}


// ------------------------------------------------------


const [messages, setMessages] = useState<Message[]>([
  {
    role: 'ai',
    content:
      "Hello! I'm your HomeGridX AI assistant. I can help you with energy-saving tips, device management, and power usage insights. How can I help you today?",
    timestamp: new Date(),
  },
]);

const [input, setInput] = useState('');


// ------------------ SEND MESSAGE ------------------
const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage: Message = {
    role: 'user',
    content: input,
    timestamp: new Date(),
  };

  setMessages(prev => [...prev, userMessage]);

  const userInputCopy = input;
  setInput('');

  // Call Gemini
  const aiText = await callGemini(userInputCopy);

  setMessages(prev => [
    ...prev,
    {
      role: 'ai',
      content: aiText,
      timestamp: new Date(),
    },
  ]);
};
// --------------------------------------------------


return (
  <div className="min-h-screen flex flex-col">

    {/* Header */}
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 pt-6 pb-6 rounded-b-3xl shadow-lg">
      <div className="flex items-center mb-4">
        <button
          onClick={onOpenSidebar}
          className="p-2 hover:bg-white/20 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="space-y-1">
        <h1 className="text-white">AI Assistant</h1>
        <p className="text-blue-50">Get personalized energy insights</p>
      </div>
    </div>

    {/* Messages */}
    <div className="flex-1 px-6 py-6 overflow-hidden">
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                  ? 'bg-emerald-100'
                  : 'bg-blue-100'
                  }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Bot className="w-5 h-5 text-blue-600" />
                )}
              </div>

              <div
                className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'text-right' : 'text-left'
                  }`}
              >
                <Card
                  className={`inline-block p-4 rounded-2xl shadow-md border-0 ${message.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-neutral-800'
                    }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </Card>

                <p className="text-xs text-neutral-500 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>

    {/* Input */}
    <div className="px-6 pb-6">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about energy tips..."
          className="h-12 rounded-2xl border-neutral-300 focus:border-emerald-500"
        />
        <Button
          onClick={handleSend}
          className="h-12 w-12 bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-md flex items-center justify-center"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>

  </div>
);
}
