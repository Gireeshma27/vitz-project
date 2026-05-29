'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Solutions', path: '/solutions' },
    { name: 'Industries', path: '/industries' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link href="/" className="logo">
            VITZ<span className="logo-dot">.AI</span>
          </Link>

          <nav className="nav-menu">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="nav-actions">
            <Link href="#book" className="btn btn-primary btn-nav">
              Book Consultation
            </Link>
            <Link href="/admin" className="admin-pill" title="Lead Dashboard CRM">
              CRM Admin
            </Link>
            <button 
              className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown menu */}
        <div className={`mobile-dropdown ${mobileMenuOpen ? 'show' : ''}`}>
          <div className="mobile-nav-links">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`mobile-link ${isActive ? 'mobile-link-active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="mobile-actions">
              <Link
                href="#book"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Consultation
              </Link>
              <Link
                href="/admin"
                className="admin-pill-mobile"
                onClick={() => setMobileMenuOpen(false)}
              >
                CRM Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          border-bottom: 1px solid transparent;
          background: transparent;
          transition: background var(--transition-medium), border-color var(--transition-medium), padding var(--transition-medium);
          padding: 1.5rem 0;
        }

        .header.scrolled {
          background: rgba(8, 8, 9, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1rem 0;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-family: var(--font-family-title);
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          display: flex;
          align-items: center;
        }

        .logo-dot {
          background: var(--glow-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-menu {
          display: flex;
          gap: 2.2rem;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-nav {
          padding: 0.55rem 1.4rem;
          font-size: 0.85rem;
        }

        .admin-pill {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.4rem 0.9rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: 50px;
          color: var(--text-secondary);
        }

        .admin-pill:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--text-secondary);
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 101;
        }

        .mobile-menu-btn span {
          width: 100%;
          height: 2px;
          background-color: var(--text-primary);
          transition: transform var(--transition-fast), opacity var(--transition-fast);
        }

        .mobile-menu-btn.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .mobile-menu-btn.open span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile Dropdown */
        .mobile-dropdown {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(8, 8, 9, 0.98);
          backdrop-filter: blur(20px);
          z-index: 99;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition-medium);
        }

        .mobile-dropdown.show {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          width: 80%;
          text-align: center;
        }

        .mobile-link {
          font-family: var(--font-family-title);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .mobile-link:hover, .mobile-link-active {
          color: var(--text-primary);
          background: var(--glow-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
          margin-top: 1.5rem;
        }

        .admin-pill-mobile {
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.8rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: 50px;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .nav-menu {
            display: none;
          }
          .btn-nav, .admin-pill {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
