'use client';

import React, { useState } from 'react';
import { useLeads } from '../context/LeadContext';

interface Question {
  id: number;
  text: string;
  category: 'brand' | 'ai' | 'tech' | 'ops' | 'growth';
  options: {
    text: string;
    score: number;
    roast: string;
  }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    text: 'Rate your current Branding & Brand Identity:',
    category: 'brand',
    options: [
      {
        text: 'We look like a generic corporate PDF from 2012.',
        score: 10,
        roast: 'Ouch! Your clients probably think you close on weekends and don’t accept cards. Let’s repair that legacy visual gap.'
      },
      {
        text: 'Clean and neat, but we look exactly like our competitors.',
        score: 50,
        roast: 'Safe, but forgettable. In a crowded room, fitting in is the quickest way to become invisible.'
      },
      {
        text: 'World-class, premium, modern, and highly recognizable.',
        score: 95,
        roast: 'Stunning! Your visual skin is elite. Let’s ensure your operational skeleton is just as strong.'
      }
    ]
  },
  {
    id: 2,
    text: 'How automated is your daily business operations and workflow?',
    category: 'ai',
    options: [
      {
        text: 'What is automation? We copy-paste leads manually into spreadsheets.',
        score: 10,
        roast: 'A classic data archaeology project! You’re trading human souls for manual copy-pasting. Let’s automate that toil.'
      },
      {
        text: 'We use scattered tools (Zapier, etc.), but things break constantly.',
        score: 55,
        roast: 'Ah, duct-tape engineering. You are constantly firefighting instead of scaling operations.'
      },
      {
        text: 'Fully synced CRM systems, custom AI bots, and instant notifications.',
        score: 90,
        roast: 'Exemplary. You’re sailing on a modern autonomous cruise ship. Let’s add rocket thrusters!'
      }
    ]
  },
  {
    id: 3,
    text: 'What does your main customer-facing website run on?',
    category: 'tech',
    options: [
      {
        text: 'A slow legacy site that takes 6+ seconds to load on mobile.',
        score: 15,
        roast: 'A 6-second load time is basically a digital block party for bounce rates. Your visitors are leaving before they see your logo.'
      },
      {
        text: 'Standard template code, responsive, but feels a bit basic.',
        score: 60,
        roast: 'Solid, but standard templates don’t wow international clients or command premium pricing.'
      },
      {
        text: 'Blazing-fast modern custom builds (Next.js / static render).',
        score: 95,
        roast: 'Lightning fast! Your engineering standard is admirable. Highly optimized for conversion.'
      }
    ]
  },
  {
    id: 4,
    text: 'How does your sales follow-up and support CRM work?',
    category: 'ops',
    options: [
      {
        text: 'We follow up when we find the emails or scattered notes.',
        score: 10,
        roast: 'Sticky notes are great for milk runs, not for building a scaling business. Leaking leads is costing you thousands.'
      },
      {
        text: 'We have a CRM, but no dedicated follow-up teams or playbooks.',
        score: 50,
        roast: 'You have a pipeline bucket, but it has no unified team pushing leads from contact to close.'
      },
      {
        text: 'Dedicated sales support operations with instant qualification.',
        score: 90,
        roast: 'A beautifully tuned engine. You are capturing and closing systematically. Exceptional!'
      }
    ]
  },
  {
    id: 5,
    text: 'What is your growth budget & scaling ambition?',
    category: 'growth',
    options: [
      {
        text: 'We want quick cheap fixes (₹5k–₹10k campaigns).',
        score: 5,
        roast: 'Alert! We build premium international growth systems, not cheap band-aids. Vision mismatch detected.'
      },
      {
        text: 'Domestic expansion with a steady, calculated budget.',
        score: 65,
        roast: 'Smart and measured. Let’s inject premium branding standards to double your average ticket size.'
      },
      {
        text: 'Global digital scale-up. Startups, SMEs, and enterprise growth.',
        score: 100,
        roast: 'Exactly what we like to hear! A high-vision builder. Welcome to the ecosystem.'
      }
    ]
  }
];

