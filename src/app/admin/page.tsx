'use client';

import React, { useState } from 'react';
import { useLeads, Lead } from '@/context/LeadContext';

export default function Admin() {
  const { leads, logs, stats, updateLeadStatus, clearLeads, updateStats, addSystemLog, addLead } = useLeads();

  // Stats Editor State
  const [editStats, setEditStats] = useState({
    businessesScaled: stats.businessesScaled,
    automationHoursSaved: stats.automationHoursSaved,
    successRate: stats.successRate,
    globalPartners: stats.globalPartners
  });

  const [statsUpdated, setStatsUpdated] = useState(false);

  // New mock lead state
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadIndustry, setNewLeadIndustry] = useState('Startups');

  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditStats((prev) => ({
      ...prev,
      [name]: name === 'successRate' ? parseFloat(value) : parseInt(value)
    }));
  };

  const handleStatsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStats(editStats);
    setStatsUpdated(true);
    setTimeout(() => setStatsUpdated(false), 2500);
  };

  const triggerMockLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadCompany || !newLeadEmail) return;

    // We add a lead without score for custom manual admin entry
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0] + ' ' + today.toTimeString().split(' ')[0].substring(0, 5);
    
    // Trigger Context Lead addition
    updateLeadStatus(`manual-${Date.now()}`, 'New'); // Just dummy to trigger logging

    // Direct manual lead pushing log
    addSystemLog('CRM', `Manual Admin Lead Entry: ${newLeadName} (${newLeadCompany})`);
    
    // We trigger the context lead
    // For manual entry we simulate the lead
    const generatedScore = Math.floor(Math.random() * 50) + 40; // 40-90
    
    // Add lead
    // We can use context to add standard lead
    // But since context does Omit, we just invoke addLead:
    const mockMsg = `Manual Admin Entry. Category: ${newLeadIndustry}. Email: ${newLeadEmail}`;
    const dummyLead: Omit<Lead, 'id' | 'status' | 'date'> = {
      name: newLeadName,
      email: newLeadEmail,
      company: newLeadCompany,
      phone: '+1 (555) 987-6543',
      industry: newLeadIndustry,
      attractivenessScore: generatedScore,
      scoreDetails: {
        brand: generatedScore - 5,
        ai: generatedScore + 10 > 100 ? 100 : generatedScore + 10,
        tech: generatedScore - 10,
        ops: generatedScore
      },
      message: mockMsg
    };
    
    // Call context addLead
    addLead(dummyLead);

    // Reset inputs
    setNewLeadName('');
    setNewLeadCompany('');
    setNewLeadEmail('');
  };

  const cycleStatus = (id: string, currentStatus: Lead['status']) => {
    const nextStatus: Lead['status'] = 
      currentStatus === 'New' 
        ? 'Contacted' 
        : currentStatus === 'Contacted' 
          ? 'Converted' 
          : 'New';
    
    updateLeadStatus(id, nextStatus);
  };

  return (
    <>
      <section className="admin-hero">
        <div className="container">
          <span className="glow-badge glow-badge-purple">Control Center</span>
          <h1>Ecosystem CRM Console</h1>
          <p>
            Welcome, strategy director. Monitor real-time lead capture vectors, check automated WhatsApp webhook streams, and edit global site statistics.
          </p>
          <div className="helper-bubble" style={{ marginTop: '1rem', background: 'rgba(134, 34, 230, 0.04)' }}>
            <p>🔒 <strong>Client Demonstration Environment:</strong> Changes made here persist in your local browser storage. Go to the Homepage or Solutions page to verify updated metrics in real-time!</p>
          </div>
        </div>
      </section>

      {/* Main dashboard grid */}
      <section className="admin-dashboard-section">
        <div className="container">
          <div className="admin-grid">
            
            {/* LEFT AREA: Lead board */}
            <div className="admin-main-col">
              <div className="glass-card lead-board-card">
                <div className="board-header">
                  <h3>Lead Pipeline Intake</h3>
                  <button onClick={clearLeads} className="btn btn-secondary btn-purge" title="Purge database back to seed entries">
                    Purge & Seed DB
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="leads-table">
                    <thead>
                      <tr>
                        <th>Corporate Client</th>
                        <th>Sector</th>
                        <th>Audit Score</th>
                        <th>Pipeline Status</th>
                        <th>Intake Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l) => (
                        <tr key={l.id}>
                          <td>
                            <div className="client-meta">
                              <span className="client-name">{l.name}</span>
                              <span className="client-comp">{l.company}</span>
                              <span className="client-email">{l.email}</span>
                            </div>
                          </td>
                          <td>
                            <span className="sector-tag-table">{l.industry}</span>
                          </td>
                          <td>
                            {l.attractivenessScore !== undefined ? (
                              <div className="table-score-wrapper">
                                <span className={`table-score ${l.attractivenessScore > 75 ? 'score-high' : l.attractivenessScore >= 40 ? 'score-medium' : 'score-low'}`}>
                                  {l.attractivenessScore}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted">—</span>
                            )}
                          </td>
                          <td>
                            <button
                              onClick={() => cycleStatus(l.id, l.status)}
                              className={`status-pill ${
                                l.status === 'New' 
                                  ? 'status-pill-new' 
                                  : l.status === 'Contacted' 
                                    ? 'status-pill-contacted' 
                                    : 'status-pill-converted'
                              }`}
                              title="Click to cycle pipeline stage"
                            >
                              {l.status} ↻
                            </button>
                          </td>
                          <td className="table-date">{l.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT AREA: Logs and Stats Editor */}
            <div className="admin-side-col">
              
              {/* Stat editor */}
              <div className="glass-card panel-card">
                <h3>Live Statistic Tickers</h3>
                <p className="panel-desc">Tweak corporate indicators showing on the home page hero ticker.</p>
                
                <form onSubmit={handleStatsSubmit} className="stats-editor-form">
                  <div className="form-group">
                    <label className="form-label">Scaled Enterprises</label>
                    <input
                      type="number"
                      name="businessesScaled"
                      value={editStats.businessesScaled}
                      onChange={handleStatsChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Automation Hours Reclaimed</label>
                    <input
                      type="number"
                      name="automationHoursSaved"
                      value={editStats.automationHoursSaved}
                      onChange={handleStatsChange}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">System Performance (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      name="successRate"
                      value={editStats.successRate}
                      onChange={handleStatsChange}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Push Changes Globally
                  </button>

                  {statsUpdated && (
                    <div className="stats-update-success">
                      ✓ Dynamic values synced to main components!
                    </div>
                  )}
                </form>
              </div>

              {/* Webhook & Automation Live Stream */}
              <div className="glass-card panel-card" style={{ marginTop: '2rem' }}>
                <div className="panel-header-stream">
                  <h3>WhatsApp Webhook Stream</h3>
                  <span className="live-dot-pulse"></span>
                </div>
                <p className="panel-desc">Real-time webhook triggers, automated responder relays, and API calls.</p>
                
                <div className="logs-terminal">
                  {logs.map((log) => (
                    <div key={log.id} className="log-line">
                      <span className="log-time">[{log.timestamp}]</span>
                      <span className={`log-tag log-tag-${log.type.toLowerCase()}`}>
                        {log.type}
                      </span>
                      <span className="log-msg">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Manual Seed Creator */}
              <div className="glass-card panel-card" style={{ marginTop: '2rem' }}>
                <h3>Simulate Inbound Lead</h3>
                <p className="panel-desc">Create an automatic test lead to check system sync loops.</p>
                
                <form onSubmit={triggerMockLead} className="manual-lead-form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Prospect Name"
                      value={newLeadName}
                      onChange={(e) => setNewLeadName(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-row-admin">
                    <input
                      type="text"
                      placeholder="Company"
                      value={newLeadCompany}
                      onChange={(e) => setNewLeadCompany(e.target.value)}
                      required
                      className="form-input"
                      style={{ flex: '1' }}
                    />
                    <select
                      value={newLeadIndustry}
                      onChange={(e) => setNewLeadIndustry(e.target.value)}
                      className="form-select"
                      style={{ flex: '1' }}
                    >
                      <option value="Startups">Startups</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="SMEs">SMEs</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Prospect Email"
                      value={newLeadEmail}
                      onChange={(e) => setNewLeadEmail(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                  <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
                    Qualify Mock Lead
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        .admin-hero {
          padding: 6rem 0 3rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .admin-hero h1 {
          font-size: 2.8rem;
          margin-bottom: 0.5rem;
          letter-spacing: -0.03em;
        }

        .admin-hero p {
          max-width: 780px;
          color: var(--text-secondary);
        }

        /* Dashboard layouts */
        .admin-dashboard-section {
          padding: 5rem 0;
          background: rgba(0, 0, 0, 0.05);
        }

        .admin-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
        }

        @media (max-width: 1024px) {
          .admin-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        .lead-board-card {
          padding: 2.5rem;
          min-height: 500px;
        }

        @media (max-width: 600px) {
          .lead-board-card {
            padding: 1.5rem;
          }
        }

        .board-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .board-header h3 {
          font-size: 1.3rem;
          letter-spacing: -0.01em;
        }

        .btn-purge {
          padding: 0.45rem 1.1rem;
          font-size: 0.8rem;
          border-color: rgba(239, 68, 68, 0.2);
          color: #f87171;
        }

        .btn-purge:hover {
          background: rgba(239, 68, 68, 0.05);
          border-color: #ef4444;
        }

        /* Leads Table */
        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .leads-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .leads-table th {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .leads-table td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        .leads-table tr:hover td {
          background: rgba(255, 255, 255, 0.01);
        }

        .client-meta {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .client-name {
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .client-comp {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .client-email {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .sector-tag-table {
          font-size: 0.75rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          padding: 0.25rem 0.6rem;
          border-radius: 4px;
          color: var(--text-secondary);
        }

        .table-score-wrapper {
          display: flex;
        }

        .table-score {
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .score-high { background: rgba(16, 185, 129, 0.08); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
        .score-medium { background: rgba(0, 113, 227, 0.08); color: #38bdf8; border: 1px solid rgba(0, 113, 227, 0.2); }
        .score-low { background: rgba(239, 68, 68, 0.08); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); }

        .table-date {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        /* Sidebar Panels */
        .panel-card h3 {
          font-size: 1.15rem;
          margin-bottom: 0.25rem;
        }

        .panel-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          line-height: 1.4;
        }

        .stats-editor-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stats-editor-form .form-group {
          margin-bottom: 0;
        }

        .stats-update-success {
          font-size: 0.8rem;
          color: #10b981;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 6px;
          padding: 0.5rem 0.75rem;
          text-align: center;
          margin-top: 1rem;
        }

        /* Real-Time Logs terminal */
        .panel-header-stream {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .live-dot-pulse {
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
          box-shadow: 0 0 10px #ef4444;
          animation: map-ping 1.5s infinite ease-out;
        }

        .logs-terminal {
          background: #040405;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          height: 220px;
          overflow-y: auto;
          padding: 1rem;
          font-family: monospace;
          font-size: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .log-line {
          display: flex;
          gap: 0.5rem;
          line-height: 1.4;
        }

        .log-time {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .log-tag {
          font-weight: bold;
          text-transform: uppercase;
          font-size: 0.65rem;
          padding: 0.05rem 0.3rem;
          border-radius: 3px;
          flex-shrink: 0;
        }

        .log-tag-crm { background: rgba(0, 113, 227, 0.1); color: #38bdf8; border: 1px solid rgba(0, 113, 227, 0.2); }
        .log-tag-whatsapp { background: rgba(134, 34, 230, 0.1); color: #c084fc; border: 1px solid rgba(134, 34, 230, 0.2); }
        .log-tag-ai { background: rgba(16, 185, 129, 0.1); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.2); }
        .log-tag-email { background: rgba(245, 158, 11, 0.1); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.2); }

        .log-msg {
          color: #d1d5db;
        }

        /* Mock Inbound Form Creator */
        .manual-lead-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .manual-lead-form .form-group {
          margin-bottom: 0;
        }

        .form-row-admin {
          display: flex;
          gap: 0.75rem;
        }
      `}</style>
    </>
  );
}
