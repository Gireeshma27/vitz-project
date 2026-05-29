'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function About() {
  const [activeTimeline, setActiveTimeline] = useState(0);

  const roadmap = [
    {
      year: 'Phase 1',
      title: 'Unified Foundation',
      desc: 'Merging branding expertise with modern technology engineering. We realized that beautiful code is useless without conversion architecture, and pretty designs are useless without blazing-fast software.'
    },
    {
      year: 'Phase 2',
      title: 'AI & Automation Sync',
      desc: 'Developing specialized workflows, custom CRM pipelines, and WhatsApp API modules to eradicate manual administrative overhead for scaling brands.'
    },
    {
      year: 'Phase 3',
      title: 'Sales & Support Teams',
      desc: 'Standing up dedicated remote operations systems and lead qualification workflows. Our clients don’t just buy dashboards – they deploy active conversion engines.'
    },
    {
      year: 'Phase 4',
      title: 'Global Domination',
      desc: 'Scaling startups, healthcare portals, real estate companies, and international mid-market SMEs to multi-million revenue structures through global branding and Next.js technology.'
    }
  ];

  return (
    <>
      <section className="about-hero-section">
        <div className="glowing-bg glow-purple" style={{ opacity: 0.12 }}></div>
        <div className="container">
          <div className="about-hero-grid">
            <div className="about-hero-left">
              <span className="glow-badge animate-fade-up">Our Creed</span>
              <h1 className="about-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
                The Digital Growth <span className="glow-text">Ecosystem</span>
              </h1>
              <p className="about-subtitle animate-fade-up" style={{ animationDelay: '0.2s' }}>
                We are not a low-cost software house or a local digital marketing agency. We are a premium, one-stop growth ecosystem designed to launch, build, automate, scale, and grow high-vision international enterprises.
              </p>
            </div>
            <div className="about-hero-right flex-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="about-image-container glass-card">
                <img src="/assets/about_ecosystem.png" className="about-img" alt="Vitz Ecosystem" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy cards */}
      <section className="about-philosophy">
        <div className="container">
          <div className="grid-3">
            <div className="glass-card ph-card">
              <h3>The Vision</h3>
              <p>To eliminate fragmented technology workflows and replace cheap local agency band-aids with high-integrity, Apple-level digital scaling systems that commands global attention.</p>
            </div>
            <div className="glass-card ph-card">
              <h3>The Mission</h3>
              <p>To empower startups, SMEs, and healthcare ecosystems with elite branding, advanced AI automation pipelines, and robust Next.js software backends that drive real-world revenue.</p>
            </div>
            <div className="glass-card ph-card border-glow-purple">
              <h3>The Strategy</h3>
              <p>Combine elite custom designs with lightning-fast software architectures, automated lead nurturing scripts, and active remote sales operations systems for flawless conversion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Roadmap */}
      <section className="about-timeline-section">
        <div className="container">
          <div className="section-header flex-center" style={{ marginBottom: '4rem' }}>
            <span className="glow-badge glow-badge-purple">Ecosystem Growth Roadmap</span>
            <h2>Our Evolutionary Playbook</h2>
            <p>A look at the milestones defining our high-standard system capabilities.</p>
          </div>

          <div className="timeline-interactive-container glass-card">
            <div className="timeline-nav">
              {roadmap.map((milestone, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTimeline(idx)}
                  className={`timeline-nav-btn ${activeTimeline === idx ? 'active' : ''}`}
                >
                  <span className="t-year">{milestone.year}</span>
                  <span className="t-title">{milestone.title}</span>
                </button>
              ))}
            </div>

            <div className="timeline-body-content animate-fade-up">
              <span className="body-phase">{roadmap[activeTimeline].year}: {roadmap[activeTimeline].title}</span>
              <p className="body-desc">{roadmap[activeTimeline].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Creed & Standards */}
      <section className="about-creed-section">
        <div className="container">
          <div className="creed-box glass-card">
            <span className="glow-badge">International Standards</span>
            <h2>Who We Work With</h2>
            <p>
              We thrive with high-vision builders, VC-backed startups, healthcare tech systems, real estate operations, and SMEs looking for long-term international expansion.
            </p>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
              If you are looking for ₹3k–₹5k low-cost, quick templates, or lack long-term digital ambitions, we are not the right partner. We build premium ecosystems for ambitious enterprises.
            </p>
            <div style={{ marginTop: '2.5rem' }}>
              <Link href="#book" className="btn btn-primary">
                Sync With Our Founders
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-hero-section {
          padding: 8rem 0 5rem 0;
          position: relative;
          border-bottom: 1px solid var(--border-color);
        }

        .about-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 900px) {
          .about-hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          .about-image-container {
            max-width: 480px;
            margin: 0 auto;
          }
        }

        .about-title {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 900;
          margin-bottom: 1.25rem;
          letter-spacing: -0.03em;
        }

        .about-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.7;
        }

        .about-image-container {
          padding: 0;
          border-radius: 16px;
          border: var(--glass-border);
          overflow: hidden;
          box-shadow: 0 20px 45px rgba(134, 34, 230, 0.1);
        }

        .about-img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform var(--transition-slow);
        }

        .about-image-container:hover .about-img {
          transform: scale(1.04);
        }

        /* Philosophy cards */
        .about-philosophy {
          padding: 6rem 0;
          border-bottom: 1px solid var(--border-color);
          background: rgba(0, 0, 0, 0.05);
        }

        .ph-card h3 {
          font-size: 1.35rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .ph-card p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Interactive Timeline Roadmap */
        .about-timeline-section {
          padding: 6rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .timeline-interactive-container {
          padding: 0 !important;
          display: flex !important;
          flex-direction: row !important;
          min-height: 350px !important;
          border-radius: 20px !important;
          border: var(--glass-border) !important;
          gap: 0 !important;
        }

        @media (max-width: 768px) {
          .timeline-interactive-container {
            flex-direction: column !important;
          }
        }

        .timeline-nav {
          width: 35% !important;
          border-right: 1px solid var(--border-color) !important;
          display: flex !important;
          flex-direction: column !important;
        }

        @media (max-width: 768px) {
          .timeline-nav {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border-color) !important;
            flex-direction: row !important;
            overflow-x: auto !important;
          }
        }

        .timeline-nav-btn {
          background: transparent;
          border: none;
          padding: 2rem;
          cursor: pointer;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          transition: var(--transition-fast);
        }

        @media (max-width: 768px) {
          .timeline-nav-btn {
            flex: 1;
            padding: 1.25rem;
            min-width: 150px;
            border-bottom: none;
            border-right: 1px solid var(--border-color);
          }
        }

        .timeline-nav-btn:last-child {
          border-bottom: none;
        }

        .timeline-nav-btn:hover {
          background: rgba(255, 255, 255, 0.01);
        }

        .timeline-nav-btn.active {
          background: rgba(0, 113, 227, 0.03);
          border-left: 3px solid var(--accent-blue);
        }

        @media (max-width: 768px) {
          .timeline-nav-btn.active {
            border-left: none;
            border-bottom: 3px solid var(--accent-blue);
          }
        }

        .t-year {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .t-title {
          font-family: var(--font-family-title);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .timeline-nav-btn.active .t-title {
          color: var(--text-primary);
        }

        .timeline-body-content {
          width: 65% !important;
          padding: 4rem !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
        }

        @media (max-width: 768px) {
          .timeline-body-content {
            width: 100% !important;
            padding: 2.5rem !important;
          }
        }

        .body-phase {
          font-family: var(--font-family-title);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          display: block;
        }

        .body-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* Creed & Standards styling */
        .about-creed-section {
          padding: 7rem 0;
        }

        .creed-box {
          padding: 4.5rem;
          text-align: center;
          border-color: rgba(134, 34, 230, 0.15);
          background: linear-gradient(135deg, rgba(134, 34, 230, 0.02) 0%, transparent 100%);
        }

        .creed-box h2 {
          font-size: 2.2rem;
          margin: 0.5rem 0 1rem 0;
        }

        .creed-box p {
          max-width: 650px;
          margin: 0 auto;
          font-size: 1.05rem;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}