export default function AttractivenessQuiz() {
  const { addLead } = useLeads();
  const [step, setStep] = useState(0); // 0: intro, 1-5: questions, 6: lead-form, 7: results
  const [answers, setAnswers] = useState<number[]>([]);
  const [roasts, setRoasts] = useState<string[]>([]);
  
  // Lead info
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: 'Startups'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const startQuiz = () => {
    setStep(1);
    setAnswers([]);
    setRoasts([]);
  };

  const handleSelectOption = (score: number, roast: string) => {
    const updatedAnswers = [...answers, score];
    const updatedRoasts = [...roasts, roast];
    
    setAnswers(updatedAnswers);
    setRoasts(updatedRoasts);

    if (step < quizQuestions.length) {
      setStep(step + 1);
    } else {
      setStep(6); // Go to lead form to unlock report
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.name || !leadInfo.email || !leadInfo.company) return;

    // Calculate final scores
    const brandScore = answers[0] || 50;
    const aiScore = answers[1] || 50;
    const techScore = answers[2] || 50;
    const opsScore = answers[3] || 50;
    const growthScore = answers[4] || 50;
    
    const avgScore = Math.round(
      (brandScore + aiScore + techScore + opsScore + growthScore) / 5
    );

    // Save lead in context
    addLead({
      name: leadInfo.name,
      email: leadInfo.email,
      phone: leadInfo.phone,
      company: leadInfo.company,
      industry: leadInfo.industry,
      attractivenessScore: avgScore,
      scoreDetails: {
        brand: brandScore,
        ai: aiScore,
        tech: techScore,
        ops: opsScore
      },
      message: `Completed Attractiveness Quiz. Category: ${leadInfo.industry}. Roasts recorded: ${roasts.join(' | ')}`
    });

    setFormSubmitted(true);
    setStep(7); // Show results report
  };

  // Calculations for display
  const brandScore = answers[0] || 0;
  const aiScore = answers[1] || 0;
  const techScore = answers[2] || 0;
  const opsScore = answers[3] || 0;
  const growthScore = answers[4] || 0;
  const avgScore = Math.round((brandScore + aiScore + techScore + opsScore + growthScore) / 5);

  let archetype = 'Legacy Firefighter';
  let archetypeDesc = 'Your business has solid core values, but your digital infrastructure and branding are running on legacy systems. Scaling is difficult because manual operations act as a ceiling.';
  if (avgScore >= 40 && avgScore <= 75) {
    archetype = 'Growth Challenger';
    archetypeDesc = 'You have a healthy business foundation, but you are experiencing technical and operational bottlenecks. Upgrading to cohesive AI automation and a premium, high-converting digital experience will skyrocket your market share.';
  } else if (avgScore > 75) {
    archetype = 'Futuristic Innovator';
    archetypeDesc = 'You are a digital powerhouse! Your systems are forward-thinking. To achieve absolute global scale, we need to implement enterprise-grade customer pipelines and premium international marketing systems.';
  }

  return (
    <>
      <div className="quiz-card glass-card">
        
        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="quiz-intro flex-center">
            <span className="glow-badge">Ecosystem Assessment V2</span>
            <h2>Is Your Business "Attractive" to Scale?</h2>
            <p>
              Evaluate your technology, AI readiness, brand visual hierarchy, and sales pipelines. Get roasted by our automated assessment bot and unlock a premium tailored scale playbook.
            </p>
            <button onClick={startQuiz} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
              Begin Attractiveness Audit ➔
            </button>
          </div>
        )}

        {/* Steps 1-5: Question Screen */}
        {step >= 1 && step <= 5 && (
          <div className="quiz-question-screen animate-fade-up">
            <div className="quiz-header">
              <span className="quiz-progress">Vector {step} of 5</span>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${(step / 5) * 100}%` }}></div>
              </div>
            </div>

            <h3 className="question-text">{quizQuestions[step - 1].text}</h3>

            <div className="options-list">
              {quizQuestions[step - 1].options.map((opt, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectOption(opt.score, opt.roast)}
                  className="option-btn"
                >
                  <span className="option-letter">{index === 0 ? 'A' : index === 1 ? 'B' : 'C'}</span>
                  <span className="option-text">{opt.text}</span>
                </button>
              ))}
            </div>

            {step > 1 && (
              <div className="prev-roast-bubble">
                <span className="bot-indicator">Audit Bot Roast:</span>
                <p>"{roasts[step - 2]}"</p>
              </div>
            )}
          </div>
        )}

        {/* Step 6: Lead Form to unlock report */}
        {step === 6 && (
          <form onSubmit={handleFormSubmit} className="quiz-form-screen animate-fade-up">
            <div className="form-header">
              <span className="glow-badge glow-badge-purple">Audit Complete</span>
              <h2>Unlock Attractiveness Analysis</h2>
              <p>Enter your corporate credentials to compute your scaling score and sync with the Vitz CRM.</p>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Richard Hendricks"
                value={leadInfo.name}
                onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="richard@piedpiper.com"
                  value={leadInfo.email}
                  onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="Pied Piper"
                  value={leadInfo.company}
                  onChange={(e) => setLeadInfo({ ...leadInfo, company: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ flex: '1' }}>
                <label className="form-label">WhatsApp Contact</label>
                <input
                  type="tel"
                  placeholder="For automated brief delivery"
                  value={leadInfo.phone}
                  onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group" style={{ flex: '1' }}>
                <label className="form-label">Target Industry</label>
                <select
                  value={leadInfo.industry}
                  onChange={(e) => setLeadInfo({ ...leadInfo, industry: e.target.value })}
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

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Compute Scaling Archetype ➔
            </button>
          </form>
        )}

        {/* Step 7: Results Display */}
        {step === 7 && (
          <div className="quiz-results-screen animate-fade-up">
            <div className="results-header">
              <span className="glow-badge glow-badge-purple">Scale Readiness Report</span>
              <h2>Your Attractiveness Rating</h2>
            </div>

            <div className="score-ring-container flex-center">
              <div className="score-circle">
                <span className="score-number">{avgScore}%</span>
                <span className="score-label">Scale Readiness</span>
              </div>
            </div>

            <div className="results-archetype">
              <h3>Archetype: <span className="glow-text">{archetype}</span></h3>
              <p className="archetype-desc">{archetypeDesc}</p>
            </div>

            <div className="vector-breakdowns">
              <h4>System Audit Breakdown:</h4>
              <div className="vector-bars">
                <div className="vector-bar-item">
                  <div className="vector-bar-label">
                    <span>Branding Identity</span>
                    <span>{brandScore}%</span>
                  </div>
                  <div className="vector-progress"><div className="vector-fill bg-blue" style={{ width: `${brandScore}%` }}></div></div>
                </div>
                <div className="vector-bar-item">
                  <div className="vector-bar-label">
                    <span>AI & Workflow Automation</span>
                    <span>{aiScore}%</span>
                  </div>
                  <div className="vector-progress"><div className="vector-fill bg-purple" style={{ width: `${aiScore}%` }}></div></div>
                </div>
                <div className="vector-bar-item">
                  <div className="vector-bar-label">
                    <span>Tech Architecture</span>
                    <span>{techScore}%</span>
                  </div>
                  <div className="vector-progress"><div className="vector-fill bg-blue" style={{ width: `${techScore}%` }}></div></div>
                </div>
                <div className="vector-bar-item">
                  <div className="vector-bar-label">
                    <span>Sales Operations / CRM</span>
                    <span>{opsScore}%</span>
                  </div>
                  <div className="vector-progress"><div className="vector-fill bg-purple" style={{ width: `${opsScore}%` }}></div></div>
                </div>
              </div>
            </div>

            <div className="roast-log-box">
              <h4>Audit Bot Roasted Summaries:</h4>
              <ul className="roast-list">
                {roasts.map((r, i) => (
                  <li key={i}>❌ <strong>{i === 0 ? 'Brand' : i === 1 ? 'Operations' : i === 2 ? 'Tech' : i === 3 ? 'Sales' : 'Growth'}:</strong> {r}</li>
                ))}
              </ul>
            </div>

            <div className="results-cta-section flex-center">
              <p>Let's fix your legacy architectural friction and build a high-performance ecosystem.</p>
              <div className="results-btns">
                <a href="#book" className="btn btn-primary">
                  Book founders strategy call
                </a>
                <button onClick={startQuiz} className="btn btn-secondary">
                  Audit Again
                </button>
              </div>
              <div className="helper-bubble" style={{ marginTop: '1.25rem', width: '100%', textAlign: 'center' }}>
                <p>💡 Tip: You can check how your audit scores and lead profile were synced to the mock database inside the <a href="/admin" className="success-admin-link">CRM Admin Dashboard</a>!</p>
              </div>
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        .quiz-card {
          width: 100%;
          max-width: 650px;
          margin: 0 auto;
        }

        .quiz-intro {
          flex-direction: column;
          text-align: center;
          padding: 1.5rem 0;
        }

        .quiz-intro h2 {
          font-size: 2.2rem;
          margin: 0.75rem 0 1rem 0;
          letter-spacing: -0.03em;
        }

        .quiz-intro p {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Question Screen styling */
        .quiz-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .quiz-progress {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .progress-bar-container {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--glow-gradient);
          transition: width 0.4s ease;
        }

        .question-text {
          font-size: 1.4rem;
          margin-bottom: 2rem;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .option-btn {
          display: flex;
          align-items: center;
          padding: 1.1rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition-medium);
          text-align: left;
        }

        .option-btn:hover {
          background: rgba(0, 113, 227, 0.04);
          border-color: rgba(0, 113, 227, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 113, 227, 0.08);
        }

        .option-letter {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-right: 1.25rem;
          flex-shrink: 0;
        }

        .option-btn:hover .option-letter {
          background: var(--accent-blue);
          color: white;
          border-color: var(--accent-blue);
        }

        .option-text {
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.4;
        }

        /* Roast Bubbles */
        .prev-roast-bubble {
          padding: 1.25rem;
          background: rgba(239, 68, 68, 0.04);
          border: 1px dashed rgba(239, 68, 68, 0.25);
          border-radius: 12px;
        }

        .bot-indicator {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ef4444;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.25rem;
        }

        .prev-roast-bubble p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-style: italic;
          line-height: 1.4;
        }

        /* Lead Form Step */
        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h2 {
          font-size: 1.8rem;
          margin: 0.5rem 0;
        }

        .form-header p {
          font-size: 0.9rem;
          color: var(--text-secondary);
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

        /* Results Screen CSS */
        .results-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .results-header h2 {
          font-size: 2rem;
          margin-top: 0.5rem;
        }

        .score-ring-container {
          margin-bottom: 2rem;
        }

        .score-circle {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 4px solid var(--accent-blue);
          box-shadow: 0 0 30px rgba(0, 113, 227, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(0, 113, 227, 0.02);
        }

        .score-number {
          font-size: 2.5rem;
          font-weight: 800;
          font-family: var(--font-family-title);
          color: var(--text-primary);
          line-height: 1.1;
        }

        .score-label {
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .results-archetype {
          text-align: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .results-archetype h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .archetype-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .vector-breakdowns h4 {
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .vector-bars {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .vector-bar-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .vector-bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .vector-progress {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
          overflow: hidden;
        }

        .vector-fill {
          height: 100%;
          border-radius: 10px;
        }

        .vector-fill.bg-blue { background: var(--accent-blue); }
        .vector-fill.bg-purple { background: var(--accent-purple); }

        /* Roast log lists */
        .roast-log-box {
          background: rgba(255, 255, 255, 0.01);
          border: 1px dashed var(--border-color);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .roast-log-box h4 {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .roast-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .roast-list li {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .results-cta-section {
          flex-direction: column;
          text-align: center;
        }

        .results-cta-section p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .results-btns {
          display: flex;
          gap: 1rem;
        }

        @media (max-width: 500px) {
          .results-btns {
            flex-direction: column;
            width: 100%;
          }
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
