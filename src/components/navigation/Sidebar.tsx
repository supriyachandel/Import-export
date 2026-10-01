import React from 'react';
import {
  LayoutDashboard,
  Bot,
  Store,
  FileQuestion,
  Scale,
  Package,
  FileText,
  Ship,
  Users,
  BarChart3,
  Bell,
  Settings,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Flame
} from 'lucide-react';
import { ScreenType, UserRole } from '../../types';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  userRole: UserRole;
  unreadExceptionsCount: number;
  pendingQuotesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  unreadExceptionsCount,
  pendingQuotesCount
}) => {
  const mainNavItems: { id: ScreenType; label: string; icon: React.ReactNode; badge?: string | number; badgeColor?: string; isAi?: boolean }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    {
      id: 'ai-assistant',
      label: 'AI Trade Assistant',
      icon: <Bot size={18} />,
      isAi: true,
      badge: 'PRO',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
    },
    { id: 'marketplace', label: 'B2B Marketplace', icon: <Store size={18} /> },
    { id: 'rfqs', label: 'RFQs & Sourcing', icon: <FileQuestion size={18} />, badge: '3 Active' },
    {
      id: 'quotations',
      label: 'Quotation Matrix',
      icon: <Scale size={18} />,
      badge: pendingQuotesCount > 0 ? pendingQuotesCount : undefined,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    { id: 'orders', label: 'Orders (ORD-1024)', icon: <Package size={18} />, badge: '$78k' },
    {
      id: 'documents',
      label: 'AI Trade Documents',
      icon: <FileText size={18} />,
      badge: '1 Flag',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    {
      id: 'shipments',
      label: 'Shipment Tracking',
      icon: <Ship size={18} />,
      badge: 'Delay Alert',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    },
    { id: 'crm', label: 'CRM & Leads', icon: <Users size={18} /> },
    { id: 'analytics', label: 'Trade Analytics', icon: <BarChart3 size={18} /> },
    {
      id: 'admin',
      label: 'Operations & Admin',
      icon: <ShieldCheck size={18} />,
      badge: unreadExceptionsCount > 0 ? `${unreadExceptionsCount} HITL` : undefined,
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
    }
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
              OS v2.4
            </span>
          </div>
          <p style={{ fontSize: '0.72rem', color: '#64748b' }}>AI Import-Export Platform</p>
        </div>
      </div>

      {/* Navigation List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px'
      }}>
        <div style={{ padding: '6px 8px', fontSize: '0.68rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Trade Core Workflow
        </div>

        {mainNavItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '8px',
                border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                backgroundColor: isActive
                  ? 'rgba(99, 102, 241, 0.15)'
                  : 'transparent',
                color: isActive ? '#ffffff' : item.isAi ? '#c7d2fe' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                textAlign: 'left',
                width: '100%',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.85rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = '#161f30';
                  e.currentTarget.style.color = '#f1f5f9';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = item.isAi ? '#c7d2fe' : '#94a3b8';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: isActive ? '#38bdf8' : item.isAi ? '#818cf8' : '#64748b' }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '9999px',
                  border: '1px solid',
                  backgroundColor: item.badgeColor ? undefined : 'rgba(51, 65, 85, 0.5)',
                  color: item.badgeColor ? undefined : '#94a3b8',
                  borderColor: item.badgeColor ? undefined : '#334155',
                }}
                className={item.badgeColor}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* AI Assistant Quick Card Promo */}
      <div style={{
        padding: '12px',
        margin: '8px 10px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.12) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#38bdf8" />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e0e7ff' }}>AI Autonomous Sourcing</span>
          </div>
          <span style={{ fontSize: '0.62rem', background: '#10b981', color: '#064e3b', fontWeight: 800, padding: '1px 5px', borderRadius: '4px' }}>LIVE</span>
        </div>
        <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '8px', lineHeight: '1.3' }}>
          3 quotes analyzed for RFQ-2048 with 1 OCR discrepancy flagged.
        </p>
        <button
          onClick={() => onNavigate('ai-assistant')}
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
          <span>Ask TradeAI</span>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Footer Role Indicator */}
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
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#e2e8f0' }}>Global Trade Imports</div>
            <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'capitalize' }}>Role: {userRole} (Demo)</div>
          </div>
        </div>
        <button
          onClick={() => onNavigate('login')}
          title="Switch User / Logout"
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <Settings size={16} />
        </button>
      </div>
    </aside>
  );
};
