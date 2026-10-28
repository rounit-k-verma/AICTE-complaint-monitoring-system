import React, { useState } from 'react';
import { ActiveView } from '../../types';

interface ReportsAnalyticsViewProps {
  onNavigate: (view: ActiveView, params?: { institutionId?: string; matchId?: string; docketId?: string }) => void;
}

export const ReportsAnalyticsView: React.FC<ReportsAnalyticsViewProps> = ({
  onNavigate
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('FY 2025-26');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleExport = (type: string) => {
    setDownloadSuccess(`Generated official AICTE Statutory Gazette Report (${type}). Ready for download.`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const recidivismMatrix = [
    { name: 'North Valley Institute of Technology', code: 'NVIT-DELHI', region: 'Northern', risk: 'CRITICAL', score: 96, repeatedAreas: 'Faculty Ghosting, Pay Deficit, Lab Grants Diversion', sanctionStatus: 'Joint Sec 10(p) Hearing' },
    { name: 'East Coast University of Applied Sciences', code: 'ECU-KOLKATA', region: 'Eastern', risk: 'HIGH', score: 84, repeatedAreas: 'Unauthorized Off-Campus Centers, Franchise Fraud', sanctionStatus: 'Notice Served' },
    { name: 'Apex College of Engineering & Technology', code: 'ACET-PUNE', region: 'Western', risk: 'HIGH', score: 79, repeatedAreas: 'Capitation Fees, Fire Hazard Inadequate Labs', sanctionStatus: 'Under Scrutiny' },
    { name: 'Marathwada Polytechnic Consortium', code: 'MPC-AURANG', region: 'Western', risk: 'MODERATE', score: 62, repeatedAreas: 'Late Examination Enrollment, Non-accreditation', sanctionStatus: 'Inspection Ordered' },
    { name: 'Vindhya Valley Institute of Tech', code: 'VVIT-REWA', region: 'Central', risk: 'MODERATE', score: 58, repeatedAreas: 'Faculty cadre mismatch, Student fee refund delay', sanctionStatus: 'Interim Reply Awaited' }
  ];

  return (
    <div className="space-y-6">
      {/* Export notification */}
      {downloadSuccess && (
        <div className="bg-emerald-50 border border-emerald-400 text-emerald-900 p-4 rounded-xl flex items-center justify-between text-xs font-semibold animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-[20px]">file_download_done</span>
            <span>{downloadSuccess}</span>
          </div>
          <button onClick={() => setDownloadSuccess(null)} className="text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-primary/10 text-primary text-[11px] font-bold px-2 py-0.5 rounded tracking-wide font-data-mono">
                REGULATORY INTELLIGENCE & STATUTORY METRICS
              </span>
              <span className="bg-surface-container text-on-surface-variant text-[11px] font-semibold px-2 py-0.5 rounded font-data-mono">
                BI-ANNUAL GAZETTE AUDIT
              </span>
            </div>
            <h1 className="font-headline-lg font-bold text-on-surface text-xl sm:text-2xl tracking-tight">
              Regulatory Analytics & Statutory Compliance Reports
            </h1>
            <p className="text-on-surface-variant text-xs mt-1 max-w-3xl">
              High-level institutional surveillance benchmarks, multi-bureau throughput, fraud-ring recidivism indices, and SLA enforcement analytics.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleExport('CSV')}
              className="flex items-center gap-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface px-3.5 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">csv</span>
              <span>Export Raw CSV</span>
            </button>
            <button
              onClick={() => handleExport('PDF')}
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-4 py-2.5 rounded-xl font-label-md text-xs font-semibold transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
              <span>Generate Official Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dimensional Filter Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-surface-container-high shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-outline font-semibold">Reporting Window:</span>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="bg-surface-container-low border border-surface-container-high rounded-lg p-2 font-body-sm text-primary font-bold outline-none"
            >
              <option value="FY 2025-26">FY 2025-26 (Annual)</option>
              <option value="Q3 2025-26">Q3 (Oct - Dec 2025)</option>
              <option value="Q4 2025-26">Q4 (Jan - Mar 2026)</option>
              <option value="Last 30 Days">Last 30 Days (Real-Time)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-outline font-semibold">Regional Directorate:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-surface-container-low border border-surface-container-high rounded-lg p-2 font-body-sm text-on-surface outline-none"
            >
              <option value="ALL">All Regional Directorates (National)</option>
              <option value="Northern">Northern Directorate (Delhi)</option>
              <option value="Western">Western Directorate (Mumbai/Pune)</option>
              <option value="Southern">Southern Directorate (Chennai/Bengaluru)</option>
              <option value="Eastern">Eastern Directorate (Kolkata)</option>
            </select>
          </div>
        </div>

        <div className="text-[11px] text-outline font-data-mono">
          Last Synced with AICTE Data Lake: 14 mins ago
        </div>
      </div>

      {/* 6 Key Performance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Total Dockets</div>
          <div className="text-xl font-bold text-on-surface mt-1 font-headline-md">4,892</div>
          <div className="text-[10px] text-emerald-600 font-bold font-data-mono mt-0.5">+18% YoY</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Mean Resolution</div>
          <div className="text-xl font-bold text-on-surface mt-1 font-headline-md">16.2 Days</div>
          <div className="text-[10px] text-secondary font-bold font-data-mono mt-0.5">-4.8d vs 2024</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border-2 border-primary/20 shadow-xs">
          <div className="text-[10px] text-primary font-semibold uppercase font-label-sm">Overlap Yield</div>
          <div className="text-xl font-bold text-primary mt-1 font-headline-md">14.2%</div>
          <div className="text-[10px] text-primary font-bold font-data-mono mt-0.5">Automated</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Joint Closures</div>
          <div className="text-xl font-bold text-on-surface mt-1 font-headline-md">184 Cases</div>
          <div className="text-[10px] text-emerald-600 font-bold font-data-mono mt-0.5">Sec 10(p) Enacted</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">SLA Breaches</div>
          <div className="text-xl font-bold text-on-surface mt-1 font-headline-md">&lt; 3.2%</div>
          <div className="text-[10px] text-emerald-600 font-bold font-data-mono mt-0.5">Benchmark: 5%</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Clawbacks / Fines</div>
          <div className="text-xl font-bold text-primary mt-1 font-headline-md">₹18.4 Cr</div>
          <div className="text-[10px] text-outline font-data-mono mt-0.5">Ordered Recovered</div>
        </div>
      </div>

      {/* Middle Row: Visual Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bureau Throughput Comparison */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface text-sm">
                Bureau Resolution Throughput Comparison
              </h3>
              <p className="text-on-surface-variant text-[11px]">
                Cases resolved vs under investigation by statutory bureau
              </p>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">bar_chart</span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { bureau: 'PGRC', name: 'Public Grievance Cell', resolved: 1420, active: 482, total: 1902, rate: '74.6%' },
              { bureau: 'RB', name: 'Regulatory Bureau', resolved: 1180, active: 394, total: 1574, rate: '74.9%' },
              { bureau: 'AB', name: 'Approval Bureau', resolved: 890, active: 246, total: 1136, rate: '78.3%' },
              { bureau: 'PAPC', name: 'Policy & Academic Planning', resolved: 360, active: 126, total: 486, rate: '74.1%' },
            ].map((row) => (
              <div key={row.bureau} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-data-mono font-bold text-primary">{row.bureau}</span>
                    <span className="text-on-surface-variant">({row.name})</span>
                  </div>
                  <div className="font-data-mono text-[11px]">
                    <span className="text-emerald-700 font-bold">{row.resolved} Closed</span>
                    <span className="text-outline mx-1">/</span>
                    <span className="text-primary font-bold">{row.active} Active</span>
                    <span className="text-secondary font-bold ml-2">({row.rate})</span>
                  </div>
                </div>

                <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{ width: `${(row.resolved / row.total) * 100}%` }}
                    title={`Resolved: ${row.resolved}`}
                  ></div>
                  <div
                    className="bg-amber-500 h-full transition-all"
                    style={{ width: `${(row.active / row.total) * 100}%` }}
                    title={`Active: ${row.active}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-2 text-[11px] text-outline">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-primary"></span>
              <span>Resolved within 30 days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
              <span>Active Investigation</span>
            </div>
          </div>
        </div>

        {/* AI Overlap Engine Detection Trends */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface text-sm">
                AI Multi-Signal Overlap Yield by Quarter
              </h3>
              <p className="text-on-surface-variant text-[11px]">
                Evolution of cross-bureau fraud detection efficiency since Model v4 rollout
              </p>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">trending_up</span>
          </div>

          <div className="grid grid-cols-4 gap-3 pt-4 items-end h-44 border-b border-surface-container-high pb-4 text-center">
            {[
              { quarter: 'Q1 2025', detected: 14, confirmed: 12, height: '40%' },
              { quarter: 'Q2 2025', detected: 22, confirmed: 20, height: '60%' },
              { quarter: 'Q3 2025', detected: 31, confirmed: 29, height: '80%' },
              { quarter: 'Q4 2026 (Live)', detected: 42, confirmed: 38, height: '100%' },
            ].map((q) => (
              <div key={q.quarter} className="flex flex-col items-center justify-end h-full gap-2">
                <span className="text-[11px] font-bold text-primary font-data-mono">{q.detected}</span>
                <div
                  className="w-12 bg-primary hover:bg-primary-container rounded-t-lg transition-all"
                  style={{ height: q.height }}
                ></div>
                <div className="text-[10px] text-on-surface font-semibold">{q.quarter}</div>
                <div className="text-[9px] text-emerald-600 font-data-mono">{q.confirmed} Verified</div>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl border border-surface-container-high text-xs text-on-surface-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">smart_toy</span>
              <span>Model v4.8 increased correlation recall by +210% vs legacy keyword searches</span>
            </div>
            <button
              onClick={() => onNavigate('overlap-detection')}
              className="text-xs text-primary font-bold hover:underline"
            >
              Inspect Model →
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Recidivism Matrix */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-headline-sm font-bold text-on-surface text-sm sm:text-base">
              National Technical Institutional Recidivism & Fraud-Ring Matrix
            </h3>
            <p className="text-on-surface-variant text-[11px]">
              Institutions exhibiting chronic, recurrent violations across multiple independent statutory bureaus
            </p>
          </div>
          <span className="bg-error-container text-on-error-container text-[11px] font-bold px-2.5 py-1 rounded font-data-mono">
            {recidivismMatrix.length} High-Risk Campuses Monitored
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-surface-container-high text-on-surface-variant font-label-md text-[11px] uppercase tracking-wider bg-surface-container-low/50">
                <th className="py-3 px-4">Institute & Code</th>
                <th className="py-3 px-4">Region</th>
                <th className="py-3 px-4">Risk Index</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Recurrent Infraction Patterns</th>
                <th className="py-3 px-4">Statutory Sanctions</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {recidivismMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-on-surface">{item.name}</div>
                    <div className="text-[10px] text-outline font-data-mono">{item.code}</div>
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant">{item.region}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-data-mono font-bold ${
                      item.risk === 'CRITICAL'
                        ? 'bg-error text-on-error'
                        : item.risk === 'HIGH'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.risk}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-data-mono font-bold text-primary">
                    {item.score} / 100
                  </td>
                  <td className="py-3 px-4 text-on-surface-variant max-w-[260px]">
                    {item.repeatedAreas}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-surface-container text-on-surface px-2 py-0.5 rounded text-[10px] font-medium font-data-mono">
                      {item.sanctionStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onNavigate('institution-directory')}
                      className="text-xs text-primary font-semibold hover:underline"
                    >
                      Dossier →
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
