'use client';

import React, { useState, useEffect } from 'react';

export default function SystemSimulator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0); // 0: Idle, 1: Booting, 2: Intake, 3: WhatsApp Dispatch, 4: CRM Success
  const [whatsappText, setWhatsappText] = useState('');

  const runSimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setStep(1);
    setWhatsappText('');
  };

  // Loop simulation automatically
  useEffect(() => {
    let autoPlayTimer: NodeJS.Timeout;
    if (!isPlaying) {
      autoPlayTimer = setTimeout(() => {
        setIsPlaying(true);
        setStep(1);
        setWhatsappText('');
      }, 3000);
    }
    return () => {
      if (autoPlayTimer) clearTimeout(autoPlayTimer);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;
    let timer4: NodeJS.Timeout;

    // Timeline Steps
    // Step 1: Booting webhook listener (1.5 seconds)
    timer1 = setTimeout(() => {
      setStep(2);
    }, 1500);

    // Step 2: Intake Captured (2.5 seconds)
    timer2 = setTimeout(() => {
      setStep(3);
      // Simulate typing for WhatsApp
      let text = "Hi Sarah, Vitz.ai automated pipeline locked in your clinical CRM brief. Locking in strategy consultation slot for tomorrow 11:00 AM. Let's grow!";
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setWhatsappText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 25);
    }, 4000);

    // Step 3: WhatsApp Sent (4.5 seconds)
    timer3 = setTimeout(() => {
      setStep(4);
    }, 8500);

    // Step 4: CRM Success (2.5 seconds)
    timer4 = setTimeout(() => {
      setIsPlaying(false);
      setStep(0);
    }, 11000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isPlaying]);

  return (
    <>
      <div className="simulator-container glass-card">
        
        {/* Header Bar */}
        <div className="sim-header">
          <div className="sim-dots">
            <span className="sim-dot-red"></span>
            <span className="sim-dot-yellow"></span>
            <span className="sim-dot-green"></span>
          </div>
          <span className="sim-title">VITZ WORKFLOW SIMULATOR V1.2</span>
          <span className="sim-badge">ACTIVE</span>
        </div>

        {/* Console Screen */}
        <div className="sim-screen">
          
          {/* BACKGROUND SYSTEM GRID */}
          <div className="screen-grid-nodes">
            <div className={`node node-left ${step >= 2 ? 'active' : ''}`}>
              <span className="icon">📨</span>
              <span className="lbl">Inbound Lead</span>
            </div>
            
            {/* SVG Connecting Cables with pulsing packets */}
            <svg className="connector-svg">
              <path d="M 120 120 L 220 120" className={`cable ${step >= 2 ? 'active' : ''}`} />
              <path d="M 330 120 L 430 120" className={`cable ${step >= 3 ? 'active' : ''}`} />
              {isPlaying && step === 2 && <circle r="5" fill="#0071e3" className="packet pack-1" />}
              {isPlaying && step === 3 && <circle r="5" fill="#8622e6" className="packet pack-2" />}
            </svg>

            <div className={`node node-center ${step >= 3 ? 'active' : ''}`}>
              <span className="icon">⚙</span>
              <span className="lbl">CRM API qualification</span>
            </div>

            <div className={`node node-right ${step >= 4 ? 'active' : ''}`}>
              <span className="icon">🚀</span>
              <span className="lbl">Sync Success</span>
            </div>
          </div>

          {/* SIMULATOR CORE DYNAMIC CONTENT AREA */}
          <div className="dynamic-box flex-center">
            
            {/* 0. Idle View */}
            {step === 0 && (
              <div className="idle-view flex-center animate-fade-up">
                <span className="play-icon" onClick={runSimulation}>▶</span>
                <h3>System Ready</h3>
                <p>Initializing automated Vitz.ai growth pipeline sequence...</p>
                <button onClick={runSimulation} className="btn btn-primary" style={{ marginTop: '1.25rem' }}>
                  Initializing Loop...
                </button>
              </div>
            )}

            {/* 1. Booting qual-responder */}
            {step === 1 && (
              <div className="booting-view animate-fade-up">
                <div className="terminal-header">
                  <span className="pulse-tag">INITIALIZING</span>
                  <span>Webhook Qualification Protocol...</span>
                </div>
                <div className="terminal-lines">
                  <p className="green-text">&gt; [API] Listening on webhook URL path: /vitz-pipeline-ingress</p>
                  <p className="green-text">&gt; [SYS] Initializing validation protocols... ONLINE</p>
                  <p className="green-text">&gt; [SYS] Connecting custom CRM relational keys... SECURE</p>
                  <p className="blue-text">&gt; [LLM] Context cache populated successfully.</p>
                  <p className="pulse-text">&gt; Listening for inbound lead qualifying entries...</p>
                </div>
              </div>
            )}

            {/* 2. Lead captured */}
            {step === 2 && (
              <div className="intake-view animate-fade-up">
                <div className="lead-card glass-card">
                  <div className="card-top">
                    <span className="glow-badge">CAPTURED</span>
                    <span className="time">Just now</span>
                  </div>
                  <h3>Sarah Jenkins</h3>
                  <span className="company">HealthPulse Diagnostics</span>
                  <div className="divider"></div>
                  <div className="details">
                    <span>Sector: Healthcare</span>
                    <span>Score: 84% Scale Readiness</span>
                  </div>
                </div>
                <div className="intake-status">
                  <div className="spinner"></div>
                  <span>Triggering Zapier webhook relays & qualifying database entries...</span>
                </div>
              </div>
            )}

            {/* 3. WhatsApp Dispatch */}
            {step === 3 && (
              <div className="whatsapp-view animate-fade-up">
                <div className="phone-screen glass-card">
                  <div className="phone-header">
                    <span className="phone-avatar flex-center">V</span>
                    <div className="phone-info">
                      <h4>Vitz Growth Pipeline</h4>
                      <span>Online</span>
                    </div>
                  </div>
                  <div className="phone-chat-body">
                    <div className="whatsapp-bubble">
                      <p>{whatsappText}</p>
                      <span className="time">Delivered</span>
                    </div>
                  </div>
                </div>
                <div className="whatsapp-status">
                  <div className="spinner-purple"></div>
                  <span>Outbound WhatsApp qualification sequence playing...</span>
                </div>
              </div>
            )}

            {/* 4. Converted Success */}
            {step === 4 && (
              <div className="success-view flex-center animate-fade-up">
                <span className="spark-emoji">🏆</span>
                <h3>Ecosystem qualification Complete!</h3>
                <p>Lead converted. WhatsApp brochure qualified. Relational CRM nodes synchronized.</p>
                
                <div className="ticker-bump">
                  <div className="bump-item">
                    <span>Scaled Brands</span>
                    <span className="glow-text text-bump">147 ➔ 148</span>
                  </div>
                  <div className="bump-item">
                    <span>Database Status</span>
                    <span className="green-label">CONVERTED</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      <style jsx>{`
        .simulator-container {
          width: 100%;
          max-width: 580px;
          margin: 0 auto;
          padding: 0;
          background: #090a10;
          border-color: rgba(0, 113, 227, 0.15);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 113, 227, 0.1);
          overflow: hidden;
          height: 560px; /* Lock the card height completely, but make it large enough */
        }

        .sim-header {
          background: #0f1016;
          padding: 0.85rem 1.25rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sim-dots {
          display: flex;
          gap: 0.35rem;
        }

        .sim-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .sim-dot-red { background: #ef4444; }
        .sim-dot-yellow { background: #f59e0b; }
        .sim-dot-green { background: #10b981; }

        .sim-title {
          font-family: monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .sim-badge {
          font-size: 0.65rem;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        /* Screen Styling */
        .sim-screen {
          padding: 1.5rem;
          position: relative;
          min-height: 380px;
          display: flex;
          flex-direction: column;
        }

        /* Nodes network header */
        .screen-grid-nodes {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          height: 80px;
          border-bottom: 1px dashed var(--border-color);
          margin-bottom: 1.5rem;
          padding: 0 1rem;
        }

        .node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.3;
          transition: opacity 0.5s ease, transform 0.5s ease;
          z-index: 5;
        }

        .node.active {
          opacity: 1;
          transform: scale(1.05);
        }

        .node .icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: border-color 0.5s ease, box-shadow 0.5s ease;
        }

        .node.active .icon {
          border-color: var(--accent-blue);
          box-shadow: 0 0 15px rgba(0, 113, 227, 0.3);
          background: rgba(0, 113, 227, 0.05);
        }

        .node-right.active .icon {
          border-color: #10b981;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.05);
        }

        .node .lbl {
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* SVG connecting cords */
        .connector-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .cable {
          stroke: var(--border-color);
          stroke-width: 2;
          stroke-dasharray: 4;
          fill: none;
          transition: stroke 0.5s ease;
        }

        .cable.active {
          stroke: var(--accent-blue);
          animation: stroke-dash 1s infinite linear;
        }

        @keyframes stroke-dash {
          to { stroke-dashoffset: -8; }
        }

        /* Packet Pulses */
        .packet {
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        .pack-1 {
          animation: packet-path-1 2s infinite linear;
        }

        .pack-2 {
          animation: packet-path-2 2s infinite linear;
        }

        @keyframes packet-path-1 {
          0% { motion-offset: 0%; offset-distance: 0%; cx: 120; cy: 30; }
          100% { motion-offset: 100%; offset-distance: 100%; cx: 220; cy: 30; }
        }

        @keyframes packet-path-2 {
          0% { motion-offset: 0%; offset-distance: 0%; cx: 330; cy: 30; }
          100% { motion-offset: 100%; offset-distance: 100%; cx: 430; cy: 30; }
        }

        /* Dynamic Contents box */
        .dynamic-box {
          flex: 1;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          border: 1px solid var(--border-color);
          padding: 1.5rem;
          height: 360px;
          overflow-y: auto;
        }

        /* 0. Idle Styling */
        .idle-view {
          flex-direction: column;
          text-align: center;
        }

        .play-icon {
          font-size: 2.2rem;
          color: var(--accent-blue);
          animation: pulse-play 1.5s infinite alternate;
          display: inline-block;
          cursor: pointer;
        }

        @keyframes pulse-play {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 1; }
        }

        .idle-view h3 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-top: 0.5rem;
        }

        .idle-view p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          max-width: 320px;
          margin-top: 0.25rem;
        }

        /* 1. Booting Styling */
        .booting-view {
          width: 100%;
          text-align: left;
        }

        .terminal-header {
          display: flex;
          gap: 0.75rem;
          font-size: 0.8rem;
          font-family: monospace;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.35rem;
        }

        .pulse-tag {
          color: var(--accent-blue);
          font-weight: bold;
          animation: blink 0.8s infinite alternate;
        }

        .terminal-lines {
          font-family: monospace;
          font-size: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .green-text { color: #10b981; }
        .blue-text { color: #38bdf8; }
        .pulse-text { color: var(--text-primary); animation: blink 1s infinite alternate; }

        /* 2. Intake Card styling */
        .intake-view {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          justify-content: center;
        }

        .lead-card {
          width: 100%;
          max-width: 350px;
          padding: 1.25rem !important;
          border-radius: 12px !important;
          overflow: visible !important;
          border-color: rgba(0, 113, 227, 0.2);
          box-shadow: 0 10px 25px rgba(0, 113, 227, 0.05);
          gap: 0 !important;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .lead-card h3 {
          font-size: 1.15rem;
          margin-bottom: 0.4rem;
        }

        .company {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .lead-card .divider {
          width: 100%;
          height: 1px;
          background: var(--border-color);
          margin: 0.75rem 0;
        }

        .lead-card .details {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .intake-status, .whatsapp-status {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .spinner {
          width: 12px;
          height: 12px;
          border: 2px solid var(--accent-blue);
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s infinite linear;
        }

        .spinner-purple {
          width: 12px;
          height: 12px;
          border: 2px solid var(--accent-purple);
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s infinite linear;
        }

        /* 3. WhatsApp View */
        .whatsapp-view {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }

        .phone-screen {
          width: 100%;
          max-width: 320px;
          border-radius: 12px;
          padding: 0;
          background: #040406;
          overflow: hidden;
        }

        .phone-header {
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid var(--border-color);
          padding: 0.6rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .phone-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--accent-purple);
          color: white;
          font-weight: bold;
          font-size: 0.65rem;
        }

        .phone-info h4 {
          font-size: 0.75rem;
          font-weight: 700;
        }

        .phone-info span {
          font-size: 0.6rem;
          color: #10b981;
          display: block;
        }

        .phone-chat-body {
          padding: 1rem;
          min-height: 90px;
        }

        .whatsapp-bubble {
          background: rgba(134, 34, 230, 0.08);
          border: 1px solid rgba(134, 34, 230, 0.2);
          border-radius: 8px;
          padding: 0.6rem 0.85rem;
          font-size: 0.75rem;
          max-width: 90%;
          text-align: left;
        }

        .whatsapp-bubble p {
          color: var(--text-primary);
          line-height: 1.4;
        }

        .whatsapp-bubble .time {
          font-size: 0.55rem;
          color: var(--accent-purple);
          display: block;
          text-align: right;
          margin-top: 0.25rem;
        }

        /* 4. Success View */
        .success-view {
          flex-direction: column;
          text-align: center;
        }

        .spark-emoji {
          font-size: 2.5rem;
          animation: spark-scale 1s infinite alternate;
          display: inline-block;
        }

        @keyframes spark-scale {
          from { transform: scale(0.9); }
          to { transform: scale(1.1); }
        }

        .success-view h3 {
          font-size: 1.15rem;
          margin-top: 0.5rem;
          color: #10b981;
        }

        .success-view p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          max-width: 320px;
        }

        .ticker-bump {
          display: flex;
          gap: 1.5rem;
          margin-top: 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 0.6rem 1.5rem;
          border-radius: 6px;
        }

        .bump-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bump-item span:nth-child(1) {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .text-bump {
          font-size: 0.95rem;
          font-weight: bold;
        }

        .green-label {
          color: #10b981;
          font-size: 0.85rem;
          font-weight: bold;
          margin-top: 0.15rem;
        }
      `}</style>
    </>
  );
}
