'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLeads } from '../context/LeadContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function ChatBot() {
  const { addSystemLog } = useLeads();
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: 'msg-1',
        sender: 'bot',
        text: 'Greetings, forward-thinking builder! I am VitzBot, the digital growth advisor. Are we ready to scale your business into the stratosphere, or are we just scrolling through looking for slick gradients?',
        timestamp: time
      }
    ]);
  }, []);

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    setUnread(false);
    addSystemLog('AI', `Chatbot session ${!isOpen ? 'opened' : 'closed'} by visitor`);
  };

  const handleOptionClick = (question: string, botResponse: string, logMsg: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user question
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: time
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    addSystemLog('AI', `User selected chatbot node: "${logMsg}"`);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 850);
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal('');
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user text
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: time
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    addSystemLog('AI', `User typed custom query: "${userText.substring(0, 40)}${userText.length > 40 ? '...' : ''}"`);

    // Parse keywords for dynamic funny/premium response
    let responseText = `Hmm, I am digesting that request. My synthetic neural nets are humming, and they all point to one definitive answer: You should book a premium Strategy Consultation with our founders. Shall we set it up?`;
    
    const query = userText.toLowerCase();
    if (query.includes('price') || query.includes('cost') || query.includes('cheap')) {
      responseText = `Ah, the currency question! We don't do low-cost, ready-made templates. We architect high-performance business ecosystems that drive millions in scale. If you are looking for a ₹5k cheap gig, there are plenty of legacy agencies. If you want serious international growth infrastructure, let's schedule a call.`;
    } else if (query.includes('automation') || query.includes('workflow') || query.includes('whatsapp') || query.includes('ai')) {
      responseText = `AI Automation is our specialty! We connect your marketing funnels, customer support, and sales outreach into one self-healing machine. It saves hundreds of hours of manual labor. Our booking scheduler is proof of this – try confirming a slot and watch our CRM record it!`;
    } else if (query.includes('marketing') || query.includes('seo') || query.includes('leads')) {
      responseText = `Growth marketing isn't about spamming ads; it's about building authority. We blend high-converting web designs, SEO-driven copy, and performance analytics to capture premium leads. No vanity metrics, only revenue pipeline.`;
    } else if (query.includes('joke') || query.includes('funny')) {
      responseText = `Why did the legacy marketing manager cross the road? To pitch their brand awareness campaign to a target audience that doesn't exist! Don't let your business fall into legacy traps. Vitz.ai keeps operations fast, modern, and highly conversion-focused.`;
    } else if (query.includes('healthcare') || query.includes('real estate') || query.includes('startup')) {
      responseText = `We serve specialized industries like Healthcare, Real Estate, and Startups. We design patient onboarding automations, lead qualification funnels, and investor decks. Select your sector in our 'Book Consultation' form to check our tailored systems.`;
    }

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1100);
  };

  const presetOptions = [
    {
      q: 'What makes Vitz.ai different?',
      log: 'Differentiation query',
      a: 'Most agencies sell you hours. We sell you a growth ecosystem. We code your custom platforms, automate your lead-nurturing pipelines, design your premium branding, and standing up your remote sales infrastructure. You focus on building. We focus on scaling. Simple.'
    },
    {
      q: 'How does AI Automation work?',
      log: 'Automation query',
      a: 'Imagine your lead forms automatically syncing to your CRM, triggering a custom WhatsApp onboarding briefing within 3 seconds, and drafting a tailored contract in Google Docs before your human sales rep can even open their coffee. That\'s what we built for this very booking scheduler. Magic? No, just good engineering.'
    },
    {
      q: 'Rate my business attractiveness!',
      log: 'Roast query',
      a: 'Oh, you want a review? Try our "Business Attractiveness Quiz" on the Home Page. Warning: It\'s extremely premium, highly interactive, and might brutally roast your legacy systems. Want to jump straight to booking a session to fix it?'
    }
  ];

  return (
    <>
      <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
        
        {/* Floating Bubble */}
        {!isOpen && (
          <button className="chatbot-bubble flex-center" onClick={handleOpenToggle} aria-label="Open VitzBot Chat">
            <span className="bubble-icon">🤖</span>
            {unread && <span className="bubble-unread-badge">1</span>}
            <span className="bubble-text">VitzBot</span>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="chat-window glass-card">
            
            {/* Header */}
            <div className="chat-header">
              <div className="bot-profile">
                <span className="bot-avatar flex-center">🤖</span>
                <div className="bot-info">
                  <h3>VitzBot AI</h3>
                  <span className="bot-status"><span className="status-dot-blink"></span>System Online</span>
                </div>
              </div>
              <button className="chat-close" onClick={handleOpenToggle}>×</button>
            </div>

            {/* Messages body */}
            <div className="chat-body">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-bubble-container ${msg.sender === 'user' ? 'user-side' : 'bot-side'}`}>
                  <div className="chat-bubble">
                    <p>{msg.text}</p>
                    <span className="chat-time">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="chat-bubble-container bot-side">
                  <div className="chat-bubble typing-bubble">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Options Selection */}
            <div className="chat-presets">
              <p className="presets-title">Quick Queries:</p>
              <div className="presets-grid">
                {presetOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    className="preset-btn"
                    onClick={() => handleOptionClick(opt.q, opt.a, opt.log)}
                  >
                    {opt.q}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Input */}
            <form onSubmit={handleSendText} className="chat-input-bar">
              <input
                type="text"
                placeholder="Ask about pricing, solutions, or scaling..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="chat-input"
              />
              <button type="submit" className="chat-send-btn" aria-label="Send query">
                ➔
              </button>
            </form>

            <div className="chat-window-cta">
              <Link href="#book" onClick={() => setIsOpen(false)} className="chat-cta-link">
                ⚡ Book founders strategy call
              </Link>
            </div>

          </div>
        )}
      </div>

      <style jsx>{`
        .chatbot-wrapper {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 120;
        }

        @media (max-width: 500px) {
          .chatbot-wrapper {
            bottom: 1rem;
            right: 1rem;
          }
        }

        /* Floating Bubble styling */
        .chatbot-bubble {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--glow-gradient);
          border: none;
          box-shadow: 0 8px 30px rgba(0, 113, 227, 0.4);
          cursor: pointer;
          position: relative;
          transition: transform var(--transition-medium);
        }

        .chatbot-bubble:hover {
          transform: scale(1.08) rotate(5deg);
        }

        .bubble-icon {
          font-size: 1.8rem;
        }

        .bubble-text {
          position: absolute;
          right: 70px;
          background: rgba(8, 8, 9, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 0.35rem 0.8rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transform: translateX(10px);
          transition: opacity var(--transition-medium), transform var(--transition-medium);
        }

        .chatbot-bubble:hover .bubble-text {
          opacity: 1;
          transform: translateX(0);
        }

        .bubble-unread-badge {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 20px;
          height: 20px;
          background: #ef4444;
          border: 2px solid var(--bg-primary);
          border-radius: 50%;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Chat Window styling */
        .chat-window {
          width: 380px;
          max-height: 580px;
          display: flex;
          flex-direction: column;
          padding: 0;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          animation: slide-up-reveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (max-width: 420px) {
          .chat-window {
            width: calc(100vw - 2rem);
            max-height: 80vh;
          }
        }

        @keyframes slide-up-reveal {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .chat-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.01);
        }

        .bot-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bot-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 113, 227, 0.1);
          border: 1px solid rgba(0, 113, 227, 0.25);
          font-size: 1.25rem;
        }

        .bot-info h3 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
        }

        .bot-status {
          font-size: 0.7rem;
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 500;
        }

        .status-dot-blink {
          width: 6px;
          height: 6px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          animation: blink 1.5s infinite alternate;
        }

        @keyframes blink {
          0% { opacity: 0.4; }
          100% { opacity: 1; }
        }

        .chat-close {
          font-size: 1.75rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          line-height: 0.5;
        }

        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-height: 250px;
          max-height: 320px;
          background: rgba(0, 0, 0, 0.1);
        }

        .chat-bubble-container {
          display: flex;
          width: 100%;
        }

        .chat-bubble-container.bot-side {
          justify-content: flex-start;
        }

        .chat-bubble-container.user-side {
          justify-content: flex-end;
        }

        .chat-bubble {
          max-width: 85%;
          padding: 0.85rem 1.1rem;
          border-radius: 12px;
          font-size: 0.85rem;
          line-height: 1.5;
          position: relative;
        }

        .bot-side .chat-bubble {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          border-bottom-left-radius: 2px;
        }

        .user-side .chat-bubble {
          background: var(--accent-blue);
          color: white;
          border-bottom-right-radius: 2px;
        }

        .chat-time {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.4);
          display: block;
          text-align: right;
          margin-top: 0.35rem;
        }

        .user-side .chat-time {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Typing indicator dots */
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.6rem 1rem !important;
        }

        .typing-bubble .dot {
          width: 6px;
          height: 6px;
          background-color: var(--text-secondary);
          border-radius: 50%;
          display: inline-block;
          animation: bounce-dots 1s infinite alternate;
        }

        .typing-bubble .dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-bubble .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce-dots {
          0% { transform: translateY(0); }
          100% { transform: translateY(-5px); }
        }

        /* Preset Options Styling */
        .chat-presets {
          padding: 0.75rem 1.25rem;
          border-top: 1px solid var(--border-color);
          background: rgba(0, 0, 0, 0.05);
        }

        .presets-title {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }

        .presets-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .preset-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.75rem;
          padding: 0.3rem 0.65rem;
          border-radius: 50px;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .preset-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-blue);
          background: rgba(0, 113, 227, 0.03);
        }

        /* Input Form Bar */
        .chat-input-bar {
          display: flex;
          border-top: 1px solid var(--border-color);
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.01);
        }

        .chat-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.85rem;
          padding: 0.5rem 0.75rem;
        }

        .chat-send-btn {
          background: var(--glow-gradient);
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          transition: var(--transition-fast);
        }

        .chat-send-btn:hover {
          transform: scale(1.05);
        }

        /* Call To Action footer */
        .chat-window-cta {
          padding: 0.6rem;
          text-align: center;
          border-top: 1px solid var(--border-color);
          background: rgba(134, 34, 230, 0.05);
        }

        .chat-cta-link {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          display: block;
        }

        .chat-cta-link:hover {
          color: #c084fc;
        }
      `}</style>
    </>
  );
}
