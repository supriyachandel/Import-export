import React, { useState } from 'react';
import {
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  DollarSign,
  TrendingDown,
  ShieldCheck,
  Building2,
  FileText,
  ArrowRight,
  ExternalLink,
  Info,
  Check,
  RotateCcw
} from 'lucide-react';
import { Quotation, ScreenType } from '../../types';
import { MOCK_QUOTATIONS } from '../../data/mockData';

interface QuotationComparisonScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOrderCreated?: () => void;
}

export const QuotationComparisonScreen: React.FC<QuotationComparisonScreenProps> = ({
  onNavigate,
  onOrderCreated
}) => {
  const [quotations, setQuotations] = useState<Quotation[]>(MOCK_QUOTATIONS);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>('quote-1');
  const [orderCreatedModal, setOrderCreatedModal] = useState(false);

  const selectedQuote = quotations.find((q) => q.id === selectedQuoteId) || quotations[0];

  const handleAcceptQuote = (quote: Quotation) => {
    setSelectedQuoteId(quote.id);
    setOrderCreatedModal(true);
  };

  const handleProceedToOrder = () => {
    setOrderCreatedModal(false);
    if (onOrderCreated) onOrderCreated();
    onNavigate('orders');
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              AI Quotation Comparative Matrix
            </h2>
            <span className="code-badge">RFQ-2048 • 10,000 Cotton Shirts</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Automated financial breakdown, incoterm normalization, landed cost drivers & delivery risk indexing
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onNavigate('rfqs')}
            className="btn-secondary"
            style={{ fontSize: '0.78rem' }}
          >
            <span>Back to RFQs</span>
          </button>
        </div>
      </div>

      {/* AI Comparative Insights Overview Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        borderRadius: '14px',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px'
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Sparkles size={22} color="#ffffff" />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e0e7ff' }}>
              AI Executive Quotation Recommendation
            </span>
            <span className="badge-success">Top Candidate: ABC Textiles Ltd. (Score 96/100)</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
            <strong>ABC Textiles ($7.80/unit)</strong> complies fully with your 45-day deadline (35-day lead time) and provides OEKO-TEX + GOTS certifications. While <strong>Asia Cotton ($7.20/unit)</strong> offers lower raw pricing, its 55-day lead time exceeds your deadline cutoff by 10 days.
          </p>
        </div>
      </div>

      {/* Comparative Matrix Table */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <table className="trade-table">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Supplier & Origin</th>
              <th style={{ width: '13%' }}>Unit & Total Price</th>
              <th style={{ width: '11%' }}>MOQ</th>
              <th style={{ width: '12%' }}>Lead Time</th>
              <th style={{ width: '14%' }}>Incoterm</th>
              <th style={{ width: '14%' }}>Payment Terms</th>
              <th style={{ width: '14%', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q) => {
              const isSelected = selectedQuoteId === q.id;
              const hasLeadTimeIssue = q.leadTimeDays > 45;
              const isTop = q.aiScore >= 95;

              return (
                <tr
                  key={q.id}
                  style={{
                    backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
                  }}
                >
                  {/* Supplier Info */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        backgroundColor: isTop ? '#4f46e5' : '#1e293b',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        flexShrink: 0
                      }}>
                        {q.supplierName.substring(0, 2)}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ color: '#f8fafc', fontSize: '0.85rem' }}>{q.supplierName}</strong>
                          {isTop && <span className="badge-success">AI Match 96%</span>}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{q.supplierCountry} • Quote: {q.quoteNumber}</div>
                        {q.aiAnalysis.missingInfo && q.aiAnalysis.missingInfo.length > 0 && (
                          <div style={{ fontSize: '0.68rem', color: '#fbbf24', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <AlertTriangle size={11} />
                            <span>Missing: {q.aiAnalysis.missingInfo[0]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#34d399' }}>
                      ${q.unitPrice.toFixed(2)} USD
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Total: ${q.totalCost.toLocaleString()} USD
                    </div>
                  </td>

                  {/* MOQ */}
                  <td>
                    <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{q.moq.toLocaleString()} pcs</span>
                  </td>

                  {/* Lead Time */}
                  <td>
                    <div style={{
                      fontWeight: 700,
                      color: hasLeadTimeIssue ? '#fb7185' : '#34d399',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Clock size={13} />
                      <span>{q.leadTimeDays} Days</span>
                    </div>
                    {hasLeadTimeIssue && (
                      <span style={{ fontSize: '0.66rem', color: '#fb7185' }}>⚠️ Exceeds 45-day limit</span>
                    )}
                  </td>

                  {/* Incoterm */}
                  <td>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0' }}>
                      {q.shippingTerms}
                    </div>
                  </td>

                  {/* Payment */}
                  <td>
                    <div style={{ fontSize: '0.74rem', color: '#cbd5e1', lineHeight: 1.3 }}>
                      {q.paymentTerms}
                    </div>
                  </td>

                  {/* Action */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        onClick={() => setSelectedQuoteId(q.id)}
                        className="btn-secondary"
                        style={{ padding: '6px 10px', fontSize: '0.74rem' }}
                      >
                        Breakdown
                      </button>

                      <button
                        onClick={() => handleAcceptQuote(q)}
                        className="btn-primary"
                        style={{
                          padding: '6px 12px',
                          fontSize: '0.74rem',
                          background: isTop ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : undefined
                        }}
                      >
                        <Check size={13} />
                        <span>Accept & Order</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Deep-Dive AI Landed Cost & Risk Evaluation for Selected Quotation */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '24px'
      }}>
        {/* Left: Financial & Landed Cost Breakdown */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              Landed Cost & Tariff Simulation: {selectedQuote.supplierName}
            </h3>
            <span className="badge-neutral">{selectedQuote.shippingTerms}</span>
          </div>

          <div style={{
            backgroundColor: '#0d1322',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            fontSize: '0.8rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Base FOB / CIF Unit Price:</span>
              <strong style={{ color: '#f8fafc' }}>${selectedQuote.unitPrice.toFixed(2)} USD</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Est. Ocean Freight & Port Handling:</span>
              <strong style={{ color: '#38bdf8' }}>+$0.34 USD / unit</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Canadian Customs Tariff (HS 6109.10 - 17%):</span>
              <strong style={{ color: '#fbbf24' }}>+$1.32 USD / unit</strong>
            </div>

            <div style={{ borderTop: '1px solid #24324d', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ fontWeight: 700, color: '#ffffff' }}>Est. Total Landed Cost (Montreal):</span>
              <strong style={{ color: '#34d399', fontSize: '1rem' }}>
                ${(selectedQuote.unitPrice + 0.34 + 1.32).toFixed(2)} USD / pc
              </strong>
            </div>
          </div>

          <p style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '8px' }}>
            *Estimated based on current CBSA HS Code tariff schedules and standard 40ft container freight rates.
          </p>
        </div>

        {/* Right: AI Pros, Cons & Risk Evaluation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              AI Risk & Compliance Assessment
            </h3>
            <span className={selectedQuote.aiAnalysis.riskScore === 'Low' ? 'badge-success' : 'badge-warning'}>
              Risk Score: {selectedQuote.aiAnalysis.riskScore}
            </span>
          </div>

          {/* Pros */}
          <div style={{ backgroundColor: '#161f30', borderRadius: '10px', padding: '12px', border: '1px solid #24324d' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', marginBottom: '4px' }}>
              Key Commercial Advantages:
            </div>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.4 }}>
              {selectedQuote.aiAnalysis.pros.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          {selectedQuote.aiAnalysis.cons.length > 0 && (
            <div style={{ backgroundColor: '#161f30', borderRadius: '10px', padding: '12px', border: '1px solid #24324d' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fb7185', marginBottom: '4px' }}>
                Commercial Trade-Offs / Risks:
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                {selectedQuote.aiAnalysis.cons.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Order Creation Confirmation */}
      {orderCreatedModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.75)',
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
            padding: '28px',
            maxWidth: '520px',
            width: '100%',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            animation: 'slideUp 0.25s ease'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={26} color="#34d399" />
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 4px 0' }}>
                Confirm Order ORD-1024 Execution
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                You are accepting the quotation from <strong>{selectedQuote.supplierName}</strong> for 10,000 units.
              </p>
            </div>

            <div style={{
              backgroundColor: '#0d1322',
              border: '1px solid #24324d',
              borderRadius: '10px',
              padding: '14px',
              fontSize: '0.78rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Order Value:</span>
                <strong style={{ color: '#34d399' }}>${selectedQuote.totalCost.toLocaleString()} USD</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Payment Terms:</span>
                <span style={{ color: '#e2e8f0' }}>30% Advance ($23,400) + 70% against B/L</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Delivery Port:</span>
                <span style={{ color: '#38bdf8' }}>Port of Montreal (FOB Mumbai)</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '8px' }}>
              <button
                onClick={() => setOrderCreatedModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleProceedToOrder}
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
              >
                <span>Confirm & Generate Order ORD-1024</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
