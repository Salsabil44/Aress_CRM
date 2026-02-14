import { Pencil, Trash2, Building2, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui';
import type { Lead } from '@/types';

interface LeadRowProps {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

export function LeadRow({ lead, onEdit, onDelete }: LeadRowProps) {
  return (
    <tr className="group border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors duration-100">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 text-[11px] font-semibold shrink-0">
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-slate-800 text-[13px] leading-tight">{lead.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Building2 className="w-3 h-3 text-slate-300" />
              <span className="text-[11px] text-slate-400">{lead.company}</span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-slate-300" />
            <span className="text-[12px] text-slate-500">{lead.email}</span>
          </div>
          {lead.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-slate-300" />
              <span className="text-[11px] text-slate-400">{lead.phone}</span>
            </div>
          )}
        </div>
      </td>
      <td className="px-5 py-3.5">
        <span className="text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-md font-medium">{lead.source}</span>
      </td>
      <td className="px-5 py-3.5">
        <Badge status={lead.status} />
      </td>
      <td className="px-5 py-3.5">
        <span className="text-[11px] text-slate-400 tabular-nums">
          {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(lead)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-md transition-colors duration-150 cursor-pointer"
          >
            <Pencil className="w-3 h-3" />
            Edit
          </button>
          <button
            onClick={() => onDelete(lead.id)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-md transition-colors duration-150 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
