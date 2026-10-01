import React from 'react';
import {
  TrendingUp,
  FileQuestion,
  Scale,
  Package,
  Ship,
  AlertTriangle,
  Bot,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { ScreenType } from '../../types';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenDocModal?: () => void;
  onOpenShipmentModal?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onOpenDocModal,
  onOpenShipmentModal
}) => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* AI Management Executive Briefing Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        borderRadius: '14px',
        padding: '20px 24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
            }}>
              <Sparkles size={24} color="#ffffff" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="ai-pill">AI Trade Operations Pulse</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Generated 4 mins ago for Global Trade Imports</span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px 0' }}>
                3 Supplier quotes analyzed for RFQ-2048 • 1 Packing list discrepancy flagged
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0, maxWidth: '850px' }}>
                ABC Textiles submitted the top-ranked quotation ($7.80/unit, 96% AI score, 35-day lead time). Order ORD-1024 is currently in sea transit (Container MRKU-8492019) with a 2-day transshipment swell delay. CBSA origin compliance verified.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="btn-ai"
            style={{ flexShrink: 0 }}
          >
            <Bot size={16} />
            <span>Ask TradeAI Copilot</span>
          </button>
        </div>
      </div>

      {/* 6 High-Impact KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px' }}>
        {/* Active RFQs */}
        <div
          onClick={() => onNavigate('rfqs')}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          className="hover:border-indigo-500/50"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>Active RFQs</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <FileQuestion size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>3</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#34d399' }}>
            <ArrowUpRight size={13} />
            <span>+1 new today (RFQ-2048)</span>
          </div>
        </div>

        {/* Pending Quotations */}
        <div
          onClick={() => onNavigate('quotations')}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>Quotations</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <Scale size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>8</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#38bdf8' }}>
            <span>3 to compare now</span>
          </div>
        </div>

        {/* Active Orders */}
        <div
          onClick={() => onNavigate('orders')}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>Active Orders</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8' }}>
              <Package size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>$95.7k</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#94a3b8' }}>
            <span>ORD-1024 in transit</span>
          </div>
        </div>

        {/* Live Shipments */}
        <div
          onClick={() => onNavigate('shipments')}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>Shipments</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <Ship size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>2</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#fbbf24' }}>
            <span>1 delay alert</span>
          </div>
        </div>

        {/* OCR Exceptions */}
        <div
          onClick={() => onNavigate('documents')}
          style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#fb7185' }}>Doc Flags</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185' }}>
              <AlertTriangle size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fb7185', lineHeight: 1 }}>1</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#fb7185' }}>
            <span>Needs review</span>
          </div>
        </div>

        {/* AI Automations */}
        <div
          onClick={() => onNavigate('analytics')}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>AI Automation</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }}>
              <Bot size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>91.4%</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#34d399' }}>
            <span>8.6% Human HITL</span>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e2e8f0' }}>Quick Trade Actions:</span>
          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>One-click execution shortcuts</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => onNavigate('create-rfq')}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '7px 14px' }}
          >
            <Plus size={15} color="#38bdf8" />
            <span>Create AI RFQ</span>
          </button>

          <button
            onClick={() => onNavigate('marketplace')}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '7px 14px' }}
          >
            <Search size={15} color="#34d399" />
            <span>Find Suppliers</span>
          </button>

          <button
            onClick={() => onNavigate('quotations')}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '7px 14px' }}
          >
            <Scale size={15} color="#fbbf24" />
            <span>Compare Quotations</span>
          </button>

          <button
            onClick={() => onNavigate('ai-assistant')}
            className="btn-ai"
            style={{ fontSize: '0.8rem', padding: '7px 14px' }}
          >
            <Bot size={15} />
            <span>AI Sourcing Chat</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Pending Approvals & Live Activity Stream */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Left: Pending Approvals & Exceptions Requiring Action */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} color="#f43f5e" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                Pending Tasks & Exception Approvals
              </h3>
            </div>
            <span className="badge-warning">2 Actions Required</span>
          </div>

          {/* Task 1: Document Mismatch */}
          <div style={{
            backgroundColor: '#161f30',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge-warning">OCR Document Discrepancy</span>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>ORD-1024 • Packing List</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#f1f5f9', margin: 0, fontWeight: 600 }}>
              Packing List PL-ABC-9821 states 9,800 units vs 10,000 units on Commercial Invoice
            </p>
            <p style={{ fontSize: '0.74rem', color: '#94a3b8', margin: 0 }}>
              AI detected 4 missing cartons ($1,560 value). Human review required prior to customs transmission.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', paddingTop: '4px' }}>
              <button
                onClick={() => {
                  onNavigate('documents');
                  if (onOpenDocModal) onOpenDocModal();
                }}
                className="btn-primary"
                style={{ fontSize: '0.75rem', padding: '6px 12px' }}
              >
                <span>Inspect OCR Scan & Approve</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Task 2: Shipment Weather Advisory */}
          <div style={{
            backgroundColor: '#161f30',
            border: '1px solid rgba(14, 165, 233, 0.3)',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge-info">Logistics Weather Advisory</span>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>SHIP-2048 • Container MRKU-8492019</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#f1f5f9', margin: 0, fontWeight: 600 }}>
              2-Day Port of Tangier swell delay. Revised Montreal ETA: Nov 17.
            </p>
            <p style={{ fontSize: '0.74rem', color: '#94a3b8', margin: 0 }}>
              AI has prepared customer notification email ready for one-click dispatch.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', paddingTop: '4px' }}>
              <button
                onClick={() => {
                  onNavigate('shipments');
                  if (onOpenShipmentModal) onOpenShipmentModal();
                }}
                className="btn-ai"
                style={{ fontSize: '0.75rem', padding: '6px 12px' }}
              >
                <span>Send AI Notice Draft</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Live Cross-Border Activity Feed */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              Live Trade Activity Feed
            </h3>
            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 600 }}>Real-Time Stream</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', marginTop: '6px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f1f5f9' }}>
                  Quotation received from ABC Textiles Ltd.
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  $7.80/unit • $78,000 Total for RFQ-2048 (10,000 units) • 35-day lead time
                </div>
                <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Today, 09:42 AM</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38bdf8', marginTop: '6px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f1f5f9' }}>
                  AI OCR Processed 5 Shipping Documents
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  INV-ABC-9821, BL-MAEU-849201, COO-EIC validated for CBSA e-Manifest
                </div>
                <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Today, 08:30 AM</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fbbf24', marginTop: '6px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f1f5f9' }}>
                  Maersk Vessel AIS Beacon Updated
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  Vessel MAERSK MC-KINNEY entering Mediterranean transit corridor
                </div>
                <span style={{ fontSize: '0.68rem', color: '#64748b' }}>Yesterday, 06:15 PM</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#c084fc', marginTop: '6px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f1f5f9' }}>
                  Lead Qualified: Nordic Apparel Group
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  AI Score 94/100 • $145k projected annual order volume
                </div>
                <span style={{ fontSize: '0.68rem', color: '#64748b' }}>2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
