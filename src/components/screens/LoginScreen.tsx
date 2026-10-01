import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Shield,
  CheckCircle2,
  Lock,
  Mail,
  Building2,
  Globe,
  Ship,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { ScreenType, UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('s.jenkins@globaltradeimports.ca');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin('buyer');
    onNavigate('dashboard');
  };

  const handleQuickDemo = (role: UserRole) => {
    onLogin(role);
    onNavigate('dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#070b14',
      display: 'flex',
      flexDirection: 'column',
      backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)'
    }}>
      {/* Top Navbar */}
      <div style={{
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #1e293b'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Trade<span style={{ color: '#38bdf8' }}>AI</span>
            </span>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginLeft: '8px' }}>
              Enterprise B2B Import–Export Operating System
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Client Presentation Mode</span>
          <span className="badge-info">Demo v2.4</span>
        </div>
      </div>

      {/* Main Container */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        padding: '40px 24px',
        alignItems: 'center',
        gap: '60px'
      }}>
        {/* Left Column: Value Proposition & AI Capabilities */}
        <div>
          <div className="ai-pill" style={{ marginBottom: '16px' }}>
            <Sparkles size={13} />
            <span>Autonomous Cross-Border Trade Infrastructure</span>
          </div>

          <h2 style={{
            fontSize: '2.4rem',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#f8fafc',
            marginBottom: '16px',
            letterSpacing: '-0.03em'
          }}>
            The AI-First Operating System for <span className="ai-gradient-text">Global Trade</span>
          </h2>

          <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '28px' }}>
            Unify supplier discovery, intelligent RFQ structuring, quotation comparative analytics, OCR trade documents, and real-time logistics monitoring in one connected platform.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '32px' }}>
            <div style={{
              backgroundColor: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <Cpu size={20} color="#38bdf8" style={{ marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9' }}>AI Trade Copilot</h4>
                <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>Natural language requirement extraction & supplier matching.</p>
              </div>
            </div>

            <div style={{
              backgroundColor: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <Shield size={20} color="#34d399" style={{ marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9' }}>OCR & Discrepancy Audits</h4>
                <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>Instant cross-validation between invoices & packing lists.</p>
              </div>
            </div>

            <div style={{
              backgroundColor: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <TrendingUp size={20} color="#fbbf24" style={{ marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9' }}>Landed Cost Analytics</h4>
                <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>Automated tariffs, freight & lead-time comparison.</p>
              </div>
            </div>

            <div style={{
              backgroundColor: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <Ship size={20} color="#818cf8" style={{ marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f1f5f9' }}>Proactive Logistics Alerts</h4>
                <p style={{ fontSize: '0.74rem', color: '#64748b', margin: 0 }}>Vessel weather alerts & automated customer updates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Enterprise Login Card & 1-Click Role Access */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #24324d',
          borderRadius: '18px',
          padding: '32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          position: 'relative'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
              Sign in to TradeAI Enterprise
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Select a persona or enter enterprise credentials to explore the interactive prototype.
            </p>
          </div>

          {/* Quick Demo Access Bar */}
          <div style={{
            backgroundColor: '#0b0f19',
            border: '1px solid #24324d',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={12} />
              <span>1-CLICK DEMO PERSONA ACCESS (RECOMMENDED)</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => handleQuickDemo('buyer')}
                style={{
                  padding: '9px 12px',
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ color: '#818cf8', fontWeight: 700 }}>Importer / Buyer</div>
                  <div style={{ fontSize: '0.66rem', color: '#94a3b8' }}>Global Trade Imports</div>
                </div>
                <ArrowRight size={14} color="#818cf8" />
              </button>

              <button
                onClick={() => handleQuickDemo('supplier')}
                style={{
                  padding: '9px 12px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ color: '#34d399', fontWeight: 700 }}>Exporter / Supplier</div>
                  <div style={{ fontSize: '0.66rem', color: '#94a3b8' }}>ABC Textiles Ltd.</div>
                </div>
                <ArrowRight size={14} color="#34d399" />
              </button>

              <button
                onClick={() => handleQuickDemo('operations')}
                style={{
                  padding: '9px 12px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ color: '#fbbf24', fontWeight: 700 }}>Operations Desk</div>
                  <div style={{ fontSize: '0.66rem', color: '#94a3b8' }}>Logistics & Docs</div>
                </div>
                <ArrowRight size={14} color="#fbbf24" />
              </button>

              <button
                onClick={() => handleQuickDemo('admin')}
                style={{
                  padding: '9px 12px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ color: '#c084fc', fontWeight: 700 }}>Super Admin</div>
                  <div style={{ fontSize: '0.66rem', color: '#94a3b8' }}>Compliance & HITL</div>
                </div>
                <ArrowRight size={14} color="#c084fc" />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#24324d' }} />
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>OR ENTERPRISE SSO</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#24324d' }} />
          </div>

          {/* Standard Form */}
          <form onSubmit={handleCustomLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                Work Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-control"
                  style={{ paddingLeft: '36px' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-control"
                  style={{ paddingLeft: '36px' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#6366f1' }}
                />
                Remember this device
              </label>
              <a href="#" style={{ color: '#38bdf8', textDecoration: 'none' }} onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '12px', marginTop: '6px', fontSize: '0.9rem' }}
            >
              <span>Launch TradeAI Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{
        padding: '16px 40px',
        borderTop: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: '#64748b'
      }}>
        <div>TradeAI Operating System • Prototype Release for Demonstration</div>
        <div>SOC2 Type II • ISO 27001 Certified Infrastructure • CBSA / CBP Ready</div>
      </div>
    </div>
  );
};
