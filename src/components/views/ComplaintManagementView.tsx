import React, { useState } from 'react';
import { ActiveView, Bureau, Complaint, SeverityLevel } from '../../types';

interface ComplaintManagementViewProps {
  onNavigate: (view: ActiveView, params?: { institutionId?: string; matchId?: string; docketId?: string }) => void;
  complaints: Complaint[];
  selectedComplaint: Complaint | null;
  onSelectComplaint: (complaint: Complaint | null) => void;
  onOpenLogGrievance: () => void;
}

export const ComplaintManagementView: React.FC<ComplaintManagementViewProps> = ({
  onNavigate,
  complaints,
  selectedComplaint,
  onSelectComplaint,
  onOpenLogGrievance
}) => {
  const [bureauFilter, setBureauFilter] = useState<string>('ALL');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComplaints = complaints.filter(comp => {
    if (bureauFilter !== 'ALL' && comp.bureau !== bureauFilter) return false;
    if (severityFilter !== 'ALL' && comp.severity !== severityFilter) return false;
    if (statusFilter !== 'ALL' && comp.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        comp.id.toLowerCase().includes(q) ||
        comp.institutionName.toLowerCase().includes(q) ||
        comp.category.toLowerCase().includes(q) ||
        comp.summary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded tracking-wide font-data-mono">
                CENTRAL COMPLAINTS & GRIEVANCES REPOSITORY
              </span>
              <span className="bg-surface-container text-on-surface-variant text-[11px] font-semibold px-2 py-0.5 rounded font-data-mono">
                AICTE SECTION 10(k)
              </span>
            </div>
            <h1 className="font-headline-lg font-bold text-on-surface text-xl sm:text-2xl tracking-tight">
              National Grievance & Statutory Complaint Register
            </h1>
            <p className="text-on-surface-variant text-xs mt-1 max-w-3xl">
              Master repository of all incoming petitions, whistleblower depositions, and regulatory violations across all technical institutes with automated docketing.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenLogGrievance}
              className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Log Grievance Docket</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[11px] font-semibold text-outline uppercase tracking-wider font-label-md">Total Registered Dockets</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-on-surface">{complaints.length} Records</span>
            <span className="text-[11px] text-emerald-600 font-bold font-data-mono">Live Sync</span>
          </div>
          <p className="text-[11px] text-outline mt-1">Ingested via central grievance gateways</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border-2 border-primary/20 shadow-xs">
          <div className="text-[11px] font-semibold text-primary uppercase tracking-wider font-label-md">Critical Severity</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-primary">
              {complaints.filter(c => c.severity === 'CRITICAL').length} Cases
            </span>
            <span className="text-[11px] text-error bg-error/10 px-1.5 py-0.2 rounded font-data-mono font-bold">Fast-Track</span>
          </div>
          <p className="text-[11px] text-outline mt-1">Requires immediate supervisory cognizance</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[11px] font-semibold text-outline uppercase tracking-wider font-label-md">Cross-Bureau Linked</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-on-surface">
              {complaints.filter(c => c.hasActiveOverlap).length} Cases
            </span>
            <span className="text-[11px] text-secondary font-bold font-data-mono">Overlap Active</span>
          </div>
          <p className="text-[11px] text-outline mt-1">Multi-signal entity convergence detected</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[11px] font-semibold text-outline uppercase tracking-wider font-label-md">Under SLA Watch (≤ 7d)</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-on-surface">
              {complaints.filter(c => c.slaDaysRemaining <= 7).length} Dockets
            </span>
            <span className="text-[11px] text-amber-700 font-bold font-data-mono">At-Risk</span>
          </div>
          <p className="text-[11px] text-outline mt-1">Section 10(k) 30-day statutory timeline</p>
        </div>
      </div>

      {/* Main Grid: Data Table + Detail Drawer */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Table Container */}
        <div className="flex-1 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4 w-full">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={bureauFilter}
                onChange={(e) => setBureauFilter(e.target.value)}
                className="bg-surface-container-low border border-surface-container-high text-xs rounded-lg p-2 outline-none font-body-sm"
              >
                <option value="ALL">All Bureaus</option>
                <option value="PGRC">PGRC</option>
                <option value="RB">Regulatory Bureau</option>
                <option value="AB">Approval Bureau</option>
                <option value="PAPC">Policy Bureau</option>
              </select>

              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="bg-surface-container-low border border-surface-container-high text-xs rounded-lg p-2 outline-none font-body-sm"
              >
                <option value="ALL">All Severities</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-surface-container-low border border-surface-container-high text-xs rounded-lg p-2 outline-none font-body-sm"
              >
                <option value="ALL">All Statuses</option>
                <option value="UNDER_INVESTIGATION">Under Investigation</option>
                <option value="PRELIMINARY_REVIEW">Preliminary Review</option>
                <option value="CROSS_EXAMINATION">Cross Examination</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dockets, keywords..."
                className="w-full bg-surface-container-low border border-surface-container-high text-xs rounded-lg pl-8 pr-3 py-2 outline-none font-body-sm"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-outline text-[16px] pointer-events-none">
                search
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-surface-container-high text-on-surface-variant font-label-md text-[11px] uppercase tracking-wider bg-surface-container-low/50">
                  <th className="py-3 px-3">Docket ID</th>
                  <th className="py-3 px-3">Target Institution</th>
                  <th className="py-3 px-3">Bureau</th>
                  <th className="py-3 px-3">Complainant</th>
                  <th className="py-3 px-3">Severity</th>
                  <th className="py-3 px-3">Overlap</th>
                  <th className="py-3 px-3">SLA Clock</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {filteredComplaints.map((comp) => {
                  const isSelected = selectedComplaint?.id === comp.id;
                  return (
                    <tr
                      key={comp.id}
                      onClick={() => onSelectComplaint(comp)}
                      className={`hover:bg-surface-container-low transition-colors cursor-pointer ${
                        isSelected ? 'bg-primary-fixed/20 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-data-mono font-bold text-primary whitespace-nowrap">
                        {comp.id}
                      </td>
                      <td className="py-3 px-3 font-semibold text-on-surface max-w-[180px] truncate" title={comp.institutionName}>
                        {comp.institutionName}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="bg-primary/10 text-primary font-bold px-1.5 py-0.5 rounded text-[10px] font-data-mono">
                          {comp.bureau}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-on-surface-variant max-w-[140px] truncate">
                        {comp.complainantType}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-data-mono font-bold ${
                          comp.severity === 'CRITICAL'
                            ? 'bg-error-container text-on-error-container'
                            : comp.severity === 'HIGH'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-surface-container-high text-on-surface'
                        }`}>
                          {comp.severity}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {comp.hasActiveOverlap ? (
                          <span className="bg-error-container text-on-error-container font-data-mono text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 w-max">
                            <span className="material-symbols-outlined text-[12px]">hub</span>
                            {comp.overlapConfidence}%
                          </span>
                        ) : (
                          <span className="text-outline text-[11px]">—</span>
                        )}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-data-mono">
                        <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                          comp.slaDaysRemaining <= 5
                            ? 'bg-error text-on-error font-bold'
                            : comp.slaDaysRemaining <= 15
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {comp.slaDaysRemaining}d
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectComplaint(comp);
                          }}
                          className="text-primary hover:text-secondary p-1 rounded hover:bg-surface-container transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sticky Detail Drawer */}
        {selectedComplaint && (
          <div className="w-full lg:w-96 bg-surface-container-lowest p-6 rounded-2xl border-2 border-primary/20 shadow-lg space-y-5 shrink-0 sticky top-20">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-primary text-on-primary font-data-mono font-bold text-xs px-2 py-0.5 rounded">
                    {selectedComplaint.id}
                  </span>
                  <span className="bg-primary-container text-primary-fixed text-[10px] font-bold px-2 py-0.5 rounded font-data-mono">
                    {selectedComplaint.bureau}
                  </span>
                </div>
                <div className="text-xs font-semibold text-on-surface mt-2">
                  {selectedComplaint.institutionName}
                </div>
              </div>
              <button
                onClick={() => onSelectComplaint(null)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-md hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Overlap notice if active */}
            {selectedComplaint.hasActiveOverlap && (
              <div className="bg-primary text-on-primary p-3.5 rounded-xl space-y-2 border-l-4 border-l-secondary-container">
                <div className="flex items-center justify-between text-xs font-bold text-secondary-container">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">hub</span>
                    <span>Cross-Bureau Overlap Flagged</span>
                  </div>
                  <span className="font-data-mono">{selectedComplaint.overlapConfidence}%</span>
                </div>
                <p className="text-[11px] text-on-primary-container leading-relaxed">
                  Coupled with Docket <span className="font-semibold text-white font-data-mono">{selectedComplaint.matchedDocketId}</span>.
                </p>
                <button
                  onClick={() => onNavigate('overlap-detection', { docketId: selectedComplaint.id })}
                  className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <span>Review in Overlap Workspace →</span>
                </button>
              </div>
            )}

            {/* Details & Facts */}
            <div className="space-y-3 text-xs">
              <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container-high space-y-1">
                <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Allegation Headnote</div>
                <div className="font-semibold text-on-surface">{selectedComplaint.category}</div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Summary Facts</div>
                <p className="text-on-surface-variant text-[11px] leading-relaxed">
                  {selectedComplaint.summary}
                </p>
              </div>

              {selectedComplaint.financialImplication && (
                <div className="bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high flex items-center justify-between">
                  <span className="text-[11px] text-outline">Alleged Financial Siphon:</span>
                  <span className="font-bold text-primary font-data-mono">{selectedComplaint.financialImplication}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-surface-container-low p-2 rounded border border-surface-container-high">
                  <div className="text-outline text-[9px] uppercase">Complainant</div>
                  <div className="font-semibold text-on-surface truncate">{selectedComplaint.complainantType}</div>
                </div>
                <div className="bg-surface-container-low p-2 rounded border border-surface-container-high">
                  <div className="text-outline text-[9px] uppercase">Investigator</div>
                  <div className="font-semibold text-on-surface truncate">{selectedComplaint.assignedOfficer}</div>
                </div>
              </div>

              {/* Evidence attachments */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Attached Evidentiary Exhibits</div>
                {selectedComplaint.evidenceFiles.map((ev, i) => (
                  <div key={i} className="bg-surface-container-low p-2 rounded-lg border border-surface-container-high flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="material-symbols-outlined text-primary text-[16px]">attach_file</span>
                      <span className="truncate font-medium">{ev.name}</span>
                    </div>
                    <span className="text-outline text-[10px] font-data-mono shrink-0">{ev.size}</span>
                  </div>
                ))}
              </div>

              {/* Audit trail */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Docket Audit Trail</div>
                <div className="space-y-1 text-[10px] text-on-surface-variant font-data-mono">
                  {selectedComplaint.auditTrail.map((aud, i) => (
                    <div key={i} className="bg-surface-container-low p-2 rounded border border-surface-container-high">
                      <div className="flex justify-between font-bold text-primary">
                        <span>{aud.action}</span>
                        <span>{aud.date}</span>
                      </div>
                      <div className="text-[9px] text-outline mt-0.5">{aud.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-surface-container-high space-y-2">
              <button
                onClick={() => onNavigate('institution-directory', { institutionId: selectedComplaint.institutionId })}
                className="w-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">domain</span>
                <span>View Full Institution Dossier</span>
              </button>
              {selectedComplaint.hasActiveOverlap && (
                <button
                  onClick={() => onNavigate('coordination-workspace')}
                  className="w-full bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold py-2 px-3 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">handshake</span>
                  <span>Open Coordination Workspace</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
