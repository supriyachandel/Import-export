import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  CheckCircle2,
  X,
  Ship,
  Clock,
  Mail,
  Copy,
  AlertCircle
} from 'lucide-react';

interface AICustomerUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipmentNumber?: string;
  orderNumber?: string;
  onSentSuccess?: () => void;
}

export const AICustomerUpdateModal: React.FC<AICustomerUpdateModalProps> = ({
  isOpen,
  onClose,
  shipmentNumber = 'SHIP-2048',
  orderNumber = 'ORD-1024',
  onSentSuccess
}) => {
  const [recipient, setRecipient] = useState('receiving@globaltradeimports.ca, s.jenkins@globaltradeimports.ca');
  const [subject, setSubject] = useState(`[TradeAI Advisory] Shipment Update for Order ${orderNumber} (Container #MRKU-8492019)`);
  const [messageBody, setMessageBody] = useState(
    `Dear Global Trade Imports Team,\n\nPlease be advised that Container MRKU-8492019 for Order ORD-1024 (10,000 Units Premium Cotton Shirts) is currently en route via Maersk Line.\n\nDue to adverse swell conditions at the Mediterranean transshipment hub (Port of Tangier), the revised estimated vessel arrival at the Port of Montreal is November 17, 2026 (2-day variance from original ETA).\n\nTradeAI Pre-Clearance Status:\n• Commercial Invoice & Certificate of Origin verified for CBSA e-Manifest.\n• Customs broker pre-notified.\n\nWe will continue tracking this consignment and notify you immediately upon port gating.\n\nBest regards,\nTradeAI Autonomous Logistics Desk\nRef: ${shipmentNumber}`
  );
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        if (onSentSuccess) onSentSuccess();
        onClose();
      }, 1000);
    }, 900);
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
        maxWidth: '620px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        overflow: 'hidden',
        animation: 'slideUp 0.25s ease'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #24324d',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={18} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                AI-Prepared Customer Shipment Notice
              </h3>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
                Instant transparent stakeholder communication
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

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
              Recipients
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="input-control"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="input-control"
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <label style={{ fontSize: '0.74rem', fontWeight: 600, color: '#cbd5e1' }}>
                AI-Generated Message Body
              </label>
              <span style={{ fontSize: '0.7rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} /> Auto-Formatted
              </span>
            </div>
            <textarea
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              rows={8}
              className="input-control"
              style={{ resize: 'vertical', fontSize: '0.8rem', lineHeight: 1.45, fontFamily: 'inherit' }}
            />
          </div>

          <div style={{
            fontSize: '0.74rem',
            color: '#94a3b8',
            backgroundColor: '#0f172a',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #24324d',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={14} color="#38bdf8" />
            <span>Sending will log this communication in CRM Lead & Order timeline automatically.</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          borderTop: '1px solid #24324d',
          backgroundColor: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '12px'
        }}>
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isSending}
            className="btn-ai"
          >
            {sent ? (
              <>
                <CheckCircle2 size={16} color="#ffffff" />
                <span>Notice Dispatched!</span>
              </>
            ) : isSending ? (
              <span>Transmitting...</span>
            ) : (
              <>
                <Send size={15} />
                <span>Send Customer Update</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
