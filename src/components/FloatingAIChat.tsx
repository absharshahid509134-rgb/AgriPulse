import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  X,
  Trash2,
  Sparkles,
  ArrowUpRight,
  Info,
  MessageSquareText,
} from 'lucide-react';
import { useAgriPulse } from '../context/AgriPulseContext';
import { generateAssistantReply } from '../services/aiAssistantService';

const SUGGESTED_PROMPTS = [
  'What should I check on my farm today?',
  "Explain today's weather for my crop.",
  'How do I investigate yellow leaves?',
  'Explain soil pH in simple language.',
  'Help me find suitable agricultural schemes.',
  'Show me products for my selected crop.',
];

export const FloatingAIChat: React.FC = () => {
  const {
    profile,
    activeFarm,
    farms,
    crops,
    observations,
    activities,
    devices,
    weather,
    dictionary,
    products,
    schemes,
    chatHistory,
    appendChatMessage,
    clearChatHistory,
    isChatOpen,
    setIsChatOpen,
    pendingChatPrompt,
    clearPendingChatPrompt,
  } = useAgriPulse();

  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isChatOpen, isTyping]);

  useEffect(() => {
    if (isChatOpen && pendingChatPrompt) {
      const promptToRun = pendingChatPrompt;
      clearPendingChatPrompt();
      void handleSendPrompt(promptToRun);
    }
  }, [isChatOpen, pendingChatPrompt]);

  const handleSendPrompt = async (textToSubmit: string) => {
    const trimmed = textToSubmit.trim();
    if (!trimmed || isTyping) return;

    setInputText('');
    appendChatMessage({
      sender: 'user',
      text: trimmed,
    });

    setIsTyping(true);
    try {
      const reply = await generateAssistantReply(trimmed, {
        profile,
        activeFarm,
        farms,
        crops,
        observations,
        activities,
        devices,
        weather,
        dictionary,
        products,
        schemes,
        recentMessages: chatHistory,
      });
      appendChatMessage(reply);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleSendPrompt(inputText);
  };

  return (
    <>
      {/* Floating Circular Launcher */}
      {!isChatOpen && (
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40 flex items-center gap-2.5 bg-forest-800 hover:bg-forest-900 text-white pl-2 pr-4 py-2 rounded-full shadow-lg border border-forest-600 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-700"
          aria-label="Open AGRIPULSE AI Assistant"
        >
          <img
            src="/ai-advisor-avatar.png"
            alt="AGRIPULSE AI Advisor"
            className="w-8 h-8 rounded-full object-cover border-2 border-leaf-400 shadow-sm"
          />
          <span className="text-xs font-semibold tracking-wide hidden sm:inline">
            Ask AGRIPULSE AI
          </span>
          <MessageSquareText className="w-4 h-4 sm:hidden" />
        </button>
      )}

      {/* Compact Chat Panel */}
      {isChatOpen && (
        <div
          role="dialog"
          aria-label="AGRIPULSE AI Assistant"
          className="fixed bottom-16 lg:bottom-5 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[400px] max-h-[78vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-forest-900 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="/ai-advisor-avatar.png"
                alt="AGRIPULSE AI Advisor"
                className="w-9 h-9 rounded-full object-cover border-2 border-leaf-400 shadow-sm shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold leading-none">AGRIPULSE AI</h3>
                  <span className="text-[10px] font-semibold bg-amber-400/20 text-amber-200 border border-amber-400/30 px-1.5 py-0.5 rounded">
                    Demo Guidance
                  </span>
                </div>
                <p className="text-[11px] text-forest-200 mt-0.5">
                  Your Farm Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChatHistory}
                title="Clear conversation"
                aria-label="Clear conversation"
                className="p-1.5 rounded-lg text-forest-200 hover:text-white hover:bg-forest-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                title="Close chatbox"
                aria-label="Close chatbox"
                className="p-1.5 rounded-lg text-forest-200 hover:text-white hover:bg-forest-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transparency banner */}
          <div className="bg-amber-50/90 border-b border-amber-200 px-3.5 py-1.5 flex items-center gap-2 text-[11px] text-amber-900">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>
              Demo Mode: Uses your saved farm records & rule-based educational guidance.
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-warmbg/60 min-h-[240px] max-h-[360px]">
            {chatHistory.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-forest-800 text-white rounded-br-sm'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                  }`}
                >
                  {msg.text}

                  {msg.suggestedLinks && msg.suggestedLinks.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.suggestedLinks.map((lnk) => (
                        <button
                          key={lnk.route + lnk.label}
                          type="button"
                          onClick={() => {
                            navigate(lnk.route);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-forest-50 text-forest-800 hover:bg-forest-100 border border-forest-200 transition-colors"
                        >
                          <span>{lnk.label}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.sender === 'user' ? 'You' : msg.modeLabel || 'AGRIPULSE AI'}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-xl px-3 py-2 w-fit shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-leaf-600 animate-pulse" />
                <span>Checking your saved farm records...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-200">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Suggested Questions
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  disabled={isTyping}
                  onClick={() => void handleSendPrompt(prompt)}
                  className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white hover:bg-forest-50 text-slate-700 hover:text-forest-800 border border-slate-200 hover:border-forest-300 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleFormSubmit}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <label htmlFor="agripulse-ai-input" className="sr-only">
              Ask an agricultural question
            </label>
            <input
              id="agripulse-ai-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about your farm, crops, weather, pH, or store..."
              disabled={isTyping}
              className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              aria-label="Send message"
              className="p-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 disabled:bg-slate-300 text-white transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
