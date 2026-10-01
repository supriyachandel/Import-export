import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Lock,
  FileText,
  Sliders,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { HITLTask, ScreenType } from '../../types';
import { MOCK_HITL_TASKS, DEMO_USERS } from '../../data/mockData';

interface AdminOperationsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenDocOCRModal?: () => void;
  onOpenShipmentUpdateModal?: () => void;
}

export const AdminOperationsScreen: React.FC<AdminOperationsScreenProps> = ({
  onNavigate,
  onOpenDocOCRModal,
  onOpenShipmentUpdateModal
}) => {
  const [activeTab, setActiveTab] = useState<'hitl' | 'verification' | 'roles' | 'audit'>('hitl');
  const [tasks, setTasks] = useState<HITLTask[]>(MOCK_HITL_TASKS);

  const handleResolveTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'Resolved' } : t))
    );
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Admin & Operations Governance Control Center
            </h2>
            <span className="badge-warning">Human-In-The-Loop Desk Active</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Enterprise oversight, exception triage queue, factory compliance verification & security audit trail
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #1e293b',
        gap: '24px'
      }}>
        {[
          { id: 'hitl', label: 'HITL Exception Triage Queue (2 Pending)' },
          { id: 'verification', label: 'Supplier & Buyer Verification (1)' },
          { id: 'roles', label: 'Roles & RBAC Permissions' },
          { id: 'audit', label: 'Security & Action Audit Logs' }
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

      {/* HITL Exception Triage Queue */}
      {activeTab === 'hitl' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Sparkles size={20} color="#38bdf8" />
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
              <strong>Human-In-The-Loop Protocol:</strong> AI automates standard 91.4% trade flows and proactively routes sensitive threshold discrepancies, customs deviations, and weather impacts to specialized human trade officers.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tasks.map((task) => {
              const isPending = task.status === 'Pending Action';
              const isCritical = task.severity === 'high' || task.severity === 'critical';

              return (
                <div
                  key={task.id}
                  style={{
                    backgroundColor: '#111827',
                    border: isPending && isCritical ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid #1e293b',
                    borderRadius: '14px',
                    padding: '18px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={task.severity === 'high' ? 'badge-danger' : task.severity === 'medium' ? 'badge-warning' : 'badge-info'}>
                        {task.type}
                      </span>
                      <strong style={{ fontSize: '0.92rem', color: '#f8fafc' }}>{task.title}</strong>
                      <span className="code-badge">{task.referenceId}</span>
                    </div>

                    <span className={isPending ? 'badge-warning' : 'badge-success'}>
                      {task.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
                    {task.description}
                  </p>

                  <div style={{
                    backgroundColor: '#0d1322',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    color: '#a5b4fc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Sparkles size={13} color="#38bdf8" />
                    <span><strong>AI Recommendation:</strong> {task.aiSuggestion}</span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Assigned to: {task.assignedRole} • {task.timestamp}
                    </span>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {task.type === 'Document Discrepancy' && (
                        <button
                          onClick={() => {
                            onNavigate('documents');
                            if (onOpenDocOCRModal) onOpenDocOCRModal();
                          }}
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                        >
                          Inspect Document
                        </button>
                      )}

                      {task.type === 'Shipment Escalation' && (
                        <button
                          onClick={() => {
                            onNavigate('shipments');
                            if (onOpenShipmentUpdateModal) onOpenShipmentUpdateModal();
                          }}
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                        >
                          Send Customer Update
                        </button>
                      )}

                      {isPending && (
                        <button
                          onClick={() => handleResolveTask(task.id)}
                          className="btn-primary"
                          style={{ fontSize: '0.75rem', padding: '6px 14px' }}
                        >
                          <CheckCircle2 size={14} />
                          <span>Approve & Resolve</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Supplier & Buyer Verification */}
      {activeTab === 'verification' && (
        <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' }}>
          <table className="trade-table">
            <thead>
              <tr>
                <th>Entity Name</th>
                <th>Type</th>
                <th>Country</th>
                <th>Documents Submitted</th>
                <th>AI Vision Audit</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Prime Garments India</strong>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Surat, Gujarat, India</div>
                </td>
                <td><span className="badge-info">Supplier</span></td>
                <td>India</td>
                <td>GOTS Scope Renewal + WRAP Audit 2026</td>
                <td><span className="badge-success">✓ Passed (99.2% Conf)</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button onClick={() => alert('Supplier Verified Badge Renewed!')} className="btn-primary" style={{ fontSize: '0.72rem', padding: '5px 10px' }}>
                    Verify Entity
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Roles & RBAC */}
      {activeTab === 'roles' && (
        <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px' }}>
            Enterprise Role-Based Access Control (RBAC)
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {DEMO_USERS.map((u) => (
              <div key={u.id} style={{ backgroundColor: '#161f30', border: '1px solid #24324d', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <img src={u.avatar} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f8fafc' }}>{u.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{u.company}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 600, textTransform: 'capitalize' }}>
                  Role: {u.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Log */}
      {activeTab === 'audit' && (
        <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '16px', overflow: 'hidden' }}>
          <table className="trade-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Event Type</th>
                <th>Target Reference</th>
                <th>Security Hash</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2026-10-01 09:18:22</td>
                <td>AI Vision Engine</td>
                <td>OCR Extraction Flag</td>
                <td>ORD-1024 / PL-ABC-9821</td>
                <td><span className="code-badge">0x8f9a2b...</span></td>
              </tr>
              <tr>
                <td>2026-09-29 14:10:05</td>
                <td>Sarah Jenkins (Buyer)</td>
                <td>Quotation Acceptance</td>
                <td>RFQ-2048 / QUO-ABC-9821</td>
                <td><span className="code-badge">0x3c71de...</span></td>
              </tr>
              <tr>
                <td>2026-09-28 11:30:19</td>
                <td>Sarah Jenkins (Buyer)</td>
                <td>RFQ Dispatch</td>
                <td>RFQ-2048 (10,000 units)</td>
                <td><span className="code-badge">0x918aa4...</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
