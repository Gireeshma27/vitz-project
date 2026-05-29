'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useLeads } from '@/context/LeadContext';
import AttractivenessQuiz from '@/components/AttractivenessQuiz';
import SystemSimulator from '@/components/SystemSimulator';
import DeviceMockups from '@/components/DeviceMockups';

export default function Home() {
  const { stats } = useLeads();
  const quizSectionRef = useRef<HTMLDivElement>(null);

  const scrollToQuiz = () => {
    quizSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const solutions = [
    {
      num: '01',
      title: 'Launch Your Business',
      desc: 'Complete digital setup: Core branding, incorporation guidelines, corporate portals, and operational workflows.',
      link: '/solutions#launch',
      img: '/assets/hero_visualizer.png'
    },
    {
      num: '02',
      title: 'Scale Your Brand',
      desc: 'Vibrant identity kits, logo systems, corporate brand guidelines, and premium client-facing marketing creatives.',
      link: '/solutions#brand',
      img: '/assets/branding_track.png'
    },
    {
      num: '03',
      title: 'Automate Operations',
      desc: 'AI Chatbots, instant CRM integrations, customized WhatsApp webhooks, and automatic workflow pipelines.',
      link: '/solutions#automate',
      img: '/assets/ai_automation_track.png'
    },
    {
      num: '04',
      title: 'Build Sales Infrastructure',
      desc: 'Dedicated sales support setups, lead qualification automation, CRM dashboards, and operational sales teams.',
      link: '/solutions#sales',
      img: '/assets/web_app_track.png'
    },
    {
      num: '05',
      title: 'Strengthen Digital Presence',
      desc: 'Fast custom websites, web applications, customer portals, and mobile ecosystems engineered in Next.js.',
      link: '/solutions#dev',
      img: '/assets/hero_visualizer.png'
    }
  ];

  const differentiators = [
    {
      title: 'One-Stop Growth Ecosystem',
      desc: 'We replace 5 different agency bills (Web dev, AI consultancies, branding studios, sales support, and copywriters) with a single premium growth partner.'
    },
    {
      title: 'Inbuilt Sales & Support Infrastructure',
      desc: 'We don’t just deliver leads; we deploy support pipelines, qualification models, and remote CRM systems to convert traffic into revenue.'
    },
    {
      title: 'Consultation-First Model',
      desc: 'No cookie-cutter templates. We analyze your systems, audit your operations, roast your legacy bottlenecks, and engineer custom strategies.'
    }
  ];

  const industries = [
    { name: 'Startups & VCs', tag: 'High Velocity', desc: 'Rapid MVP launches, investor branding, and automated pitch-deck systems.' },
    { name: 'Healthcare Providers', tag: 'HIPAA Sync', desc: 'Patient onboarding pipelines, custom informative websites, and automated appointment support.' },
    { name: 'Real Estate Developers', tag: 'High Ticket', desc: 'Premium project landing pages, automated lead qualification, and WhatsApp marketing flows.' },
    { name: 'International Brands', tag: 'Global Scale', desc: 'Multi-lingual platforms, high-performance static rendering, and global content structures.' },
    { name: 'SMEs & Mid-Market', tag: 'Optimize', desc: 'Operational automation, custom ERP/CRM dashboards, and customer relations management.' }
  ];

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="glowing-bg glow-blue"></div>
        <div className="glowing-bg glow-purple"></div>

        <div className="container hero-container">
          <div className="hero-grid">
            {/* Hero Left Content */}
            <div className="hero-left-content text-left">
              <span className="glow-badge animate-fade-up">
                <span className="badge-pulse"></span> Futuristic Business Growth Ecosystem
              </span>
              
              <h1 className="hero-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
                Building Digital-First <br />
                <span className="glow-text">Businesses.</span>
              </h1>
              
              <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '0.2s' }}>
                Your premium one-stop partner for building, growing, and scaling modern businesses. We combine custom software engineering, AI automation, elite branding, and sales support infrastructure under one unified framework.
              </p>

              <div className="hero-btns animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <Link href="#book" className="btn btn-primary">
                  Book Consultation ➔
                </Link>
                <button onClick={scrollToQuiz} className="btn btn-secondary">
                  Audit Attractiveness Rating
                </button>
              </div>
            </div>

            {/* Hero Right: Dynamic Simulator Console (Acts like Video playback) */}
            <div className="hero-right-visual animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <SystemSimulator />
            </div>
          </div>

          {/* DYNAMIC STATISTICS TICKER */}
          <div className="stats-ticker animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="stat-ticker-item">
              <span className="stat-num">{stats.businessesScaled}+</span>
              <span className="stat-label">Businesses Scaled</span>
            </div>
            <div className="stat-ticker-divider"></div>
            <div className="stat-ticker-item">
              <span className="stat-num">{(stats.automationHoursSaved / 1000).toFixed(1)}k+</span>
              <span className="stat-label">Hours Reclaimed</span>
            </div>
            <div className="stat-ticker-divider"></div>
            <div className="stat-ticker-item">
              <span className="stat-num">{stats.successRate}%</span>
              <span className="stat-label">System Performance</span>
            </div>
            <div className="stat-ticker-divider"></div>
            <div className="stat-ticker-item">
              <span className="stat-num">{stats.globalPartners}</span>
              <span className="stat-label">Target Verticals</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US PRELUDE (Fits Laptop Mockup) */}
      <section className="about-prelude">
        <div className="container">
          <div className="about-grid">
            <div className="about-left">
              <span className="glow-badge glow-badge-purple">Ecosystem Overview</span>
              <h2>This is NOT an agency. This is a business engine.</h2>
              <p>
                Legacy agencies give you generic reports and write code that lies dormant. Software houses code but don’t understand marketing. Branding studios design pretty images but can’t construct a CRM database. 
              </p>
              <p style={{ marginTop: '1rem' }}>
                Vitz.ai is a unified growth framework. We bridge the gaps between **branding, speed-optimized code, operational automation, and customer-facing support.**
              </p>
            </div>
            <div className="about-right flex-center">
              {/* Mounted CSS Hardware Device Mockups */}
              <DeviceMockups />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTIONS GRID SECTION (With custom header image blocks) */}
      <section className="solutions-section">
        <div className="container">
          <div className="section-header flex-center">
            <span className="glow-badge">Scaling Tracks</span>
            <h2>Unified Business Solutions</h2>
            <p>We replace five separate vendors with a cohesive, high-performance ecosystem.</p>
          </div>

          <div className="grid-3" style={{ marginTop: '3.5rem' }}>
            {solutions.slice(0, 3).map((sol) => (
              <div key={sol.num} className="glass-card sol-card">
                <div className="sol-img-container">
                  <img src={sol.img} className="sol-img" alt={sol.title} />
                  <span className="sol-num-badge">{sol.num}</span>
                </div>
                <h3>{sol.title}</h3>
                <p>{sol.desc}</p>
                <Link href={sol.link} className="sol-link">
                  Explore Track ➔
                </Link>
              </div>
            ))}
          </div>

          <div className="grid-2" style={{ marginTop: '2rem' }}>
            {solutions.slice(3, 5).map((sol) => (
              <div key={sol.num} className="glass-card sol-card">
                <div className="sol-img-container flex-center">
                  <img src={sol.img} className="sol-img" alt={sol.title} />
                  <span className="sol-num-badge">{sol.num}</span>
                </div>
                <h3>{sol.title}</h3>
                <p>{sol.desc}</p>
                <Link href={sol.link} className="sol-link">
                  Explore Track ➔
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE VITZ SECTION */}
      <section className="why-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-left">
              <span className="glow-badge glow-badge-purple">Core Pillars</span>
              <h2>Why Ambitious Leaders Choose Vitz.ai</h2>
              <p>We build platforms for scale-up leaders, venture-backed startups, and high-standard businesses who refuse local, generic, low-budget agencies.</p>
              
              <div className="why-bullets">
                {differentiators.map((diff, idx) => (
                  <div key={idx} className="why-bullet-item">
                    <span className="why-bullet-check">✓</span>
                    <div>
                      <h4>{diff.title}</h4>
                      <p>{diff.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="why-right flex-center">
              <div className="trust-card glass-card">
                <h3>Our Client Creed</h3>
                <p className="creed-text">
                  "We refuse ₹3k–₹5k cookie-cutter packages. We build premium, custom infrastructure, charging corporate rates to design global-standard growth machines."
                </p>
                <div className="creed-meta">
                  <div className="line"></div>
                  <span>VITZ.AI CORE STANDARD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE ASSESSMENT WIDGET (THE QUIZ) */}
      <section ref={quizSectionRef} className="quiz-section">
        <div className="glowing-bg glow-purple" style={{ opacity: 0.1 }}></div>
        <div className="container">
          <div className="quiz-intro-header flex-center">
            <span className="glow-badge">Interactive Audit</span>
            <h2>Business Audit Laboratory</h2>
            <p>Compute your operational attraction and let our AI-driven systems diagnose your legacy friction points.</p>
          </div>
          
          <div style={{ marginTop: '3.5rem' }}>
            <AttractivenessQuiz />
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIES SERVED */}
      <section className="industries-section">
        <div className="container">
          <div className="section-header flex-center">
            <span className="glow-badge">Niche Expertise</span>
            <h2>Industries We Scale</h2>
            <p>Tailored workflows and design philosophies matching specialized target demographics.</p>
          </div>

          <div className="grid-3" style={{ marginTop: '3.5rem' }}>
            {industries.slice(0, 3).map((ind, idx) => (
              <div key={idx} className="glass-card industry-card border-glow-purple">
                <span className="ind-badge">{ind.tag}</span>
                <h3>{ind.name}</h3>
                <p>{ind.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex-center" style={{ marginTop: '3rem' }}>
            <Link href="/industries" className="btn btn-secondary">
              View Industry Frameworks
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO LIGHT */}
      <section className="portfolio-light">
        <div className="container">
          <div className="portfolio-flex">
            <div className="portfolio-info">
              <span className="glow-badge">Case Spotlights</span>
              <h2>Proven Scaled Platforms</h2>
              <p>We build elite digital skins with blazing-fast technology backends. No templates, only custom architecture.</p>
            </div>
            <div>
              <Link href="/portfolio" className="btn btn-primary">
                View Global Portfolio ➔
              </Link>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: '3.5rem' }}>
            <div className="glass-card case-card">
              <div className="case-image-mock flex-center" style={{ height: '300px', padding: '0', overflow: 'hidden' }}>
                <img src="/assets/hero_visualizer.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="HealthPulse" />
              </div>
              <div className="case-details">
                <span className="case-tag">SaaS / Web App</span>
                <h3>HealthPulse Clinic Dashboard Systems</h3>
                <p>Automated HIPAA onboarding pipelines, resulting in 4,200 administrative hours saved annually.</p>
              </div>
            </div>
            
            <div className="glass-card case-card">
              <div className="case-image-mock flex-center" style={{ height: '300px', padding: '0', overflow: 'hidden' }}>
                <img src="/assets/branding_track.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Nexus" />
              </div>
              <div className="case-details">
                <span className="case-tag">Branding & Platform</span>
                <h3>Nexus Global Ventures Launch</h3>
                <p>Designed unified branding assets, custom-designed corporate portals, and integrated WhatsApp outreach pipelines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL SPOTLIGHT CTA */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-card glass-card flex-center">
            <span className="glow-badge">Launch Today</span>
            <h2>Are You Ready to Build for the Future?</h2>
            <p>
              Stop wasting budgets on fragmented tools, slow templates, and cheap local agencies. Work with an international business growth partner.
            </p>
            <div className="final-cta-btns">
              <Link href="#book" className="btn btn-primary">
                Book founders strategy call
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact Sales Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Hero Layout Grid */
        .hero-section {
          padding: 8rem 0 6rem 0;
          position: relative;
          border-bottom: 1px solid var(--border-color);
        }

        .hero-container {
          position: relative;
          z-index: 1;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 5rem;
          text-align: left;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
            text-align: center;
          }
          .hero-left-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }

        .badge-pulse {
          width: 8px;
          height: 8px;
          background-color: #38bdf8;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 10px #38bdf8;
          animation: pulse 1.5s infinite alternate;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        .hero-title {
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .hero-subtitle {
          max-width: 600px;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          font-size: 1.15rem;
          line-height: 1.7;
        }

        .hero-btns {
          display: flex;
          gap: 1.25rem;
        }

        @media (max-width: 500px) {
          .hero-btns {
            flex-direction: column;
            width: 100%;
          }
        }

        /* Stats Ticker */
        .stats-ticker {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          background: rgba(21, 21, 24, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          padding: 1.5rem 3.5rem;
          border-radius: 100px;
          max-width: 900px;
          margin: 0 auto;
          box-shadow: var(--glass-shadow);
        }

        @media (max-width: 900px) {
          .stats-ticker {
            flex-wrap: wrap;
            gap: 1.5rem;
            padding: 1.5rem 2rem;
            border-radius: 24px;
          }
          .stat-ticker-divider {
            display: none !important;
          }
        }

        .stat-ticker-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .stat-num {
          font-family: var(--font-family-title);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.25rem;
        }

        .stat-ticker-divider {
          width: 1px;
          height: 35px;
          background: var(--border-color);
        }

        /* 2. About Prelude */
        .about-prelude {
          padding: 7rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
        }

        .about-left h2 {
          font-size: 2.2rem;
          margin: 0.75rem 0 1.25rem 0;
          letter-spacing: -0.02em;
        }

        .about-left p {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* 3. Solutions Grid (With dynamic header image blocks) */
        .solutions-section {
          padding: 7rem 0;
          border-bottom: 1px solid var(--border-color);
          background: rgba(0, 0, 0, 0.05);
        }

        .section-header {
          flex-direction: column;
          text-align: center;
        }

        .section-header h2 {
          font-size: 2.4rem;
          margin: 0.5rem 0;
          letter-spacing: -0.02em;
        }

        .section-header p {
          max-width: 580px;
          color: var(--text-secondary);
        }

        .sol-card {
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
          padding: 0 0 2.25rem 0 !important;
          border-radius: 16px !important;
          overflow: hidden !important;
          gap: 0 !important;
        }

        .sol-img-container {
          width: 100%;
          height: 160px !important;
          overflow: hidden;
          position: relative;
          background: #090a10;
          border-bottom: 1px solid var(--border-color);
        }

        .sol-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .sol-card:hover .sol-img {
          transform: scale(1.06);
        }

        .sol-num-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-family: var(--font-family-title);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--accent-blue);
          background: rgba(0, 113, 227, 0.08);
          border: 1px solid rgba(0, 113, 227, 0.25);
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
        }

        .sol-card h3 {
          font-size: 1.25rem;
          letter-spacing: -0.01em;
          padding: 1.5rem 2rem 0.5rem 2rem !important;
          margin: 0 !important;
        }

        .sol-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          padding: 0 2rem 1.5rem 2rem !important;
          flex: 1 1 auto !important;
          margin: 0 !important;
        }

        :global(.sol-link) {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-blue);
          margin-top: auto !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          text-align: left !important;
          gap: 0.5rem;
          padding: 0 2rem 0 3.5rem !important; /* explicitly pushing it further right */
        }

        :global(.sol-link:hover) {
          color: var(--text-primary);
        }

        /* 4. Why Choose Section */
        .why-section {
          padding: 7rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .why-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
        }

        .why-left h2 {
          font-size: 2.2rem;
          margin: 0.5rem 0 1.25rem 0;
        }

        .why-bullets {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-top: 2rem;
        }

        .why-bullet-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .why-bullet-check {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(134, 34, 230, 0.08);
          border: 1px solid rgba(134, 34, 230, 0.2);
          color: #c084fc;
          font-weight: bold;
          font-size: 0.8rem;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .why-bullet-item h4 {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }

        .why-bullet-item p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .trust-card {
          padding: 3rem;
          border-color: rgba(134, 34, 230, 0.15);
          text-align: center;
          box-shadow: 0 15px 40px rgba(134, 34, 230, 0.04);
        }

        .creed-text {
          font-family: var(--font-family-title);
          font-size: 1.2rem;
          font-style: italic;
          line-height: 1.7;
          color: var(--text-primary);
          margin: 1.5rem 0;
        }

        .creed-meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .creed-meta .line {
          width: 40px;
          height: 1px;
          background: var(--accent-purple);
        }

        .creed-meta span {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--accent-purple);
        }

        /* 5. Quiz Section */
        .quiz-section {
          padding: 7.5rem 0;
          border-bottom: 1px solid var(--border-color);
          position: relative;
          background: rgba(0, 0, 0, 0.1);
        }

        .quiz-intro-header {
          flex-direction: column;
          text-align: center;
        }

        .quiz-intro-header h2 {
          font-size: 2.4rem;
          margin: 0.5rem 0;
        }

        .quiz-intro-header p {
          max-width: 580px;
          color: var(--text-secondary);
        }

        /* 6. Industries Section */
        .industries-section {
          padding: 7rem 0;
          border-bottom: 1px solid var(--border-color);
        }

        .industry-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .ind-badge {
          font-size: 0.65rem;
          font-weight: 700;
          color: #c084fc;
          background: rgba(134, 34, 230, 0.08);
          border: 1px solid rgba(134, 34, 230, 0.2);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .industry-card h3 {
          font-size: 1.25rem;
          letter-spacing: -0.01em;
        }

        .industry-card p {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        /* 7. Portfolio Showcase Light */
        .portfolio-light {
          padding: 7rem 0;
          border-bottom: 1px solid var(--border-color);
          background: rgba(0, 0, 0, 0.05);
        }

        .portfolio-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        @media (max-width: 768px) {
          .portfolio-flex {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
        }

        .portfolio-info h2 {
          font-size: 2.2rem;
          margin: 0.5rem 0;
        }

        .portfolio-info p {
          max-width: 580px;
          color: var(--text-secondary);
        }

        .case-card {
          padding: 0;
          border-radius: 16px;
          border: var(--glass-border);
          overflow: hidden;
          gap: 0 !important;
        }

        .case-details {
          padding: 2rem;
        }

        .case-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.5rem;
        }

        .case-details h3 {
          font-size: 1.35rem;
          margin-bottom: 0.5rem;
        }

        .case-details p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* 8. Final Spotlight CTA */
        .final-cta-section {
          padding: 7rem 0;
        }

        .final-cta-card {
          padding: 4.5rem;
          flex-direction: column;
          text-align: center;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
          background: linear-gradient(135deg, rgba(21, 21, 24, 0.7) 0%, rgba(21, 21, 24, 0.3) 100%);
        }

        .final-cta-card h2 {
          font-size: 2.4rem;
          margin: 0.5rem 0 1rem 0;
        }

        .final-cta-card p {
          max-width: 600px;
          color: var(--text-secondary);
          margin-bottom: 2.25rem;
          line-height: 1.6;
        }

        .final-cta-btns {
          display: flex;
          gap: 1.25rem;
        }

        @media (max-width: 768px) {
          .final-cta-card {
            padding: 3rem 1.5rem;
          }
          .sol-card h3 {
            padding: 1.25rem 1.5rem 0 1.5rem;
          }
          .sol-card p {
            padding: 0 1.5rem;
          }
          :global(.sol-link) {
            padding: 0 1.5rem 1.5rem 3rem;
          }
          .trust-card {
            padding: 2.5rem 1.5rem;
          }
        }

        @media (max-width: 500px) {
          .final-cta-btns {
            flex-direction: column;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
