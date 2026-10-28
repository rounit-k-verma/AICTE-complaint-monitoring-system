import React from 'react';
import { ActiveView, Complaint, Institution, OverlapMatch } from '../../types';
import { SYSTEM_METRICS } from '../../data/mockData';

interface DashboardViewProps {
  onNavigate: (view: ActiveView, params?: { institutionId?: string; matchId?: string; docketId?: string }) => void;
  complaints: Complaint[];
  overlapMatches: OverlapMatch[];
  institutions: Institution[];
  onSelectComplaint: (complaint: Complaint) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  complaints,
  overlapMatches,
  institutions,
  onSelectComplaint
}) => {
  const topMatch = overlapMatches[0];

  return (
    <div className="space-y-6">
      {/* Top Welcome & Sub-Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded tracking-wide font-data-mono">
              LIVE SURVEILLANCE FEED • AICTE ACT 1987
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold font-data-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              ALL SYSTEMS ONLINE
            </span>
          </div>
          <h1 className="font-headline-lg font-bold text-on-surface text-xl sm:text-2xl tracking-tight">
            National Institutional Complaint Surveillance Dashboard
          </h1>
          <p className="text-on-surface-variant text-xs mt-1 max-w-3xl">
            Real-time cross-bureau aggregation engine monitoring 849 approved technical institutes across 5 statutory bureaus with continuous entity resolution & NLP claim matching.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('overlap-detection')}
            className="flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container px-4 py-2.5 rounded-xl font-label-md transition-all shadow-sm active:scale-95 text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">hub</span>
            <span>Overlap Engine ({overlapMatches.length})</span>
          </button>
          <button
            onClick={() => onNavigate('reports-and-analytics')}
            className="flex items-center gap-2 border border-surface-container-high bg-surface-container-low hover:bg-surface-container text-on-surface px-4 py-2.5 rounded-xl font-label-md transition-all text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">query_stats</span>
            <span>Compliance Reports</span>
          </button>
        </div>
      </div>

      {/* Top KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs hover:border-secondary/40 transition-all">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-xs font-label-md uppercase tracking-wider font-semibold">Active Complaints</span>
            <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-on-surface">{SYSTEM_METRICS.activeComplaintsTotal}</span>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-data-mono">
              {SYSTEM_METRICS.activeComplaintsChange}
            </span>
          </div>
          <p className="text-[11px] text-outline mt-2">Active across 4 regional directorates</p>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => onNavigate('overlap-detection')}
          className="bg-surface-container-lowest p-5 rounded-xl border-2 border-primary/20 shadow-xs hover:border-primary cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-xs font-label-md uppercase tracking-wider font-semibold text-primary">Cross-Bureau Overlaps</span>
            <span className="material-symbols-outlined text-primary text-[20px] group-hover:scale-110 transition-transform">
              hub
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-primary">{SYSTEM_METRICS.highConfidenceOverlaps}</span>
            <span className="text-[11px] font-semibold text-error bg-error/10 px-1.5 py-0.5 rounded font-data-mono">
              Action Required
            </span>
          </div>
          <p className="text-[11px] text-outline mt-2">{SYSTEM_METRICS.highConfidenceResolved}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs hover:border-secondary/40 transition-all">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-xs font-label-md uppercase tracking-wider font-semibold">30-Day SLA Adherence</span>
            <span className="material-symbols-outlined text-secondary text-[20px]">timer</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-on-surface">{SYSTEM_METRICS.slaComplianceRate}</span>
            <span className="text-[11px] font-semibold text-secondary bg-secondary-fixed/50 px-1.5 py-0.5 rounded font-data-mono">
              {SYSTEM_METRICS.slaAverageDays}
            </span>
          </div>
          <p className="text-[11px] text-outline mt-2">Statutory resolution timeline under APH</p>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => onNavigate('institution-directory')}
          className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs hover:border-secondary/40 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="text-xs font-label-md uppercase tracking-wider font-semibold">High-Risk Institutes</span>
            <span className="material-symbols-outlined text-tertiary-container text-[20px]">warning</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-headline-xl font-bold text-2xl text-on-surface">{SYSTEM_METRICS.highRiskInstitutionsCount}</span>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-data-mono">
              Recidivism Matrix
            </span>
          </div>
          <p className="text-[11px] text-outline mt-2">Institutes with ≥ 3 concurrent dockets</p>
        </div>
      </div>

      {/* HERO ALERT CARD: High Confidence Overlap Flagged */}
      {topMatch && (
        <div className="relative overflow-hidden bg-primary text-on-primary rounded-2xl p-6 shadow-md border-l-6 border-l-secondary-container">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-error text-on-error px-2.5 py-0.5 rounded-full text-[10px] font-bold font-data-mono tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  HIGH-CONFIDENCE CROSS-BUREAU OVERLAP DETECTED
                </span>
                <span className="bg-primary-container text-primary-fixed text-[11px] font-semibold px-2 py-0.5 rounded font-data-mono">
                  {topMatch.confidenceScore}% AI Confidence Vector
                </span>
              </div>
              <span className="text-[11px] text-on-primary-container font-data-mono">
                Detected: {topMatch.detectionTimestamp}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-3">
                <div>
                  <span className="text-xs text-primary-fixed/80 uppercase font-bold tracking-wider">Target Institution</span>
                  <h3 className="font-headline-md font-bold text-lg sm:text-xl text-white">
                    {topMatch.institutionName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-primary-container/60 p-3.5 rounded-xl border border-primary-container">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-primary-fixed font-semibold">
                      <span className="material-symbols-outlined text-[16px]">gavel</span>
                      <span>{topMatch.docketA.id} ({topMatch.docketA.bureau})</span>
                    </div>
                    <p className="text-on-primary-container text-[11px] line-clamp-2">
                      {topMatch.docketA.summary}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-primary-fixed font-semibold">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>{topMatch.docketB.id} ({topMatch.docketB.bureau})</span>
                    </div>
                    <p className="text-on-primary-container text-[11px] line-clamp-2">
                      {topMatch.docketB.summary}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-on-primary-container leading-relaxed">
                  <span className="font-semibold text-white">Correlated Pattern: </span>
                  {topMatch.aiSynthesis}
                </p>
              </div>

              {/* Action Buttons Column */}
              <div className="flex flex-col gap-2.5 justify-center bg-primary-container/30 p-4 rounded-xl border border-primary-container/50">
                <button
                  onClick={() => onNavigate('overlap-detection', { matchId: topMatch.matchId })}
                  className="w-full flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-secondary/90 py-2.5 px-4 rounded-lg font-label-md text-xs font-semibold shadow-sm transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
                  <span>Review & Compare Match</span>
                </button>
                <button
                  onClick={() => onNavigate('coordination-workspace')}
                  className="w-full flex items-center justify-center gap-2 bg-surface-container-lowest text-primary hover:bg-surface-container py-2.5 px-4 rounded-lg font-label-md text-xs font-semibold transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">groups</span>
                  <span>Open Coordination Workspace</span>
                </button>
                <button
                  onClick={() => onNavigate('institution-directory', { institutionId: topMatch.institutionId })}
                  className="w-full text-center text-[11px] text-primary-fixed hover:text-white py-1 transition-colors underline underline-offset-4"
                >
                  View Unified Institution Profile →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Middle Row: Bureau Workloads & SLA Ageing Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bureau Workload Breakdown */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface text-sm">
                Bureau Active Workload Distribution
              </h3>
              <p className="text-on-surface-variant text-[11px]">
                Distribution of 1,248 active complaints across statutory cells
              </p>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">donut_small</span>
          </div>

          <div className="space-y-4 pt-1">
            {SYSTEM_METRICS.bureauWorkloads.map((b) => (
              <div key={b.bureau} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-on-surface">
                    <span className="font-data-mono text-primary font-bold">{b.bureau}</span>
                    <span className="text-on-surface-variant font-normal">({b.name})</span>
                  </div>
                  <div className="flex items-center gap-2 font-data-mono">
                    <span className="font-bold text-on-surface">{b.count} cases</span>
                    <span className="text-outline text-[11px]">({b.activePercent}%)</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${b.activePercent}%`, backgroundColor: b.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SLA Ageing Distribution */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface text-sm">
                Statutory 30-Day SLA Ageing Distribution
              </h3>
              <p className="text-on-surface-variant text-[11px]">
                Complaints categorized by duration since preliminary registration
              </p>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">hourglass_top</span>
          </div>

          <div className="space-y-3.5 pt-1">
            {SYSTEM_METRICS.slaAgeingDistribution.map((sla, idx) => {
              const badgeStyle =
                sla.status === 'safe'
                  ? 'bg-emerald-50 text-emerald-700'
                  : sla.status === 'warning'
                  ? 'bg-amber-50 text-amber-700'
                  : sla.status === 'alert'
                  ? 'bg-orange-50 text-orange-700 font-bold'
                  : 'bg-error-container text-on-error-container font-bold';

              const barColor =
                sla.status === 'safe'
                  ? '#10b981'
                  : sla.status === 'warning'
                  ? '#f59e0b'
                  : sla.status === 'alert'
                  ? '#ea580c'
                  : '#ba1a1a';

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-on-surface">{sla.label}</span>
                    <div className="flex items-center gap-2 font-data-mono">
                      <span className={`px-1.5 py-0.2 rounded text-[10px] ${badgeStyle}`}>
                        {sla.count} cases
                      </span>
                      <span className="text-outline text-[11px]">{sla.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${sla.percentage}%`, backgroundColor: barColor }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Cross-Bureau Complaints Table */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="font-headline-sm font-bold text-on-surface text-sm sm:text-base">
              Active Priority Surveillance Dockets
            </h3>
            <p className="text-on-surface-variant text-[11px]">
              Click any docket row to inspect comprehensive investigative dossier & whistleblower evidence
            </p>
          </div>
          <button
            onClick={() => onNavigate('complaint-management')}
            className="text-xs text-secondary font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Full National Register ({complaints.length})</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-surface-container-high text-on-surface-variant font-label-md text-[11px] uppercase tracking-wider bg-surface-container-low/50">
                <th className="py-3 px-4">Docket ID</th>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4">Bureau</th>
                <th className="py-3 px-4">Allegation / Infraction</th>
                <th className="py-3 px-4">Overlap Flag</th>
                <th className="py-3 px-4">SLA Clock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {complaints.slice(0, 5).map((comp) => (
                <tr
                  key={comp.id}
                  onClick={() => onSelectComplaint(comp)}
                  className="hover:bg-surface-container-low transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 font-data-mono font-bold text-primary whitespace-nowrap">
                    {comp.id}
                  </td>
                  <td className="py-3 px-4 font-medium text-on-surface max-w-[200px] truncate">
                    {comp.institutionName}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded text-[10px] font-data-mono">
                      {comp.bureau}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant max-w-[240px] truncate" title={comp.category}>
                    {comp.category}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {comp.hasActiveOverlap ? (
                      <span className="inline-flex items-center gap-1 bg-error-container text-on-error-container px-2 py-0.5 rounded text-[10px] font-bold font-data-mono">
                        <span className="material-symbols-outlined text-[13px]">hub</span>
                        {comp.overlapConfidence}% Match
                      </span>
                    ) : (
                      <span className="text-outline text-[11px]">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-data-mono">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                        comp.slaDaysRemaining <= 5
                          ? 'bg-error-container text-on-error-container'
                          : comp.slaDaysRemaining <= 15
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {comp.slaDaysRemaining}d remaining
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="bg-surface-container-high text-on-surface px-2 py-0.5 rounded text-[10px] font-medium font-data-mono">
                      {comp.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectComplaint(comp);
                      }}
                      className="text-primary hover:text-secondary p-1 rounded hover:bg-surface-container transition-colors"
                      title="Inspect docket drawer"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
