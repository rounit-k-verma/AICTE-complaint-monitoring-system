import React, { useState, useEffect } from 'react';
import { ActiveView, OverlapMatch } from '../../types';

interface OverlapDetectionViewProps {
  onNavigate: (view: ActiveView, params?: { institutionId?: string; matchId?: string; docketId?: string }) => void;
  overlapMatches: OverlapMatch[];
  onConfirmMatch: (matchId: string) => void;
  onDismissMatch: (matchId: string) => void;
  initialMatchId?: string;
}

export const OverlapDetectionView: React.FC<OverlapDetectionViewProps> = ({
  onNavigate,
  overlapMatches,
  onConfirmMatch,
  onDismissMatch,
  initialMatchId
}) => {
  const [selectedMatchId, setSelectedMatchId] = useState<string>(initialMatchId || overlapMatches[0]?.matchId || 'MATCH-2026-001');

  useEffect(() => {
    if (initialMatchId) {
      setSelectedMatchId(initialMatchId);
    }
  }, [initialMatchId]);
  const [officerRemarks, setOfficerRemarks] = useState(
    'High probability of systemic institutional financial distress affecting both faculty salaries (PGRC) and student lab operations (RB). Recommend joint review without case consolidation.'
  );
  const [notifyOfficerA, setNotifyOfficerA] = useState(true);
  const [notifyOfficerB, setNotifyOfficerB] = useState(true);
  const [logAuditTrail, setLogAuditTrail] = useState(true);

  const [queueFilter, setQueueFilter] = useState('ALL');
  const [isScanning, setIsScanning] = useState(false);
  const [showThresholdsModal, setShowThresholdsModal] = useState(false);
  const [showDetectionLogModal, setShowDetectionLogModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Threshold controls
  const [thresholds, setThresholds] = useState({
    exactIdWeight: 1.0,
    fuzzyRatio: 90,
    semanticCosine: 85,
    temporalWindowDays: 30
  });

  const currentMatch = overlapMatches.find(m => m.matchId === selectedMatchId) || overlapMatches[0];

  const handleRunFullScan = () => {
    setIsScanning(true);
    setToastMessage('Running Hybrid Multi-Signal Overlap Pipeline across 1,248 active dockets...');
    setTimeout(() => {
      setIsScanning(false);
      setToastMessage('Full scan complete. 42 candidate pairs cross-verified. 0 false positives found.');
      setTimeout(() => setToastMessage(null), 3500);
    }, 1400);
  };

  const handleConfirmAction = () => {
    onConfirmMatch(currentMatch.matchId);
    setToastMessage(`Section 10(p) determination recorded: Link confirmed for ${currentMatch.matchId}. Opening Cross-Bureau Workspace #GRP-2026-088...`);
    setTimeout(() => {
      onNavigate('coordination-workspace');
    }, 1200);
  };

  const handleRejectAction = () => {
    onDismissMatch(currentMatch.matchId);
    setToastMessage(`Match ${currentMatch.matchId} dismissed as False Positive / Uncorrelated by Authorized Officer.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRequestClarification = () => {
    setToastMessage(`Clarification dispatch notice issued to investigating officers for docket pair ${currentMatch.docketA.id} & ${currentMatch.docketB.id}.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportDossier = () => {
    setToastMessage(`Generated AICTE Form 10-C Overlap Intelligence Dossier for ${currentMatch.matchId}. Downloading PDF...`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredMatches = overlapMatches.filter(m => {
    if (queueFilter === 'HIGH_CONFIDENCE') return m.confidenceScore >= 85;
    if (queueFilter === 'CROSS_BUREAU') return m.docketA.bureau !== m.docketB.bureau;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="bg-emerald-50 border-2 border-emerald-400 text-emerald-950 p-4 rounded-xl flex items-center justify-between text-xs font-semibold shadow-md animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-emerald-600 text-[22px]">
              {isScanning ? 'sync' : 'verified'}
            </span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-950 font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Top Context Header & Badges */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full font-data-mono text-[11px] bg-tertiary-fixed text-on-tertiary-fixed font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container animate-pulse"></span>
              AICTE Core Innovation Flagship
            </span>
            <span className="font-data-mono text-[11px] text-on-surface-variant/70">
              IICMSD :: ENGINE_BUILD_v4.2
            </span>
          </div>
          <h1 className="font-headline-xl text-primary font-bold tracking-tight text-2xl sm:text-3xl">
            Potential Overlap Detection Engine
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-3xl mt-1 text-xs sm:text-sm leading-relaxed">
            Identify related complaints across Bureaus using hybrid AI matching and coordinate action without losing individual case ownership.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 pt-2 lg:pt-0">
          <button
            onClick={() => setShowThresholdsModal(true)}
            className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md text-xs hover:bg-surface-container-highest transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>Algorithm Thresholds</span>
          </button>
          <button
            onClick={handleRunFullScan}
            disabled={isScanning}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-xs hover:bg-secondary transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-75"
          >
            <span className={`material-symbols-outlined text-[18px] ${isScanning ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{isScanning ? 'Scanning Buffer...' : 'Run Full Scan'}</span>
          </button>
        </div>
      </div>

      {/* 4 Top Metric Cards (Elevated GovTech Tonal Surfaces) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Pending Match Reviews */}
        <div className="p-4 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-3 -top-3 w-20 h-20 bg-tertiary-fixed/40 rounded-full blur-xl pointer-events-none group-hover:bg-tertiary-fixed/60 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold font-label-md">
                Pending Match Reviews
              </span>
              <div className="font-headline-xl font-bold text-on-surface mt-1 text-2xl">14</div>
            </div>
            <div className="p-2.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[22px]">pending_actions</span>
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-tertiary-fixed text-on-tertiary-fixed font-semibold font-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
              Awaiting Officer Review
            </span>
            <span className="font-data-mono text-[10px] text-on-surface-variant">Queue #1-14</span>
          </div>
        </div>

        {/* Card 2: High-Confidence Matches */}
        <div className="p-4 rounded-xl bg-surface-container-lowest shadow-xs border-2 border-secondary/30 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-3 -top-3 w-20 h-20 bg-secondary-fixed/40 rounded-full blur-xl pointer-events-none group-hover:bg-secondary-fixed/60 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold font-label-md">
                High-Confidence Matches
              </span>
              <div className="font-headline-xl font-bold text-secondary mt-1 text-2xl">06</div>
            </div>
            <div className="p-2.5 rounded-lg bg-secondary text-on-secondary">
              <span className="material-symbols-outlined text-[22px]">bolt</span>
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-error-container text-on-error-container font-semibold font-label-sm">
              <span className="material-symbols-outlined text-[13px]">priority_high</span>
              Score ≥ 85% • Immediate Action
            </span>
            <span className="font-data-mono text-[10px] text-error font-semibold">+2 today</span>
          </div>
        </div>

        {/* Card 3: Confirmed Linked Groups */}
        <div className="p-4 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute -right-3 -top-3 w-20 h-20 bg-primary-fixed/30 rounded-full blur-xl pointer-events-none group-hover:bg-primary-fixed/50 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold font-label-md">
                Confirmed Linked Groups
              </span>
              <div className="font-headline-xl font-bold text-on-surface mt-1 text-2xl">42</div>
            </div>
            <div className="p-2.5 rounded-lg bg-primary-container text-on-primary">
              <span className="material-symbols-outlined text-[22px]">link</span>
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-surface-container-high text-on-surface font-semibold font-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Active Coordination
            </span>
            <span className="font-data-mono text-[10px] text-on-surface-variant">96 Case Files</span>
          </div>
        </div>

        {/* Card 4: Rejected / False Positives */}
        <div className="p-4 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold font-label-md">
                Rejected / False Positives
              </span>
              <div className="font-headline-xl font-bold text-on-surface-variant mt-1 text-2xl">18</div>
            </div>
            <div className="p-2.5 rounded-lg bg-surface-container-high text-on-surface-variant">
              <span className="material-symbols-outlined text-[22px]">rule</span>
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-surface-container text-on-surface-variant font-semibold font-label-sm">
              Logged to Audit
            </span>
            <span className="font-data-mono text-[10px] text-on-surface-variant/80 font-bold">98.1% Precision</span>
          </div>
        </div>
      </div>

      {/* Pipeline Visualization Banner */}
      <div className="p-5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary-container text-on-primary">
              <span className="material-symbols-outlined text-[20px]">account_tree</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-sm sm:text-base text-on-surface font-bold">
                Hybrid Multi-Signal Overlap Pipeline
              </h2>
              <p className="text-[11px] text-on-surface-variant">
                Deterministic identification, multilingual embeddings & rule engines running continuously across 8 central bureaus
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded font-data-mono text-[10px] font-bold bg-surface-container-high text-on-surface-variant border border-surface-container-high shrink-0 self-start md:self-auto">
            <span className="material-symbols-outlined text-[15px] text-secondary">verified</span>
            ZERO_AUTO_MERGE_POLICY
          </span>
        </div>

        {/* Chevron Stages Container */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {/* Stage 1 */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between border border-surface-container-high">
            <span className="font-data-mono text-[9px] text-on-surface-variant/70 uppercase">STAGE 01</span>
            <div className="my-1.5">
              <p className="font-label-sm text-xs font-semibold text-on-surface">Input Text Normalization</p>
              <p className="text-[10px] text-on-surface-variant leading-tight mt-0.5">Stemming, de-noising & syntax cleanup</p>
            </div>
            <div className="flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-[14px]">done_all</span>
              <span className="font-data-mono text-[10px] font-semibold">Pass</span>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between border border-secondary/30">
            <span className="font-data-mono text-[9px] text-secondary uppercase font-bold">STAGE 02 • WEIGHT 1.0</span>
            <div className="my-1.5">
              <p className="font-label-sm text-xs font-semibold text-on-surface">Exact AICTE ID Match</p>
              <p className="text-[10px] text-on-surface-variant leading-tight mt-0.5">Deterministic 100% Institution Key</p>
            </div>
            <div className="flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span className="font-data-mono text-[10px] font-bold">100% Match</span>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between border border-surface-container-high">
            <span className="font-data-mono text-[9px] text-on-surface-variant/70 uppercase">STAGE 03</span>
            <div className="my-1.5">
              <p className="font-label-sm text-xs font-semibold text-on-surface">Fuzzy Entity & Name</p>
              <p className="text-[10px] text-on-surface-variant leading-tight mt-0.5">Levenshtein & Token Set Ratio</p>
            </div>
            <div className="flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-[14px]">calculate</span>
              <span className="font-data-mono text-[10px] font-semibold">98.4% Ratio</span>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between border border-surface-container-high">
            <span className="font-data-mono text-[9px] text-on-surface-variant/70 uppercase">STAGE 04</span>
            <div className="my-1.5">
              <p className="font-label-sm text-xs font-semibold text-on-surface">Bilingual Semantic Vector</p>
              <p className="text-[10px] text-on-surface-variant leading-tight mt-0.5">En / Hi Cross-lingual embeddings</p>
            </div>
            <div className="flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-[14px]">model_training</span>
              <span className="font-data-mono text-[10px] font-semibold">87.2% Cosine</span>
            </div>
          </div>

          {/* Stage 5 */}
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col justify-between border border-surface-container-high">
            <span className="font-data-mono text-[9px] text-on-surface-variant/70 uppercase">STAGE 05</span>
            <div className="my-1.5">
              <p className="font-label-sm text-xs font-semibold text-on-surface">Domain Rules Engine</p>
              <p className="text-[10px] text-on-surface-variant leading-tight mt-0.5">Temporal overlap & bureau pairing</p>
            </div>
            <div className="flex items-center gap-1 text-secondary">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              <span className="font-data-mono text-[10px] font-semibold">Rules Met</span>
            </div>
          </div>

          {/* Stage 6 */}
          <div className="p-3 rounded-lg bg-secondary-fixed/50 flex flex-col justify-between border border-secondary/40">
            <span className="font-data-mono text-[9px] text-on-secondary-fixed-variant uppercase font-bold">STAGE 06</span>
            <div className="my-1.5">
              <p className="font-label-sm text-xs font-bold text-on-secondary-fixed">Composite Score</p>
              <p className="text-[10px] text-on-secondary-fixed-variant leading-tight mt-0.5">Weighted aggregate computation</p>
            </div>
            <div className="flex items-center gap-1 text-primary font-bold">
              <span className="material-symbols-outlined text-[14px]">speed</span>
              <span className="font-data-mono text-[10px]">91% High</span>
            </div>
          </div>

          {/* Stage 7 (Officer Gate) */}
          <div className="p-3 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex flex-col justify-between border border-tertiary-fixed-variant/40">
            <span className="font-data-mono text-[9px] uppercase font-bold tracking-wider">STAGE 07 • HUMAN GATE</span>
            <div className="my-1.5">
              <p className="font-label-sm text-xs font-bold">Officer Decision Gate</p>
              <p className="text-[10px] leading-tight opacity-90 mt-0.5">Statutory review before linkage</p>
            </div>
            <div className="flex items-center gap-1 font-bold text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[14px]">gavel</span>
              <span className="font-data-mono text-[10px]">Active Now</span>
            </div>
          </div>
        </div>

        {/* Small Info Note */}
        <div className="mt-4 p-3 rounded-lg bg-surface-container flex items-center gap-2.5 text-on-surface-variant text-xs">
          <span className="material-symbols-outlined text-secondary text-[18px] flex-shrink-0">shield_lock</span>
          <p className="leading-relaxed">
            <strong className="text-on-surface font-semibold">Confidential Decision-Support Engine:</strong> Automated merging or closure of cases is strictly prohibited by AICTE policy. Both cases remain sovereign under their respective regulatory mandates.
          </p>
        </div>
      </div>

      {/* Active Match Comparison Workspace (Side-by-Side Detailed Review for selected match) */}
      <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container-high space-y-5">
        {/* Header with Match Score & Quick Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-3 border-b border-surface-container-high gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-headline-md font-bold text-on-surface tracking-tight text-lg sm:text-xl">
              Match Comparison Workspace: {currentMatch.matchId}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label-md font-bold bg-secondary text-on-secondary shadow-xs">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Overall Match Score: {currentMatch.confidenceScore}% ({currentMatch.confidenceScore >= 85 ? 'High Confidence' : 'Moderate Overlap'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetectionLogModal(true)}
              className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-xs transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">history</span>
              <span>Detection Log</span>
            </button>
            <button
              onClick={handleExportDossier}
              className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-xs transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Export Dossier</span>
            </button>
          </div>
        </div>

        {/* Institution Banner */}
        <div className="p-4 rounded-xl bg-surface-container-high/40 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-surface-container-high">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-primary text-on-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">apartment</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-headline-sm text-sm sm:text-base text-on-surface font-bold">
                  {currentMatch.institutionName}
                </h3>
                <span className="px-2 py-0.5 rounded font-data-mono text-[10px] bg-primary-container text-on-primary font-semibold">
                  {currentMatch.institutionId}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] bg-surface-container-highest text-on-surface-variant font-medium">
                  Engineering & Technology (UG/PG)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-on-surface-variant mt-1.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-secondary">location_on</span>
                  Pune, Maharashtra (Western Region)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-secondary">school</span>
                  Savitribai Phule Pune University
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-secondary">inventory_2</span>
                  NAAC A+ | NIRF 2024 Rank: 112
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => onNavigate('institution-directory', { institutionId: currentMatch.institutionId })}
              className="px-3.5 py-1.5 rounded-lg bg-surface-container text-secondary hover:bg-secondary hover:text-on-secondary font-label-md text-xs transition-colors inline-flex items-center gap-1"
            >
              <span>View Institution Profile</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </button>
          </div>
        </div>

        {/* Side-by-side Complaint Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left Card: Complaint A */}
          <div className="rounded-xl bg-surface-container-low p-5 flex flex-col justify-between border border-surface-container-high shadow-xs space-y-4">
            <div>
              {/* Header of Complaint A */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="font-data-mono text-sm font-bold text-on-surface">
                    {currentMatch.docketA.id}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] bg-primary-container text-on-primary font-semibold font-data-mono">
                    {currentMatch.docketA.bureau} Bureau
                  </span>
                </div>
                <span className="font-data-mono text-[11px] text-on-surface-variant">
                  Lodged: {currentMatch.docketA.date}
                </span>
              </div>

              {/* Complainant Identity Category */}
              <div className="mb-3 p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high space-y-1 text-xs">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-medium text-outline">Complainant Category:</span>
                  <span className="font-data-mono text-primary font-semibold">{currentMatch.docketA.complainant}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant pt-1 border-t border-surface-container-high">
                  <span className="font-medium text-outline">Confidential ID:</span>
                  <span className="font-data-mono text-[11px] bg-surface-container px-1.5 py-0.5 rounded">
                    CMP-7712 (Whistleblower Protection Active)
                  </span>
                </div>
              </div>

              {/* Complaint Subject & Full Text Snippet */}
              <div className="space-y-2">
                <span className="text-[10px] text-outline uppercase font-bold font-label-sm">Grievance Subject</span>
                <p className="font-headline-sm font-semibold text-on-surface text-xs sm:text-sm">
                  {currentMatch.docketA.category}
                </p>
                <div className="p-3 rounded-lg bg-surface-container-lowest font-body-sm text-xs text-on-surface-variant leading-relaxed border border-surface-container-high italic">
                  "{currentMatch.docketA.summary}"
                </div>
              </div>

              {/* Bureau Handling Details */}
              <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-surface-container-high text-xs">
                <div>
                  <span className="text-[10px] text-outline font-semibold uppercase">Assigned Redressal Officer</span>
                  <p className="font-label-md font-semibold text-on-surface flex items-center gap-1 mt-0.5 truncate">
                    <span className="material-symbols-outlined text-[16px] text-secondary">person</span>
                    {currentMatch.docketA.officer.split('(')[0]}
                  </p>
                  <span className="text-[11px] text-on-surface-variant">{currentMatch.docketA.officer.split('(')[1]?.replace(')', '') || 'PGRC Lead'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline font-semibold uppercase">Current Status & Statutory SLA</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-secondary-fixed text-on-secondary-fixed font-semibold">
                      Under Process
                    </span>
                    <span className="font-data-mono text-[11px] text-error font-semibold">12 days left</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs">
              <span className="font-data-mono text-[11px] text-on-surface-variant">Priority: Tier-1 High</span>
              <button
                onClick={() => onNavigate('complaint-management', { docketId: currentMatch.docketA.id })}
                className="font-label-md text-secondary hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Inspect PGRC Docket</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Card: Complaint B */}
          <div className="rounded-xl bg-surface-container-low p-5 flex flex-col justify-between border border-surface-container-high shadow-xs space-y-4">
            <div>
              {/* Header of Complaint B */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container-high">
                <div className="flex items-center gap-2">
                  <span className="font-data-mono text-sm font-bold text-on-surface">
                    {currentMatch.docketB.id}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] bg-secondary text-on-secondary font-semibold font-data-mono">
                    {currentMatch.docketB.bureau} Bureau
                  </span>
                </div>
                <span className="font-data-mono text-[11px] text-on-surface-variant">
                  Lodged: {currentMatch.docketB.date}
                </span>
              </div>

              {/* Complainant Identity Category */}
              <div className="mb-3 p-3 rounded-lg bg-surface-container-lowest border border-surface-container-high space-y-1 text-xs">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-medium text-outline">Complainant Category:</span>
                  <span className="font-data-mono text-primary font-semibold">{currentMatch.docketB.complainant}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant pt-1 border-t border-surface-container-high">
                  <span className="font-medium text-outline">Confidential ID:</span>
                  <span className="font-data-mono text-[11px] bg-surface-container px-1.5 py-0.5 rounded">
                    CMP-8904 (Public Registry Intake)
                  </span>
                </div>
              </div>

              {/* Complaint Subject & Full Text Snippet */}
              <div className="space-y-2">
                <span className="text-[10px] text-outline uppercase font-bold font-label-sm">Grievance Subject</span>
                <p className="font-headline-sm font-semibold text-on-surface text-xs sm:text-sm">
                  {currentMatch.docketB.category}
                </p>
                <div className="p-3 rounded-lg bg-surface-container-lowest font-body-sm text-xs text-on-surface-variant leading-relaxed border border-surface-container-high italic">
                  "{currentMatch.docketB.summary}"
                </div>
              </div>

              {/* Bureau Handling Details */}
              <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-surface-container-high text-xs">
                <div>
                  <span className="text-[10px] text-outline font-semibold uppercase">Assigned Regulatory Officer</span>
                  <p className="font-label-md font-semibold text-on-surface flex items-center gap-1 mt-0.5 truncate">
                    <span className="material-symbols-outlined text-[16px] text-secondary">person</span>
                    {currentMatch.docketB.officer.split('(')[0]}
                  </p>
                  <span className="text-[11px] text-on-surface-variant">{currentMatch.docketB.officer.split('(')[1]?.replace(')', '') || 'RB Lead'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-outline font-semibold uppercase">Current Status & Statutory SLA</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-secondary-fixed text-on-secondary-fixed font-semibold">
                      Under Process
                    </span>
                    <span className="font-data-mono text-[11px] text-secondary font-semibold">22 days left</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-surface-container-high flex items-center justify-between text-xs">
              <span className="font-data-mono text-[11px] text-on-surface-variant">Priority: Tier-1 Regulatory</span>
              <button
                onClick={() => onNavigate('complaint-management', { docketId: currentMatch.docketB.id })}
                className="font-label-md text-secondary hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Inspect RB Docket</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Multi-Signal Explanation Breakdown Panel */}
        <div className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high space-y-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary text-[24px]">psychology</span>
            <div>
              <h4 className="font-headline-sm text-sm sm:text-base text-on-surface font-bold">
                Why was this match suggested by the hybrid engine?
              </h4>
              <p className="text-xs text-on-surface-variant">
                Explainable AI (XAI) transparent attribution breakdown across 5 independent telemetry signals
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {currentMatch.signals.map((sig, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-surface-container-lowest flex items-start gap-3 border border-surface-container-high text-xs"
              >
                <div className="p-1 rounded-full bg-secondary-fixed text-on-secondary-fixed shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-label-md font-bold text-on-surface">{sig.name}</span>
                    <span className={`px-2 py-0.5 rounded font-data-mono text-[10px] font-bold ${
                      idx === 0
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-surface-container-high text-on-surface'
                    }`}>
                      {idx === 0
                        ? 'Weightage: 100% (Absolute Key)'
                        : idx === 1
                        ? '98.4% Confidence'
                        : idx === 2
                        ? '87.2% Bilingual Vector Overlap'
                        : idx === 3
                        ? 'Rule CBR-402 Triggered'
                        : 'Sovereignty Check Passed'}
                    </span>
                  </div>
                  <p className="text-on-surface-variant mt-1 leading-relaxed text-[11px]">
                    {sig.evidence}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Officer Decision Panel & Interactive Controls */}
        <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm border-2 border-secondary/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2 border-b border-surface-container-high">
            <div>
              <div className="flex items-center gap-2 text-on-surface">
                <span className="material-symbols-outlined text-secondary text-[22px]">gavel</span>
                <h4 className="font-headline-sm font-bold text-sm sm:text-base">
                  Authorized Officer Determination & Link Action
                </h4>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Linking cases establishes a shared Coordination Workspace while preserving distinct complaint IDs, original Bureau ownership, and independent statutory tracking.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded font-data-mono text-[10px] bg-primary-container text-on-primary font-bold self-start shrink-0">
              OFFICER: DR. RAJESH SHARMA, IRS
            </span>
          </div>

          {/* Decision Form Area */}
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block font-label-md font-semibold text-on-surface mb-1">
                Statutory Determination Note (Recorded into immutable National Audit Log):
              </label>
              <textarea
                rows={3}
                value={officerRemarks}
                onChange={(e) => setOfficerRemarks(e.target.value)}
                className="w-full p-3 rounded-lg bg-surface-container-low text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary leading-relaxed border border-surface-container-high resize-none"
              />
            </div>

            {/* Compliance Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 py-1">
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded bg-surface-container-low border border-surface-container-high">
                <input
                  type="checkbox"
                  checked={notifyOfficerA}
                  onChange={(e) => setNotifyOfficerA(e.target.checked)}
                  className="w-4 h-4 rounded text-secondary"
                />
                <span className="text-on-surface font-medium text-[11px]">Notify Officer S. K. Verma (PGRC)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded bg-surface-container-low border border-surface-container-high">
                <input
                  type="checkbox"
                  checked={notifyOfficerB}
                  onChange={(e) => setNotifyOfficerB(e.target.checked)}
                  className="w-4 h-4 rounded text-secondary"
                />
                <span className="text-on-surface font-medium text-[11px]">Notify Officer Dr. A. K. Rao (RB)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-2 rounded bg-surface-container-low border border-surface-container-high">
                <input
                  type="checkbox"
                  checked={logAuditTrail}
                  onChange={(e) => setLogAuditTrail(e.target.checked)}
                  className="w-4 h-4 rounded text-secondary"
                />
                <span className="text-on-surface font-medium text-[11px]">Log action to permanent Audit Trail</span>
              </label>
            </div>

            {/* Interactive Decision Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleRejectAction}
                  className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-md text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-error">close</span>
                  <span>Reject Match (False Positive)</span>
                </button>
                <button
                  type="button"
                  onClick={handleRequestClarification}
                  className="px-4 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface font-label-md text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">contact_support</span>
                  <span>Request Clarification</span>
                </button>
              </div>

              {/* Primary Saffron / Accent Button */}
              <button
                type="button"
                onClick={handleConfirmAction}
                className="px-5 py-2.5 rounded-lg bg-tertiary-container hover:bg-tertiary text-tertiary-fixed font-label-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">hub</span>
                <span>Confirm Link & Open Coordination Workspace</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Queue: Pending Match Queue for Review */}
      <div className="rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container-high overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-surface-container-high">
          <div>
            <h3 className="font-headline-sm font-bold text-on-surface text-sm sm:text-base">
              Pending Match Queue for Review
            </h3>
            <p className="text-[11px] text-on-surface-variant">
              Automated queue prioritizing high-confidence overlap detections awaiting regulatory officer confirmation
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={queueFilter}
              onChange={(e) => setQueueFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-surface-container-low text-xs font-label-md text-on-surface border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-secondary"
            >
              <option value="ALL">All Overlap Tiers (≥ 70%)</option>
              <option value="HIGH_CONFIDENCE">High Confidence (≥ 85%)</option>
              <option value="CROSS_BUREAU">Cross-Bureau Only</option>
            </select>

            <button
              onClick={handleRunFullScan}
              className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors"
              title="Reload queue"
            >
              <span className={`material-symbols-outlined text-[18px] ${isScanning ? 'animate-spin' : ''}`}>
                sync
              </span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-[10px] uppercase tracking-wider border-b border-surface-container-high">
                <th className="py-3 px-4 font-semibold">Match ID</th>
                <th className="py-3 px-4 font-semibold">Institution & AICTE ID</th>
                <th className="py-3 px-4 font-semibold">Complaint Pair</th>
                <th className="py-3 px-4 font-semibold">Bureaus Involved</th>
                <th className="py-3 px-4 font-semibold">Overlap Score</th>
                <th className="py-3 px-4 font-semibold">Key Detection Signals</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high text-on-surface">
              {filteredMatches.map((m) => {
                const isSelected = m.matchId === selectedMatchId;
                return (
                  <tr
                    key={m.matchId}
                    onClick={() => setSelectedMatchId(m.matchId)}
                    className={`hover:bg-surface-container-low/70 transition-colors cursor-pointer ${
                      isSelected ? 'bg-secondary-fixed/20' : ''
                    }`}
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-data-mono font-bold text-secondary">{m.matchId}</span>
                        {isSelected && (
                          <span className="px-1.5 py-0.2 rounded font-data-mono text-[9px] bg-secondary text-on-secondary uppercase font-bold">
                            Active
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-on-surface">{m.institutionName}</div>
                      <span className="font-data-mono text-[10px] text-on-surface-variant">{m.institutionId}</span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-data-mono text-[11px] font-semibold text-primary">{m.docketA.id}</div>
                      <div className="font-data-mono text-[10px] text-on-surface-variant">vs {m.docketB.id}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-data-mono bg-primary-container text-on-primary">
                          {m.docketA.bureau}
                        </span>
                        <span className="text-outline text-[10px]">+</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-data-mono bg-secondary text-on-secondary">
                          {m.docketB.bureau}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 rounded-full bg-surface-container-highest overflow-hidden">
                          <div
                            className="h-full bg-secondary rounded-full"
                            style={{ width: `${m.confidenceScore}%` }}
                          ></div>
                        </div>
                        <span className="font-data-mono text-[11px] font-bold text-secondary">
                          {m.confidenceScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="truncate text-on-surface-variant text-[11px]" title={m.signals[0]?.name + ' + ' + m.signals[2]?.name}>
                        {m.signals[0]?.name.replace('Signal 1: ', '')} + {m.signals[2]?.name.replace('Signal 3: ', '')}
                      </p>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium font-data-mono ${
                        m.status === 'ACTION_REQUIRED'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed font-bold'
                          : 'bg-surface-container-high text-on-surface'
                      }`}>
                        {m.status === 'ACTION_REQUIRED' ? 'In Review (Workspace)' : 'Pending Officer Review'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMatchId(m.matchId);
                        }}
                        className={`px-3 py-1 rounded-lg font-label-md text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-secondary text-on-secondary shadow-xs'
                            : 'bg-surface-container hover:bg-surface-container-highest text-on-surface'
                        }`}
                      >
                        {isSelected ? 'Open' : 'Inspect Match'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: Algorithm Thresholds Modal */}
      {showThresholdsModal && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 border border-surface-container-high shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">tune</span>
                <h3 className="font-headline-sm font-bold text-on-surface text-base">
                  Overlap Engine Algorithm Thresholds
                </h3>
              </div>
              <button
                onClick={() => setShowThresholdsModal(false)}
                className="p-1 rounded hover:bg-surface-container text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Exact AICTE ID Match Weight</span>
                  <span className="font-data-mono font-bold text-primary">{thresholds.exactIdWeight.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.0"
                  step="0.1"
                  value={thresholds.exactIdWeight}
                  onChange={(e) => setThresholds({ ...thresholds, exactIdWeight: parseFloat(e.target.value) })}
                  className="w-full accent-primary"
                />
                <p className="text-[10px] text-outline mt-0.5">Deterministic permanent key override.</p>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Fuzzy String Cutoff Ratio (Levenshtein)</span>
                  <span className="font-data-mono font-bold text-primary">{thresholds.fuzzyRatio}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={thresholds.fuzzyRatio}
                  onChange={(e) => setThresholds({ ...thresholds, fuzzyRatio: parseInt(e.target.value) })}
                  className="w-full accent-primary"
                />
                <p className="text-[10px] text-outline mt-0.5">Minimum token ratio for institution naming matches.</p>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Multilingual Embedding Min Cosine</span>
                  <span className="font-data-mono font-bold text-primary">{thresholds.semanticCosine}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={thresholds.semanticCosine}
                  onChange={(e) => setThresholds({ ...thresholds, semanticCosine: parseInt(e.target.value) })}
                  className="w-full accent-primary"
                />
                <p className="text-[10px] text-outline mt-0.5">English / Hindi vector dot-product floor.</p>
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Temporal Overlap Horizon</span>
                  <span className="font-data-mono font-bold text-primary">±{thresholds.temporalWindowDays} Days</span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="90"
                  value={thresholds.temporalWindowDays}
                  onChange={(e) => setThresholds({ ...thresholds, temporalWindowDays: parseInt(e.target.value) })}
                  className="w-full accent-primary"
                />
                <p className="text-[10px] text-outline mt-0.5">Timeframe of related complaint submission.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-surface-container-high flex justify-end gap-2 text-xs">
              <button
                onClick={() => {
                  setThresholds({ exactIdWeight: 1.0, fuzzyRatio: 90, semanticCosine: 85, temporalWindowDays: 30 });
                  setToastMessage('Thresholds restored to statutory defaults.');
                  setShowThresholdsModal(false);
                }}
                className="px-3 py-1.5 rounded-lg border border-surface-container-high text-on-surface hover:bg-surface-container font-semibold"
              >
                Reset Defaults
              </button>
              <button
                onClick={() => {
                  setToastMessage('Custom algorithm weights saved and deployed to worker threads.');
                  setShowThresholdsModal(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-semibold hover:bg-primary-container"
              >
                Save & Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Detection Log Drawer */}
      {showDetectionLogModal && (
        <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-6 border border-surface-container-high shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">terminal</span>
                <h3 className="font-headline-sm font-bold text-on-surface text-base">
                  Model v4.2 Telemetry Execution Log
                </h3>
              </div>
              <button
                onClick={() => setShowDetectionLogModal(false)}
                className="p-1 rounded hover:bg-surface-container text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="bg-primary text-primary-fixed p-4 rounded-xl font-data-mono text-[11px] space-y-1.5 max-h-80 overflow-y-auto">
              <p className="text-emerald-400">[2026-01-12 14:22:01.104] INIT_MATCHER :: ID {currentMatch.matchId}</p>
              <p>[0.012s] TOKENIZE_EN_HI :: 1,492 tokens normalized.</p>
              <p>[0.038s] EXACT_KEY_MATCH :: AICTE-DEMO-1024 -&gt; Conf: 1.000 [VERIFIED]</p>
              <p>[0.114s] FUZZY_LEVENSHTEIN :: "North Valley Inst" vs "North Valley Institute" -&gt; 0.984</p>
              <p>[0.342s] EMBEDDING_BI_ENCODER :: Cos-Sim(docket_pgrc, docket_rb) = 0.872</p>
              <p>[0.521s] CBR_RULE_402 :: Delta days = 10d (&lt;= 30d window) -&gt; PASS</p>
              <p>[0.710s] HARMONIC_FUSION :: Final Composite Score = 0.912 (High Confidence)</p>
              <p className="text-amber-300">[0.840s] SOVEREIGNTY_CHECK :: Distinct complainants validated. Sec 10(p) trigger enabled.</p>
              <p className="text-emerald-400">[0.844s] DISPATCH_QUEUE :: Appended to Officer Rajesh Sharma review queue.</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowDetectionLogModal(false)}
                className="px-4 py-1.5 rounded-lg bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high"
              >
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
