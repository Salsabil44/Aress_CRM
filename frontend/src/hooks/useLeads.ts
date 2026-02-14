import { useState, useCallback, useEffect } from 'react';
import type { Lead, LeadFormData, LeadStatus } from '@/types';
import { api } from '@/services/api';
import type { HistoryEntry } from '@/services/api';

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setIsLoading(true);
    const data = api.getLeads();
    setLeads(data);
    setHistory(api.getHistory());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addLead = useCallback((data: LeadFormData) => {
    api.createLead(data);
    refresh();
  }, [refresh]);

  const updateLead = useCallback((id: string, data: Partial<LeadFormData>) => {
    api.updateLead(id, data);
    refresh();
  }, [refresh]);

  const deleteLead = useCallback((id: string) => {
    api.deleteLead(id);
    refresh();
  }, [refresh]);

  const updateStatus = useCallback((id: string, status: LeadStatus) => {
    api.updateLeadStatus(id, status);
    refresh();
  }, [refresh]);

  return {
    leads,
    history,
    isLoading,
    addLead,
    updateLead,
    deleteLead,
    updateStatus,
    refresh,
  };
}
