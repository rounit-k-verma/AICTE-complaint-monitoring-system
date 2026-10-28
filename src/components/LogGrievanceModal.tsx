import React, { useState } from 'react';
import { Bureau, Complaint, Institution, SeverityLevel } from '../types';

interface LogGrievanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  institutions: Institution[];
  onSubmitComplaint: (newComplaint: Complaint) => void;
}

export const LogGrievanceModal: React.FC<LogGrievanceModalProps> = ({
  isOpen,
  onClose,
  institutions,
  onSubmitComplaint
}) => {
  const [bureau, setBureau] = useState<Bureau>('PGRC');
  const [institutionId, setInstitutionId] = useState(institutions[0]?.id || '');
  const [category, setCategory] = useState('');
  const [complainantType, setComplainantType] = useState<Complaint['complainantType']>('Faculty Council');
  const [complainantName, setComplainantName] = useState('');
  const [severity, setSeverity] = useState<SeverityLevel>('HIGH');
  const [summary, setSummary] = useState('');
  const [allegationDetails, setAllegationDetails] = useState('');
  const [affectedCount, setAffectedCount] = useState(1);
  const [financialImplication, setFinancialImplication] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedInst = institutions.find(i => i.id === institutionId) || institutions[0];
    const newId = `${bureau}-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newComplaint: Complaint = {
      id: newId,
      institutionId: selectedInst.id,
      institutionName: selectedInst.name,
      category: category || 'Statutory Non-Compliance & Grievance',
      bureau,
      bureauName: bureau === 'PGRC' ? 'Public Grievance Redressal Cell' : bureau === 'RB' ? 'Regulatory Bureau' : bureau === 'AB' ? 'Approval Bureau' : 'Policy Bureau',
      dateFiled: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      slaDaysRemaining: 30,
      slaBreachStatus: 'NORMAL',
      status: 'PRELIMINARY_REVIEW',
      severity,
      complainantType,
      complainantName: complainantName || 'Verified Complainant Registry',
      assignedOfficer: 'Dr. Rajesh Sharma, IRS',
      officerRole: 'Chief Surveillance Officer',
      summary: summary || 'Formal complaint docket lodged via National Surveillance Portal.',
      allegationDetails: allegationDetails || 'Under preliminary jurisdiction review under Section 10 AICTE Act.',
      affectedParties: Number(affectedCount) || 1,
      financialImplication: financialImplication || 'Under preliminary audit',
      hasActiveOverlap: selectedInst.id === 'AICTE-DEMO-1024',
      matchedDocketId: selectedInst.id === 'AICTE-DEMO-1024' ? 'RB-2026-0087' : undefined,
      overlapConfidence: selectedInst.id === 'AICTE-DEMO-1024' ? 92.4 : undefined,
      evidenceFiles: [
        {
          name: 'Primary_Petition_Affidavit.pdf',
          size: '2.4 MB',
          type: 'application/pdf',
          hash: 'SHA256:4b21...99e1',
          uploadDate: new Date().toISOString().split('T')[0]
        }
      ],
      auditTrail: [
        {
          date: `${new Date().toISOString().split('T')[0]} 12:00 IST`,
          author: 'Statutory Ingestion Portal',
          action: 'DOCKET_LODGED',
          detail: 'Verified cryptographic submission signed with citizen token.'
        }
      ]
    };

    onSubmitComplaint(newComplaint);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full border border-surface-container-high shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Header */}
        <div className="bg-primary text-on-primary px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary-fixed text-[24px]">
              post_add
            </span>
            <div>
              <h2 className="font-headline-sm font-bold text-sm tracking-tight text-on-primary">
                Log New Institutional Grievance Docket
              </h2>
              <p className="text-[11px] text-primary-fixed/80">
                Official AICTE Form 10-A • Centralized Surveillance Registry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-on-primary/70 hover:text-on-primary p-1 rounded-md hover:bg-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md font-semibold text-on-surface mb-1">
                Designated Bureau Jurisdiction *
              </label>
              <select
                value={bureau}
                onChange={(e) => setBureau(e.target.value as Bureau)}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 outline-none focus:border-secondary font-body-sm"
              >
                <option value="PGRC">PGRC - Public Grievance Redressal Cell</option>
                <option value="RB">RB - Regulatory Bureau</option>
                <option value="AB">AB - Approval Bureau</option>
                <option value="PAPC">PAPC - Policy & Academic Planning</option>
              </select>
            </div>

            <div>
              <label className="block font-label-md font-semibold text-on-surface mb-1">
                Target Institution *
              </label>
              <select
                value={institutionId}
                onChange={(e) => setInstitutionId(e.target.value)}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 outline-none focus:border-secondary font-body-sm"
              >
                {institutions.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name} ({inst.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-label-md font-semibold text-on-surface mb-1">
              Grievance / Infraction Category *
            </label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Non-Payment of 7th CPC Allowances / Laboratory Infrastructure Deficit"
              className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 outline-none focus:border-secondary font-body-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-label-md font-semibold text-on-surface mb-1">
                Complainant Category
              </label>
              <select
                value={complainantType}
                onChange={(e) => setComplainantType(e.target.value as Complaint['complainantType'])}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 outline-none focus:border-secondary font-body-sm"
              >
                <option value="Faculty Council">Faculty Council</option>
                <option value="Student Union">Student Union</option>
                <option value="Anonymous Whistleblower">Anonymous Whistleblower</option>
                <option value="Research Scholar">Research Scholar</option>
                <option value="Vendor Consortium">Vendor Consortium</option>
              </select>
            </div>

            <div>
              <label className="block font-label-md font-semibold text-on-surface mb-1">
                Complainant Representation
              </label>
              <input
                type="text"
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                placeholder="e.g. Joint Faculty Welfare Body"
                className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 outline-none focus:border-secondary font-body-sm"
              />
            </div>

            <div>
              <label className="block font-label-md font-semibold text-on-surface mb-1">
                Statutory Severity Tier
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 outline-none focus:border-secondary font-body-sm"
              >
                <option value="CRITICAL">CRITICAL (Immediate Action)</option>
                <option value="HIGH">HIGH (Standard 15-day SLA)</option>
                <option value="MEDIUM">MEDIUM (Standard 30-day SLA)</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-label-md font-semibold text-on-surface mb-1">
                Est. Affected Persons
              </label>
              <input
                type="number"
                min="1"
                value={affectedCount}
                onChange={(e) => setAffectedCount(Number(e.target.value))}
                className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 outline-none focus:border-secondary font-body-sm"
              />
            </div>

            <div>
              <label className="block font-label-md font-semibold text-on-surface mb-1">
                Financial Implication (if applicable)
              </label>
              <input
                type="text"
                value={financialImplication}
                onChange={(e) => setFinancialImplication(e.target.value)}
                placeholder="e.g. ₹2,40,00,000"
                className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 outline-none focus:border-secondary font-body-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md font-semibold text-on-surface mb-1">
              Grievance Summary / Headnote *
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of the complaint for automated semantic classification..."
              className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 outline-none focus:border-secondary font-body-sm resize-none"
            />
          </div>

          <div>
            <label className="block font-label-md font-semibold text-on-surface mb-1">
              Full Allegation Details & Statutory References
            </label>
            <textarea
              rows={3}
              value={allegationDetails}
              onChange={(e) => setAllegationDetails(e.target.value)}
              placeholder="Detailed chronological facts, dates, affected departments, and reference to AICTE Regulations..."
              className="w-full bg-surface-container-low border border-surface-container-high rounded-lg p-2.5 outline-none focus:border-secondary font-body-sm resize-none"
            />
          </div>

          {/* AI Signal Notification Info */}
          <div className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container-high flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">
              smart_toy
            </span>
            <div className="text-[11px] text-on-surface-variant leading-relaxed">
              Upon docket submission, the <span className="font-semibold text-on-surface">Hybrid Multi-Signal Overlap Pipeline</span> will automatically generate high-dimensional embeddings and scan active dockets across PGRC, RB, AB, and PAPC for fraud rings or duplicate submissions.
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-3 border-t border-surface-container-high flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-surface-container-high text-on-surface hover:bg-surface-container font-label-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-5 py-2 rounded-lg font-label-md transition-all shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Register Official Docket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
