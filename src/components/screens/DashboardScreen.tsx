import React from 'react';
import {
  Compass,
  Building2,
  Users,
  Bookmark,
  Globe,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Clock,
  ShieldCheck,
  ChevronRight,
  Search
} from 'lucide-react';
import { ScreenType } from '../../types';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* AI Trade Scout Hero Pulse Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(6, 182, 212, 0.18) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        borderRadius: '16px',
        padding: '24px 28px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
            }}>
              <Sparkles size={26} color="#ffffff" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="ai-pill">AI Trade Scout • Milestone 1</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Active Exporter Discovery Engine</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px 0' }}>
                Who should you sell to next in East Africa & Middle East?
              </h2>
              <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0, maxWidth: '820px' }}>
                Trade Scout analyzes global customs manifests, company trade registries, and import recurrence to discover, qualify, and deliver high-intent distributor prospects for your manufactured products.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('trade-scout')}
            className="btn-ai"
            style={{ padding: '12px 24px', fontSize: '0.9rem', flexShrink: 0 }}
          >
            <Compass size={18} />
            <span>Start New Trade Research</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 5 Core Trade Scout KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
        {/* Researches Completed */}
        <div
          onClick={() => onNavigate('research-history')}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>Researches Completed</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <Compass size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>24</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#38bdf8' }}>
            <span>Across 8 Target Markets</span>
          </div>
        </div>

        {/* Companies Analyzed */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>Companies Analyzed</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8' }}>
              <Building2 size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>18,420</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#34d399' }}>
            <ArrowUpRight size={13} />
            <span>Customs & Registry Data</span>
          </div>
        </div>

        {/* Qualified Prospects */}
        <div
          onClick={() => onNavigate('trade-scout')}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>Qualified Prospects</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
              <ShieldCheck size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#34d399', lineHeight: 1 }}>186</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#38bdf8' }}>
            <span>Verified Distributors</span>
          </div>
        </div>

        {/* Saved Leads */}
        <div
          onClick={() => onNavigate('saved-leads')}
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>Saved Leads</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
              <Bookmark size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>42</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#cbd5e1' }}>
            <span>Ready for Outreach</span>
          </div>
        </div>

        {/* Target Markets */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#94a3b8' }}>Markets Researched</span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }}>
              <Globe size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>8</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '0.72rem', color: '#94a3b8' }}>
            <span>East Africa & GCC</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Research Sessions & 5 AI Modules Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.1fr', gap: '20px' }}>
        {/* Left: Recent Research Sessions */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Recent Market Research Sessions
              </h3>
            </div>
            <button
              onClick={() => onNavigate('research-history')}
              className="btn-secondary"
              style={{ fontSize: '0.74rem', padding: '5px 10px' }}
            >
              View All (24)
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Session 1 */}
            <div
              onClick={() => onNavigate('trade-scout')}
              style={{
                backgroundColor: '#161f30',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#f8fafc' }}>Commercial Refrigeration Equipment</strong>
                  <span className="badge-info">Kenya</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                  1,284 analyzed • <span style={{ color: '#34d399', fontWeight: 700 }}>12 qualified prospects found</span>
                </div>
              </div>

              <button className="btn-primary" style={{ fontSize: '0.74rem', padding: '6px 12px' }}>
                <span>Inspect Prospects</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* Session 2 */}
            <div
              onClick={() => onNavigate('trade-scout')}
              style={{
                backgroundColor: '#161f30',
                border: '1px solid #24324d',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#f8fafc' }}>Industrial Cooling Systems</strong>
                  <span className="badge-info">Tanzania</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                  940 analyzed • <span style={{ color: '#34d399', fontWeight: 700 }}>8 qualified prospects found</span>
                </div>
              </div>

              <button className="btn-secondary" style={{ fontSize: '0.74rem', padding: '6px 12px' }}>
                <span>View Results</span>
              </button>
            </div>

            {/* Session 3 */}
            <div
              onClick={() => onNavigate('trade-scout')}
              style={{
                backgroundColor: '#161f30',
                border: '1px solid #24324d',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#f8fafc' }}>HVAC Equipment & Chillers</strong>
                  <span className="badge-info">UAE</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
                  2,450 analyzed • <span style={{ color: '#34d399', fontWeight: 700 }}>15 qualified prospects found</span>
                </div>
              </div>

              <button className="btn-secondary" style={{ fontSize: '0.74rem', padding: '6px 12px' }}>
                <span>View Results</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Specialized AI Research Modules Info */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#38bdf8" />
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              AI Research Intelligence Engine
            </h3>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0 }}>
            5 specialized modules collaborate autonomously during each market research session:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'Market Scout', desc: 'Discovers active commercial importers across customs databases.' },
              { name: 'Company Researcher', desc: 'Analyzes business models, product fit, and import frequency.' },
              { name: 'Contact Scout', desc: 'Identifies verified procurement heads and commercial directors.' },
              { name: 'Verification Scout', desc: 'Checks business registry status and flags information requiring review.' },
              { name: 'Analyst Copilot', desc: 'Explains qualification reasons and answers contextual research questions.' }
            ].map((m, idx) => (
              <div key={idx} style={{ backgroundColor: '#161f30', border: '1px solid #24324d', borderRadius: '8px', padding: '10px 12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>{m.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
