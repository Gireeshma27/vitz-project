'use client';

import React from 'react';
import Link from 'next/link';

export default function Industries() {
  const sectors = [
    {
      id: 'startups',
      title: 'Venture-Backed Startups',
      challenge: 'High velocity requirements, raising capital, building technical MVPs quickly, and standing out to early adopters.',
      solution: 'We construct premium pitch branding systems, launch custom static web interfaces built to scale, and automate lead captures so founders can focus on fundraising and product development.',
      track: 'Launch & Brand Track'
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Biotech Tech',
      challenge: 'Slow legacy systems, complicated patient onboarding forms, administrative overhead, and HIPAA compliance anxieties.',
      solution: 'We engineer blazing-fast patient onboarding pipelines, custom dashboard dashboards, secure informational databases, and automated WhatsApp appointment integrations to drop administrative costs.',
      track: 'AI Automation & Development Track'
    },
    {
      id: 'realestate',
      title: 'Real Estate Developers',
      challenge: 'High ticket sizes requiring massive trust, constant leaks in manual lead routing, and highly competitive performance marketing environments.',
      solution: 'We build high-converting single-property landing pages with cinematic layout feels, integrate instant WhatsApp automation follow-up webhooks, and stand up dedicated CRM pipelines.',
      track: 'Marketing & Sales Infrastructure Track'
    },
    {
      id: 'smes',
      title: 'SMEs & Mid-Market',
      challenge: 'Legacy system friction, data trapped in manual spreadsheets, lack of unified tech, and operations ceiling bottlenecks.',
      solution: 'We audit and automate business workflows, replace manual operations with custom next-generation platforms, and connect branding vectors to double average client ticket values.',
      track: 'Operations & Development Track'
    },
    {
      id: 'international',
      title: 'International Scaleups',
      challenge: 'Managing global localization, slow load speeds across regions, and fragmented offshore teams failing to deliver standards.',
      solution: 'We design Next.js platforms optimized for global CDNs, unified brand systems representing international credibility, and deploy full sales enablements.',
      track: 'Global Growth Ecosystem'
    }
  ];

  return (
    <>
      <section className="ind-hero-section">
        <div className="glowing-bg glow-purple" style={{ opacity: 0.12 }}></div>
        <div className="container">
          <span className="glow-badge">Niche Sectors</span>
          <h1 className="ind-title">
            Targeted <span className="glow-text">Industries</span>
          </h1>
          <p className="ind-subtitle">
            We don’t build generic agency platforms. We construct custom digital architectures, automated playbooks, and specialized systems matching the exact demographic of your sector.
          </p>
        </div>
      </section>

      {/* Industries list */}
      <section className="ind-list-section">
        <div className="container">
          <div className="grid-2">
            {sectors.map((sec) => (
              <div key={sec.id} id={sec.id} className="glass-card sector-detail-card border-glow-purple">
                {/* Header Image Banner */}
                <div className="sector-img-container">
                  <img src={`/assets/industry_${sec.id === 'realestate' ? 'realestate' : sec.id}.png`} className="sector-img" alt={sec.title} />
                  <span className="sector-track-badge">{sec.track}</span>
                </div>
                
                <div className="sector-content">
                  <h2>{sec.title}</h2>
                  
                  <div className="sector-box">
                    <h4>The Industry Bottleneck:</h4>
                    <p className="box-desc">{sec.challenge}</p>
                  </div>

                  <div className="sector-box">
                    <h4>Our Scale Architecture:</h4>
                    <p className="box-desc text-white">{sec.solution}</p>
                  </div>

                  <div className="sector-footer">
                    {/* <Link href="#book" className="btn btn-secondary" style={{ width: '100%' }}>
                      Initiate Sector Audit
                    </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry credentials banner */}
      <section className="ind-outro-section">
        <div className="container">
          <div className="outro-box glass-card flex-center">
            <h2>Don’t See Your Specialized Sector?</h2>
            <p>
              Our architectural framework is built for businesses requiring high trust, premium client conversion, and robust automation pipelines. Let’s construct a custom growth blueprint for your model.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link href="#book" className="btn btn-primary">
                Book Sector Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ind-hero-section {
          padding: 6rem 0 3rem 0;
          text-align: center;
          position: relative;
          border-bottom: 1px solid var(--border-color);
        }

        .ind-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 1.25rem;
          letter-spacing: -0.03em;
        }

        .ind-subtitle {
          max-width: 780px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-size: 1.15rem;
          line-height: 1.7;
        }

        /* Sector cards list */
        .ind-list-section {
          padding: 6rem 0;
          border-bottom: 1px solid var(--border-color);
          background: rgba(0, 0, 0, 0.05);
        }

        .sector-detail-card {
          padding: 0;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sector-img-container {
          width: 100%;
          height: 180px;
          overflow: hidden;
          position: relative;
          background: #090a10;
          border-bottom: 1px solid var(--border-color);
        }

        .sector-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform var(--transition-slow);
        }

        .sector-detail-card:hover .sector-img {
          transform: scale(1.05);
        }

        .sector-track-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--accent-blue);
          background: rgba(0, 113, 227, 0.12);
          border: 1px solid rgba(0, 113, 227, 0.35);
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .sector-content {
          padding: 2.5rem 3rem 3rem 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex: 1;
        }

        @media (max-width: 768px) {
          .sector-content {
            padding: 1.75rem 2rem 2rem 2rem;
          }
        }

        .sector-detail-card h2 {
          font-size: 1.6rem;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .sector-box h4 {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
        }

        .box-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .text-white {
          color: var(--text-primary) !important;
          font-weight: 500;
        }

        .sector-footer {
          margin-top: auto;
          display: flex;
          width: 100%;
        }

        /* Outro section */
        .ind-outro-section {
          padding: 7rem 0;
        }

        .outro-box {
          padding: 4.5rem;
          flex-direction: column;
          text-align: center;
          border-color: rgba(0, 113, 227, 0.15);
          background: linear-gradient(135deg, rgba(0, 113, 227, 0.02) 0%, transparent 100%);
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
