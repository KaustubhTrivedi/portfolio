'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AskAboutMePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi there! I'm **Kaustubh Trivedi**, a software engineer passionate about building meaningful experiences. Feel free to ask me about my background, skills, projects, or anything else you'd like to know!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const history = messages.map(({ role, content }) => ({ role, content }));

      const res = await fetch('http://127.0.0.1:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: history,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();

      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response
      };
      setMessages(prev => [...prev, responseMessage]);

    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I'm currently unable to connect to the server. Please try again later."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-parchment-50 via-sky-50 to-blush-50 dark:from-ink-900 dark:via-ink-800 dark:to-ink-900">
      <header className="relative z-10 bg-white/80 dark:bg-ink-800/80 backdrop-blur-story border-b border-ink-200/50 dark:border-ink-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blush-200 to-sky-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 text-ink-600 dark:text-ink-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9M19 19H5V3H13V9H19Z" />
                </svg>
              </div>
              <span className="font-heading text-lg font-semibold text-ink-800 dark:text-ink-100 group-hover:text-blush-600 dark:group-hover:text-blush-400 transition-colors duration-300">
                Kaustubh Trivedi
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-col h-[calc(100vh-80px)]">
        <div className="bg-white/90 dark:bg-ink-800/90 backdrop-blur-story border-b border-ink-200/50 dark:border-ink-700/50 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blush-200 via-sky-200 to-mint-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-ink-600 dark:text-ink-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2M20 16H6L4 18V4H20V16Z" />
                </svg>
              </div>
              <div>
                <h1 className="font-heading text-2xl font-semibold text-ink-800 dark:text-ink-100">Ask about me</h1>
                <p className="text-ink-600 dark:text-ink-300 text-sm">Ask me anything about my experience, skills, or journey</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white/50 to-parchment-50/50 dark:from-ink-800/50 dark:to-ink-900/50">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''} animate-fade-in`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-gradient-to-br from-blush-200 to-sky-200' : 'bg-ink-100 dark:bg-ink-700'}`}>
                    {msg.role === 'assistant' ? (
                      <svg className="w-4 h-4 text-ink-600 dark:text-ink-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9M19 19H5V3H13V9H19Z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-ink-600 dark:text-ink-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                  </div>
                  <div className={`rounded-2xl px-6 py-4 shadow-soft max-w-2xl ${msg.role === 'assistant'
                    ? 'bg-white dark:bg-ink-800 rounded-tl-md text-ink-800 dark:text-ink-100'
                    : 'bg-blush-500 text-white rounded-tr-md'
                    }`}>
                    <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blush-200 to-sky-200 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-ink-600 dark:text-ink-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9M19 19H5V3H13V9H19Z" />
                    </svg>
                  </div>
                  <div className="bg-white dark:bg-ink-800 rounded-2xl rounded-tl-md px-6 py-4 shadow-soft">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-ink-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-ink-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-ink-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-ink-800/80 backdrop-blur-story border-t border-ink-200/50 dark:border-ink-700/50 p-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full pl-6 pr-14 py-4 rounded-full bg-white dark:bg-ink-900 border-2 border-ink-200 dark:border-ink-700 focus:border-blush-400 dark:focus:border-blush-500 focus:ring-0 active:outline-none focus:outline-none transition-all duration-300 shadow-inner text-ink-800 dark:text-ink-100 placeholder-ink-400"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 top-2 p-2 rounded-full bg-gradient-to-r from-blush-500 to-sky-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-chapter transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

