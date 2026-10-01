import React, { useState } from 'react';
import {
  Search,
  Bot,
  Bell,
  Sparkles,
  Shield,
  HelpCircle,
  Globe,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { ScreenType, UserRole } from '../../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onRoleChange,
  onOpenNotifications,
  unreadCount
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const getScreenTitle = (screen: ScreenType): { title: string; subtitle: string } => {
    switch (screen) {
      case 'dashboard':
        return { title: 'Executive Trade Dashboard', subtitle: 'Overview of sourcing, shipments, AI validations and operations' };
      case 'ai-assistant':
        return { title: 'AI Trade Assistant', subtitle: 'Autonomous supplier matching, RFQ generation & trade copilot' };
      case 'marketplace':
        return { title: 'B2B Supplier Marketplace', subtitle: 'Search verified global factories with capacity & ESG auditing' };
      case 'supplier-profile':
        return { title: 'Supplier Profile: ABC Textiles Ltd.', subtitle: 'Tier-1 Verified Manufacturer • Tirupur, India' };
      case 'create-rfq':
        return { title: 'Create Intelligent RFQ', subtitle: 'AI-assisted requirement formulation & supplier dispatch' };
      case 'rfqs':
        return { title: 'RFQ Sourcing Management', subtitle: 'Active trade inquiries, deadlines & supplier submissions' };
      case 'quotations':
        return { title: 'AI Quotation Comparison Matrix', subtitle: 'Multi-supplier pricing, lead times, landed cost & risk analysis' };
      case 'orders':
        return { title: 'Order Execution & Production', subtitle: 'ORD-1024 • 10,000 Units Premium Cotton Shirts ($78,000)' };
      case 'documents':
        return { title: 'AI Trade Document Center (OCR)', subtitle: 'Automated extraction, discrepancy validation & compliance checks' };
      case 'shipments':
        return { title: 'Global Shipment Tracking', subtitle: 'SHIP-2048 • Container MRKU-8492019 (Nhava Sheva → Montreal)' };
      case 'crm':
        return { title: 'CRM & Lead Management', subtitle: 'Buyer inquiries, pipeline stages and automated follow-up drafts' };
      case 'analytics':
        return { title: 'Trade Intelligence & Analytics', subtitle: 'Funnel conversion, landed cost optimization & AI efficiency' };
      case 'admin':
        return { title: 'Admin & Operations Control Center', subtitle: 'Human-in-the-loop triage, supplier verification & audit logs' };
      default:
        return { title: 'TradeAI Platform', subtitle: 'Next-Gen B2B Import-Export Operating System' };
    }
  };

  const currentInfo = getScreenTitle(currentScreen);

  return (
    <header style={{
      height: '68px',
      backgroundColor: '#0d1322',
      borderBottom: '1px solid #1e293b',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Title / Breadcrumb */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
            {currentInfo.title}
          </h1>
          <span style={{
            fontSize: '0.65rem',
            padding: '2px 8px',
            borderRadius: '9999px',
            backgroundColor: '#1e293b',
            color: '#38bdf8',
            fontWeight: 600,
            border: '1px solid #334155'
          }}>
            SIMULATED LIVE
          </span>
        </div>
        <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0, lineHeight: 1.2 }}>
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Global Quick Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          position: 'relative',
          width: '280px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search suppliers, orders, RFQs, HS codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#131b2c',
              border: '1px solid #24324d',
              borderRadius: '20px',
              padding: '7px 12px 7px 34px',
              fontSize: '0.8rem',
              color: '#f8fafc',
              outline: 'none'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onNavigate('marketplace');
              }
            }}
          />
        </div>

        {/* AI Quick Button */}
        <button
          onClick={() => onNavigate('ai-assistant')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#a5b4fc',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Bot size={15} color="#38bdf8" />
          <span>Ask AI</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          style={{
            position: 'relative',
            background: '#161f30',
            border: '1px solid #24324d',
            borderRadius: '8px',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#cbd5e1',
            cursor: 'pointer'
          }}
          title="Notifications & Trade Alerts"
        >
          <Bell size={17} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#f43f5e',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 8px rgba(244, 63, 94, 0.8)'
            }}>
              {unreadCount}
            </span>
          )}
        </button>

        {/* Role Switcher Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#161f30',
              border: '1px solid #24324d',
              borderRadius: '8px',
              padding: '6px 12px',
              cursor: 'pointer',
              color: '#f8fafc'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#4f46e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.72rem',
              fontWeight: 700
            }}>
              {userRole === 'buyer' ? 'B' : userRole === 'supplier' ? 'S' : userRole === 'operations' ? 'O' : 'A'}
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 600, textTransform: 'capitalize' }}>{userRole}</div>
              <div style={{ fontSize: '0.64rem', color: '#64748b' }}>Demo View</div>
            </div>
            <ChevronDown size={14} color="#64748b" />
          </button>

          {roleDropdownOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '44px',
              width: '200px',
              backgroundColor: '#161f30',
              border: '1px solid #334155',
              borderRadius: '10px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              padding: '6px',
              zIndex: 50
            }}>
              <div style={{ padding: '6px 10px', fontSize: '0.7rem', fontWeight: 700, color: '#64748b' }}>
                SWITCH DEMO PERSPECTIVE
              </div>
              {[
                { role: 'buyer', label: 'Importer / Buyer (Sarah)' },
                { role: 'supplier', label: 'Supplier (ABC Textiles)' },
                { role: 'operations', label: 'Operations & Logistics' },
                { role: 'admin', label: 'Super Admin / Compliance' }
              ].map((item) => (
                <button
                  key={item.role}
                  onClick={() => {
                    onRoleChange(item.role as UserRole);
                    setRoleDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    textAlign: 'left',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: userRole === item.role ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    color: userRole === item.role ? '#38bdf8' : '#e2e8f0',
                    fontSize: '0.78rem',
                    fontWeight: userRole === item.role ? 600 : 400,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{item.label}</span>
                  {userRole === item.role && <CheckCircle2 size={13} color="#38bdf8" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
