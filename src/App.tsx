import React, { useState, useEffect } from 'react';
import { ActiveView, Complaint, Institution, OverlapMatch, StatutoryAlert, OfficerUser, CoordinationGroup, Bureau } from './types';
import {
  MOCK_COMPLAINTS,
  MOCK_OVERLAP_MATCHES,
  MOCK_INSTITUTIONS,
  MOCK_ALERTS,
  MOCK_OFFICERS,
  MOCK_COORDINATION_GROUP
} from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LogGrievanceModal } from './components/LogGrievanceModal';
import { DashboardView } from './components/views/DashboardView';
import { OverlapDetectionView } from './components/views/OverlapDetectionView';
import { InstitutionDirectoryView } from './components/views/InstitutionDirectoryView';
import { CoordinationWorkspaceView } from './components/views/CoordinationWorkspaceView';
import { ComplaintManagementView } from './components/views/ComplaintManagementView';
import { AlertsNotificationsView } from './components/views/AlertsNotificationsView';
import { ReportsAnalyticsView } from './components/views/ReportsAnalyticsView';
import { UserManagementView } from './components/views/UserManagementView';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);
  const [overlapMatches, setOverlapMatches] = useState<OverlapMatch[]>(MOCK_OVERLAP_MATCHES);
  const [institutions, setInstitutions] = useState<Institution[]>(MOCK_INSTITUTIONS);
  const [alerts, setAlerts] = useState<StatutoryAlert[]>(MOCK_ALERTS);
  const [officers, setOfficers] = useState<OfficerUser[]>(MOCK_OFFICERS);
  const [coordinationGroup, setCoordinationGroup] = useState<CoordinationGroup>(MOCK_COORDINATION_GROUP);

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(MOCK_COMPLAINTS[0]);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('AICTE-DEMO-1024');
  const [selectedMatchId, setSelectedMatchId] = useState<string>('MATCH-2026-001');
  const [isLogGrievanceOpen, setIsLogGrievanceOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Keyboard shortcut for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('header input') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Navigation handler
  const handleNavigate = (
    view: ActiveView,
    params?: { institutionId?: string; matchId?: string; docketId?: string }
  ) => {
    if (params?.institutionId) {
      setSelectedInstitutionId(params.institutionId);
    }
    if (params?.docketId) {
      const found = complaints.find(c => c.id === params.docketId);
      if (found) setSelectedComplaint(found);
    }
    if (params?.matchId) {
      setSelectedMatchId(params.matchId);
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit new grievance handler
  const handleAddNewComplaint = (newComp: Complaint) => {
    setComplaints(prev => [newComp, ...prev]);

    // If it has overlap (e.g. NVIT), append an alert
    const newAlert: StatutoryAlert = {
      id: `ALT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `New Docket Ingested: ${newComp.id} (${newComp.bureau})`,
      category: newComp.hasActiveOverlap ? 'OVERLAP' : 'POLICY',
      severity: newComp.severity,
      timestamp: 'Just now',
      isRead: false,
      isSnoozed: false,
      relatedDocketId: newComp.id,
      institutionName: newComp.institutionName,
      summary: `Automated intake registered for ${newComp.institutionName}. Multi-Signal engine scanning for related filings.`,
      recommendedAction: 'Awaiting preliminary officer jurisdiction determination.'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  // Confirm overlap match
  const handleConfirmMatch = (matchId: string) => {
    setOverlapMatches(prev =>
      prev.map(m => (m.matchId === matchId ? { ...m, status: 'CONFIRMED' } : m))
    );
  };

  // Dismiss overlap match
  const handleDismissMatch = (matchId: string) => {
    setOverlapMatches(prev =>
      prev.map(m => (m.matchId === matchId ? { ...m, status: 'DISMISSED' } : m))
    );
  };

  // Toggle Action item in coordination workspace
  const handleUpdateActionItem = (itemId: string, completed: boolean) => {
    setCoordinationGroup(prev => ({
      ...prev,
      actionItems: prev.actionItems.map(item =>
        item.id === itemId ? { ...item, completed } : item
      )
    }));
  };

  // Add finding to coordination workspace
  const handleAddFinding = (findingText: string, bureau: Bureau) => {
    const newFinding = {
      id: `FIND-${Date.now().toString().slice(-4)}`,
      date: `${new Date().toISOString().split('T')[0]} 12:00 IST`,
      author: 'Dr. Rajesh Sharma, IRS',
      bureau,
      finding: findingText,
      signatureVerified: true
    };
    setCoordinationGroup(prev => ({
      ...prev,
      findings: [newFinding, ...prev.findings]
    }));
  };

  // Alerts actions
  const handleMarkAlertRead = (id: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, isRead: !a.isRead } : a))
    );
  };

  const handleMarkAllAlertsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  const handleToggleSnooze = (id: string) => {
    setAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, isSnoozed: !a.isSnoozed } : a))
    );
  };

  const pendingMatchesCount = overlapMatches.filter(m => m.status === 'ACTION_REQUIRED').length;
  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="min-h-screen bg-surface flex flex-col font-body-md text-on-surface antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Top Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenLogGrievance={() => setIsLogGrievanceOpen(true)}
        searchQuery={globalSearchQuery}
        setSearchQuery={setGlobalSearchQuery}
        unreadAlertsCount={unreadAlertsCount}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen}
        complaints={complaints}
        institutions={institutions}
        overlapMatches={overlapMatches}
        officers={officers}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Sidebar Navigation (hidden by default, opens on three-dot click) */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          pendingMatchesCount={pendingMatchesCount}
          unreadAlertsCount={unreadAlertsCount}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Primary Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeView === 'dashboard' && (
            <DashboardView
              onNavigate={handleNavigate}
              complaints={complaints}
              overlapMatches={overlapMatches}
              institutions={institutions}
              onSelectComplaint={(c) => {
                setSelectedComplaint(c);
                setActiveView('complaint-management');
              }}
            />
          )}

          {activeView === 'overlap-detection' && (
            <OverlapDetectionView
              onNavigate={handleNavigate}
              overlapMatches={overlapMatches}
              onConfirmMatch={handleConfirmMatch}
              onDismissMatch={handleDismissMatch}
              initialMatchId={selectedMatchId}
            />
          )}

          {activeView === 'institution-directory' && (
            <InstitutionDirectoryView
              onNavigate={handleNavigate}
              institutions={institutions}
              complaints={complaints}
              selectedInstitutionId={selectedInstitutionId}
              onSelectComplaint={(c) => {
                setSelectedComplaint(c);
                setActiveView('complaint-management');
              }}
            />
          )}

          {activeView === 'coordination-workspace' && (
            <CoordinationWorkspaceView
              onNavigate={handleNavigate}
              coordinationGroup={coordinationGroup}
              onUpdateActionItem={handleUpdateActionItem}
              onAddFinding={handleAddFinding}
            />
          )}

          {activeView === 'complaint-management' && (
            <ComplaintManagementView
              onNavigate={handleNavigate}
              complaints={complaints}
              selectedComplaint={selectedComplaint}
              onSelectComplaint={setSelectedComplaint}
              onOpenLogGrievance={() => setIsLogGrievanceOpen(true)}
            />
          )}

          {activeView === 'alerts-and-notifications' && (
            <AlertsNotificationsView
              onNavigate={handleNavigate}
              alerts={alerts}
              onMarkRead={handleMarkAlertRead}
              onMarkAllRead={handleMarkAllAlertsRead}
              onToggleSnooze={handleToggleSnooze}
            />
          )}

          {activeView === 'reports-and-analytics' && (
            <ReportsAnalyticsView onNavigate={handleNavigate} />
          )}

          {activeView === 'user-management' && (
            <UserManagementView
              onNavigate={handleNavigate}
              officers={officers}
            />
          )}
        </main>
      </div>

      {/* Log Grievance Modal */}
      <LogGrievanceModal
        isOpen={isLogGrievanceOpen}
        onClose={() => setIsLogGrievanceOpen(false)}
        institutions={institutions}
        onSubmitComplaint={handleAddNewComplaint}
      />
    </div>
  );
}
