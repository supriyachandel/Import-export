import React from 'react';
import {
  Clock,
  Search,
  Sparkles,
  ArrowRight,
  Globe,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Layers
} from 'lucide-react';
import { ResearchSession, ScreenType } from '../../types';
import { MOCK_RESEARCH_SESSIONS } from '../../data/tradeScoutData';

interface ResearchHistoryScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenSession: (session: ResearchSession) => void;
}

export const ResearchHistoryScreen: React.FC<ResearchHistoryScreenProps> = ({
  onNavigate,
  onOpenSession
}) => {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              AI Trade Research History
            </h2>
            <span className="badge-info">24 Completed Market Researches</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Archive of previous market discovery sessions across customs manifests, trade directories, and buyer shortlists
          </p>
        </div>

        <button
          onClick={() => onNavigate('trade-scout')}
          className="btn-primary"
          style={{ fontSize: '0.78rem' }}
        >
          <Compass size={14} />
          <span>Launch New Market Scout</span>
        </button>
      </div>

      {/* Sessions Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '18px' }}>
        {MOCK_RESEARCH_SESSIONS.map((session) => (
          <div
            key={session.id}
            style={{
              backgroundColor: '#111827',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Globe size={15} color="#38bdf8" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>
                    {session.targetMarket}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  {session.product}
                </h3>
              </div>
              <span className="badge-success">Completed</span>
            </div>

            {/* Goal */}
            <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
              {session.researchGoal}
            </p>

            {/* Metrics */}
            <div style={{
              backgroundColor: '#0d1322',
              border: '1px solid #1e293b',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '8px',
              fontSize: '0.74rem'
            }}>
              <div>
                <div style={{ color: '#64748b' }}>Analyzed:</div>
                <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{session.companiesAnalyzed.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ color: '#64748b' }}>Matched:</div>
                <div style={{ fontWeight: 700, color: '#38bdf8' }}>{session.matchedCount}</div>
              </div>
              <div>
                <div style={{ color: '#64748b' }}>Shortlist:</div>
                <div style={{ fontWeight: 700, color: '#34d399' }}>{session.shortlistedCount} Qualified</div>
              </div>
            </div>

            {/* Action */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{session.createdAt}</span>

              <button
                onClick={() => {
                  onOpenSession(session);
                  onNavigate('trade-scout');
                }}
                className="btn-primary"
                style={{ fontSize: '0.76rem', padding: '6px 14px' }}
              >
                <span>Reopen Research</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
