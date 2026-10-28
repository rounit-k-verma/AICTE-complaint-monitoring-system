import React, { useState } from 'react';
import { ActiveView, Bureau, CoordinationGroup } from '../../types';

interface CoordinationWorkspaceViewProps {
  onNavigate: (view: ActiveView, params?: { institutionId?: string; matchId?: string; docketId?: string }) => void;
  coordinationGroup: CoordinationGroup;
  onUpdateActionItem: (itemId: string, completed: boolean) => void;
  onAddFinding: (findingText: string, bureau: Bureau) => void;
}

export const CoordinationWorkspaceView: React.FC<CoordinationWorkspaceViewProps> = ({
  onNavigate,
  coordinationGroup,
  onUpdateActionItem,
  onAddFinding
}) => {
  const [newFindingText, setNewFindingText] = useState('');
  const [findingBureau, setFindingBureau] = useState<Bureau>('PGRC');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const completedCount = coordinationGroup.actionItems.filter(i => i.completed).length;
  const progressPercent = Math.round((completedCount / coordinationGroup.actionItems.length) * 100);

  const handlePostFinding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFindingText.trim()) return;
    onAddFinding(newFindingText, findingBureau);
    setNewFindingText('');
    setToastMessage('Joint finding posted to permanent cross-bureau evidentiary audit log.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleTask = (id: string, current: boolean) => {
    onUpdateActionItem(id, !current);
    setToastMessage(`Action item ${id} updated.`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {toastMessage && (
        <div className="bg-emerald-50 border border-emerald-400 text-emerald-900 p-3.5 rounded-xl flex items-center justify-between text-xs font-semibold animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900">
            ✕
          </button>
        </div>
      )}

      {/* Statutory Sovereignty Banner */}
      <div className="bg-primary text-on-primary p-6 rounded-2xl border-l-6 border-l-secondary shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-container/30 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-secondary text-on-secondary text-[10px] font-bold px-2 py-0.5 rounded font-data-mono">
                SEC 10(p) STATUTORY SHIELD ACTIVE
              </span>
              <span className="bg-primary-container text-primary-fixed text-[10px] font-bold px-2 py-0.5 rounded font-data-mono">
                {coordinationGroup.id}
              </span>
              <span className="bg-surface-container-highest text-on-surface text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                STATUS: {coordinationGroup.status.replace('_', ' ')}
              </span>
            </div>

            <h1 className="font-headline-lg font-bold text-xl sm:text-2xl text-white">
              {coordinationGroup.title}
            </h1>
            <p className="text-xs text-on-primary-container mt-1 max-w-2xl">
              Target: <span className="font-semibold text-white">{coordinationGroup.institutionName}</span> ({coordinationGroup.institutionId})
              • Lead: <span className="font-semibold text-white">{coordinationGroup.leadOfficer}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('institution-directory', { institutionId: coordinationGroup.institutionId })}
              className="bg-primary-container hover:bg-surface-container text-white px-3.5 py-2 rounded-lg text-xs font-label-md transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">domain</span>
              <span>Institution Dossier</span>
            </button>
            <button
              onClick={() => onNavigate('overlap-detection')}
              className="bg-secondary text-on-secondary hover:bg-secondary/90 px-3.5 py-2 rounded-lg text-xs font-label-md font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
              <span>Comparative XAI Signals</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Participating Bureaus Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Progress Gauge */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-on-surface">Coordination SLA Progress</span>
            <span className="font-data-mono font-bold text-primary">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-secondary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-outline font-data-mono pt-1">
            <span>{completedCount} of {coordinationGroup.actionItems.length} Milestones Achieved</span>
            <span className="text-error font-semibold">{coordinationGroup.daysRemaining} Days to Statutory Closure</span>
          </div>
        </div>

        {/* Participating Bureaus */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs space-y-2">
          <div className="text-xs font-semibold text-on-surface">Participating Sovereign Bureaus</div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {coordinationGroup.participatingBureaus.map(b => (
              <span key={b} className="bg-primary/10 text-primary font-bold px-2.5 py-1 rounded text-xs font-data-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {b} Bureau
              </span>
            ))}
          </div>
          <p className="text-[10px] text-outline pt-1">
            Autonomous jurisdiction preserved per Section 10(p) guidelines.
          </p>
        </div>

        {/* Synchronized Dockets Pill */}
        <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs space-y-2">
          <div className="text-xs font-semibold text-on-surface">Coupled Primary Dockets</div>
          <div className="flex items-center gap-2 pt-1 font-data-mono text-xs">
            <span className="bg-surface-container-high text-primary px-2 py-1 rounded font-bold">
              {coordinationGroup.dockets.primary}
            </span>
            <span className="text-outline">↔</span>
            <span className="bg-surface-container-high text-secondary px-2 py-1 rounded font-bold">
              {coordinationGroup.dockets.secondary}
            </span>
          </div>
          <p className="text-[10px] text-outline pt-1">
            Harmonized under unified digital case-token #GRP-2026-088.
          </p>
        </div>
      </div>

      {/* Main Grid: Action Items Checklist & Shared Evidence Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Joint Action Items Checklist */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface text-sm">
                Inter-Bureau Joint Action Milestones
              </h3>
              <p className="text-on-surface-variant text-[11px]">
                Statutory directives executed across participating bureau inspectors
              </p>
            </div>
            <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold font-data-mono px-2 py-0.5 rounded">
              {completedCount}/{coordinationGroup.actionItems.length} Done
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {coordinationGroup.actionItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleToggleTask(item.id, item.completed)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                  item.completed
                    ? 'bg-emerald-50/50 border-emerald-200 text-on-surface-variant'
                    : 'bg-surface-container-low border-surface-container-high hover:border-secondary text-on-surface'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {}}
                  className="mt-0.5 text-primary rounded"
                />
                <div className="flex-1 space-y-1">
                  <div className={`font-semibold ${item.completed ? 'line-through text-outline' : 'text-on-surface'}`}>
                    {item.task}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-outline font-data-mono">
                    <span className="bg-surface-container-highest px-1.5 py-0.2 rounded font-bold text-primary">
                      {item.assigneeBureau}
                    </span>
                    <span>Due: {item.dueDate}</span>
                    {item.completed && <span className="text-emerald-700 font-bold">✓ Executed</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shared Evidence Vault */}
        <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface text-sm">
                Shared Forensic Evidence Vault
              </h3>
              <p className="text-on-surface-variant text-[11px]">
                Cryptographically hashed exhibits shared across PGRC and RB investigators
              </p>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">folder_shared</span>
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container-high flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">description</span>
                <div>
                  <div className="font-semibold text-on-surface">Pay_Slip_Ledger_2024_2025.pdf</div>
                  <div className="text-[10px] text-outline font-data-mono">14.2 MB • SHA256: 7f4a...92b1 • PGRC Upload</div>
                </div>
              </div>
              <button className="bg-surface-container hover:bg-surface-container-high p-2 rounded-lg text-primary transition-colors">
                <span className="material-symbols-outlined text-[18px]">download</span>
              </button>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container-high flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-[24px]">table_chart</span>
                <div>
                  <div className="font-semibold text-on-surface">Biometric_Access_Log_Q3_Q4.csv</div>
                  <div className="text-[10px] text-outline font-data-mono">22.1 MB • SHA256: 1a8d...f602 • RB Upload</div>
                </div>
              </div>
              <button className="bg-surface-container hover:bg-surface-container-high p-2 rounded-lg text-secondary transition-colors">
                <span className="material-symbols-outlined text-[18px]">download</span>
              </button>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container-high flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">verified_user</span>
                <div>
                  <div className="font-semibold text-on-surface">Faculty_PAN_Aadhaar_Mismatch_Audit.pdf</div>
                  <div className="text-[10px] text-outline font-data-mono">8.4 MB • SHA256: 5b99...32cc • Central Taskforce</div>
                </div>
              </div>
              <button className="bg-surface-container hover:bg-surface-container-high p-2 rounded-lg text-primary transition-colors">
                <span className="material-symbols-outlined text-[18px]">download</span>
              </button>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl border border-surface-container-high flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-700 text-[24px]">receipt_long</span>
                <div>
                  <div className="font-semibold text-on-surface">SBI_Forensic_Statement_Annex_A.pdf</div>
                  <div className="text-[10px] text-outline font-data-mono">3.8 MB • SHA256: 3d1e...a804 • Joint Financial Scrutiny</div>
                </div>
              </div>
              <button className="bg-surface-container hover:bg-surface-container-high p-2 rounded-lg text-emerald-700 transition-colors">
                <span className="material-symbols-outlined text-[18px]">download</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inter-Bureau Findings Feed */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm font-bold text-on-surface text-sm sm:text-base">
              Inter-Bureau Joint Findings & Evidentiary Audit Trail
            </h3>
            <p className="text-on-surface-variant text-[11px]">
              Chronological depositions submitted by designated investigating officers under Section 10(p)
            </p>
          </div>
          <span className="bg-primary/10 text-primary font-bold text-[11px] px-2.5 py-1 rounded font-data-mono">
            {coordinationGroup.findings.length} Certified Entries
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {coordinationGroup.findings.map((f) => (
            <div
              key={f.id}
              className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high space-y-2 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">{f.author}</span>
                  <span className="bg-primary-container text-primary-fixed text-[10px] font-bold px-2 py-0.2 rounded font-data-mono">
                    {f.bureau} Bureau
                  </span>
                  {f.signatureVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-data-mono">
                      <span className="material-symbols-outlined text-[13px]">verified</span>
                      Digital Sign Validated
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-outline font-data-mono">{f.date}</span>
              </div>

              <p className="text-on-surface leading-relaxed text-[12px]">
                {f.finding}
              </p>

              {f.evidenceRef && (
                <div className="flex items-center gap-1 text-[11px] text-secondary font-semibold pt-1">
                  <span className="material-symbols-outlined text-[15px]">attach_file</span>
                  <span>Referenced exhibit: {f.evidenceRef}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Post New Finding Form */}
        <form onSubmit={handlePostFinding} className="bg-surface-container p-4 rounded-xl border border-surface-container-high space-y-3 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface">Record Official Joint Investigation Finding</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-outline font-semibold">Posting Bureau:</span>
              <select
                value={findingBureau}
                onChange={(e) => setFindingBureau(e.target.value as Bureau)}
                className="bg-surface-container-lowest text-xs border border-surface-container-high rounded p-1 font-body-sm font-semibold text-primary"
              >
                <option value="PGRC">PGRC</option>
                <option value="RB">Regulatory Bureau (RB)</option>
                <option value="AB">Approval Bureau (AB)</option>
              </select>
            </div>
          </div>

          <textarea
            rows={2}
            value={newFindingText}
            onChange={(e) => setNewFindingText(e.target.value)}
            placeholder="Type deposition, forensic audit observation, or surprise inspection finding..."
            className="w-full bg-surface-container-lowest border border-surface-container-high rounded-lg p-2.5 text-xs outline-none focus:border-secondary font-body-sm resize-none"
          />

          <div className="flex items-center justify-between">
            <div className="text-[10px] text-outline font-data-mono">
              Signed with: Dr. Rajesh Sharma, IRS (NIC-HSM-256-DEL-0091)
            </div>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg text-xs font-label-md font-semibold transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">draw</span>
              <span>Sign & Post Finding</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
