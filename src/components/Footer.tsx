'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLeads } from '../context/LeadContext';

export default function Footer() {
  const { addSystemLog } = useLeads();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addSystemLog('Email', `Newsletter Subscription request for: ${email}`);
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      addSystemLog('CRM', `Automated Sync: Added ${email} to Marketing Newsletter pipeline`);
    }, 1000);
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link href="/" className="logo">
                VITZ<span className="logo-dot">.AI</span>
              </Link>
              <p className="brand-desc">
                Your premium one-stop business partner for building, growing, and scaling digital-first enterprises. Powered by technology, branding, and advanced AI.
              </p>
              <div className="social-links">
                <span className="social-dot" title="LinkedIn">in</span>
                <span className="social-dot" title="Twitter">tw</span>
                <span className="social-dot" title="GitHub">git</span>
                <span className="social-dot" title="YouTube">yt</span>
              </div>
            </div>

            <div className="footer-links-col">
              <h4>Growth Solutions</h4>
              <div className="links-list">
                <Link href="/solutions#launch">Launch Operations</Link>
                <Link href="/solutions#automate">AI & Automation</Link>
                <Link href="/solutions#dev">Web & App Dev</Link>
                <Link href="/solutions#brand">Branding & Creative</Link>
                <Link href="/solutions#market">Growth Marketing</Link>
                <Link href="/solutions#sales">Sales Infrastructure</Link>
              </div>
            </div>

            <div className="footer-links-col">
              <h4>Industries</h4>
              <div className="links-list">
                <Link href="/industries#startups">Startups</Link>
                <Link href="/industries#healthcare">Healthcare Tech</Link>
                <Link href="/industries#realestate">Real Estate</Link>
                <Link href="/industries#smes">SMEs</Link>
                <Link href="/industries#international">International Brands</Link>
              </div>
            </div>

            <div className="footer-newsletter">
              <h4>Stay Optimized</h4>
              <p className="newsletter-desc">Subscribe to receive exclusive playbooks on AI automation and digital scaling.</p>
              
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter your corporate email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input newsletter-input"
                  />
                  <button type="submit" className="btn btn-primary btn-newsletter">
                    Join
                  </button>
                </form>
              ) : (
                <div className="subscribe-success">
                  <span className="success-icon">✓</span>
                  <span>Welcome to the future. Newsletter synced!</span>
                </div>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright">© 2026 Vitz.ai. All rights reserved. Designed for international scalability.</p>
            <div className="bottom-links">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/admin" className="admin-footer-link">Admin Console</Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 5rem 0 2.5rem 0;
          position: relative;
          z-index: 2;
          margin-top: auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 3.5rem;
          margin-bottom: 4rem;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .logo {
          font-family: var(--font-family-title);
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          display: block;
          margin-bottom: 1.25rem;
        }

        .logo-dot {
          background: var(--glow-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 0.8rem;
        }

        .social-dot {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.8rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .social-dot:hover {
          color: var(--text-primary);
          background: var(--accent-blue);
          border-color: var(--accent-blue);
          transform: translateY(-2px);
        }

        .footer-links-col h4, .footer-newsletter h4 {
          font-family: var(--font-family-title);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          letter-spacing: -0.01em;
        }

        .links-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .links-list a {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .links-list a:hover {
          color: var(--text-primary);
          padding-left: 4px;
        }

        .newsletter-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.7rem 1rem;
          font-size: 0.85rem;
          border-radius: 50px;
        }

        .btn-newsletter {
          padding: 0.7rem 1.4rem;
          font-size: 0.85rem;
        }

        .subscribe-success {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 8px;
          font-size: 0.85rem;
          color: #10b981;
        }

        .success-icon {
          font-weight: bold;
          font-size: 1rem;
        }

        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }

        .copyright {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .bottom-links {
          display: flex;
          gap: 1.5rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-right: 6rem; /* Prevents floating chatbot from covering the links */
        }

        @media (max-width: 768px) {
          .bottom-links {
            margin-right: 0;
          }
        }

        .bottom-links a:hover {
          color: var(--text-secondary);
        }

        .admin-footer-link {
          color: var(--accent-purple) !important;
          font-weight: 500;
        }
        .admin-footer-link:hover {
          color: var(--text-primary) !important;
        }
      `}</style>
    </>
  );
}
