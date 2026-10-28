import React, { useState, useRef, useEffect } from 'react';
import { ActiveView, Complaint, Institution, OfficerUser, OverlapMatch } from '../types';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenLogGrievance: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  unreadAlertsCount: number;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  complaints: Complaint[];
  institutions: Institution[];
  overlapMatches: OverlapMatch[];
  officers: OfficerUser[];
  onNavigate: (view: ActiveView, params?: { institutionId?: string; matchId?: string; docketId?: string }) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onOpenLogGrievance,
  searchQuery,
  setSearchQuery,
  unreadAlertsCount,
  onToggleSidebar,
  isSidebarOpen,
  complaints,
  institutions,
  overlapMatches,
  officers,
  onNavigate
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Filter datasets
  const matchedComplaints = trimmedQuery
    ? complaints.filter(c =>
        c.id.toLowerCase().includes(trimmedQuery) ||
        c.category.toLowerCase().includes(trimmedQuery) ||
        c.institutionName.toLowerCase().includes(trimmedQuery) ||
        c.summary.toLowerCase().includes(trimmedQuery) ||
        c.bureau.toLowerCase().includes(trimmedQuery) ||
        c.assignedOfficer.toLowerCase().includes(trimmedQuery)
      ).slice(0, 4)
    : [];

  const matchedInstitutions = trimmedQuery
    ? institutions.filter(i =>
        i.name.toLowerCase().includes(trimmedQuery) ||
        i.code.toLowerCase().includes(trimmedQuery) ||
        i.id.toLowerCase().includes(trimmedQuery) ||
        i.city.toLowerCase().includes(trimmedQuery) ||
        i.state.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  const matchedOverlapMatches = trimmedQuery
    ? overlapMatches.filter(m =>
        m.matchId.toLowerCase().includes(trimmedQuery) ||
        m.institutionName.toLowerCase().includes(trimmedQuery) ||
        m.docketA.id.toLowerCase().includes(trimmedQuery) ||
        m.docketB.id.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  const matchedOfficers = trimmedQuery
    ? officers.filter(o =>
        o.name.toLowerCase().includes(trimmedQuery) ||
        o.designation.toLowerCase().includes(trimmedQuery) ||
        o.bureau.toLowerCase().includes(trimmedQuery) ||
        o.email.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  const totalResultsCount =
    matchedComplaints.length +
    matchedInstitutions.length +
    matchedOverlapMatches.length +
    matchedOfficers.length;

  const handleSelectComplaint = (complaint: Complaint) => {
    onNavigate('complaint-management', { docketId: complaint.id });
    setIsSearchOpen(false);
  };

  const handleSelectInstitution = (inst: Institution) => {
    onNavigate('institution-directory', { institutionId: inst.id });
    setIsSearchOpen(false);
  };

  const handleSelectOverlap = (match: OverlapMatch) => {
    onNavigate('overlap-detection', { matchId: match.matchId });
    setIsSearchOpen(false);
  };

  const handleSelectOfficer = (officer: OfficerUser) => {
    onNavigate('user-management');
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
    } else if (e.key === 'Enter') {
      // Pick first result if available
      if (matchedComplaints.length > 0) {
        handleSelectComplaint(matchedComplaints[0]);
      } else if (matchedInstitutions.length > 0) {
        handleSelectInstitution(matchedInstitutions[0]);
      } else if (matchedOverlapMatches.length > 0) {
        handleSelectOverlap(matchedOverlapMatches[0]);
      } else if (matchedOfficers.length > 0) {
        handleSelectOfficer(matchedOfficers[0]);
      }
    }
  };

  const quickSuggestions = [
    { label: 'PGRC-2026-0102', sub: 'NVIT • 7th Pay Commission Arrears', type: 'docket', id: 'PGRC-2026-0102' },
    { label: 'RB-2026-0087', sub: 'NVIT • Ghost Faculty & Fee Diversion', type: 'docket', id: 'RB-2026-0087' },
    { label: 'North Valley Institute of Technology', sub: 'AICTE-DEMO-1024 • Pune', type: 'institution', id: 'AICTE-DEMO-1024' },
    { label: 'MATCH-2026-001', sub: '91% Overlap • NVIT Dual Dockets', type: 'overlap', id: 'MATCH-2026-001' },
    { label: 'Dr. Rajesh Sharma, IRS', sub: 'Chief Surveillance Officer', type: 'officer', id: 'OFF-001' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest border-b border-surface-container-high px-4 sm:px-6 py-3 shadow-[0_2px_12px_rgba(0,22,50,0.04)]">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Three Dot Button & Branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Three-Dot Menu Button */}
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-xl transition-all flex items-center justify-center cursor-pointer border ${
              isSidebarOpen
                ? 'bg-primary text-on-primary border-primary shadow-sm'
                : 'bg-surface-container-low hover:bg-surface-container text-primary border-surface-container-high hover:border-secondary/40 shadow-xs active:scale-95'
            }`}
            title="Toggle Menu (Click three dots)"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              more_vert
            </span>
          </button>

          <img
            src="./aicte-logo.png"
            alt="AICTE ONEVIEW Logo"
            className="w-10 h-10 object-contain rounded-md drop-shadow-xs"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png';
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline-md tracking-tight text-primary font-bold text-sm sm:text-base">AICTE ONEVIEW</span>
              <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase font-data-mono">
                IICMSD
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant font-medium tracking-tight">
              Integrated Institutional Complaint Monitoring & Surveillance Dashboard
            </p>
          </div>
        </div>

        {/* Center: Global Omnisearch Engine Bar */}
        <div ref={searchContainerRef} className="flex-1 max-w-xl mx-4 relative">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[18px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search by Docket #, Institution ID (NVIT), Faculty PAN, or Keyword... (Press ⌘K)"
              className="w-full bg-surface-container-low hover:bg-surface-container text-on-surface pl-10 pr-24 py-2 rounded-lg border border-transparent focus:border-secondary focus:bg-surface-container-lowest outline-none text-xs transition-all font-body-sm shadow-inner"
            />

            <div className="absolute right-2 flex items-center gap-1.5">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                  }}
                  className="p-1 rounded hover:bg-surface-container-high text-outline hover:text-on-surface text-xs"
                  title="Clear search"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
              <div className="flex items-center gap-1 bg-surface-container px-1.5 py-0.5 rounded text-[10px] text-outline font-data-mono pointer-events-none">
                <span>⌘</span><span>K</span>
              </div>
            </div>
          </div>

          {/* Search Dropdown Engine Panel */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest rounded-xl border border-surface-container-high shadow-2xl z-50 overflow-hidden max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-100 text-xs">
              {trimmedQuery.length > 0 ? (
                totalResultsCount > 0 ? (
                  <div className="divide-y divide-surface-container-high">
                    {/* Header Summary */}
                    <div className="px-4 py-2.5 bg-surface-container-low text-[11px] text-outline flex items-center justify-between font-semibold">
                      <span>Found {totalResultsCount} results for "{searchQuery}"</span>
                      <span className="font-data-mono text-[10px]">Press Enter to open top match</span>
                    </div>

                    {/* Matching Complaints */}
                    {matchedComplaints.length > 0 && (
                      <div className="p-2 space-y-1">
                        <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-outline font-label-sm">
                          Complaints & Investigation Dockets
                        </div>
                        {matchedComplaints.map((c) => (
                          <div
                            key={c.id}
                            onClick={() => handleSelectComplaint(c)}
                            className="p-2.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors flex items-start justify-between gap-3 group"
                          >
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-data-mono font-bold text-primary group-hover:text-secondary">
                                  {c.id}
                                </span>
                                <span className="bg-primary/10 text-primary px-1.5 py-0.2 rounded text-[10px] font-bold font-data-mono">
                                  {c.bureau}
                                </span>
                                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold font-data-mono ${
                                  c.severity === 'CRITICAL' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-high text-on-surface'
                                }`}>
                                  {c.severity}
                                </span>
                              </div>
                              <div className="font-semibold text-on-surface truncate text-xs">
                                {c.institutionName}
                              </div>
                              <p className="text-[11px] text-on-surface-variant truncate">
                                {c.category}
                              </p>
                            </div>
                            <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px] shrink-0 mt-1">
                              arrow_forward
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Matching Institutions */}
                    {matchedInstitutions.length > 0 && (
                      <div className="p-2 space-y-1">
                        <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-outline font-label-sm">
                          Technical Institutions & Campuses
                        </div>
                        {matchedInstitutions.map((inst) => (
                          <div
                            key={inst.id}
                            onClick={() => handleSelectInstitution(inst)}
                            className="p-2.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors flex items-start justify-between gap-3 group"
                          >
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-on-surface text-xs group-hover:text-secondary">
                                  {inst.name}
                                </span>
                                <span className="font-data-mono text-outline text-[10px]">{inst.code}</span>
                              </div>
                              <p className="text-[11px] text-on-surface-variant">
                                {inst.city}, {inst.state} • {inst.activeComplaintsCount} active dockets
                              </p>
                            </div>
                            <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px] shrink-0 mt-1">
                              domain
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Matching Overlap Detections */}
                    {matchedOverlapMatches.length > 0 && (
                      <div className="p-2 space-y-1">
                        <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-outline font-label-sm">
                          Cross-Bureau Overlap Matches
                        </div>
                        {matchedOverlapMatches.map((m) => (
                          <div
                            key={m.matchId}
                            onClick={() => handleSelectOverlap(m)}
                            className="p-2.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors flex items-start justify-between gap-3 group"
                          >
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-data-mono font-bold text-secondary">
                                  {m.matchId}
                                </span>
                                <span className="bg-secondary text-on-secondary px-2 py-0.2 rounded text-[10px] font-bold font-data-mono">
                                  {m.confidenceScore}% Overlap
                                </span>
                              </div>
                              <div className="font-semibold text-on-surface text-xs truncate">
                                {m.institutionName}
                              </div>
                              <div className="text-[11px] text-outline font-data-mono">
                                {m.docketA.id} ↔ {m.docketB.id}
                              </div>
                            </div>
                            <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px] shrink-0 mt-1">
                              hub
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Matching Personnel */}
                    {matchedOfficers.length > 0 && (
                      <div className="p-2 space-y-1">
                        <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-outline font-label-sm">
                          Statutory Officers & Bureau Authorities
                        </div>
                        {matchedOfficers.map((o) => (
                          <div
                            key={o.id}
                            onClick={() => handleSelectOfficer(o)}
                            className="p-2.5 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors flex items-start justify-between gap-3 group"
                          >
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-on-surface text-xs group-hover:text-secondary">
                                  {o.name}
                                </span>
                                <span className="bg-primary/10 text-primary px-1.5 py-0.2 rounded text-[10px] font-bold font-data-mono">
                                  {o.bureau}
                                </span>
                              </div>
                              <p className="text-[11px] text-on-surface-variant truncate">
                                {o.designation} • {o.email}
                              </p>
                            </div>
                            <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px] shrink-0 mt-1">
                              badge
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-8 text-center text-on-surface-variant space-y-2">
                    <span className="material-symbols-outlined text-[36px] text-outline">search_off</span>
                    <p className="font-semibold text-on-surface">No records matched "{searchQuery}"</p>
                    <p className="text-[11px] text-outline">
                      Try searching for Docket IDs (e.g. <span className="font-data-mono text-primary font-bold">PGRC-2026-0102</span>), Institution Codes (e.g. <span className="font-data-mono text-primary font-bold">NVIT</span>), or Officer Names.
                    </p>
                  </div>
                )
              ) : (
                /* Quick Suggestions when search input is empty */
                <div className="p-4 space-y-3">
                  <div className="text-[11px] uppercase font-bold text-outline font-label-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px]">trending_up</span>
                    <span>Quick Surveillance Searches & Priority Dockets</span>
                  </div>

                  <div className="space-y-1.5">
                    {quickSuggestions.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (item.type === 'docket') {
                            onNavigate('complaint-management', { docketId: item.id });
                          } else if (item.type === 'institution') {
                            onNavigate('institution-directory', { institutionId: item.id });
                          } else if (item.type === 'overlap') {
                            onNavigate('overlap-detection', { matchId: item.id });
                          } else if (item.type === 'officer') {
                            onNavigate('user-management');
                          }
                          setIsSearchOpen(false);
                        }}
                        className="p-2 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors flex items-center justify-between text-xs group"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-outline text-[16px] group-hover:text-primary">
                            {item.type === 'docket' ? 'description' : item.type === 'institution' ? 'domain' : item.type === 'overlap' ? 'hub' : 'person'}
                          </span>
                          <div>
                            <span className="font-semibold text-on-surface group-hover:text-primary">{item.label}</span>
                            <span className="text-[11px] text-outline ml-2">({item.sub})</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-outline group-hover:text-primary font-semibold">Open →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions, Notifications & Officer Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Action: Log Grievance */}
          <button
            onClick={onOpenLogGrievance}
            className="flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary px-3.5 py-2 rounded-lg font-label-md transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Log new complaint docket into central repository"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span className="hidden sm:inline">Log Grievance</span>
          </button>

          {/* Cross-Bureau Notifications Bell */}
          <button
            onClick={() => setActiveView('alerts-and-notifications')}
            className={`relative p-2 rounded-lg transition-colors cursor-pointer ${
              activeView === 'alerts-and-notifications'
                ? 'bg-primary-fixed text-primary'
                : 'hover:bg-surface-container text-on-surface-variant'
            }`}
            title="Alerts & Statutory Notification Center"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-on-error rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadAlertsCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-surface-container-high mx-1" />

          {/* Officer Identity Card */}
          <div className="flex items-center gap-2.5 pl-1 cursor-pointer group" onClick={() => setActiveView('user-management')}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGoEIdlYWa1hxLGkYKTYI3iDxMOy_KpIuHt80RDfQKa11-aMBIqPo3GKe2dlaNLktmnotC9Ueit5Lavm5vq9kqndke-IGPlEvBjXX6sarez_Ry8OosXJ1wVMBHmzT91b2ZCPeZcgk326jIt0iwTlBjVSN3_3JjSD48cvPMh08ZMrD1eZzGzjWvUxHVEfiQUz8IHnrTR3NZOFgegY_SBfNQMnneTOCup12vhQyS--FavwjY3DT94Cr4Kw"
              alt="Dr. Rajesh Sharma, IRS"
              className="w-9 h-9 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary transition-all shadow-sm"
            />
            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-label-md text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Dr. Rajesh Sharma
                </span>
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[9px] font-bold px-1.5 py-0.2 rounded font-data-mono">
                  IRS
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>PGRC Chief Surveillance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
