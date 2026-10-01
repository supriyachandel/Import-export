import React, { useState } from 'react';
import {
  Package,
  CheckCircle2,
  Clock,
  Ship,
  FileText,
  AlertTriangle,
  Building2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Order, ScreenType } from '../../types';
import { MOCK_ORDERS } from '../../data/mockData';

interface OrderManagementScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenDocOCRModal?: () => void;
}

export const OrderManagementScreen: React.FC<OrderManagementScreenProps> = ({
  onNavigate,
  onOpenDocOCRModal
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order>(MOCK_ORDERS[0]);

  const stages = [
    { num: 1, title: 'Order Confirmed', date: 'Sep 29', done: true },
    { num: 2, title: 'Trade Documents', date: 'Oct 01', done: true, hasWarning: true },
    { num: 3, title: 'Production QC', date: 'Oct 08', done: true },
    { num: 4, title: 'Ocean Shipment', date: 'Oct 14', current: true },
    { num: 5, title: 'Customs & Delivery', date: 'Nov 17 (Est)', pending: true }
  ];

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Order Lifecycle: {selectedOrder.orderNumber}
            </h2>
            <span className="badge-info">In Ocean Transit</span>
            <span className="code-badge">Value: ${selectedOrder.totalValue.toLocaleString()} USD</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
            Buyer: {selectedOrder.buyerName} ({selectedOrder.buyerCountry}) • Supplier: {selectedOrder.supplierName} ({selectedOrder.supplierCountry})
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onNavigate('documents')}
            className="btn-secondary"
            style={{ fontSize: '0.78rem' }}
          >
            <FileText size={14} />
            <span>View Trade Documents (5)</span>
          </button>

          <button
            onClick={() => onNavigate('shipments')}
            className="btn-primary"
            style={{ fontSize: '0.78rem' }}
          >
            <Ship size={14} />
            <span>Live Shipment Tracker (SHIP-2048)</span>
          </button>
        </div>
      </div>

      {/* 5-Stage Visual Lifecycle Progress Bar */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {/* Connector Line */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '40px',
            right: '40px',
            height: '3px',
            backgroundColor: '#1e293b',
            zIndex: 1
          }}>
            <div style={{
              width: '75%',
              height: '100%',
              background: 'linear-gradient(90deg, #10b981 0%, #38bdf8 100%)'
            }} />
          </div>

          {stages.map((st) => (
            <div
              key={st.num}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 2,
                textAlign: 'center',
                width: '140px'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: st.done ? '#10b981' : st.current ? '#38bdf8' : '#1e293b',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                border: st.current ? '3px solid rgba(56, 189, 248, 0.4)' : 'none',
                boxShadow: st.current ? '0 0 16px rgba(56, 189, 248, 0.5)' : 'none',
                marginBottom: '8px'
              }}>
                {st.done ? <CheckCircle2 size={20} /> : st.num}
              </div>

              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: st.current ? '#38bdf8' : st.done ? '#f1f5f9' : '#64748b' }}>
                {st.title}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{st.date}</div>
              {st.hasWarning && (
                <span style={{ fontSize: '0.65rem', color: '#fbbf24', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <AlertTriangle size={10} /> 1 Flagged
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Commercial Details, Document Repository & Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr', gap: '20px' }}>
        {/* Left Column: Commercial Specs & Payment Schedule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Order Details Card */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '14px',
            padding: '20px'
          }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
              Order Commercial Particulars
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              fontSize: '0.78rem'
            }}>
              <div>
                <span style={{ color: '#64748b' }}>Product:</span>
                <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{selectedOrder.productName}</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Total Order Quantity:</span>
                <div style={{ fontWeight: 700, color: '#38bdf8' }}>{selectedOrder.quantity.toLocaleString()} pcs</div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Total Commercial Value:</span>
                <div style={{ fontWeight: 800, color: '#34d399', fontSize: '0.95rem' }}>
                  ${selectedOrder.totalValue.toLocaleString()} USD
                </div>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Destination Port:</span>
                <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{selectedOrder.destinationPort}</div>
              </div>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #1e293b' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Payment Terms:</span>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', marginTop: '2px' }}>
                {selectedOrder.paymentTerms}
              </div>
            </div>
          </div>

          {/* Quick Document Status Snapshot */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '14px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                Trade Documents Compliance (5 Total)
              </h3>
              <span className="badge-warning">1 Discrepancy Flagged</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ backgroundColor: '#161f30', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>Packing List (PL-ABC-9821)</div>
                  <div style={{ fontSize: '0.7rem', color: '#fbbf24' }}>AI OCR Flag: 9,800 units vs 10,000 units on Invoice</div>
                </div>
                <button
                  onClick={() => onNavigate('documents')}
                  className="btn-secondary"
                  style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                >
                  Inspect OCR
                </button>
              </div>

              <div style={{ backgroundColor: '#161f30', border: '1px solid #24324d', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>Commercial Invoice (INV-ABC-9821)</div>
                  <div style={{ fontSize: '0.7rem', color: '#34d399' }}>Verified: $78,000 USD (10,000 pcs)</div>
                </div>
                <span className="badge-success">Approved</span>
              </div>

              <div style={{ backgroundColor: '#161f30', border: '1px solid #24324d', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>Bill of Lading (BL-MAEU-849201)</div>
                  <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>Carrier: Maersk Line • Container MRKU-8492019</div>
                </div>
                <span className="badge-info">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Timeline Log */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
            Operational Milestone Timeline
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {selectedOrder.timeline.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: item.completed ? 'rgba(16, 185, 129, 0.2)' : item.current ? 'rgba(56, 189, 248, 0.2)' : '#1e293b',
                  color: item.completed ? '#34d399' : item.current ? '#38bdf8' : '#64748b',
                  border: `1px solid ${item.completed ? '#10b981' : item.current ? '#38bdf8' : '#334155'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {item.completed ? '✓' : idx + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: item.current ? '#38bdf8' : '#f8fafc', margin: 0 }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{item.date}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
