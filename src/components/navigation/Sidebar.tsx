import React, { useState } from 'react';
import {
  LayoutDashboard,
  Compass,
  Bookmark,
  Clock,
  Store,
  FileQuestion,
  Scale,
  Package,
  FileText,
  Ship,
  Users,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Settings,
  Layers
} from 'lucide-react';
import { ScreenType, UserRole } from '../../types';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  userRole: UserRole;
  savedLeadsCount: number;
  researchesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  savedLeadsCount,
  researchesCount
}) => {
  const [futureModulesOpen, setFutureModulesOpen] = useState(false);

  const primaryNavItems: {
    id: ScreenType;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    badgeColor?: string;
    isAiPrimary?: boolean;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    {
      id: 'trade-scout',
      label: 'AI Trade Scout',
      icon: <Compass size={18} />,
      isAiPrimary: true,
      badge: 'CORE',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
    },
    {
      id: 'saved-leads',
      label: 'Saved Leads',
      icon: <Bookmark size={18} />,
      badge: savedLeadsCount > 0 ? savedLeadsCount : 42,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    {
      id: 'research-history',
      label: 'Research History',
      icon: <Clock size={18} />,
      badge: researchesCount > 0 ? `${researchesCount}` : '24',
      badgeColor: 'bg-slate-700/50 text-slate-300 border-slate-600'
    }
  ];

  const secondaryNavItems: { id: ScreenType; label: string; icon: React.ReactNode }[] = [
    { id: 'ai-assistant', label: 'AI Trade Assistant', icon: <Sparkles size={16} /> },
    { id: 'marketplace', label: 'B2B Marketplace', icon: <Store size={16} /> },
    { id: 'rfqs', label: 'RFQs & Sourcing', icon: <FileQuestion size={16} /> },
    { id: 'quotations', label: 'Quotation Matrix', icon: <Scale size={16} /> },
    { id: 'orders', label: 'Order Management', icon: <Package size={16} /> },
    { id: 'documents', label: 'Trade Documents (OCR)', icon: <FileText size={16} /> },
    { id: 'shipments', label: 'Shipment Tracking', icon: <Ship size={16} /> },
    { id: 'crm', label: 'CRM & Pipeline', icon: <Users size={16} /> },
    { id: 'analytics', label: 'Trade Analytics', icon: <BarChart3 size={16} /> },
    { id: 'admin', label: 'Admin & Operations', icon: <ShieldCheck size={16} /> }
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#0d1322',
      borderRight: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      flexShrink: 0
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '20px 18px',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)'
        }}>
          <Sparkles size={20} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
              Trade<span style={{ color: '#38bdf8' }}>AI</span>
            </span>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              background: '#1e293b',
              color: '#38bdf8',
              padding: '2px 5px',
              borderRadius: '4px',
              border: '1px solid #334155'
            }}>
              SCOUT
            </span>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#64748b' }}>AI Trade Scout • Milestone 1</p>
        </div>
      </div>

      {/* Primary Navigation List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <div style={{ padding: '6px 8px', fontSize: '0.68rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Milestone 1 Core
        </div>

        {primaryNavItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '8px',
                border: isActive
                  ? '1px solid rgba(99, 102, 241, 0.5)'
                  : item.isAiPrimary
                  ? '1px solid rgba(99, 102, 241, 0.25)'
                  : '1px solid transparent',
                backgroundColor: isActive
                  ? 'rgba(99, 102, 241, 0.2)'
                  : item.isAiPrimary
                  ? 'rgba(99, 102, 241, 0.08)'
                  : 'transparent',
                color: isActive ? '#ffffff' : item.isAiPrimary ? '#c7d2fe' : '#94a3b8',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                fontWeight: isActive ? 700 : item.isAiPrimary ? 600 : 500,
                fontSize: '0.86rem',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#161f30';
                  e.currentTarget.style.color = '#f1f5f9';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = item.isAiPrimary ? 'rgba(99, 102, 241, 0.08)' : 'transparent';
                  e.currentTarget.style.color = item.isAiPrimary ? '#c7d2fe' : '#94a3b8';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: isActive ? '#38bdf8' : item.isAiPrimary ? '#818cf8' : '#64748b' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: '9999px',
                    border: '1px solid'
                  }}
                  className={item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Secondary: Platform Roadmap / Coming Soon Section */}
        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #1e293b' }}>
          <button
            onClick={() => setFutureModulesOpen(!futureModulesOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '6px 8px',
              background: 'none',
              border: 'none',
              color: '#64748b',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            <span>Future Milestones</span>
            {futureModulesOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {futureModulesOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px' }}>
              {secondaryNavItems.map((item) => {
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                      color: isActive ? '#38bdf8' : '#64748b',
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Trade Scout Quick Discovery CTA */}
      <div style={{
        padding: '12px',
        margin: '8px 10px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Sparkles size={14} color="#38bdf8" />
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e0e7ff' }}>Explore New Market</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '8px', lineHeight: '1.3' }}>
          Research distributors for your products in 50+ global markets.
        </p>
        <button
          onClick={() => onNavigate('trade-scout')}
          style={{
            width: '100%',
            padding: '6px 10px',
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.74rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <span>Launch AI Trade Scout</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Footer User Info */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#090d17'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#e2e8f0' }}>Apex Equipment Exporters</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Demo Exporter Profile</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
