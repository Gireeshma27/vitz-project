'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Portfolio() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 'healthpulse',
      category: 'dev',
      title: 'HealthPulse Clinic Systems',
      tag: 'Next.js App & AI Automation',
      desc: 'Engineered a unified patient-onboarding portal integrated with HIPAA-compliant CRM syncs and custom WhatsApp notifications.',
      before: 'Patient onboarding took 45 minutes of manual office coordination and paper forms, leading to high receptionist overhead.',
      after: 'Onboarding is fully autonomous. 100% digital syncs. Reduced patient check-in times to under 3 minutes.',
      metric: '4,200 hrs/yr saved'
    },
    {
      id: 'nexus',
      category: 'brand',
      title: 'Nexus Ventures Launch',
      tag: 'Core Branding & Identity',
      desc: 'Designed a premium global brand identity, custom typography scales, investor pitch visuals, and responsive corporate portals.',
      before: 'Fuzzy market identity, low-standard local template website, failing to attract high-ticket VC investments.',
      after: 'Stunning premium digital presence aligned with elite international standards, securing $12M Series A funding within 3 months.',
      metric: 'Apple-Grade Skin'
    },
    {
      id: 'apex',
      category: 'automation',
      title: 'Apex Realty Automation',
      tag: 'Lead Capture & WhatsApp CRM',
      desc: 'Constructed custom landing platforms integrated with real-time WhatsApp automation and webhook pipelines for instant agent qualification.',
      before: 'Leads from Facebook/Google ads sat idle in email inboxes for hours, resulting in a high lead leakage rate.',
      after: 'Automated qualification triggers a detailed WhatsApp brief to the client within 3 seconds, logging data in CRM.',
      metric: 'Zero Lead Leaks'
    },
    {
      id: 'sato',
      category: 'dev',
      title: 'Sato Ventures Dashboard',
      tag: 'Business Platform & CRM',
      desc: 'Built a multi-agent dashboard visualizing lead statistics, operational system health, and campaign ROI in real-time.',
      before: 'Executives had to manually compile Excel sheets from 5 separate advertising and software accounts every Friday.',
      after: 'Unified data nodes feeding automated visual charts in real-time, providing immediate corporate intelligence.',
      metric: 'Real-Time Insights'
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <>
      <section className="port-hero-section">
        <div className="glowing-bg glow-blue" style={{ opacity: 0.12 }}></div>
        <div className="container">
          <span className="glow-badge">Proven Results</span>
          <h1 className="port-title">
            Global <span className="glow-text">Portfolio</span>
          </h1>
          <p className="port-subtitle">
            Minimal, premium case studies showing how we replace fragmented tools with custom digital frameworks that drive business scale.
          </p>
        </div>
      </section>

      {/* Portfolio Filter bar */}
      <section className="port-filters-section">
        <div className="container">
          <div className="filters-container glass-card">
            <button onClick={() => setFilter('all')} className={`filter-btn ${filter === 'all' ? 'active' : ''}`}>All Works</button>
            <button onClick={() => setFilter('dev')} className={`filter-btn ${filter === 'dev' ? 'active' : ''}`}>Next.js & App Dev</button>
            <button onClick={() => setFilter('brand')} className={`filter-btn ${filter === 'brand' ? 'active' : ''}`}>Branding & Creative</button>
            <button onClick={() => setFilter('automation')} className={`filter-btn ${filter === 'automation' ? 'active' : ''}`}>AI & Automation</button>
          </div>
        </div>
      </section>

      {/* Case studies list */}
      <section className="port-grid-section">
        <div className="container">
          <div className="grid-2">
            {filteredProjects.map((p) => (
              <div key={p.id} className="glass-card project-detail-card border-glow-purple">
                <div className="proj-image-box">
                  <img src={`/assets/portfolio_${p.id}.png`} className="proj-case-img" alt={p.title} />
                  <span className="proj-metric-badge">{p.metric}</span>
                </div>

                <div className="proj-header">
                  <span className="proj-tag">{p.tag}</span>
                  <h2>{p.title}</h2>
                  <p className="proj-desc">{p.desc}</p>
                </div>

                <div className="comparison-box">
                  <div className="comp-item">
                    <span className="comp-label before-label">Legacy State:</span>
                    <p className="comp-text">{p.before}</p>
                  </div>
                  <div className="comp-divider"></div>
                  <div className="comp-item">
                    <span className="comp-label after-label">Scaled Architecture:</span>
                    <p className="comp-text text-white">{p.after}</p>
                  </div>
                </div>

                <div className="proj-footer">
                  <Link href="#book" className="btn btn-primary" style={{ width: '100%' }}>
                    Configure Similar Ecosystem
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client CTA section */}
      <section className="port-outro-section">
        <div className="container">
          <div className="outro-box glass-card flex-center">
            <h2>Ready to Write Your Case Study?</h2>
            <p>
              Let’s audit your legacy bottlenecks, upgrade your technology architecture, and build a premium international expansion machine.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link href="#book" className="btn btn-primary">
                Schedule Founders Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .port-hero-section {
          padding: 6rem 0 3rem 0;
          text-align: center;
          position: relative;
          border-bottom: 1px solid var(--border-color);
        }

        .port-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 1.25rem;
          letter-spacing: -0.03em;
        }

        .port-subtitle {
          max-width: 780px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-size: 1.15rem;
          line-height: 1.7;
        }

        /* Filter Tab styling */
        .port-filters-section {
          padding: 3rem 0;
          background: rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid var(--border-color);
        }

        .filters-container {
          padding: 0.5rem 1.5rem !important;
          display: flex !important;
          flex-direction: row !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 0.5rem !important;
          border-radius: 100px !important;
          flex-wrap: wrap !important;
          min-height: auto !important;
        }

        .filter-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-family-body);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.65rem 1.4rem;
          border-radius: 50px;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .filter-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.02);
        }

        .filter-btn.active {
          background: var(--glow-gradient);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 113, 227, 0.2);
        }

        /* Portfolio project grid */
        .port-grid-section {
          padding: 6rem 0;
          border-bottom: 1px solid var(--border-color);
          background: rgba(0, 0, 0, 0.05);
        }

        .project-detail-card {
          padding: 0;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .proj-image-box {
          height: 200px;
          position: relative;
          overflow: hidden;
          background: #090a10;
          border-bottom: 1px solid var(--border-color);
        }

        .proj-case-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--transition-slow);
        }

        .project-detail-card:hover .proj-case-img {
          transform: scale(1.05);
        }

        .proj-metric-badge {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.35);
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          z-index: 5;
        }

        .proj-header {
          padding: 2.5rem 2.5rem 1.5rem 2.5rem;
        }

        .proj-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent-purple);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .proj-header h2 {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
        }

        .proj-desc {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        /* Comparison block */
        .comparison-box {
          background: rgba(0, 0, 0, 0.15);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 2.25rem 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          flex: 1;
        }

        .comp-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .comp-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .before-label { color: #ef4444; }
        .after-label { color: #10b981; }

        .comp-text {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .text-white {
          color: var(--text-primary) !important;
          font-weight: 500;
        }

        .comp-divider {
          width: 100%;
          height: 1px;
          background: var(--border-color);
        }

        .proj-footer {
          padding: 2rem 2.5rem;
          margin-top: auto;
          display: flex;
          width: 100%;
        }

        /* Outro section */
        .port-outro-section {
          padding: 7rem 0;
        }

        .outro-box {
          padding: 4.5rem;
          flex-direction: column;
          text-align: center;
          border-color: rgba(134, 34, 230, 0.15);
          background: linear-gradient(135deg, rgba(134, 34, 230, 0.02) 0%, transparent 100%);
        }

        .outro-box h2 {
          font-size: 2.2rem;
          margin-bottom: 1rem;
        }

        .outro-box p {
          max-width: 650px;
          margin: 0 auto;
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }
      `}</style>
    </>
  );
}
