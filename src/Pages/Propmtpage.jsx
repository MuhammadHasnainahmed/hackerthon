import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

const GEMINI_API_KEY = "AIzaSyDJQfZJew5voEHtHK55S89ImkLaqi-0NDc";

export default function PitchCraft() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    // User message
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const promptText = `You are PitchCraft AI - a personal AI startup partner. 
Generate a complete startup idea based on the user's input with this EXACT format:

Startup Name: [creative name]
Tagline: [catchy tagline] 
Pitch: [one-line elevator pitch]

User input: ${input}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: promptText
              }]
            }],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 500,
            }
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Correct response parsing for generateContent
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";

      const botMessage = { sender: "bot", text: aiText };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("API Error:", err);
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `❌ Error: ${err.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Format bot messages with better styling
  const formatBotMessage = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('Startup Name:') || line.startsWith('Tagline:') || line.startsWith('Pitch:')) {
        const [label, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        return (
          <div key={index} className="mb-3">
            <span className="font-bold text-indigo-700 block mb-1">{label}:</span>
            <span className="text-gray-800 ml-2">{value}</span>
          </div>
        );
      } else if (line.trim()) {
        return (
          <div key={index} className="text-gray-600 mb-2">
            {line}
          </div>
        );
      }
      return <br key={index} />;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-indigo-600">PitchCraft AI</h1>
          <p className="text-gray-600">Your personal AI startup partner</p>
        </div>
      </div>

      <div className="flex-1 w-full flex justify-center px-4 md:px-10 py-6">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-600 mt-20 space-y-4">
                <div className="text-4xl mb-4">🚀</div>
                <p className="text-xl font-semibold text-indigo-600">Welcome to PitchCraft AI!</p>
                <p>Describe your startup idea and get instant:</p>
                <ul className="list-disc list-inside text-left max-w-md mx-auto mt-4 space-y-1">
                  <li>Creative Startup Name</li>
                  <li>Catchy Tagline</li>
                  <li>Compelling Elevator Pitch</li>
                </ul>
                <p className="text-sm text-gray-500 mt-6">
                  Try: "I want to build an app that connects students with mentors"
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-2xl p-4 md:p-5 rounded-2xl shadow ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-br-none"
                        : "bg-gray-50 text-gray-800 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.sender === "bot" ? formatBotMessage(msg.text) : msg.text}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="text-center text-gray-500 italic animate-pulse">
                🚀 Crafting your startup idea...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={sendMessage} className="flex items-center gap-3 bg-white border-t border-gray-200 p-4">
            <input
              type="text"
              placeholder="Describe your startup idea... (e.g., I want to build an app that connects students with mentors)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-3 rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-50"
            >
              <FiSend size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}