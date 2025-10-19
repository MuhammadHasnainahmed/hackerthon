import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiArrowLeft } from "react-icons/fi";


const GEMINI_API_KEY = "AIzaSyDJQfZJew5voEHtHK55S89ImkLaqi-0NDc"; // aap apni .env se bhi le sakte ho

export default function Propmtpage() {
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

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
       ` https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateText?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: input,
            temperature: 0.7,
            candidateCount: 1,
            maxOutputTokens: 500,
          }),
        }
      );

      const data = await response.json();

      const aiText =
        data?.candidates?.[0]?.output || "⚠️ No response from Gemini.";

      const botMessage = { sender: "bot", text: aiText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error: Unable to connect to Gemini API." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
     

      {/* Chat Box */}
      <div className="flex-1 w-full flex justify-center px-4 md:px-10 py-6">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-gray-400 mt-20">
                💬 Start your first pitch idea below and Gemini will help refine it!
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-3 md:p-4 rounded-2xl shadow ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
            {loading && (
              <div className="text-center text-gray-500 italic animate-pulse">
                Gemini is thinking...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-3 bg-white border-t border-gray-200 p-4"
          >
            <input
              type="text"
              placeholder="Type your idea..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white p-3 rounded-xl shadow-md hover:opacity-90 transition-all"
            >
              <FiSend size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
