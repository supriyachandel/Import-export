import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Layers,
  FileQuestion,
  HelpCircle,
  Clock,
  DollarSign,
  UserCheck,
  Building2,
  Ship,
  FileText
} from 'lucide-react';
import { ScreenType, AIMessage, Supplier } from '../../types';
import { SUPPLIERS } from '../../data/mockData';

interface AIAssistantScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenHumanHandoff: () => void;
  onRequestQuote: (supplier: Supplier) => void;
}

export const AIAssistantScreen: React.FC<AIAssistantScreenProps> = ({
  onNavigate,
  onOpenHumanHandoff,
  onRequestQuote
}) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      timestamp: '10:00 AM',
      text: 'Hello Sarah! I am TradeAI, your autonomous cross-border trade copilot. I can discover verified suppliers, structure RFQ technical specifications, compare quotation economics, audit trade document OCRs, and monitor ocean freight exceptions. How can I assist your supply chain today?',
      type: 'text'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    'Find suppliers for cotton shirts from India under $10',
    'What is the status of order ORD-1024?',
    'Audit documents for ORD-1024',
    'Compare landed cost: ABC Textiles vs Asia Cotton'
  ];

  const handleSendPrompt = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: AIMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: queryText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = queryText.toLowerCase();

      if (lower.includes('cotton') || lower.includes('supplier') || lower.includes('india') || lower.includes('shirt')) {
        const aiResponse: AIMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'I parsed your sourcing request and structured the technical requirements. Based on 10,000 units, target price <$10, and delivery in 45 days, I matched 3 top verified manufacturers in India and Vietnam:',
          type: 'structured_supplier_match',
          data: {
            structuredCriteria: {
              product: '100% Combed Cotton Shirts (180 GSM)',
              quantity: '10,000 units',
              targetPrice: '<$10.00 USD / pc',
              leadTime: '≤ 45 Days',
              destination: 'Port of Montreal, Canada'
            },
            suppliers: SUPPLIERS.slice(0, 3)
          }
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else if (lower.includes('ord-1024') || lower.includes('status') || lower.includes('order')) {
        const aiResponse: AIMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'Here is the real-time operational status for Order ORD-1024 with ABC Textiles Ltd.:',
          type: 'order_status',
          data: {
            orderNumber: 'ORD-1024',
            value: '$78,000 USD (10,000 units)',
            currentStage: 'Stage 4 of 5: In Ocean Transit',
            carrier: 'Maersk Line • Container MRKU-8492019',
            revisedEta: 'Nov 17, 2026 (2-day transshipment swell delay)',
            docStatus: '4 Approved, 1 Needs Review (Packing list 9.8k pcs discrepancy)',
            nextAction: 'Review Packing List discrepancy or send delay notice to customer.'
          },
          requiresHumanReview: true
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else if (lower.includes('audit') || lower.includes('document') || lower.includes('discrepancy')) {
        const aiResponse: AIMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: 'TradeAI OCR Document Integrity Audit completed for Order ORD-1024:',
          type: 'doc_warning',
          data: {
            flaggedDoc: 'Packing List (PL-ABC-9821)',
            issue: 'Quantity mismatch: PL states 9,800 units (196 cartons) vs Commercial Invoice INV-ABC-9821 stating 10,000 units (200 cartons).',
            variance: '4 Cartons (200 units / $1,560 value)',
            riskLevel: 'High Risk for Canadian Border Services Agency (CBSA) customs delay.',
            recommendation: 'Request amended Packing List from Rajesh Sharma (ABC Textiles) or issue approved variance waiver.'
          },
          requiresHumanReview: true
        };
        setMessages((prev) => [...prev, aiResponse]);
      } else {
        const aiResponse: AIMessage = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Economic Comparison Analysis:\n\n• ABC Textiles Ltd. (India): Quoted $7.80 FOB Mumbai. Total landed cost in Montreal is approx. $9.46/unit including ocean freight ($0.34) and 17% Canadian customs tariff ($1.32). Lead time: 35 days (Compliant with your 45-day deadline).\n\n• Asia Cotton Export (Vietnam): Quoted $7.20 FOB Haiphong. Total landed cost is approx. $7.68/unit (benefiting from CPTPP 0% tariff). However, lead time is 55 days (Exceeds your 45-day cutoff by 10 days).\n\nRecommendation: ABC Textiles provides optimal balance of on-time delivery and high ESG compliance (OEKO-TEX + GOTS).`,
          type: 'text'
        };
        setMessages((prev) => [...prev, aiResponse]);
      }
    }, 700);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 68px)',
      backgroundColor: '#0b0f19'
    }}>
      {/* Messages Scroll Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%'
      }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                flexDirection: isUser ? 'row-reverse' : 'row'
              }}
            >
              {/* Avatar */}
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: isUser
                  ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
                  : 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: isUser ? '0 0 12px rgba(79, 70, 229, 0.4)' : '0 0 16px rgba(6, 182, 212, 0.4)'
              }}>
                {isUser ? <User size={18} color="#ffffff" /> : <Sparkles size={18} color="#ffffff" />}
              </div>

              {/* Message Bubble Content */}
              <div style={{
                maxWidth: '82%',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: isUser ? 'flex-end' : 'flex-start'
                }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: isUser ? '#a5b4fc' : '#38bdf8' }}>
                    {isUser ? 'Sarah Jenkins (Buyer)' : 'TradeAI Copilot'}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#64748b' }}>{msg.timestamp}</span>
                </div>

                <div style={{
                  backgroundColor: isUser ? '#1e293b' : '#131b2c',
                  border: isUser ? '1px solid #334155' : '1px solid #24324d',
                  borderRadius: '14px',
                  padding: '16px',
                  color: '#f1f5f9',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
                }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.text}</p>

                  {/* Render Structured Supplier Matching Cards */}
                  {msg.type === 'structured_supplier_match' && msg.data && (
                    <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {/* Structured Requirement Pill Box */}
                      <div style={{
                        backgroundColor: '#0a0e17',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '8px',
                        fontSize: '0.75rem'
                      }}>
                        <div>
                          <span style={{ color: '#64748b' }}>Product: </span>
                          <strong style={{ color: '#e2e8f0' }}>{msg.data.structuredCriteria.product}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Quantity: </span>
                          <strong style={{ color: '#38bdf8' }}>{msg.data.structuredCriteria.quantity}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Target Price: </span>
                          <strong style={{ color: '#34d399' }}>{msg.data.structuredCriteria.targetPrice}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Lead Time: </span>
                          <strong style={{ color: '#fbbf24' }}>{msg.data.structuredCriteria.leadTime}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Destination: </span>
                          <strong style={{ color: '#e2e8f0' }}>{msg.data.structuredCriteria.destination}</strong>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#a5b4fc' }}>
                          <CheckCircle2 size={13} color="#34d399" />
                          <span>AI Auto-Structured</span>
                        </div>
                      </div>

                      {/* Matching Supplier Cards */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {msg.data.suppliers.map((sup: Supplier) => (
                          <div
                            key={sup.id}
                            style={{
                              backgroundColor: '#161f30',
                              border: sup.aiMatchScore >= 95 ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid #24324d',
                              borderRadius: '12px',
                              padding: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                              <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                                    {sup.name}
                                  </h4>
                                  <span className="badge-info">{sup.country}</span>
                                  {sup.verified && <span className="badge-success">✓ Verified Factory</span>}
                                </div>
                                <p style={{ fontSize: '0.74rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                                  {sup.city} • Capacity: {sup.capacityPerMonth} • MOQ: {sup.moq.toLocaleString()} pcs
                                </p>
                              </div>

                              <div style={{ textAlign: 'right' }}>
                                <div style={{
                                  fontSize: '1rem',
                                  fontWeight: 800,
                                  color: sup.aiMatchScore >= 95 ? '#34d399' : '#38bdf8'
                                }}>
                                  {sup.aiMatchScore}% Match
                                </div>
                                <span style={{ fontSize: '0.68rem', color: '#64748b' }}>AI Sourcing Index</span>
                              </div>
                            </div>

                            {/* Why this match explanation box */}
                            <div style={{
                              backgroundColor: '#0d1322',
                              borderRadius: '8px',
                              padding: '10px 12px',
                              border: '1px solid #1e293b'
                            }}>
                              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a5b4fc', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Sparkles size={12} />
                                <span>Why this match?</span>
                              </div>
                              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.74rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                                {sup.matchReasons.map((reason: string, rIdx: number) => (
                                  <li key={rIdx} style={{ color: reason.includes('⚠️') ? '#fbbf24' : '#cbd5e1' }}>
                                    {reason}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {sup.certifications.map((cert) => (
                                  <span key={cert} style={{ fontSize: '0.66rem', background: '#1e293b', color: '#94a3b8', padding: '2px 6px', borderRadius: '4px' }}>
                                    {cert}
                                  </span>
                                ))}
                              </div>

                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => onNavigate('supplier-profile')}
                                  className="btn-secondary"
                                  style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                                >
                                  <span>View Profile</span>
                                  <ExternalLink size={12} />
                                </button>
                                <button
                                  onClick={() => onRequestQuote(sup)}
                                  className="btn-primary"
                                  style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                                >
                                  <span>Request Quote</span>
                                  <ArrowRight size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Direct Next Step Shortcut */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '6px' }}>
                        <button
                          onClick={() => onNavigate('create-rfq')}
                          className="btn-ai"
                          style={{ fontSize: '0.8rem' }}
                        >
                          <span>Convert to Published RFQ (RFQ-2048)</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Render Order Status Card */}
                  {msg.type === 'order_status' && msg.data && (
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{
                        backgroundColor: '#0f172a',
                        border: '1px solid rgba(14, 165, 233, 0.3)',
                        borderRadius: '10px',
                        padding: '14px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
                            {msg.data.orderNumber} • {msg.data.value}
                          </span>
                          <span className="badge-info">{msg.data.currentStage}</span>
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div><strong>Carrier & Container:</strong> {msg.data.carrier}</div>
                          <div><strong>Revised ETA:</strong> <span style={{ color: '#fbbf24' }}>{msg.data.revisedEta}</span></div>
                          <div><strong>Document Verification:</strong> {msg.data.docStatus}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => onNavigate('orders')}
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                        >
                          View Order ORD-1024
                        </button>
                        <button
                          onClick={onOpenHumanHandoff}
                          className="btn-primary"
                          style={{ fontSize: '0.75rem', padding: '6px 12px', background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' }}
                        >
                          <UserCheck size={14} />
                          <span>Escalate to Human Desk</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Render Document Warning Card */}
                  {msg.type === 'doc_warning' && msg.data && (
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{
                        backgroundColor: 'rgba(244, 63, 94, 0.1)',
                        border: '1px solid rgba(244, 63, 94, 0.3)',
                        borderRadius: '10px',
                        padding: '14px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <AlertTriangle size={16} color="#fb7185" />
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fb7185' }}>
                            {msg.data.flaggedDoc} Discrepancy
                          </span>
                        </div>
                        <p style={{ fontSize: '0.76rem', color: '#f1f5f9', margin: '0 0 6px 0' }}>{msg.data.issue}</p>
                        <div style={{ fontSize: '0.72rem', color: '#fbbf24' }}>Variance: {msg.data.variance}</div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => onNavigate('documents')}
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                        >
                          Inspect Document OCR
                        </button>
                        <button
                          onClick={onOpenHumanHandoff}
                          className="btn-primary"
                          style={{ fontSize: '0.75rem', padding: '6px 12px', background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' }}
                        >
                          <UserCheck size={14} />
                          <span>Assign to Operations Lead</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color="#ffffff" className="animate-spin" />
            </div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>TradeAI is analyzing cross-border parameters...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompts Pills & Input Bar */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: '#0d1322',
        borderTop: '1px solid #1e293b'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Suggested Prompt Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, whiteSpace: 'nowrap' }}>
              SUGGESTIONS:
            </span>
            {suggestedPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendPrompt(prompt)}
                style={{
                  backgroundColor: '#161f30',
                  border: '1px solid #24324d',
                  borderRadius: '20px',
                  padding: '5px 12px',
                  color: '#cbd5e1',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#6366f1';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#24324d';
                  e.currentTarget.style.color = '#cbd5e1';
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(inputQuery);
            }}
            style={{ display: 'flex', gap: '10px' }}
          >
            <input
              type="text"
              placeholder="Ask anything about suppliers, RFQs, quotations, OCR documents or shipment exceptions..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="input-control"
              style={{ padding: '12px 18px', fontSize: '0.85rem' }}
            />
            <button
              type="submit"
              className="btn-ai"
              style={{ padding: '0 20px', flexShrink: 0 }}
            >
              <Send size={16} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
