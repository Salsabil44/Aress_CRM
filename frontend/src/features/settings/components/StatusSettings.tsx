import { Info } from 'lucide-react';
import { LEAD_STATUSES, STATUS_COLORS } from '@/types';

export function StatusSettings() {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60">
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
            <Info className="w-3.5 h-3.5 text-violet-500" />
          </div>
          <div>
            <h3 className="text-[14px] font-semibold text-slate-800">Pipeline Statuses</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Current lead status configuration</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-2">
          {LEAD_STATUSES.map((status, index) => {
            const colors = STATUS_COLORS[status];
            return (
              <div
                key={status}
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-50 hover:bg-slate-50/50 transition-colors duration-100"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded bg-slate-50 text-[10px] font-bold text-slate-400">
                  {index + 1}
                </div>
                <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-slate-600">{status}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {getStatusDescription(status)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Leads progress through stages via the Pipeline view. Drag cards between columns to update status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusDescription(status: string): string {
  switch (status) {
    case 'New': return 'Newly added leads, not yet contacted';
    case 'Contacted': return 'Initial outreach has been made';
    case 'Interested': return 'Lead has shown interest';
    case 'Negotiation': return 'Active discussions on terms';
    case 'Won': return 'Successfully converted';
    case 'Lost': return 'Lead decided not to proceed';
    default: return '';
  }
}
