import React, { useState } from 'react';
import {
  ShieldAlert,
  UserCheck,
  Send,
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  History,
  FileText
} from 'lucide-react';

interface HumanHandoffModalProps {
  isOpen: boolean;
  onClose: () => void;
  contextTitle?: string;
  contextReference?: string;
  suggestedRole?: string;
  defaultReason?: string;
  onEscalateSuccess?: () => void;
}

export const HumanHandoffModal: React.FC<HumanHandoffModalProps> = ({
  isOpen,
  onClose,
  contextTitle = 'Packing List Quantity Discrepancy (ORD-1024)',
  contextReference = 'PL-ABC-9821 vs INV-ABC-9821',
  suggestedRole = 'Operations Specialist / Trade Lead',
  defaultReason = 'AI OCR detected a 200-unit discrepancy ($1,560 value) between the Packing List (9,800 units) and Commercial Invoice (10,000 units). High-risk customs inspection threshold exceeded.',
  onEscalateSuccess
}) => {
  const [assignedOfficer, setAssignedOfficer] = useState('Marcus Vance (Operations Lead)');
  const [priority, setPriority] = useState<'high' | 'critical' | 'medium'>('high');
  const [customNote, setCustomNote] = useState('');
  const [escalated, setEscalated] = useState(false);

  if (!isOpen) return null;

  const handleEscalate = () => {
    setEscalated(true);
    setTimeout(() => {
      setEscalated(false);
      if (onEscalateSuccess) onEscalateSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#161f30',
        border: '1px solid #334155',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '560px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        overflow: 'hidden',
        animation: 'slideUp 0.25s ease'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #24324d',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(244, 63, 94, 0.15) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(244, 63, 94, 0.2)',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldAlert size={20} color="#fb7185" />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                Escalate to Human Trade Specialist
              </h3>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
                Human-In-The-Loop Governance Protocol
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* AI Context Card */}
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #24324d',
            borderRadius: '10px',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
                AI EXCEPTION CONTEXT
              </span>
              <span style={{ fontSize: '0.7rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                Requires Approval
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '4px' }}>
              {contextTitle}
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4, margin: 0 }}>
              {defaultReason}
            </p>
          </div>

          {/* Form Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Assignee
              </label>
              <select
                value={assignedOfficer}
                onChange={(e) => setAssignedOfficer(e.target.value)}
                className="input-control"
              >
                <option>Marcus Vance (Operations Lead)</option>
                <option>Elena Rostova (Compliance Desk)</option>
                <option>David Wright (Logistics Manager)</option>
                <option>Sarah Jenkins (Buyer Lead)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="input-control"
              >
                <option value="high">High (4h SLA)</option>
                <option value="critical">Critical (Immediate SLA)</option>
                <option value="medium">Medium (24h SLA)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
              Handoff Note & Recommended Action
            </label>
            <textarea
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Request amended packing list from supplier Rajesh Sharma or obtain buyer waiver for 9,800 units with $1,560 invoice credit..."
              rows={3}
              className="input-control"
              style={{ resize: 'none' }}
            />
          </div>

          {/* AI Bundle Package Checklist */}
          <div style={{
            fontSize: '0.74rem',
            color: '#94a3b8',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99, 102, 241, 0.08)',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            <Sparkles size={14} color="#818cf8" />
            <span>AI will automatically package conversation history, document diffs, and supplier contact details.</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #24324d',
          backgroundColor: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleEscalate}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
              borderColor: 'rgba(244, 63, 94, 0.4)'
            }}
          >
            {escalated ? (
              <>
                <CheckCircle2 size={16} />
                <span>Escalated to Specialist!</span>
              </>
            ) : (
              <>
                <UserCheck size={16} />
                <span>Confirm Handoff</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
