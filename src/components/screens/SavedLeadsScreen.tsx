import React, { useState } from 'react';
import {
  Bookmark,
  Search,
  Filter,
  Download,
  Mail,
  Send,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight,
  Plus
} from 'lucide-react';
import { SavedLead, ScreenType } from '../../types';

interface SavedLeadsScreenProps {
  savedLeads: SavedLead[];
  onNavigate: (screen: ScreenType) => void;
  onUpdateLeadStatus: (id: string, status: SavedLead['status']) => void;
}

export const SavedLeadsScreen: React.FC<SavedLeadsScreenProps> = ({
  savedLeads,
  onNavigate,
  onUpdateLeadStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredLeads = savedLeads.filter((lead) => {
    const matchesSearch =
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Saved Trade Leads
            </h2>
            <span className="badge-success">{savedLeads.length} Qualified Leads</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Curated export prospects saved from AI Trade Scout research sessions ready for commercial outreach
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onNavigate('trade-scout')}
            className="btn-primary"
            style={{ fontSize: '0.78rem' }}
          >
            <Plus size={14} />
            <span>Discover More Leads (Trade Scout)</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '10px' }} />
          <input
            type="text"
            placeholder="Search company, contact person..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-control"
            style={{ paddingLeft: '34px', fontSize: '0.8rem', padding: '6px 12px 6px 34px' }}
          />
        </div>

        {/* Status Filters */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['All', 'Qualified', 'New', 'Interested', 'Follow-up'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: statusFilter === st ? '#1e293b' : 'transparent',
                color: statusFilter === st ? '#38bdf8' : '#94a3b8',
                fontSize: '0.75rem',
                fontWeight: statusFilter === st ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
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
              <th style={{ width: '24%' }}>Company & Country</th>
              <th style={{ width: '20%' }}>Key Procurement Contact</th>
              <th style={{ width: '13%' }}>Status</th>
              <th style={{ width: '25%' }}>AI Qualification Reason</th>
              <th style={{ width: '18%', textAlign: 'right' }}>Next Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <div>
                    <strong style={{ fontSize: '0.86rem', color: '#f8fafc' }}>{lead.company}</strong>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      {lead.country} • <span style={{ color: '#38bdf8' }}>{lead.product}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <div>
                    <strong style={{ fontSize: '0.82rem', color: '#f1f5f9' }}>{lead.contactName}</strong>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{lead.contactRole}</div>
                  </div>
                </td>

                <td>
                  <select
                    value={lead.status}
                    onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                    className="input-control"
                    style={{
                      width: '120px',
                      padding: '4px 8px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      backgroundColor: '#161f30',
                      color: '#34d399'
                    }}
                  >
                    <option value="Qualified">Qualified</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Not Relevant">Not Relevant</option>
                  </select>
                </td>

                <td>
                  <div style={{ fontSize: '0.74rem', color: '#cbd5e1', lineHeight: 1.35 }}>
                    {lead.aiReason}
                  </div>
                </td>

                <td style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 600 }}>
                    {lead.nextAction}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
