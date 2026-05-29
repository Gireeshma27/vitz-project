'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Lead Type Definition
export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  industry: string;
  attractivenessScore?: number;
  scoreDetails?: {
    tech: number;
    ai: number;
    brand: number;
    ops: number;
  };
  status: 'New' | 'Contacted' | 'Converted';
  date: string;
  message?: string;
}

// Simulated CRM/WhatsApp Log Definition
export interface AutomationLog {
  id: string;
  timestamp: string;
  type: 'CRM' | 'WhatsApp' | 'AI' | 'Email';
  message: string;
}

// Global Stats customizable by Admin
export interface AdminStats {
  businessesScaled: number;
  automationHoursSaved: number;
  successRate: number;
  globalPartners: number;
}

interface LeadContextType {
  leads: Lead[];
  logs: AutomationLog[];
  stats: AdminStats;
  addLead: (leadData: Omit<Lead, 'id' | 'status' | 'date'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  clearLeads: () => void;
  updateStats: (newStats: AdminStats) => void;
  addSystemLog: (type: AutomationLog['type'], message: string) => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

// Initial Seed Data for the Admin panel to feel alive
const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Sarah Jenkins',
    email: 'sarah@healthpulse.co',
    company: 'HealthPulse Diagnostics',
    phone: '+1 (555) 019-2834',
    industry: 'Healthcare',
    attractivenessScore: 42,
    scoreDetails: { tech: 30, ai: 10, brand: 60, ops: 70 },
    status: 'New',
    date: '2026-05-25 14:32',
    message: 'We want to automate patient onboarding and sync it to our custom CRM.'
  },
  {
    id: 'lead-2',
    name: 'Aravind Sharma',
    email: 'aravind@propnext.in',
    company: 'PropNext Developers',
    phone: '+91 98765 43210',
    industry: 'Real Estate',
    attractivenessScore: 68,
    scoreDetails: { tech: 50, ai: 40, brand: 90, ops: 90 },
    status: 'Contacted',
    date: '2026-05-24 11:15',
    message: 'Need a premium branding overhaul and performance marketing campaigns.'
  },
  {
    id: 'lead-3',
    name: 'Kenji Sato',
    email: 'kenji@nexis-ventures.tokyo',
    company: 'Nexis AI Ventures',
    phone: '+81 90-1234-5678',
    industry: 'Startups',
    attractivenessScore: 88,
    scoreDetails: { tech: 90, ai: 90, brand: 80, ops: 90 },
    status: 'Converted',
    date: '2026-05-23 09:40',
    message: 'Launching a multi-agent AI system and looking for core infrastructure support.'
  }
];

const initialLogs: AutomationLog[] = [
  { id: 'log-1', timestamp: '17:35:10', type: 'CRM', message: 'System Sync: Connected with Vitz-Pipeline V2.4' },
  { id: 'log-2', timestamp: '17:35:11', type: 'WhatsApp', message: 'WhatsApp API Status: Webhook online & validated' },
  { id: 'log-3', timestamp: '17:35:12', type: 'AI', message: 'VitzBot Core: LLM context memory loaded successfully' }
];

const defaultStats: AdminStats = {
  businessesScaled: 147,
  automationHoursSaved: 12400,
  successRate: 98.4,
  globalPartners: 12
};

export const LeadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [stats, setStats] = useState<AdminStats>(defaultStats);
  const [isLoaded, setIsLoaded] = useState(false);

  // Hydrate state from localStorage
  useEffect(() => {
    const savedLeads = localStorage.getItem('vitz_leads');
    const savedLogs = localStorage.getItem('vitz_logs');
    const savedStats = localStorage.getItem('vitz_stats');

    setLeads(savedLeads ? JSON.parse(savedLeads) : initialLeads);
    setLogs(savedLogs ? JSON.parse(savedLogs) : initialLogs);
    setStats(savedStats ? JSON.parse(savedStats) : defaultStats);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever states change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('vitz_leads', JSON.stringify(leads));
    }
  }, [leads, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('vitz_logs', JSON.stringify(logs));
    }
  }, [logs, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('vitz_stats', JSON.stringify(stats));
    }
  }, [stats, isLoaded]);

  // Helper to add logs
  const addSystemLog = (type: AutomationLog['type'], message: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newLog: AutomationLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: time,
      type,
      message
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 49)]); // Cap logs at 50
  };

  // Add Lead Function
  const addLead = (leadData: Omit<Lead, 'id' | 'status' | 'date'>) => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0] + ' ' + today.toTimeString().split(' ')[0].substring(0, 5);
    
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      status: 'New',
      date: dateStr
    };

    setLeads((prev) => [newLead, ...prev]);

    // Trigger Simulated Automations
    addSystemLog('CRM', `Lead Captured: ${newLead.name} (${newLead.company}) via website`);
    
    setTimeout(() => {
      addSystemLog('WhatsApp', `[Automation Triggered] Preparing personalized welcome sequence for ${newLead.name}`);
    }, 800);

    setTimeout(() => {
      addSystemLog('WhatsApp', `[API Send] WhatsApp notification successfully delivered to ${newLead.phone || 'customer'}`);
    }, 1800);

    setTimeout(() => {
      addSystemLog('Email', `Automated Brief & Ecosystem Overview brochure dispatched to ${newLead.email}`);
    }, 2500);
  };

  // Update Lead Status
  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
    addSystemLog('CRM', `Lead ID ${id.substring(0, 8)} status updated to: ${status}`);
  };

  // Clear leads (reset to seed)
  const clearLeads = () => {
    setLeads(initialLeads);
    setLogs(initialLogs);
    setStats(defaultStats);
    addSystemLog('CRM', 'Mock Database resets complete. Reset to original seeds.');
  };

  // Update Stats from Admin Panel
  const updateStats = (newStats: AdminStats) => {
    setStats(newStats);
    addSystemLog('CRM', `Global Platform Statistics modified successfully by administrator`);
  };

  return (
    <LeadContext.Provider value={{ leads, logs, stats, addLead, updateLeadStatus, clearLeads, updateStats, addSystemLog }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};
