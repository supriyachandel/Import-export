import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  X,
  Eye,
  Download,
  ShieldCheck,
  UserCheck,
  ZoomIn,
  Layers,
  ArrowRight
} from 'lucide-react';
import { TradeDocument } from '../../types';

interface DocumentOCRModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: TradeDocument | null;
  onApproveDoc?: (docId: string) => void;
  onEscalate?: () => void;
}

export const DocumentOCRModal: React.FC<DocumentOCRModalProps> = ({
  isOpen,
  onClose,
  document,
  onApproveDoc,
  onEscalate
}) => {
  const [approvedState, setApprovedState] = useState(false);

  if (!isOpen || !document) return null;

  const isWarning = document.aiValidation.severity === 'warning';

  const handleApprove = () => {
    setApprovedState(true);
    setTimeout(() => {
      if (onApproveDoc) onApproveDoc(document.id);
      onClose();
    }, 800);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '24px'
    }}>
      <div style={{
        backgroundColor: '#131b2c',
        border: '1px solid #334155',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '1080px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden',
        animation: 'slideUp 0.25s ease'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid #24324d',
          backgroundColor: '#0d1322',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: isWarning
                ? 'rgba(245, 158, 11, 0.15)'
                : 'rgba(16, 185, 129, 0.15)',
              border: `1px solid ${isWarning ? '#f59e0b' : '#10b981'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FileText size={20} color={isWarning ? '#fbbf24' : '#34d399'} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                  {document.type} ({document.documentNumber})
                </h3>
                <span className={isWarning ? 'badge-warning' : 'badge-success'}>
                  {document.status}
                </span>
                <span className="code-badge">v{document.version}.0</span>
              </div>
              <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>
                File: {document.fileName} • Attached to Order {document.orderNumber}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* AI Warning Banner if discrepancy */}
        {isWarning && (
          <div style={{
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={18} color="#fbbf24" style={{ flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fbbf24' }}>
                  OCR Validation Discrepancy Flagged
                </span>
                <p style={{ fontSize: '0.75rem', color: '#fef3c7', margin: 0 }}>
                  {document.aiValidation.warningMessage}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onEscalate) onEscalate();
              }}
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap'
              }}
            >
              <UserCheck size={14} />
              <span>Escalate Exception</span>
            </button>
          </div>
        )}

        {/* Split Screen Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, overflow: 'hidden' }}>
          {/* Left: Simulated Visual Document Scan */}
          <div style={{
            backgroundColor: '#0b0f19',
            borderRight: '1px solid #24324d',
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Source Scan (OCR Layer Active)
              </span>
              <span style={{ fontSize: '0.7rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Layers size={12} /> Bounding Box Highlighting
              </span>
            </div>

            {/* Document Render Mockup */}
            <div style={{
              backgroundColor: '#ffffff',
              color: '#0f172a',
              borderRadius: '8px',
              padding: '24px',
              fontFamily: 'serif',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              position: 'relative',
              fontSize: '0.78rem',
              lineHeight: 1.4
            }}>
              {/* Document Header */}
              <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '12px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                    ABC TEXTILES LTD.
                  </h4>
                  <p style={{ fontSize: '0.7rem', color: '#475569', margin: 0 }}>
                    14/2 Industrial Estate, Tirupur, Tamil Nadu, 641604, India
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                    {document.type.toUpperCase()}
                  </span>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>
                    #{document.documentNumber}
                  </div>
                </div>
              </div>

              {/* Parties */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                  <strong>Exporter / Shipper:</strong>
                  <div>ABC Textiles Ltd., India</div>
                  <div>GSTIN: 33AAACF4921K1Z9</div>
                </div>
                <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                  <strong>Consignee / Importer:</strong>
                  <div>Global Trade Imports Inc.</div>
                  <div>Montreal, QC, Canada</div>
                </div>
              </div>

              {/* Discrepancy Highlight Box */}
              {isWarning && (
                <div style={{
                  border: '2px dashed #dc2626',
                  backgroundColor: 'rgba(220, 38, 38, 0.08)',
                  padding: '8px',
                  borderRadius: '4px',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#dc2626', fontWeight: 700, fontSize: '0.72rem' }}>
                    <span>⚠️ OCR BOUNDING BOX MISMATCH (CONFIDENCE 99.4%)</span>
                    <span>196 Cartons = 9,800 Pcs</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#7f1d1d' }}>
                    Found: Total Units = 9,800 pcs (Expected from Invoice INV-ABC-9821: 10,000 pcs)
                  </div>
                </div>
              )}

              {/* Table Sample */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.72rem', marginBottom: '14px' }}>
                <thead>
                  <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                    <th style={{ padding: '4px 6px', textAlign: 'left' }}>Item Description</th>
                    <th style={{ padding: '4px 6px', textAlign: 'center' }}>Cartons</th>
                    <th style={{ padding: '4px 6px', textAlign: 'right' }}>Total Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                    <td style={{ padding: '6px' }}>100% Combed Cotton Shirts (180 GSM)</td>
                    <td style={{ padding: '6px', textAlign: 'center' }}>{isWarning ? '196 CTNS' : '200 CTNS'}</td>
                    <td style={{ padding: '6px', textAlign: 'right', fontWeight: 700 }}>
                      {isWarning ? '9,800 PCS' : '10,000 PCS'}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b' }}>
                <div>Gross Weight: 2,450 kg • Net Weight: 2,200 kg</div>
                <div>Authorized Signatory [STAMPED]</div>
              </div>
            </div>
          </div>

          {/* Right: AI OCR Extracted Key-Values */}
          <div style={{
            backgroundColor: '#131b2c',
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="#38bdf8" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                  Extracted Trade Entities
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                AI Vision Conf: 99.1%
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(document.extractedFields).map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    backgroundColor: '#1a243a',
                    border: '1px solid #24324d',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>
                    {key}
                  </span>
                  <span style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: key.toLowerCase().includes('quantity') || key.toLowerCase().includes('units')
                      ? isWarning ? '#fb7185' : '#34d399'
                      : '#f8fafc',
                    fontFamily: typeof val === 'number' || String(val).includes('$') ? 'var(--font-mono)' : 'inherit'
                  }}>
                    {String(val)}
                  </span>
                </div>
              ))}
            </div>

            {/* AI Action Card */}
            <div style={{
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '10px',
              padding: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <ShieldCheck size={16} color="#818cf8" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e0e7ff' }}>
                  Automated Audit Recommendation
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#c7d2fe', margin: 0, lineHeight: 1.4 }}>
                {document.aiValidation.suggestedAction || 'All fields verified with carrier and customs manifests.'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid #24324d',
          backgroundColor: '#0d1322',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Audited by: {document.reviewedBy || 'AI Document Engine'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
            <button
              onClick={handleApprove}
              className="btn-primary"
              style={{
                background: isWarning
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
              }}
            >
              {approvedState ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Approved & Saved!</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  <span>{isWarning ? 'Human Override & Approve' : 'Confirm Document'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
