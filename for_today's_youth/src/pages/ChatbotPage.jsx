import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ChatbotPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello!!! 👋 I'm the For Today's Youth AI Assistant. I can help you with questions about courses, job opportunities, career guidance, and more. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const currentInput = inputValue; // Store current input before clearing

    // Add user message to the chat
    const userMessage = {
      id: messages.length + 1,
      text: currentInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history - exclude initial bot message and current user message being sent
      const history = messages
        .filter((m) => m.id !== 1) // Remove initial greeting
        .map((m) => ({
          role: m.sender === 'bot' ? 'model' : 'user',
          content: m.text,
        }));

      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          history: history,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get response from chatbot');
      }

      const data = await response.json();

      const botMessage = {
        id: messages.length + 2,
        text: data.reply || 'Sorry, I could not generate a response.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      const errorMessage = {
        id: messages.length + 2,
        text: error.message || "Sorry, I encountered an error. Please make sure the chatbot server is running on port 5001.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .chatbot-container {
      animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    .message-item {
      animation: fadeInUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
  `;

  return (
    <>
      <style>{animationStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-slide-in-down">
            <div className="bg-gradient-to-r from-blue-900 via-cyan-800 to-sky-900 rounded-3xl p-6 border-b-4 border-cyan-400">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">AI Assistant</h1>
                  <p className="text-cyan-200">Get instant answers about courses, jobs, and career guidance</p>
                </div>
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-all duration-200"
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="chatbot-container bg-gradient-to-br from-slate-800 to-blue-800 rounded-3xl shadow-2xl border-2 border-cyan-500 overflow-hidden flex flex-col h-[600px]">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className="message-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {message.sender === 'bot' ? (
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 flex items-center justify-center text-white font-bold">
                        🤖
                      </div>
                      <div className="flex-1">
                        <div className="bg-gradient-to-r from-cyan-600 to-sky-600 rounded-2xl rounded-tl-none p-4 text-white max-w-2xl">
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4 justify-end">
                      <div>
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl rounded-tr-none p-4 text-white max-w-2xl ml-auto">
                          <p className="text-sm">{message.text}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-right">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {user?.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 flex items-center justify-center text-white font-bold">
                    🤖
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-r from-cyan-600 to-sky-600 rounded-2xl rounded-tl-none p-4 text-white">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-cyan-500 bg-slate-700/50 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about courses, jobs, or careers..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-slate-700 border-2 border-cyan-400 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/50 transition-all duration-300 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold rounded-lg transition-all duration-200 shadow-lg"
                >
                  {isLoading ? '...' : 'Send'}
                </button>
              </form>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-gradient-to-r from-slate-800/50 to-blue-800/50 rounded-2xl p-6 border border-cyan-400/30">
            <p className="text-cyan-300 text-sm">
              💡 <strong>Tip:</strong> You can ask about courses, job opportunities, career guidance, skill development, and much more. The chatbot is powered by Google's Gemini AI.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotPage;
