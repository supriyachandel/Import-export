import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Globe,
  Bot,
  Calendar,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { ScreenType } from '../../types';

interface AnalyticsScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ onNavigate }) => {
  const [dateRange, setDateRange] = useState('Last 90 Days');

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            Trade Intelligence & Operations Analytics
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Executive visibility on RFQ conversion funnels, landed cost performance, logistics SLA & AI automation rates
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-control"
            style={{ width: '160px', padding: '7px 12px', fontSize: '0.78rem' }}
          >
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Year-to-Date (2026)</option>
            <option>All Time</option>
          </select>

          <button
            onClick={() => alert('Exporting complete executive PDF report & CSV dataset...')}
            className="btn-secondary"
            style={{ fontSize: '0.78rem' }}
          >
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px' }}>
          <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Total Sourcing Turnover</span>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0' }}>$1,420,000</div>
          <div style={{ fontSize: '0.72rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowUpRight size={13} /> +18.4% YoY Growth
          </div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px' }}>
          <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Quotation Conversion Funnel</span>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#38bdf8', margin: '4px 0' }}>68.2%</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Avg response turnaround: 22 hrs</div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '18px' }}>
          <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>On-Time Ocean Delivery SLA</span>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#fbbf24', margin: '4px 0' }}>96.1%</div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Avg port dwell: 1.8 days</div>
        </div>

        <div style={{ backgroundColor: '#111827', border: '1px solid rgba(99, 102, 241, 0.4)', borderRadius: '12px', padding: '18px' }}>
          <span style={{ fontSize: '0.74rem', color: '#a5b4fc', fontWeight: 600 }}>AI Autonomous Trade Processing</span>
          <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#34d399', margin: '4px 0' }}>91.4%</div>
          <div style={{ fontSize: '0.72rem', color: '#38bdf8' }}>8.6% Human-In-The-Loop Escalation</div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr', gap: '20px' }}>
        {/* RFQ Sourcing Conversion Funnel */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
            RFQ Sourcing Conversion Funnel
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: '1. Sourcing Requirements Published', count: 48, pct: '100%', color: '#6366f1' },
              { label: '2. Supplier Quotations Received', count: 42, pct: '87.5%', color: '#38bdf8' },
              { label: '3. Comparative Matrices Approved', count: 36, pct: '75.0%', color: '#34d399' },
              { label: '4. Confirmed Production Orders', count: 31, pct: '64.5%', color: '#10b981' }
            ].map((f) => (
              <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem' }}>
                  <span style={{ color: '#cbd5e1' }}>{f.label}</span>
                  <strong style={{ color: '#ffffff' }}>{f.count} ({f.pct})</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#0d1322', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: f.pct, height: '100%', backgroundColor: f.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade Flow Volume by Country */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
            Sourcing Volume by Manufacturing Hub
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { country: 'India (Apparel, Organic Cotton, Knits)', val: '$680,000', share: '48%', color: '#6366f1' },
              { country: 'Vietnam (Sports Apparel, Synthetic Blends)', val: '$380,000', share: '27%', color: '#38bdf8' },
              { country: 'Turkey (Pima Cotton, Luxury Wovens)', val: '$240,000', share: '17%', color: '#fbbf24' },
              { country: 'Bangladesh (High-Volume Basics)', val: '$120,000', share: '8%', color: '#34d399' }
            ].map((c) => (
              <div key={c.country} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem' }}>
                  <span style={{ color: '#cbd5e1' }}>{c.country}</span>
                  <strong style={{ color: '#ffffff' }}>{c.val} ({c.share})</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: '#0d1322', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: c.share, height: '100%', backgroundColor: c.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
