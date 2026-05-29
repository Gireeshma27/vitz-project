'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('all');

  const solutionTracks = [
    {
      id: 'automate',
      category: 'automation',
      title: 'AI & Operational Automation',
      tagline: 'Eradicate operational friction and manual administrative overhead.',
      bullets: [
        'AI Conversational Chatbots styled with custom UI',
        'WhatsApp Automated notification systems & webhook pipelines',
        'Automatic CRM integrations & real-time team syncing',
        'Dynamic invoice generation & automatic contract drafting workflows',
        'Pre-programmed support agents managing routine inquiries'
      ],
      focus: 'Saving corporate hours, increasing internal margins, and delivering flawless customer engagement workflows.'
    },
    {
      id: 'dev',
      category: 'development',
      title: 'Website & App Development',
      tagline: 'High-performance digital skins engineered on modern architectures.',
      bullets: [
        'Corporate & Portfolio websites designed in Next.js',
        'High-converting static landing pages with glassmorphism layouts',
        'Custom corporate database systems & business platforms',
        'Secure dashboard systems visualizing business statistics',
        'Full mobile application blueprints matching global web ecosystems'
      ],
      focus: 'Speed-of-light load times, premium responsive visual designs, Google SEO authority, and absolute scalability.'
    },
    {
      id: 'brand',
      category: 'creative',
      title: 'Branding & Creative Solutions',
      tagline: 'Visual skins designed to command premium pricing.',
      bullets: [
        'Premium Corporate Brand Identities & Logos',
        'Comprehensive style sheets, color palettes, and typography guidelines',
        'Visual assets for pitch-decks and investor relations',
        'Cohesive social media assets and templates',
        'High-end creative packaging design and marketing materials'
      ],
      focus: 'Commanding higher price tickets, projecting instant credibility, and standing out in crowded international sectors.'
    },
    {
      id: 'market',
      category: 'growth',
      title: 'Marketing & ROI Growth Systems',
      tagline: 'Scientific client acquisition engines engineered for high-intent traffic.',
      bullets: [
        'SEO (Search Engine Optimization) authority blueprints',
        'Targeted performance marketing campaigns (Google Ads, Meta, LinkedIn)',
        'Data-driven lead generation and outbound funnel syncing',
        'Personalized campaign dashboards auditing click-to-close metrics',
        'Modern copy and content architecture designed for conversion'
      ],
      focus: 'Capturing premium high-ticket client attention, bypassing low-budget ₹3k prospects, and driving ROI.'
    },
    {
      id: 'sales',
      category: 'infrastructure',
      title: 'Sales & Support Infrastructure',
      tagline: 'Our ultimate differentiator. We build the engine that closes your traffic.',
      bullets: [
        'Dedicated Sales enablement processes and custom training blueprints',
        'Remote customer support integration and ticketing setup',
        'Active CRM pipeline management assisting your internal executives',
        'Lead qualification scripting and automated scheduler setups',
        'Unified operations support handling client relationship cycles'
      ],
      focus: 'Ensuring no lead leaks, maintaining client retention records, and optimizing sales conversion margins.'
    }
  ];

  const filteredTracks = activeTab === 'all' 
    ? solutionTracks 
    : solutionTracks.filter(t => t.category === activeTab);

  return (
    <>
      <section className="sol-hero-section">
        <div className="glowing-bg glow-blue" style={{ opacity: 0.12 }}></div>
        <div className="container">
          <span className="glow-badge">Our Playbook</span>
          <h1 className="sol-title">
            Interconnected <span className="glow-text">Solutions</span>
          </h1>
          <p className="sol-subtitle">
            We don’t sell fragmented features. We deploy comprehensive scaling systems. Each solution track integrates with the others to construct a high-performance, autonomous enterprise.
          </p>
        </div>
      </section>

      {/* Tab Filter bar */}
      <section className="sol-filters-section">
        <div className="container">
          <div className="filters-container glass-card">
            <button onClick={() => setActiveTab('all')} className={`filter-btn ${activeTab === 'all' ? 'active' : ''}`}>All Solutions</button>
            <button onClick={() => setActiveTab('automation')} className={`filter-btn ${activeTab === 'automation' ? 'active' : ''}`}>AI & Automation</button>
            <button onClick={() => setActiveTab('development')} className={`filter-btn ${activeTab === 'development' ? 'active' : ''}`}>Web & App Dev</button>
            <button onClick={() => setActiveTab('creative')} className={`filter-btn ${activeTab === 'creative' ? 'active' : ''}`}>Branding & Design</button>
            <button onClick={() => setActiveTab('growth')} className={`filter-btn ${activeTab === 'growth' ? 'active' : ''}`}>Growth Systems</button>
            <button onClick={() => setActiveTab('infrastructure')} className={`filter-btn ${activeTab === 'infrastructure' ? 'active' : ''}`}>Sales Infrastructure</button>
          </div>
        </div>
      </section>

      {/* Detailed Tracks */}
      <section className="sol-tracks-section">
        <div className="container">
          <div className="tracks-list">
            {filteredTracks.map((track) => (
              <div key={track.id} id={track.id} className="glass-card track-detail-card border-glow-purple">
                <div className="track-header">
                  <span className="track-cat">{track.category} track</span>
                  <h2>{track.title}</h2>
                  <p className="track-tagline">{track.tagline}</p>
                </div>

                <div className="track-grid">
                  {/* Capabilities List */}
                  <div className="track-bullets-col">
                    <h4>Core Capabilities:</h4>
                    <ul className="track-bullets">
                      {track.bullets.map((bullet, idx) => (
                        <li key={idx}>
                          <span className="bullet-dot">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cinematic Visual Showcase */}
                  <div className="track-visual-col flex-center">
                    <div className="track-image-box glass-card">
                      <img 
                        src={`/assets/solutions_${track.id === 'brand' ? 'branding' : track.id === 'market' ? 'marketing' : track.id === 'automate' ? 'automation' : track.id}.png`} 
                        className="track-illustrative-img" 
                        alt={track.title} 
                      />
                    </div>
                  </div>

                  {/* Strategic Focus Card */}
                  <div className="track-meta-col flex-center">
                    <div className="meta-info-box">
                      <h4>Strategic Focus:</h4>
                      <p>{track.focus}</p>
                      
                      <div className="meta-footer">
                        <div className="divider"></div>
                        <Link href="#book" className="btn btn-primary" style={{ width: '100%' }}>
                          Configure This Track
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .sol-hero-section {
          padding: 6rem 0 3rem 0;
          text-align: center;
          position: relative;
          border-bottom: 1px solid var(--border-color);
        }

        .sol-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 1.25rem;
          letter-spacing: -0.03em;
        }

        .sol-subtitle {
          max-width: 780px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-size: 1.15rem;
          line-height: 1.7;
        }

        /* Filter Tab styling */
        .sol-filters-section {
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

        /* Detail track cards */
        .sol-tracks-section {
          padding: 6rem 0;
        }

        .tracks-list {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .track-detail-card {
          padding: 3.5rem;
        }

        @media (max-width: 600px) {
          .track-detail-card {
            padding: 2rem;
          }
        }

        .track-header {
          margin-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
        }

        .track-cat {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--accent-purple);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .track-header h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .track-tagline {
          font-size: 1rem;
          color: var(--text-secondary);
        }

        .track-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 2.5rem;
          align-items: stretch;
        }

        .track-visual-col {
          width: 100%;
        }

        .track-image-box {
          padding: 0;
          border-radius: 12px;
          overflow: hidden;
          width: 100%;
          height: 100%;
          min-height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: var(--glass-border);
          box-shadow: 0 10px 30px rgba(0, 113, 227, 0.05);
        }

        .track-illustrative-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--transition-medium);
        }

        .track-image-box:hover .track-illustrative-img {
          transform: scale(1.05);
        }

        @media (max-width: 1100px) {
          .track-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 2.5rem;
          }
          .track-visual-col {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .track-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .track-visual-col {
            display: flex !important;
            max-width: 320px;
            margin: 0 auto;
          }
          .track-image-box {
            min-height: 160px;
          }
        }

        .track-bullets-col h4, .meta-info-box h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .track-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .track-bullets li {
          font-size: 0.95rem;
          color: var(--text-primary);
          display: flex;
          gap: 0.75rem;
          line-height: 1.5;
        }

        .bullet-dot {
          color: var(--accent-blue);
          font-weight: bold;
        }

        .meta-info-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 2rem;
          width: 100%;
        }

        .meta-info-box p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .meta-footer {
          margin-top: 1.5rem;
        }

        .meta-footer .divider {
          width: 100%;
          height: 1px;
          background: var(--border-color);
          margin-bottom: 1.5rem;
        }
      `}</style>
    </>
  );
}
