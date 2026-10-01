import React, { useState } from 'react';
import {
  Search,
  Bot,
  Bell,
  Sparkles,
  Shield,
  HelpCircle,
  Globe,
  Compass,
  CheckCircle2,
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

  const getScreenTitle = (screen: ScreenType): { title: string; subtitle: string } => {
    switch (screen) {
      case 'dashboard':
        return {
          title: 'Trade Scout Intelligence Dashboard',
          subtitle: 'Overview of market discovery sessions, company qualification metrics & saved leads'
        };
      case 'trade-scout':
        return {
          title: 'AI Trade Scout',
          subtitle: 'Tell us what you sell and where you want to sell it. AI identifies the companies worth investigating.'
        };
      case 'saved-leads':
        return {
          title: 'Saved Trade Leads',
          subtitle: 'Curated export distributor prospects ready for commercial engagement & outreach'
        };
      case 'research-history':
        return {
          title: 'Market Research History',
          subtitle: 'Archive of completed market research sessions across global customs & trade registries'
        };
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
        return { title: 'TradeAI Scout Platform', subtitle: 'Next-Gen AI Market Discovery for Exporters & Manufacturers' };
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
          <h1 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            {currentInfo.title}
          </h1>
          <span style={{
            fontSize: '0.65rem',
            padding: '2px 8px',
            borderRadius: '9999px',
            backgroundColor: '#1e293b',
            color: '#38bdf8',
            fontWeight: 700,
            border: '1px solid #334155'
          }}>
            TRADE SCOUT v1.0
          </span>
        </div>
        <p style={{ fontSize: '0.74rem', color: '#94a3b8', margin: 0, lineHeight: 1.2 }}>
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Global Quick Search & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          position: 'relative',
          width: '260px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search markets, products, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#131b2c',
              border: '1px solid #24324d',
              borderRadius: '20px',
              padding: '7px 12px 7px 34px',
              fontSize: '0.78rem',
              color: '#f8fafc',
              outline: 'none'
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onNavigate('trade-scout');
              }
            }}
          />
        </div>

        {/* Trade Scout Quick Action Button */}
        <button
          onClick={() => onNavigate('trade-scout')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            color: '#a5b4fc',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Compass size={15} color="#38bdf8" />
          <span>New Scout</span>
        </button>

        {/* Notifications Bell */}
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
          title="Trade Alerts"
        >
          <Bell size={17} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
