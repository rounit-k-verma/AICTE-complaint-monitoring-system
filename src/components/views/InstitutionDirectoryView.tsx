import React, { useState } from 'react';
import { ActiveView, Complaint, Institution } from '../../types';

interface InstitutionDirectoryViewProps {
  onNavigate: (view: ActiveView, params?: { institutionId?: string; matchId?: string; docketId?: string }) => void;
  institutions: Institution[];
  complaints: Complaint[];
  selectedInstitutionId?: string;
  onSelectComplaint: (complaint: Complaint) => void;
}

export const InstitutionDirectoryView: React.FC<InstitutionDirectoryViewProps> = ({
  onNavigate,
  institutions,
  complaints,
  selectedInstitutionId: initialSelectedId,
  onSelectComplaint
}) => {
  const [selectedInstId, setSelectedInstId] = useState<string>(
    initialSelectedId || institutions[0]?.id || 'AICTE-DEMO-1024'
  );
  const [filterRegion, setFilterRegion] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState('');

  const currentInst = institutions.find(i => i.id === selectedInstId) || institutions[0];
  const instComplaints = complaints.filter(c => c.institutionId === currentInst.id);

  const filteredInstitutions = institutions.filter(inst => {
    if (filterRegion !== 'ALL' && inst.region !== filterRegion) return false;
    if (filterStatus !== 'ALL' && inst.approvalStatus !== filterStatus) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        inst.name.toLowerCase().includes(q) ||
        inst.code.toLowerCase().includes(q) ||
        inst.city.toLowerCase().includes(q) ||
        inst.state.toLowerCase().includes(q)
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
                CENTRAL REPOSITORY OF TECHNICAL INSTITUTIONS (CRTI)
              </span>
              <span className="bg-surface-container text-on-surface-variant text-[11px] font-semibold px-2 py-0.5 rounded font-data-mono">
                AISHE SYNCHRONIZED
              </span>
            </div>
            <h1 className="font-headline-lg font-bold text-on-surface text-xl sm:text-2xl tracking-tight">
              Technical Institution Directory & 360° Surveillance Dossier
            </h1>
            <p className="text-on-surface-variant text-xs mt-1 max-w-3xl">
              Cross-referenced institutional master profiles integrating academic approval records, faculty biometric registers, and cross-bureau complaint histories.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('reports-and-analytics')}
              className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">assessment</span>
              <span>Recidivism Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[11px] font-semibold text-outline uppercase tracking-wider font-label-md">Approved Institutions</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-on-surface">849 Active</span>
            <span className="text-[11px] text-emerald-600 font-bold font-data-mono">100% AISHE</span>
          </div>
          <p className="text-[11px] text-outline mt-1">Spanning Northern, Western, Southern, Eastern regions</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border-2 border-primary/20 shadow-xs">
          <div className="text-[11px] font-semibold text-primary uppercase tracking-wider font-label-md">Under Scrutiny / Notices</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-primary">38 Institutes</span>
            <span className="text-[11px] text-error bg-error/10 px-1.5 py-0.2 rounded font-data-mono font-bold">Watchlist</span>
          </div>
          <p className="text-[11px] text-outline mt-1">Directly monitored by Central Vigilance Cell</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[11px] font-semibold text-outline uppercase tracking-wider font-label-md">Active Overlap Clusters</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-on-surface">14 Campuses</span>
            <span className="text-[11px] text-secondary font-bold font-data-mono">Cross-Bureau</span>
          </div>
          <p className="text-[11px] text-outline mt-1">Simultaneous multi-bureau active dockets</p>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[11px] font-semibold text-outline uppercase tracking-wider font-label-md">Mean Compliance Score</div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-on-surface">82.6%</span>
            <span className="text-[11px] text-emerald-600 font-bold font-data-mono">APH 2026</span>
          </div>
          <p className="text-[11px] text-outline mt-1">Based on faculty cadre & lab norms</p>
        </div>
      </div>

      {/* 360-Degree Unified Profile Dossier (North Valley Institute of Technology by default) */}
      {currentInst && (
        <div className="bg-surface-container-lowest rounded-2xl border-2 border-primary/20 shadow-md overflow-hidden">
          {/* Institution Dossier Header */}
          <div className="bg-primary text-on-primary p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-primary-container text-primary-fixed text-xs font-bold px-2.5 py-0.5 rounded font-data-mono">
                    {currentInst.id}
                  </span>
                  <span className="bg-surface-container-highest text-on-surface text-xs font-bold px-2 py-0.5 rounded font-data-mono">
                    {currentInst.code}
                  </span>
                  <span className="bg-error text-on-error text-xs font-bold px-2 py-0.5 rounded uppercase font-data-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    RECIDIVISM RISK: {currentInst.recidivismRiskIndex}
                  </span>
                  <span className="bg-amber-400 text-black text-xs font-bold px-2 py-0.5 rounded font-data-mono">
                    {currentInst.approvalStatus}
                  </span>
                </div>
                <h2 className="font-headline-xl font-bold text-xl sm:text-2xl text-white">
                  {currentInst.name}
                </h2>
                <p className="text-xs text-on-primary-container mt-1">
                  {currentInst.address} • Region: {currentInst.region} • Est: {currentInst.establishedYear}
                </p>
              </div>

              {/* Dossier Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onNavigate('coordination-workspace')}
                  className="bg-secondary text-on-secondary hover:bg-secondary/90 px-4 py-2 rounded-lg text-xs font-label-md font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">handshake</span>
                  <span>Open Coordination Workspace</span>
                </button>
                <button
                  onClick={() => onNavigate('overlap-detection')}
                  className="bg-primary-container hover:bg-surface-container text-white px-3.5 py-2 rounded-lg text-xs font-label-md transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">hub</span>
                  <span>Inspect Overlaps</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container-high">
                <div className="text-[10px] text-outline font-semibold uppercase">Head of Institute</div>
                <div className="text-xs font-bold text-on-surface mt-1 truncate" title={currentInst.headOfInstitution}>
                  {currentInst.headOfInstitution}
                </div>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container-high">
                <div className="text-[10px] text-outline font-semibold uppercase">Accreditation</div>
                <div className="text-xs font-bold text-on-surface mt-1">{currentInst.accreditationGrade}</div>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container-high">
                <div className="text-[10px] text-outline font-semibold uppercase">Faculty Strength</div>
                <div className="text-xs font-bold text-on-surface mt-1">{currentInst.facultyCount} Sanctioned</div>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container-high">
                <div className="text-[10px] text-outline font-semibold uppercase">Enrolled Students</div>
                <div className="text-xs font-bold text-on-surface mt-1">{currentInst.studentEnrollment} Regular</div>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container-high">
                <div className="text-[10px] text-outline font-semibold uppercase">Active Dockets</div>
                <div className="text-xs font-bold text-error mt-1">{currentInst.activeComplaintsCount} Dockets ({currentInst.criticalComplaintsCount} Critical)</div>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container-high">
                <div className="text-[10px] text-outline font-semibold uppercase">Compliance Index</div>
                <div className="text-xs font-bold text-on-surface mt-1">{currentInst.complianceScore} / 100</div>
              </div>
            </div>

            {/* Dockets Associated with This Institution */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-headline-sm font-bold text-on-surface text-sm">
                  Active Cross-Bureau Investigation Dockets for {currentInst.name}
                </h3>
                <span className="text-xs font-data-mono text-outline">
                  {instComplaints.length} Dockets Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {instComplaints.map((comp) => (
                  <div
                    key={comp.id}
                    onClick={() => onSelectComplaint(comp)}
                    className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high hover:border-secondary cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-data-mono font-bold text-primary text-xs group-hover:text-secondary transition-colors">
                          {comp.id}
                        </span>
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.2 rounded font-data-mono">
                          {comp.bureau}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded font-data-mono ${
                        comp.severity === 'CRITICAL'
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {comp.severity}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-on-surface leading-snug">
                      {comp.category}
                    </div>

                    <p className="text-[11px] text-on-surface-variant line-clamp-2">
                      {comp.summary}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-surface-container-high text-[10px] text-outline font-data-mono">
                      <span>Filed: {comp.dateFiled}</span>
                      <span>SLA: {comp.slaDaysRemaining}d remaining</span>
                      <span className="text-primary font-semibold group-hover:underline">Inspect →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chronological Surveillance Timeline */}
            <div className="bg-surface-container-low p-5 rounded-xl border border-surface-container-high space-y-3">
              <h4 className="font-headline-sm font-bold text-on-surface text-sm">
                Chronological Surveillance & Scrutiny Timeline
              </h4>
              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-highest">
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-error border-2 border-surface-container-low"></div>
                  <div className="text-xs font-bold text-on-surface">18 Feb 2026 • Cross-Bureau Evidence Match Confirmed</div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Overlap Engine validated 94.2% entity co-reference of 34 ghost faculties across PGRC and RB dockets. Group #GRP-2026-088 instituted.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-surface-container-low"></div>
                  <div className="text-xs font-bold text-on-surface">18 Jan 2026 • Regulatory Bureau Lodged Docket RB-2026-0087</div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    Anonymous whistleblower submitted biometric audit files citing fictitious doctoral faculty muster rolls.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-surface-container-low"></div>
                  <div className="text-xs font-bold text-on-surface">14 Jan 2026 • Faculty Council Lodged Docket PGRC-2026-0102</div>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">
                    142 faculty co-signatories filed formal petition for 7th CPC salary withholdings & research grant diversion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Master Table */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-headline-sm font-bold text-on-surface text-sm sm:text-base">
              National Technical Institutions Master Directory
            </h3>
            <p className="text-on-surface-variant text-[11px]">
              Select any institute to display complete unified surveillance dossier above
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="bg-surface-container-low border border-surface-container-high text-xs rounded-lg p-2 outline-none font-body-sm"
            >
              <option value="ALL">All Regions</option>
              <option value="Northern">Northern</option>
              <option value="Western">Western</option>
              <option value="Southern">Southern</option>
              <option value="Eastern">Eastern</option>
              <option value="Central">Central</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-surface-container-low border border-surface-container-high text-xs rounded-lg p-2 outline-none font-body-sm"
            >
              <option value="ALL">All Approval Statuses</option>
              <option value="APPROVED">APPROVED</option>
              <option value="UNDER_SCRUTINY">UNDER SCRUTINY</option>
              <option value="PROVISIONAL">PROVISIONAL</option>
              <option value="NOTICE_SERVED">NOTICE SERVED</option>
            </select>

            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by name, code, city..."
              className="bg-surface-container-low border border-surface-container-high text-xs rounded-lg p-2 outline-none font-body-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-surface-container-high text-on-surface-variant font-label-md text-[11px] uppercase tracking-wider bg-surface-container-low/50">
                <th className="py-3 px-4">AISHE / Code</th>
                <th className="py-3 px-4">Institute Name</th>
                <th className="py-3 px-4">Region / State</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Active Dockets</th>
                <th className="py-3 px-4">Recidivism Risk</th>
                <th className="py-3 px-4">Compliance</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {filteredInstitutions.map((inst) => {
                const isSelected = inst.id === selectedInstId;
                return (
                  <tr
                    key={inst.id}
                    onClick={() => setSelectedInstId(inst.id)}
                    className={`hover:bg-surface-container-low transition-colors cursor-pointer ${
                      isSelected ? 'bg-primary-fixed/20 font-medium' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-data-mono font-bold text-primary">
                      {inst.code}
                    </td>
                    <td className="py-3 px-4 font-semibold text-on-surface">
                      {inst.name}
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      {inst.region} ({inst.city})
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-data-mono font-semibold ${
                        inst.approvalStatus === 'APPROVED'
                          ? 'bg-emerald-50 text-emerald-700'
                          : inst.approvalStatus === 'UNDER_SCRUTINY'
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inst.approvalStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-data-mono">
                      <span className={inst.activeComplaintsCount > 0 ? 'text-error font-bold' : 'text-outline'}>
                        {inst.activeComplaintsCount} Cases
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-data-mono font-bold ${
                        inst.recidivismRiskIndex === 'CRITICAL'
                          ? 'bg-error text-on-error'
                          : inst.recidivismRiskIndex === 'HIGH'
                          ? 'bg-amber-500 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {inst.recidivismRiskIndex}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-data-mono">
                      {inst.complianceScore}%
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInstId(inst.id);
                        }}
                        className="text-xs text-primary font-semibold hover:underline"
                      >
                        Load Dossier →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
