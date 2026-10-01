import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  DollarSign,
  Calendar,
  Send,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Mail,
  FileText,
  UserCheck
} from 'lucide-react';
import { CRMLead, ScreenType } from '../../types';
import { MOCK_CRM_LEADS } from '../../data/mockData';

interface CRMLeadsScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const CRMLeadsScreen: React.FC<CRMLeadsScreenProps> = ({ onNavigate }) => {
  const [leads, setLeads] = useState<CRMLead[]>(MOCK_CRM_LEADS);
  const [selectedLead, setSelectedLead] = useState<CRMLead>(MOCK_CRM_LEADS[0]);
  const [viewMode, setViewMode] = useState<'pipeline' | 'table'>('pipeline');
  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);

  const stages = ['New', 'Qualified', 'Quotation', 'Negotiation', 'Won'];

  const handleGenerateDraft = (lead: CRMLead) => {
    setGeneratedDraft(
      `Hi ${lead.contactPerson.split(' ')[0]},\n\nFollowing up on our recent discussion regarding your organic cotton sourcing requirements. We have prepared an optimized quotation with tiered volume pricing that reflects your target delivery schedule to ${lead.country}.\n\nWould Thursday at 2:00 PM CET work for a brief 10-minute review?\n\nBest regards,\nSarah Jenkins\nGlobal Trade Sourcing Desk`
    );
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            CRM & Buyer Trade Leads
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Manage commercial inbound inquiries, AI intent scoring & automated follow-up drafts
          </p>
        </div>

        {/* View Toggle */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #24324d',
          borderRadius: '8px',
          padding: '3px',
          display: 'flex'
        }}>
          <button
            onClick={() => setViewMode('pipeline')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: viewMode === 'pipeline' ? '#4f46e5' : 'transparent',
              color: viewMode === 'pipeline' ? '#ffffff' : '#94a3b8',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Kanban Pipeline
          </button>
          <button
            onClick={() => setViewMode('table')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: viewMode === 'table' ? '#4f46e5' : 'transparent',
              color: viewMode === 'table' ? '#ffffff' : '#94a3b8',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Lead Directory
          </button>
        </div>
      </div>

      {/* Kanban Pipeline View */}
      {viewMode === 'pipeline' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '14px',
          minHeight: '480px'
        }}>
          {stages.map((stage) => {
            const stageLeads = leads.filter((l) => l.stage === stage);
            const totalStageValue = stageLeads.reduce((sum, l) => sum + l.dealValue, 0);

            return (
              <div
                key={stage}
                style={{
                  backgroundColor: '#111827',
                  border: '1px solid #1e293b',
                  borderRadius: '14px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#f8fafc' }}>{stage}</strong>
                    <span style={{ fontSize: '0.7rem', background: '#1e293b', color: '#38bdf8', padding: '1px 6px', borderRadius: '4px' }}>
                      {stageLeads.length}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>
                    ${(totalStageValue / 1000).toFixed(0)}k
                  </span>
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        handleGenerateDraft(lead);
                      }}
                      style={{
                        backgroundColor: selectedLead.id === lead.id ? 'rgba(99, 102, 241, 0.15)' : '#161f30',
                        border: selectedLead.id === lead.id ? '1px solid #6366f1' : '1px solid #24324d',
                        borderRadius: '10px',
                        padding: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <strong style={{ fontSize: '0.84rem', color: '#f8fafc' }}>{lead.companyName}</strong>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: lead.aiScore >= 90 ? '#34d399' : '#38bdf8' }}>
                          {lead.aiScore}%
                        </span>
                      </div>

                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        {lead.contactPerson} • {lead.country}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem' }}>
                        <span style={{ color: '#34d399', fontWeight: 700 }}>${lead.dealValue.toLocaleString()}</span>
                        <span style={{ color: '#64748b' }}>Next: {lead.nextFollowUpDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' }}>
          <table className="trade-table">
            <thead>
              <tr>
                <th>Company & Contact</th>
                <th>Country</th>
                <th>Stage</th>
                <th>Deal Value</th>
                <th>AI Score</th>
                <th>Next Follow-Up</th>
                <th style={{ textAlign: 'right' }}>Owner</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} onClick={() => setSelectedLead(lead)} style={{ cursor: 'pointer' }}>
                  <td>
                    <strong>{lead.companyName}</strong>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{lead.contactPerson} ({lead.email})</div>
                  </td>
                  <td>{lead.country}</td>
                  <td><span className="badge-info">{lead.stage}</span></td>
                  <td><strong style={{ color: '#34d399' }}>${lead.dealValue.toLocaleString()}</strong></td>
                  <td><strong style={{ color: lead.aiScore >= 90 ? '#34d399' : '#38bdf8' }}>{lead.aiScore}%</strong></td>
                  <td>{lead.nextFollowUpDate}</td>
                  <td style={{ textAlign: 'right' }}>{lead.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Selected Lead AI Assistant & Draft Panel */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1.2fr',
        gap: '24px'
      }}>
        {/* Left: AI Intent & Deal Insights */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              AI Sourcing Intent Analysis: {selectedLead.companyName}
            </h3>
            <span className="badge-success">AI Match Score: {selectedLead.aiScore}/100</span>
          </div>

          <div style={{
            backgroundColor: '#0d1322',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
              {selectedLead.aiInsights}
            </p>

            <div style={{
              marginTop: '8px',
              paddingTop: '10px',
              borderTop: '1px solid #1e293b',
              fontSize: '0.76rem',
              color: '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Sparkles size={14} />
              <span><strong>Recommended Action:</strong> {selectedLead.recommendedAction}</span>
            </div>
          </div>
        </div>

        {/* Right: AI-Generated Follow-up Draft */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
              AI Automated Follow-Up Email Draft
            </h3>
            <button
              onClick={() => handleGenerateDraft(selectedLead)}
              className="btn-secondary"
              style={{ fontSize: '0.72rem', padding: '4px 8px' }}
            >
              Regenerate
            </button>
          </div>

          <textarea
            value={generatedDraft || `Click 'Generate Draft' or select a lead to craft an AI follow-up note.`}
            onChange={(e) => setGeneratedDraft(e.target.value)}
            rows={6}
            className="input-control"
            style={{ fontSize: '0.78rem', lineHeight: 1.45, resize: 'none' }}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={() => alert(`Email transmitted to ${selectedLead.email}!`)}
              className="btn-primary"
              style={{ fontSize: '0.78rem', padding: '7px 14px' }}
            >
              <Send size={13} />
              <span>Send Follow-Up Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
