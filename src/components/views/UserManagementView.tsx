import React, { useState } from 'react';
import { ActiveView, OfficerUser } from '../../types';

interface UserManagementViewProps {
  onNavigate: (view: ActiveView, params?: { institutionId?: string; matchId?: string; docketId?: string }) => void;
  officers: OfficerUser[];
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({
  onNavigate,
  officers
}) => {
  const [selectedOfficerId, setSelectedOfficerId] = useState<string>(officers[0]?.id || 'OFF-001');
  const [searchFilter, setSearchFilter] = useState('');
  const [bureauFilter, setBureauFilter] = useState('ALL');

  const selectedOfficer = officers.find(o => o.id === selectedOfficerId) || officers[0];

  const filteredOfficers = officers.filter(o => {
    if (bureauFilter !== 'ALL' && o.bureau !== bureauFilter) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      return (
        o.name.toLowerCase().includes(q) ||
        o.designation.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.nicHsmBadge.toLowerCase().includes(q)
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
                NATIONAL INFORMATICS CENTRE (NIC) INTEGRATION
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2 py-0.5 rounded font-data-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                HSM 256-BIT CRYPTO ENFORCED
              </span>
            </div>
            <h1 className="font-headline-lg font-bold text-on-surface text-xl sm:text-2xl tracking-tight">
              User Management & Statutory Bureau Access Control
            </h1>
            <p className="text-on-surface-variant text-xs mt-1 max-w-3xl">
              Cryptographically validated access control directory ensuring multi-bureau personnel segregation under Section 10(p) of the AICTE Act 1987.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-primary text-on-primary px-3.5 py-2 rounded-xl text-xs font-data-mono flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-secondary-container text-[18px]">verified_user</span>
              <span>FIPS 140-2 Level 3 Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Authorized Officers</div>
          <div className="text-xl font-bold text-on-surface mt-1 font-headline-md">348 Officers</div>
          <div className="text-[10px] text-emerald-600 font-bold font-data-mono mt-0.5">100% Verified</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Sovereign Bureaus</div>
          <div className="text-xl font-bold text-primary mt-1 font-headline-md">5 Divisions</div>
          <div className="text-[10px] text-outline font-data-mono mt-0.5">PGRC, RB, AB, PAPC, VIG</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border-2 border-primary/20 shadow-xs">
          <div className="text-[10px] text-primary font-semibold uppercase font-label-sm">Hardware Tokens</div>
          <div className="text-xl font-bold text-primary mt-1 font-headline-md">342 Active</div>
          <div className="text-[10px] text-primary font-bold font-data-mono mt-0.5">NIC e-Sign PKI</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Mean Token Rotation</div>
          <div className="text-xl font-bold text-on-surface mt-1 font-headline-md">42 Days</div>
          <div className="text-[10px] text-secondary font-bold font-data-mono mt-0.5">Automated</div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
          <div className="text-[10px] text-outline font-semibold uppercase font-label-sm">Security Anomalies</div>
          <div className="text-xl font-bold text-emerald-600 mt-1 font-headline-md">0 Incidents</div>
          <div className="text-[10px] text-emerald-600 font-bold font-data-mono mt-0.5">Zero-Breach SLA</div>
        </div>
      </div>

      {/* Main Grid: Personnel Directory + Privileges Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Table (Cols 1 & 2) */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-headline-sm font-bold text-on-surface text-sm sm:text-base">
                National Statutory Personnel & Authorized Signatories Register
              </h3>
              <p className="text-on-surface-variant text-[11px]">
                Click an officer to inspect their cryptographic credentials and statutory delegation of authority
              </p>
            </div>

            <div className="flex items-center gap-2">
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
                <option value="VIGILANCE">Vigilance Council</option>
              </select>

              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search officer..."
                className="bg-surface-container-low border border-surface-container-high text-xs rounded-lg p-2 outline-none font-body-sm w-36 sm:w-44"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-surface-container-high text-on-surface-variant font-label-md text-[11px] uppercase tracking-wider bg-surface-container-low/50">
                  <th className="py-3 px-3">Officer Name</th>
                  <th className="py-3 px-3">Bureau</th>
                  <th className="py-3 px-3">Statutory Designation</th>
                  <th className="py-3 px-3">Access Tier</th>
                  <th className="py-3 px-3">Active Dockets</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {filteredOfficers.map((off) => {
                  const isSelected = off.id === selectedOfficerId;
                  return (
                    <tr
                      key={off.id}
                      onClick={() => setSelectedOfficerId(off.id)}
                      className={`hover:bg-surface-container-low transition-colors cursor-pointer ${
                        isSelected ? 'bg-primary-fixed/20 font-medium' : ''
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="font-semibold text-primary">{off.name}</div>
                        <div className="text-[10px] text-outline font-data-mono">{off.id}</div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded text-[10px] font-data-mono">
                          {off.bureau}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-on-surface max-w-[160px] truncate" title={off.designation}>
                        {off.designation}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap text-[11px] font-medium text-on-surface-variant">
                        {off.accessTier.split(' - ')[0]}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-data-mono font-bold text-primary">
                        {off.activeAssignedDockets} Dockets
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          ACTIVE
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOfficerId(off.id);
                          }}
                          className="text-xs text-primary font-semibold hover:underline"
                        >
                          Details →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Officer Credentials & Privileges Inspector */}
        {selectedOfficer && (
          <div className="bg-surface-container-lowest p-6 rounded-2xl border-2 border-primary/20 shadow-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <h3 className="font-headline-sm font-bold text-on-surface text-sm">
                Cryptographic Credentials Dossier
              </h3>
              <span className="bg-primary text-on-primary text-[10px] font-data-mono font-bold px-2 py-0.5 rounded">
                NIC HSM
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="font-headline-md font-bold text-primary text-base">
                  {selectedOfficer.name}
                </div>
                <div className="text-on-surface font-semibold text-xs mt-0.5">
                  {selectedOfficer.designation}
                </div>
                <div className="text-[11px] text-on-surface-variant">
                  {selectedOfficer.bureauFull} ({selectedOfficer.bureau})
                </div>
              </div>

              {/* Hardware Token Box */}
              <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-outline font-semibold">NIC Hardware Token:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    VERIFIED
                  </span>
                </div>
                <div className="font-data-mono text-primary font-bold text-xs bg-surface-container-lowest p-2 rounded border border-surface-container-high">
                  {selectedOfficer.nicHsmBadge}
                </div>
                <div className="flex justify-between text-[10px] text-outline font-data-mono">
                  <span>Sign Hash: {selectedOfficer.digitalSignatureHash}</span>
                  <span>Last active: {selectedOfficer.lastLogin}</span>
                </div>
              </div>

              {/* Delegation of Powers */}
              <div className="space-y-2">
                <div className="text-[10px] font-semibold text-outline uppercase font-label-sm">
                  Statutory Delegated Powers
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="p-2.5 bg-surface-container-low rounded-lg border border-surface-container-high flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                    <span className="text-on-surface font-medium">Issue Section 10(p) Joint Scrutiny Summons</span>
                  </div>

                  <div className="p-2.5 bg-surface-container-low rounded-lg border border-surface-container-high flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                    <span className="text-on-surface font-medium">Access Cross-Bureau Hashed Evidence Vault</span>
                  </div>

                  <div className="p-2.5 bg-surface-container-low rounded-lg border border-surface-container-high flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                    <span className="text-on-surface font-medium">Depute Surprise Inspection Flying Squads</span>
                  </div>

                  <div className="p-2.5 bg-surface-container-low rounded-lg border border-surface-container-high flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                    <span className="text-on-surface font-medium">Approve Multi-Signal Overlap Determinations</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-container-high">
                <div className="text-[10px] text-outline text-center font-data-mono">
                  Security Audit Standard: CERT-IN & NIC Guideline 2026
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bureau Segregation Guardrails (4 Pillars of Section 10(p)) */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-high shadow-xs space-y-4">
        <div>
          <h3 className="font-headline-sm font-bold text-on-surface text-sm sm:text-base">
            Bureau Segregation Guardrails: 4 Pillars of Section 10(p)
          </h3>
          <p className="text-on-surface-variant text-[11px]">
            System architecture guarantees zero cross-contamination of independent statutory proceedings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container-high space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs font-label-md">
              <span className="material-symbols-outlined text-[20px]">folder_special</span>
              <span>1. Sovereign Dockets</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Dockets lodged in PGRC or RB cannot be modified or forcibly closed by other bureaus without Chairman appellate assent.
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container-high space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs font-label-md">
              <span className="material-symbols-outlined text-[20px]">enhanced_encryption</span>
              <span>2. HSM Crypto Enclave</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              All officer determinations, depositions, and inspection directives require tamper-evident NIC digital signature verification.
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container-high space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs font-label-md">
              <span className="material-symbols-outlined text-[20px]">handshake</span>
              <span>3. Bilateral Consent</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Joint coordination workspaces (#GRP) are activated only when both bureau leads confirm semantic entity overlap.
            </p>
          </div>

          <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container-high space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs font-label-md">
              <span className="material-symbols-outlined text-[20px]">history_edu</span>
              <span>4. Immutable Audit</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Every read, query, overlap comparison, and evidence download is recorded into a write-once judicial audit ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
