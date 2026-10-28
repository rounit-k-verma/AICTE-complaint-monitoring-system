import React from 'react';
import { ActiveView } from '../types';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  pendingMatchesCount: number;
  unreadAlertsCount: number;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  pendingMatchesCount,
  unreadAlertsCount,
  isOpen,
  onClose
}) => {
  const navItems: {
    id: ActiveView;
    label: string;
    icon: string;
    badge?: number | string;
    badgeColor?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Monitoring Dashboard',
      icon: 'space_dashboard'
    },
    {
      id: 'overlap-detection',
      label: 'Overlap Detection Engine',
      icon: 'hub',
      badge: pendingMatchesCount > 0 ? `${pendingMatchesCount} NEW` : undefined,
      badgeColor: 'bg-error text-on-error'
    },
    {
      id: 'coordination-workspace',
      label: 'Coordination Workspace',
      icon: 'handshake',
      badge: '#GRP-088',
      badgeColor: 'bg-primary-container text-on-primary-container'
    },
    {
      id: 'complaint-management',
      label: 'Complaint Register',
      icon: 'format_list_bulleted'
    },
    {
      id: 'institution-directory',
      label: 'Institution Directory',
      icon: 'domain'
    },
    {
      id: 'alerts-and-notifications',
      label: 'Alerts & Statutory Notices',
      icon: 'notifications_active',
      badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined,
      badgeColor: 'bg-error text-on-error'
    },
    {
      id: 'reports-and-analytics',
      label: 'Regulatory Reports & Analytics',
      icon: 'query_stats'
    },
    {
      id: 'user-management',
      label: 'User & Access Control',
      icon: 'admin_panel_settings'
    }
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-50 transition-opacity animate-in fade-in duration-150 cursor-pointer"
        title="Click to close menu"
      />

      {/* Slide-out Left Side Menu Bar */}
      <aside className="fixed top-0 left-0 bottom-0 w-72 sm:w-80 bg-surface-container-lowest border-r border-surface-container-high flex flex-col justify-between shrink-0 select-none z-50 shadow-2xl animate-in slide-in-from-left duration-200 overflow-y-auto">
        {/* Top Header inside Drawer */}
        <div>
          <div className="p-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/50">
            <div className="flex items-center gap-2.5">
              <img
                src="./aicte-logo.png"
                alt="AICTE ONEVIEW Logo"
                className="w-8 h-8 object-contain rounded-md drop-shadow-xs"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/en/e/eb/All_India_Council_for_Technical_Education_logo.png';
                }}
              />
              <div>
                <div className="text-xs font-headline-sm font-bold text-primary">
                  AICTE ONEVIEW
                </div>
                <div className="text-[10px] text-on-surface-variant font-data-mono">
                  IICMSD Menu
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
              title="Close menu"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Navigation Items List */}
          <div className="p-3 space-y-1">
            <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-outline uppercase font-label-sm">
              Core Surveillance Navigation
            </div>

            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all text-xs font-label-md group cursor-pointer ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm font-semibold'
                      : 'text-on-surface hover:bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-105 ${
                        isActive ? 'text-primary-fixed' : 'text-on-surface-variant'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full font-data-mono shrink-0 ${
                        item.badgeColor || 'bg-surface-container-highest text-on-surface'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom: Statutory Sovereignty Shield Badge */}
        <div className="p-4 m-3 bg-surface-container-low rounded-xl border border-surface-container-high">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary text-[22px] shrink-0 mt-0.5">
              verified_user
            </span>
            <div>
              <div className="text-[11px] font-bold text-primary font-headline-sm">
                Section 10(p) Sovereignty
              </div>
              <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                Statutory firewall enforced. Bureaus cross-share correlation vectors without ceding administrative jurisdiction.
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 text-[9px] font-data-mono text-outline">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>NIC-HSM 256-bit Validated</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
