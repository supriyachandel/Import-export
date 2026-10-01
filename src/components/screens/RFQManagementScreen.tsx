import React, { useState } from 'react';
import {
  FileQuestion,
  Search,
  Filter,
  Sparkles,
  Clock,
  CheckCircle2,
  ChevronRight,
  Send,
  Building2,
  Scale,
  Plus,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { RFQItem, ScreenType } from '../../types';
import { MOCK_RFQS } from '../../data/mockData';

interface RFQManagementScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const RFQManagementScreen: React.FC<RFQManagementScreenProps> = ({ onNavigate }) => {
  const [rfqs, setRfqs] = useState<RFQItem[]>(MOCK_RFQS);
  const [selectedRfq, setSelectedRfq] = useState<RFQItem>(MOCK_RFQS[0]);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredRfqs = rfqs.filter((r) =>
    statusFilter === 'All' ? true : r.status === statusFilter
  );

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            RFQ Sourcing Pipeline
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Manage active buyer sourcing requirements, supplier responses and negotiation timelines
          </p>
        </div>

        <button
          onClick={() => onNavigate('create-rfq')}
          className="btn-primary"
          style={{ fontSize: '0.8rem' }}
        >
          <Plus size={15} />
          <span>New RFQ</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '8px'
      }}>
        {['All', 'Responses Received', 'Negotiation', 'Published', 'Draft', 'Closed'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: statusFilter === status ? '#1e293b' : 'transparent',
              color: statusFilter === status ? '#38bdf8' : '#94a3b8',
              fontSize: '0.78rem',
              fontWeight: statusFilter === status ? 700 : 500,
              cursor: 'pointer'
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Split View: List on Left, Active RFQ Detail on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '20px' }}>
        {/* Left Column: RFQ Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredRfqs.map((item) => {
            const isSelected = selectedRfq.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedRfq(item)}
                style={{
                  backgroundColor: '#111827',
                  border: isSelected ? '1px solid #6366f1' : '1px solid #1e293b',
                  borderRadius: '12px',
                  padding: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: isSelected ? '0 0 16px rgba(99, 102, 241, 0.25)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <span className="code-badge">{item.rfqNumber}</span>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc', margin: '4px 0 0 0' }}>
                      {item.title}
                    </h3>
                  </div>

                  <span className={item.status === 'Responses Received' ? 'badge-success' : 'badge-info'}>
                    {item.status}
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '6px',
                  fontSize: '0.72rem',
                  color: '#94a3b8',
                  backgroundColor: '#0d1322',
                  padding: '8px 10px',
                  borderRadius: '8px'
                }}>
                  <div>Qty: <strong style={{ color: '#f8fafc' }}>{item.quantity.toLocaleString()} pcs</strong></div>
                  <div>Target: <strong style={{ color: '#34d399' }}>${item.targetPrice.toFixed(2)}</strong></div>
                  <div>Quotes: <strong style={{ color: '#38bdf8' }}>{item.responsesCount} Received</strong></div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                  <span>Created: {item.createdAt}</span>
                  <span style={{ color: '#38bdf8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    Inspect Details <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected RFQ Deep-Dive Detail View */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="code-badge">{selectedRfq.rfqNumber}</span>
                <span className="badge-success">{selectedRfq.status}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                {selectedRfq.title}
              </h3>
              <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                Assigned Owner: {selectedRfq.assignedOwner} • Delivery: {selectedRfq.destinationPort}
              </p>
            </div>

            <button
              onClick={() => onNavigate('quotations')}
              className="btn-ai"
              style={{ fontSize: '0.8rem', padding: '8px 14px' }}
            >
              <Scale size={15} />
              <span>Compare {selectedRfq.responsesCount} Quotations</span>
            </button>
          </div>

          {/* AI Activity Panel */}
          <div style={{
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}>
            <Sparkles size={20} color="#38bdf8" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e0e7ff', marginBottom: '2px' }}>
                AI Sourcing Engine Audit
              </div>
              <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
                {selectedRfq.aiSummary}
              </p>
            </div>
          </div>

          {/* Specifications Checklist */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
              Buyer Technical Specifications
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedRfq.specifications.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    backgroundColor: '#161f30',
                    border: '1px solid #24324d',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    color: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <CheckCircle2 size={14} color="#34d399" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Packaging & Logistics Details */}
          <div style={{
            backgroundColor: '#0d1322',
            border: '1px solid #1e293b',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            fontSize: '0.76rem'
          }}>
            <div>
              <span style={{ color: '#64748b' }}>Packaging Spec:</span>
              <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{selectedRfq.packaging}</div>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Required Lead Time:</span>
              <div style={{ color: '#fbbf24', fontWeight: 600 }}>{selectedRfq.leadTimeDays} Days (By {selectedRfq.requiredDeliveryDate})</div>
            </div>
          </div>

          {/* Invited Suppliers Status */}
          <div>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
              Invited Manufacturers & Submissions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {selectedRfq.invitedSuppliers.map((supName, sIdx) => (
                <div
                  key={sIdx}
                  style={{
                    backgroundColor: '#161f30',
                    border: '1px solid #24324d',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={16} color="#818cf8" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc' }}>{supName}</span>
                  </div>
                  <span className="badge-success">Quotation Submitted</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
