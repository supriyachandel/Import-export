import React from 'react';
import {
  Bell,
  AlertTriangle,
  FileCheck,
  Ship,
  Sparkles,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { ScreenType } from '../../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenDocModal?: () => void;
  onOpenShipmentUpdateModal?: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenDocModal,
  onOpenShipmentUpdateModal
}) => {
  if (!isOpen) return null;

  const alerts = [
    {
      id: 'n1',
      title: '⚠️ AI OCR Discrepancy Flagged on ORD-1024',
      message: 'Packing List shows 9,800 units while Commercial Invoice specifies 10,000 units. Requires human approval before customs manifest filing.',
      time: '15 mins ago',
      type: 'warning',
      action: 'Inspect Document',
      target: () => {
        onClose();
        onNavigate('documents');
        if (onOpenDocModal) onOpenDocModal();
      }
    },
    {
      id: 'n2',
      title: '🌊 Transshipment Swell Delay on SHIP-2048',
      message: 'Maersk Mc-Kinney Moller vessel revised ETA to Montreal is Nov 17 (+2 days). AI customer notification draft ready.',
      time: '1 hour ago',
      type: 'shipment',
      action: 'Send Customer Update',
      target: () => {
        onClose();
        onNavigate('shipments');
        if (onOpenShipmentUpdateModal) onOpenShipmentUpdateModal();
      }
    },
    {
      id: 'n3',
      title: '✨ 3 Quotations Received for RFQ-2048',
      message: 'ABC Textiles, Prime Garments & Asia Cotton submitted complete quotations. AI Comparative Matrix compiled.',
      time: '3 hours ago',
      type: 'rfq',
      action: 'Compare Quotations',
      target: () => {
        onClose();
        onNavigate('quotations');
      }
    },
    {
      id: 'n4',
      title: '🛡️ Annual GOTS Certificate Renewal Verified',
      message: 'ABC Textiles Ltd. OEKO-TEX and GOTS scope certificates verified through global certification registry API.',
      time: '1 day ago',
      type: 'compliance',
      action: 'View Profile',
      target: () => {
        onClose();
        onNavigate('supplier-profile');
      }
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'flex-end',
      zIndex: 100
    }}>
      <div style={{
        backgroundColor: '#131b2c',
        width: '420px',
        height: '100vh',
        borderLeft: '1px solid #24324d',
        boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideUp 0.2s ease'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid #24324d',
          backgroundColor: '#0d1322',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} color="#38bdf8" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              Live Trade Alerts & Exceptions
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#1a243a',
                border: item.type === 'warning' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid #24324d',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
                  {item.title}
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                {item.message}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.time}</span>
                <button
                  onClick={item.target}
                  style={{
                    backgroundColor: item.type === 'warning' ? '#f59e0b' : '#4f46e5',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>{item.action}</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid #24324d',
          backgroundColor: '#0d1322',
          textAlign: 'center'
        }}>
          <button
            onClick={() => {
              onClose();
              onNavigate('admin');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#38bdf8',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>View Complete Human-in-the-Loop Operations Queue</span>
            <ExternalLink size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
