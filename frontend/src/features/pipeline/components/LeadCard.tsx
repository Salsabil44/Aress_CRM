import { Building2, Mail, GripVertical } from 'lucide-react';
import type { Lead } from '@/types';

interface LeadCardProps {
  lead: Lead;
  onDragStart: (e: React.DragEvent, leadId: string) => void;
}

export function LeadCard({ lead, onDragStart }: LeadCardProps) {
  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, lead.id)}
      className="group bg-white rounded-lg border border-slate-200/60 p-3 hover:shadow-sm hover:border-slate-200 transition-all duration-150 cursor-grab active:cursor-grabbing active:shadow-md active:scale-[1.01]"
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-3.5 h-3.5 text-slate-200 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary-50 flex items-center justify-center text-primary-600 text-[9px] font-semibold shrink-0">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <p className="font-medium text-[13px] text-slate-700 truncate">{lead.name}</p>
          </div>
          <div className="mt-2 space-y-0.5 pl-8">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-slate-300 shrink-0" />
              <span className="text-[11px] text-slate-400 truncate">{lead.company}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-slate-300 shrink-0" />
              <span className="text-[11px] text-slate-400 truncate">{lead.email}</span>
            </div>
          </div>
          {lead.notes && (
            <p className="text-[10px] text-slate-300 mt-2 pl-8 line-clamp-2 leading-relaxed">{lead.notes}</p>
          )}
          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-50 pl-8">
            <span className="text-[10px] text-slate-300 tabular-nums">
              {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            <span className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded font-medium">{lead.source}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
