'use client';

import React, { useState, useEffect } from 'react';
import { useLeads } from '../context/LeadContext';

export default function SchedulerModal() {
  const { addLead } = useLeads();
  const [isOpen, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Startups',
    message: '',
    slot: ''
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Monitor URL Hash to toggle modal
  useEffect(() => {
    const checkHash = () => {
      setIsOpen(window.location.hash === '#book');
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const closeModal = () => {
    // Reset hash without reloading
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    setIsOpen(false);
    // Reset steps
    setTimeout(() => {
      setActiveStep(1);
      setBookingSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        industry: 'Startups',
        message: '',
        slot: ''
      });
    }, 400);
  };

  const selectSlot = (slotStr: string) => {
    setFormData((prev) => ({ ...prev, slot: slotStr }));
    setActiveStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company || !formData.slot) return;
    
    // Add to leads context (triggers system automations!)
    addLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      industry: formData.industry,
      message: `Preferred Slot: ${formData.slot}. Notes: ${formData.message}`
    });

    setBookingSuccess(true);
  };

  if (!isOpen) return null;

  const mockSlots = [
    { day: 'Tomorrow', time: '11:00 AM EST', label: 'Recommended' },
    { day: 'Tomorrow', time: '2:30 PM EST', label: 'Popular' },
    { day: 'Wednesday', time: '9:00 AM EST', label: 'Available' },
    { day: 'Wednesday', time: '4:00 PM EST', label: 'Available' },
    { day: 'Thursday', time: '1:00 PM EST', label: 'Limited' },
    { day: 'Friday', time: '10:30 AM EST', label: 'Fastest Sync' }
  ];

  return (
    <>
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-container glass-card" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal} aria-label="Close scheduler">×</button>

          {!bookingSuccess ? (
            <>
              <div className="modal-header">
                <span className="glow-badge glow-badge-purple">Growth Scheduler</span>
                <h2>Book Strategy Consultation</h2>
                <p>Unlock our unified tech, branding, and automation framework.</p>
                
                <div className="step-indicator">
                  <div className={`step-dot ${activeStep >= 1 ? 'active' : ''}`}>1. Select Slot</div>
                  <div className="step-line"></div>
                  <div className={`step-dot ${activeStep >= 2 ? 'active' : ''}`}>2. Corporate Info</div>
                </div>
              </div>

              {activeStep === 1 ? (
                <div className="slots-step">
                  <h3 className="section-title">Choose a session slot:</h3>
                  <div className="slots-grid">
                    {mockSlots.map((s, idx) => (
                      <button
                        key={idx}
                        className={`slot-card ${formData.slot === `${s.day} @ ${s.time}` ? 'selected' : ''}`}
                        onClick={() => selectSlot(`${s.day} @ ${s.time}`)}
                      >
                        <div className="slot-badge">{s.label}</div>
                        <span className="slot-day">{s.day}</span>
                        <span className="slot-time">{s.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="info-step animate-fade-up">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Corporate Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g. Elena Rostova"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Corporate Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="elena@company.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g. Apex Health Corp"
                      />
                    </div>
                    <div className="form-group">
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
                  </div>

                  <div className="form-row">
                    <div className="form-group" style={{ flex: '1' }}>
                      <label className="form-label">Target Sector</label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="Startups">Startups & VC</option>
                        <option value="Healthcare">Healthcare Systems</option>
                        <option value="Real Estate">Real Estate Ecosystems</option>
                        <option value="SMEs">SMEs / Medium Enterprise</option>
                        <option value="International">International Scaleups</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ flex: '1' }}>
                      <label className="form-label">Selected Slot</label>
                      <input
                        type="text"
                        disabled
                        value={formData.slot}
                        className="form-input disabled-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Scope & Scalability Ambitions</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="What digital infrastructure, marketing, or AI workflows do we need to launch or scale?"
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={() => setActiveStep(1)} className="btn btn-secondary">
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-primary btn-submit">
                      Confirm Consultation & Sync CRM
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="success-step flex-center">
              <span className="success-emoji">🚀</span>
              <h2>Ecosystem Synced Successfully!</h2>
              <p className="success-p">
                Excellent, <strong>{formData.name}</strong>. Your session is locked in for <strong>{formData.slot}</strong>.
              </p>
              
              <div className="auto-demo-box">
                <h4>Vitz CRM Automation Pipeline Actions Triggered:</h4>
                <ul className="pipeline-steps">
                  <li className="pipeline-step-item completed">
                    <span className="bullet">✓</span> Real-Time CRM sync complete. Lead categorized under <strong>{formData.industry}</strong>.
                  </li>
                  <li className="pipeline-step-item completed">
                    <span className="bullet">✓</span> Dispatched instant WhatsApp notification briefing package.
                  </li>
                  <li className="pipeline-step-item pending">
                    <span className="bullet">↻</span> Auto-generating personalized industry market research report for <strong>{formData.company}</strong>...
                  </li>
                </ul>
              </div>

              <div className="helper-bubble">
                <p>💡 Tip: Head over to the <a href="/admin" onClick={closeModal} className="success-admin-link">CRM Admin Dashboard</a> to inspect the real-time API logs, whatsapp status, and lead entry!</p>
              </div>

              <button onClick={closeModal} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Complete & Return to Site
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 4, 5, 0.85);
          backdrop-filter: blur(10px);
          z-index: 150;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fade-in 0.3s ease-out;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-container {
          width: 100%;
          max-width: 680px;
          position: relative;
          padding: 3rem;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.6);
        }

        @media (max-width: 600px) {
          .modal-container {
            padding: 1.75rem;
          }
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          font-size: 2.2rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
          line-height: 0.5;
        }

        .modal-close:hover {
          color: var(--text-primary);
        }

        .modal-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .modal-header h2 {
          font-size: 1.8rem;
          margin: 0.5rem 0;
        }

        .modal-header p {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .step-dot {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          border: 1px solid var(--border-color);
        }

        .step-dot.active {
          color: var(--accent-blue);
          border-color: var(--accent-blue);
          background: rgba(0, 113, 227, 0.05);
        }

        .step-line {
          width: 40px;
          height: 1px;
          background: var(--border-color);
        }

        .section-title {
          font-size: 1.05rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .slots-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (max-width: 500px) {
          .slots-grid {
            grid-template-columns: 1fr;
          }
        }

        .slot-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.25rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: var(--transition-medium);
          text-align: left;
        }

        .slot-card:hover {
          background: rgba(0, 113, 227, 0.03);
          border-color: rgba(0, 113, 227, 0.3);
          transform: scale(1.02);
        }

        .slot-badge {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--accent-blue);
          background: rgba(0, 113, 227, 0.08);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .slot-day {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .slot-time {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-top: 0.2rem;
        }

        .form-row {
          display: flex;
          gap: 1.25rem;
        }

        @media (max-width: 600px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }

        .form-row .form-group {
          flex: 1;
        }

        .disabled-input {
          background: rgba(255, 255, 255, 0.01) !important;
          border-color: var(--border-color) !important;
          color: var(--accent-blue) !important;
          font-weight: 600;
          cursor: not-allowed;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }

        .btn-submit {
          flex: 1;
          margin-left: 1rem;
        }

        /* Success Step CSS */
        .success-step {
          flex-direction: column;
          text-align: center;
        }

        .success-emoji {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          display: inline-block;
          animation: bounce 1.5s infinite alternate;
        }

        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }

        .success-p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin: 0.75rem 0 1.5rem 0;
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
          letter-spacing: -0.01em;
        }

        .pipeline-steps {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .pipeline-step-item {
          font-size: 0.85rem;
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }

        .pipeline-step-item.completed {
          color: #10b981;
        }

        .pipeline-step-item.pending {
          color: var(--text-muted);
        }

        .pipeline-step-item.pending .bullet {
          animation: rotate 2s infinite linear;
          display: inline-block;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
          margin-bottom: 1rem;
          width: 100%;
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
