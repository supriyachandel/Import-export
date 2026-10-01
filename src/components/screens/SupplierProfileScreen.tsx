import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Star,
  Globe,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Send,
  MessageSquare,
  Bookmark,
  FileText,
  Award,
  ArrowLeft,
  Truck,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Supplier, ScreenType } from '../../types';
import { SUPPLIERS } from '../../data/mockData';

interface SupplierProfileScreenProps {
  supplier?: Supplier;
  onNavigate: (screen: ScreenType) => void;
  onRequestQuote: (supplier: Supplier) => void;
}

export const SupplierProfileScreen: React.FC<SupplierProfileScreenProps> = ({
  supplier = SUPPLIERS[0],
  onNavigate,
  onRequestQuote
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'audits' | 'history'>('overview');
  const [shortlisted, setShortlisted] = useState(true);
  const [messageOpen, setMessageOpen] = useState(false);
  const [msgInput, setMsgInput] = useState('');
  const [messagesList, setMessagesList] = useState<{ sender: string; text: string; time: string }[]>([
    { sender: 'Rajesh Sharma (ABC Textiles)', text: 'Hello Sarah! We have received your preliminary requirement for 10,000 combed cotton shirts. Our knit lab in Tirupur has yarn ready for immediate 180 GSM batch spin.', time: 'Yesterday' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setMessagesList((prev) => [...prev, { sender: 'Sarah Jenkins', text: msgInput, time: 'Just now' }]);
    setMsgInput('');
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => onNavigate('marketplace')}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.78rem' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Marketplace</span>
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShortlisted(!shortlisted)}
            className="btn-secondary"
            style={{ fontSize: '0.78rem' }}
          >
            <Bookmark size={14} fill={shortlisted ? '#38bdf8' : 'none'} color={shortlisted ? '#38bdf8' : '#94a3b8'} />
            <span>{shortlisted ? 'Shortlisted' : 'Add to Shortlist'}</span>
          </button>

          <button
            onClick={() => onRequestQuote(supplier)}
            className="btn-primary"
            style={{ fontSize: '0.78rem' }}
          >
            <Send size={14} />
            <span>Request Official Quote</span>
          </button>
        </div>
      </div>

      {/* Main Profile Header Banner */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '14px',
              backgroundColor: '#1e293b',
              border: '2px solid #334155',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#38bdf8'
            }}>
              ABC
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  {supplier.name}
                </h2>
                <span className="badge-success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={13} /> AI-Audited Tier-1 Manufacturer
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                {supplier.city}, {supplier.country} • Established {supplier.establishedYear} • Business Reg #IN33AAACF4921K1Z9
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              backgroundColor: '#0d1322',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              borderRadius: '10px',
              padding: '10px 16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>{supplier.aiMatchScore}%</div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>AI Match Score</div>
            </div>

            <div style={{
              backgroundColor: '#0d1322',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              padding: '10px 16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fbbf24' }}>{supplier.rating} ★</div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>128 Audited Orders</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #1e293b',
          gap: '24px',
          marginTop: '8px'
        }}>
          {[
            { id: 'overview', label: 'Company Overview & Specs' },
            { id: 'catalog', label: 'Product Catalog (3 Lines)' },
            { id: 'audits', label: 'Certifications & ESG Audits (4)' },
            { id: 'history', label: 'Past Transaction & Export History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                padding: '10px 0',
                color: activeTab === tab.id ? '#38bdf8' : '#94a3b8',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
          {/* Left Column: Bio & Core Specs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              backgroundColor: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '14px',
              padding: '20px'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
                Manufacturer Overview
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                {supplier.overview}
              </p>

              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid #1e293b',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '0.78rem'
              }}>
                <div>
                  <span style={{ color: '#64748b' }}>Monthly Export Capacity:</span>
                  <div style={{ fontWeight: 700, color: '#f8fafc' }}>{supplier.capacityPerMonth}</div>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>Standard Production Lead Time:</span>
                  <div style={{ fontWeight: 700, color: '#fbbf24' }}>{supplier.leadTimeDays} Days</div>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>Minimum Order Quantity (MOQ):</span>
                  <div style={{ fontWeight: 700, color: '#f8fafc' }}>{supplier.moq.toLocaleString()} pcs</div>
                </div>
                <div>
                  <span style={{ color: '#64748b' }}>Typical Price Band:</span>
                  <div style={{ fontWeight: 700, color: '#34d399' }}>{supplier.priceRange} / pc</div>
                </div>
              </div>
            </div>

            {/* Countries Served */}
            <div style={{
              backgroundColor: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '14px',
              padding: '20px'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
                Primary Export Destinations & Trade Lanes
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {supplier.countriesServed.map((c) => (
                  <span key={c} style={{
                    backgroundColor: '#161f30',
                    border: '1px solid #24324d',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    color: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Globe size={13} color="#38bdf8" />
                    <span>{c}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Messaging & Key Contacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              backgroundColor: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '14px',
              padding: '20px'
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
                Trade Contact & Factory Lead
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#ffffff' }}>
                  RS
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>Rajesh Sharma</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Managing Director of International Exports</div>
                </div>
              </div>

              {/* In-app Message Thread */}
              <div style={{
                backgroundColor: '#0b0f19',
                border: '1px solid #24324d',
                borderRadius: '10px',
                padding: '12px',
                maxHeight: '160px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '10px'
              }}>
                {messagesList.map((m, idx) => (
                  <div key={idx} style={{ fontSize: '0.74rem', color: '#cbd5e1' }}>
                    <strong style={{ color: '#38bdf8' }}>{m.sender}:</strong> {m.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder="Message supplier regarding sample batch..."
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  className="input-control"
                  style={{ fontSize: '0.78rem', padding: '8px 12px' }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0 12px' }}>
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'catalog' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' }}>
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80"
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
            />
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 4px 0' }}>
              180 GSM Ring-Spun Combed Cotton Shirt
            </h4>
            <div style={{ fontSize: '0.76rem', color: '#34d399', fontWeight: 700 }}>$7.80 USD • MOQ: 2,000 pcs</div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' }}>
            <img
              src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80"
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
            />
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 4px 0' }}>
              Organic Jersey Cotton Crewneck
            </h4>
            <div style={{ fontSize: '0.76rem', color: '#34d399', fontWeight: 700 }}>$7.20 USD • MOQ: 3,000 pcs</div>
          </div>

          <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' }}>
            <img
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=80"
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
            />
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 4px 0' }}>
              Corporate Oxford Button Down (Custom Woven)
            </h4>
            <div style={{ fontSize: '0.76rem', color: '#34d399', fontWeight: 700 }}>$8.50 USD • MOQ: 1,500 pcs</div>
          </div>
        </div>
      )}

      {activeTab === 'audits' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {[
            { name: 'OEKO-TEX Standard 100', num: 'Cert #IN-84920', status: 'Active (Expires Dec 2027)', desc: 'Tested for harmful chemicals, safe for skin contact.' },
            { name: 'GOTS Organic Cotton', num: 'Scope #CU-837194', status: 'Active (Expires Oct 2027)', desc: '100% certified organic raw material tracing.' },
            { name: 'ISO 9001:2015 Quality Mgmt', num: 'Reg #9001-IND-44', status: 'Audit Score 98.4%', desc: 'Standard operating cutting, sewing & inspection protocols.' },
            { name: 'Sedex SMETA 4-Pillar Social Audit', num: 'Sedex #S849201', status: 'Pass - Zero Non-conformances', desc: 'Labor standards, health & safety, environment and business ethics.' }
          ].map((c) => (
            <div key={c.name} style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>{c.name}</h4>
                <span className="badge-success">Verified</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#38bdf8', marginBottom: '4px' }}>{c.num} • {c.status}</div>
              <p style={{ fontSize: '0.74rem', color: '#94a3b8', margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'history' && (
        <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '14px' }}>
            Verified Past Export Shipments (Demo Ledger)
          </h3>
          <table className="trade-table">
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Destination</th>
                <th>Units</th>
                <th>Value</th>
                <th>On-Time Delivery</th>
                <th>CBSA Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ORD-1024</td>
                <td>Port of Montreal, Canada</td>
                <td>10,000 pcs</td>
                <td>$78,000 USD</td>
                <td><span className="badge-info">In Transit (Nov 17)</span></td>
                <td><span className="badge-success">Pre-Cleared</span></td>
              </tr>
              <tr>
                <td>ORD-0872</td>
                <td>Hamburg, Germany</td>
                <td>25,000 pcs</td>
                <td>$187,500 USD</td>
                <td><span className="badge-success">100% On-Time</span></td>
                <td><span className="badge-success">Cleared</span></td>
              </tr>
              <tr>
                <td>ORD-0711</td>
                <td>New York (JFK), USA</td>
                <td>5,000 pcs</td>
                <td>$41,000 USD</td>
                <td><span className="badge-success">100% On-Time</span></td>
                <td><span className="badge-success">Cleared</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
