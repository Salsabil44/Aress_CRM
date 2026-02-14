import { v4 as uuidv4 } from 'uuid';
import type { Lead, LeadFormData, LeadStatus } from '@/types';

const STORAGE_KEY = 'salesflow_leads';
const HISTORY_KEY = 'salesflow_history';

export interface HistoryEntry {
  id: string;
  leadId: string;
  leadName: string;
  action: 'created' | 'updated' | 'deleted' | 'status_changed';
  details: string;
  timestamp: string;
}

// Seed data for demo
const SEED_LEADS: Lead[] = [
  {
    id: uuidv4(), name: 'Alice Martin', email: 'alice@techcorp.com', phone: '+1 555-0101',
    company: 'TechCorp', source: 'LinkedIn', status: 'New', createdAt: '2025-01-15T10:00:00Z', notes: 'Met at tech conference'
  },
  {
    id: uuidv4(), name: 'Bob Johnson', email: 'bob@innovate.io', phone: '+1 555-0102',
    company: 'Innovate.io', source: 'Referral', status: 'Contacted', createdAt: '2025-01-20T14:30:00Z', notes: 'Referred by partner company'
  },
  {
    id: uuidv4(), name: 'Clara Williams', email: 'clara@globalsoft.com', phone: '+1 555-0103',
    company: 'GlobalSoft', source: 'Cold Call', status: 'Interested', createdAt: '2025-02-05T09:15:00Z', notes: 'Interested in enterprise plan'
  },
  {
    id: uuidv4(), name: 'David Brown', email: 'david@startupx.co', phone: '+1 555-0104',
    company: 'StartupX', source: 'Website', status: 'Negotiation', createdAt: '2025-02-12T16:45:00Z', notes: 'Negotiating annual contract'
  },
  {
    id: uuidv4(), name: 'Eva Chen', email: 'eva@megacorp.com', phone: '+1 555-0105',
    company: 'MegaCorp', source: 'Email Campaign', status: 'Won', createdAt: '2025-02-28T11:00:00Z', notes: 'Signed 2-year deal'
  },
  {
    id: uuidv4(), name: 'Frank Miller', email: 'frank@smallbiz.net', phone: '+1 555-0106',
    company: 'SmallBiz', source: 'Event', status: 'Lost', createdAt: '2025-03-01T08:30:00Z', notes: 'Budget constraints'
  },
  {
    id: uuidv4(), name: 'Grace Lee', email: 'grace@dataflow.ai', phone: '+1 555-0107',
    company: 'DataFlow AI', source: 'LinkedIn', status: 'New', createdAt: '2025-03-10T13:20:00Z', notes: 'AI startup looking for sales reps'
  },
  {
    id: uuidv4(), name: 'Henry Davis', email: 'henry@cloudpeak.com', phone: '+1 555-0108',
    company: 'CloudPeak', source: 'Referral', status: 'Contacted', createdAt: '2025-03-15T10:45:00Z', notes: 'Follow up scheduled for next week'
  },
  {
    id: uuidv4(), name: 'Isabelle Torres', email: 'isabelle@nexgen.io', phone: '+1 555-0109',
    company: 'NexGen Solutions', source: 'Cold Call', status: 'Interested', createdAt: '2025-04-02T15:00:00Z', notes: 'Wants a demo presentation'
  },
  {
    id: uuidv4(), name: 'James Wilson', email: 'james@fintech.pro', phone: '+1 555-0110',
    company: 'FinTech Pro', source: 'Website', status: 'Won', createdAt: '2025-04-10T09:30:00Z', notes: 'Closed deal - premium tier'
  },
  {
    id: uuidv4(), name: 'Karen White', email: 'karen@retailmax.com', phone: '+1 555-0111',
    company: 'RetailMax', source: 'Event', status: 'Negotiation', createdAt: '2025-04-18T14:15:00Z', notes: 'Met at SaaS summit, discussing pricing'
  },
  {
    id: uuidv4(), name: 'Leo Martinez', email: 'leo@greenwave.co', phone: '+1 555-0112',
    company: 'GreenWave', source: 'LinkedIn', status: 'New', createdAt: '2025-05-01T11:30:00Z', notes: 'Sustainability company, high potential'
  },
];

function getLeads(): Lead[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_LEADS));
    return SEED_LEADS;
  }
  return JSON.parse(stored);
}

function saveLeads(leads: Lead[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function getHistory(): HistoryEntry[] {
  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

function addHistory(entry: Omit<HistoryEntry, 'id' | 'timestamp'>): void {
  const history = getHistory();
  history.unshift({
    ...entry,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
  });
  // Keep last 100 entries
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 100)));
}

export const api = {
  getLeads: (): Lead[] => {
    return getLeads();
  },

  getLead: (id: string): Lead | undefined => {
    return getLeads().find(l => l.id === id);
  },

  createLead: (data: LeadFormData): Lead => {
    const leads = getLeads();
    const newLead: Lead = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    leads.unshift(newLead);
    saveLeads(leads);
    addHistory({ leadId: newLead.id, leadName: newLead.name, action: 'created', details: `Lead "${newLead.name}" from ${newLead.company} was created` });
    return newLead;
  },

  updateLead: (id: string, data: Partial<LeadFormData>): Lead | undefined => {
    const leads = getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return undefined;
    const oldLead = leads[index];
    leads[index] = { ...leads[index], ...data };
    saveLeads(leads);

    if (data.status && data.status !== oldLead.status) {
      addHistory({ leadId: id, leadName: leads[index].name, action: 'status_changed', details: `Status changed from "${oldLead.status}" to "${data.status}"` });
    } else {
      addHistory({ leadId: id, leadName: leads[index].name, action: 'updated', details: `Lead "${leads[index].name}" was updated` });
    }
    return leads[index];
  },

  deleteLead: (id: string): boolean => {
    const leads = getLeads();
    const lead = leads.find(l => l.id === id);
    const filtered = leads.filter(l => l.id !== id);
    if (filtered.length === leads.length) return false;
    saveLeads(filtered);
    if (lead) {
      addHistory({ leadId: id, leadName: lead.name, action: 'deleted', details: `Lead "${lead.name}" was deleted` });
    }
    return true;
  },

  updateLeadStatus: (id: string, status: LeadStatus): Lead | undefined => {
    return api.updateLead(id, { status });
  },

  getHistory: (): HistoryEntry[] => {
    return getHistory();
  },
};
