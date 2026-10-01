import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Upload,
  Eye,
  Download,
  Filter,
  ShieldCheck,
  UserCheck,
  ChevronRight,
  Layers,
  Search
} from 'lucide-react';
import { TradeDocument, ScreenType } from '../../types';
import { MOCK_DOCUMENTS } from '../../data/mockData';

interface DocumentManagementScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenOCRModal: (doc: TradeDocument) => void;
  onOpenHumanHandoff: () => void;
}

export const DocumentManagementScreen: React.FC<DocumentManagementScreenProps> = ({
  onNavigate,
  onOpenOCRModal,
  onOpenHumanHandoff
}) => {
  const [documents, setDocuments] = useState<TradeDocument[]>(MOCK_DOCUMENTS);
  const [filterType, setFilterType] = useState<string>('All');
  const [uploadSimulated, setUploadSimulated] = useState(false);

  const filteredDocs = documents.filter((d) =>
    filterType === 'All' ? true : d.type.includes(filterType) || d.status === filterType
  );

  const handleSimulateUpload = () => {
    setUploadSimulated(true);
    setTimeout(() => {
      setUploadSimulated(false);
    }, 1500);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              AI Trade Document & OCR Extraction Center
            </h2>
            <span className="code-badge">ORD-1024 Trade Dossier</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Automated entity parsing, multi-document discrepancy cross-matching & customs compliance pre-clearance
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSimulateUpload}
            className="btn-primary"
            style={{ fontSize: '0.78rem' }}
          >
            <Upload size={14} />
            <span>{uploadSimulated ? 'Extracting OCR Data...' : '+ Upload Trade Document'}</span>
          </button>
        </div>
      </div>

      {/* Discrepancy Alert Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        borderRadius: '14px',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid #f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <AlertTriangle size={22} color="#fbbf24" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fbbf24' }}>
                CRITICAL DISCREPANCY DETECTED: Packing List (PL-ABC-9821)
              </span>
              <span className="badge-warning">Human Action Required</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#fef3c7', margin: 0, lineHeight: 1.4 }}>
              OCR Extraction detected <strong>9,800 pcs (196 cartons)</strong> in Packing List vs <strong>10,000 pcs (200 cartons)</strong> on Commercial Invoice INV-ABC-9821. Variance: 200 pcs ($1,560 value). High customs inspection risk.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={() => onOpenOCRModal(documents[1])}
            className="btn-secondary"
            style={{ fontSize: '0.78rem' }}
          >
            <Eye size={14} />
            <span>Inspect OCR Scan</span>
          </button>
          <button
            onClick={onOpenHumanHandoff}
            className="btn-primary"
            style={{ fontSize: '0.78rem', background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' }}
          >
            <UserCheck size={14} />
            <span>Escalate to Human Approver</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '8px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Commercial Invoice', 'Packing List', 'Bill of Lading', 'Certificate of Origin', 'Needs Review'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: filterType === cat ? '#1e293b' : 'transparent',
                color: filterType === cat ? '#38bdf8' : '#94a3b8',
                fontSize: '0.78rem',
                fontWeight: filterType === cat ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
          Showing {filteredDocs.length} trade documents for ORD-1024
        </span>
      </div>

      {/* Documents Table */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
        <table className="trade-table">
          <thead>
            <tr>
              <th>Document Type & Number</th>
              <th>File Name</th>
              <th>Upload Date</th>
              <th>Status</th>
              <th>AI OCR Validation Summary</th>
              <th>Version</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc) => {
              const isWarning = doc.aiValidation.severity === 'warning';

              return (
                <tr
                  key={doc.id}
                  style={{
                    backgroundColor: isWarning ? 'rgba(245, 158, 11, 0.05)' : 'transparent'
                  }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        padding: '6px',
                        borderRadius: '6px',
                        backgroundColor: isWarning ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                        color: isWarning ? '#fbbf24' : '#818cf8'
                      }}>
                        <FileText size={16} />
                      </div>
                      <div>
                        <strong style={{ color: '#f8fafc', fontSize: '0.84rem' }}>{doc.type}</strong>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{doc.documentNumber}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{doc.fileName}</span>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{doc.uploadDate}</span>
                  </td>

                  <td>
                    <span className={isWarning ? 'badge-warning' : 'badge-success'}>
                      {doc.status}
                    </span>
                  </td>

                  <td>
                    <div style={{ fontSize: '0.74rem', color: isWarning ? '#fbbf24' : '#34d399', maxWidth: '320px', lineHeight: 1.3 }}>
                      {isWarning ? '⚠️ Quantity mismatch: 9,800 pcs (Expected: 10,000 pcs)' : '✓ All HS codes, quantities & terms verified'}
                    </div>
                  </td>

                  <td>
                    <span className="code-badge">v{doc.version}.0</span>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        onClick={() => onOpenOCRModal(doc)}
                        className="btn-secondary"
                        style={{ padding: '6px 10px', fontSize: '0.74rem' }}
                      >
                        <Eye size={13} />
                        <span>Inspect OCR</span>
                      </button>

                      <button
                        onClick={() => alert(`Downloading signed PDF: ${doc.fileName}`)}
                        className="btn-secondary"
                        style={{ padding: '6px 8px' }}
                        title="Download Document"
                      >
                        <Download size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
