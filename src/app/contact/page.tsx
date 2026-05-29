'use client';

import React, { useState } from 'react';
import { useLeads } from '@/context/LeadContext';

export default function Contact() {
  const { addLead } = useLeads();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: 'Startups',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) return;

    // Sync CRM lead database
    addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      industry: formData.industry,
      message: `Direct Form Inquiry: ${formData.message}`
    });

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      industry: 'Startups',
      message: ''
    });
  };

  return (
    <>
      <section className="contact-hero-section">
        <div className="glowing-bg glow-blue" style={{ opacity: 0.12 }}></div>
        <div className="container">
          <span className="glow-badge">Connect</span>
          <h1 className="contact-title">
            Let’s Build <span className="glow-text">The Future.</span>
          </h1>
          <p className="contact-subtitle">
            Initiate corporate synchronization. Schedule a consultation or dispatch an inquiry to sync directly with our engineering founders.
          </p>
        </div>
      </section>

      {/* Main contact area */}
      <section className="contact-grid-section">
        <div className="container">
          <div className="grid-2">
            
            {/* Left Col: Credentials */}
            <div className="contact-info-col">
              <span className="glow-badge glow-badge-purple" style={{ alignSelf: 'center' }}>Direct Channels</span>
              <h2>Global Headquarters</h2>
              <p className="info-intro-p">Our primary operational offices are optimized for remote international synchronization and strategic consulting.</p>

              <div className="info-list">
                <div className="info-item">
                  <span className="info-icon">✉</span>
                  <div>
                    <h4>Corporate Strategy Sync</h4>
                    <p className="text-white">partners@vitz.ai</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">☏</span>
                  <div>
                    <h4>Global Sales Support</h4>
                    <p className="text-white">+1 (800) 555-VITZ</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </span>
                  <div>
                    <h4>WhatsApp Business Chat</h4>
                    <p className="text-white">Syncs instantly to AI CRM</p>
                  </div>
                </div>
              </div>

              {/* Mock Google Map */}
              <div className="map-mock glass-card flex-center border-glow-purple">
                <div className="map-dot"></div>
                <div className="map-pulse"></div>
                <span className="map-label">VITZ.AI GLOBAL CLOUD SYSTEM</span>
              </div>
            </div>

            {/* Right Col: Inquiry Form */}
            <div className="contact-form-col">
              <div className="glass-card form-wrapper-card">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <h3>Inquiry Credentials</h3>
                    <p style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Fill out the form to dispatch an automated notification sequence to our strategy executives.
                    </p>

                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g. Satoshi Nakamoto"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Corporate Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="satoshi@bitcoin.org"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company Name</label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Bitcoin Foundation"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group" style={{ flex: '1' }}>
                        <label className="form-label">WhatsApp Contact</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="For instant automation demo"
                        />
                      </div>
                      <div className="form-group" style={{ flex: '1' }}>
                        <label className="form-label">Target Industry</label>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="Startups">Startups</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="SMEs">SMEs / Mid-Market</option>
                          <option value="International">International</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Scale Ambitions & Brief</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-textarea"
                        placeholder="Explain your operational tech, branding, or AI automation goals..."
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                      Dispatch Form & Sync CRM
                    </button>
                  </form>
                ) : (
                  <div className="contact-success flex-center animate-fade-up">
                    <span className="success-emoji">📩</span>
                    <h2>Inquiry Dispatched Successfully!</h2>
                    <p style={{ margin: '1rem 0 1.5rem 0', color: 'var(--text-secondary)' }}>
                      Our automatic routing engine has successfully logged your requirements. Our founders have been notified via simulated WhatsApp sequences.
                    </p>

                    <div className="auto-demo-box">
                      <h4>API Sync Status:</h4>
                      <ul className="pipeline-steps">
                        <li className="pipeline-step-item completed">
                          <span className="bullet">✓</span> Dispatched corporate profile to CRM Lead Board.
                        </li>
                        <li className="pipeline-step-item completed">
                          <span className="bullet">✓</span> Triggered WhatsApp API welcome responder flow.
                        </li>
                      </ul>
                    </div>

                    <div className="helper-bubble" style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
                      <p>💡 Tip: Head to the <a href="/admin" className="success-admin-link">CRM Admin Dashboard</a> to see your lead entry and check the WhatsApp automation logs in real-time!</p>
                    </div>

                    <button onClick={() => setSubmitted(false)} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                      Send Another Inquiry
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-hero-section {
          padding: 6rem 0 3rem 0;
          text-align: center;
          position: relative;
          border-bottom: 1px solid var(--border-color);
        }

        .contact-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 1.25rem;
          letter-spacing: -0.03em;
        }

        .contact-subtitle {
          max-width: 780px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-size: 1.15rem;
          line-height: 1.7;
        }

        /* Grid contact areas */
        .contact-grid-section {
          padding: 6rem 0;
          background: rgba(0, 0, 0, 0.05);
        }

        .contact-info-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-info-col h2 {
          font-size: 2.2rem;
          letter-spacing: -0.02em;
        }

        .info-intro-p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .info-item {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }

        .info-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 113, 227, 0.08);
          border: 1px solid rgba(0, 113, 227, 0.2);
          color: var(--accent-blue);
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .info-item h4 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.2rem;
        }

        .text-white {
          color: var(--text-primary) !important;
          font-weight: 500;
          font-size: 1rem;
        }

        /* Mock Map Styling */
        .map-mock {
          height: 250px;
          background: radial-gradient(circle at center, rgba(134, 34, 230, 0.06) 0%, rgba(8, 8, 9, 0.8) 100%);
          border-color: rgba(134, 34, 230, 0.15);
          position: relative;
          overflow: hidden;
          margin-top: 2rem;
          flex-direction: column;
        }

        .map-dot {
          width: 12px;
          height: 12px;
          background-color: var(--accent-purple);
          border-radius: 50%;
          z-index: 2;
          box-shadow: 0 0 15px var(--accent-purple);
        }

        .map-pulse {
          position: absolute;
          width: 60px;
          height: 60px;
          border: 2px solid var(--accent-purple);
          border-radius: 50%;
          animation: map-ping 2s infinite ease-out;
          opacity: 0;
          pointer-events: none;
        }

        @keyframes map-ping {
          0% { transform: scale(0.2); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        .map-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent-purple);
          letter-spacing: 0.08em;
          margin-top: 1rem;
        }

        /* Form wrapper col */
        .form-wrapper-card {
          padding: 3rem;
        }

        @media (max-width: 600px) {
          .form-wrapper-card {
            padding: 1.75rem;
          }
        }

        .contact-form h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .form-row {
          display: flex;
          gap: 1rem;
        }

        @media (max-width: 500px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }

        /* Success screen styling */
        .contact-success {
          flex-direction: column;
          text-align: center;
        }

        .success-emoji {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .contact-success h2 {
          font-size: 1.8rem;
        }

        .auto-demo-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          width: 100%;
          text-align: left;
          margin-bottom: 1.5rem;
        }

        .auto-demo-box h4 {
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }

        .pipeline-steps {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .pipeline-step-item {
          font-size: 0.85rem;
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .pipeline-step-item.completed {
          color: #10b981;
        }

        .bullet {
          font-weight: bold;
        }

        .helper-bubble {
          font-size: 0.85rem;
          color: var(--text-secondary);
          background: rgba(134, 34, 230, 0.05);
          border: 1px solid rgba(134, 34, 230, 0.15);
          padding: 0.75rem 1rem;
          border-radius: 8px;
        }

        .success-admin-link {
          color: var(--accent-purple);
          text-decoration: underline;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
