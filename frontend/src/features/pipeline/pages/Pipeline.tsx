import { KanbanBoard } from '../components';
import type { Lead, LeadStatus } from '@/types';

interface PipelinePageProps {
  leads: Lead[];
  onStatusChange: (leadId: string, status: LeadStatus) => void;
}

export function Pipeline({ leads, onStatusChange }: PipelinePageProps) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Pipeline</h1>
          <p className="text-[13px] text-slate-400 mt-0.5">
            Drag and drop leads to update their status
          </p>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-slate-400 bg-white border border-slate-200/60 rounded-lg px-3 py-2">
          <span className="font-semibold text-slate-600 tabular-nums">{leads.length}</span>
          <span>total leads</span>
        </div>
      </div>
      <KanbanBoard leads={leads} onStatusChange={onStatusChange} />
    </div>
  );
}
