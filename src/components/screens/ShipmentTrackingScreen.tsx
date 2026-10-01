import React, { useState } from 'react';
import {
  Ship,
  MapPin,
  Clock,
  AlertTriangle,
  Send,
  Sparkles,
  CheckCircle2,
  Anchor,
  Compass,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Container
} from 'lucide-react';
import { Shipment, ScreenType } from '../../types';
import { MOCK_SHIPMENTS } from '../../data/mockData';

interface ShipmentTrackingScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenCustomerUpdateModal: () => void;
}

export const ShipmentTrackingScreen: React.FC<ShipmentTrackingScreenProps> = ({
  onNavigate,
  onOpenCustomerUpdateModal
}) => {
  const [selectedShipment, setSelectedShipment] = useState<Shipment>(MOCK_SHIPMENTS[0]);

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Live Ocean Freight Tracker: {selectedShipment.shipmentNumber}
            </h2>
            <span className="badge-info">In Ocean Transit</span>
            <span className="badge-neutral">SIMULATED AIS TELEMETRY</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
            Order: {selectedShipment.orderNumber} • Carrier: {selectedShipment.carrier} • Container #{selectedShipment.containerNumber}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onOpenCustomerUpdateModal}
            className="btn-ai"
            style={{ fontSize: '0.78rem' }}
          >
            <Send size={14} />
            <span>Send AI Customer Delay Advisory</span>
          </button>
        </div>
      </div>

      {/* Weather Swell Exception Advisory Banner */}
      {selectedShipment.hasException && selectedShipment.exceptionDetails && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          borderRadius: '14px',
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid #f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertTriangle size={22} color="#fbbf24" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fbbf24' }}>
                  {selectedShipment.exceptionDetails.type}
                </span>
                <span className="badge-warning">2 Days Variance</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#fef3c7', margin: 0, lineHeight: 1.4 }}>
                {selectedShipment.exceptionDetails.message}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCustomerUpdateModal}
            className="btn-primary"
            style={{ fontSize: '0.78rem', flexShrink: 0 }}
          >
            <Send size={14} />
            <span>Dispatch Notice to Importer</span>
          </button>
        </div>
      )}

      {/* Main Grid: Visual Route Map Mockup & Milestones */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.1fr', gap: '20px' }}>
        {/* Left: Interactive Simulated Geographic Route Card */}
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
              <Compass size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                Ocean Transit Corridor (Nhava Sheva → Montreal)
              </h3>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>
              Voyage 48% Completed
            </span>
          </div>

          {/* Visual Route Graphic Simulation */}
          <div style={{
            backgroundColor: '#0a0e17',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '24px',
            height: '240px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.08) 0%, transparent 70%)'
          }}>
            {/* Origin Node */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Port of Nhava Sheva (INNSA)</strong>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Departed: Oct 12, 2026</div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', color: '#f8fafc', fontWeight: 700 }}>Port of Montreal (CAMTR)</div>
                <div style={{ fontSize: '0.7rem', color: '#fbbf24' }}>Revised ETA: Nov 17, 2026</div>
              </div>
            </div>

            {/* Simulated Vessel Mid-Voyage Position */}
            <div style={{
              backgroundColor: 'rgba(30, 41, 67, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              borderRadius: '10px',
              padding: '12px 16px',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Ship size={24} color="#38bdf8" />
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
                    {selectedShipment.vesselName}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    Speed: 18.4 knots • Heading: 285° WNW • Position: Mediterranean Approach
                  </div>
                </div>
              </div>

              <span className="badge-info">AIS Beacon Active</span>
            </div>

            {/* Container specs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
              <span>Container: 40ft High Cube (MRKU-8492019)</span>
              <span>Consignment: 10,000 Cotton Shirts (2,450 kg)</span>
            </div>
          </div>

          {/* AI Logistics Analysis Summary */}
          <div style={{
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '10px',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Sparkles size={14} color="#38bdf8" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e0e7ff' }}>
                AI Proactive Logistics Assessment
              </span>
            </div>
            <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
              Despite the 2-day transshipment delay, total transit time remains within acceptable seasonal limits. Customs e-Manifest is pre-filed with CBSA. Next status trigger: Cast Terminal gating in Montreal.
            </p>
          </div>
        </div>

        {/* Right: Milestone Timeline Checklist */}
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
            Physical & Customs Checkpoints
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {selectedShipment.milestones.map((ms, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: ms.completed ? 'rgba(16, 185, 129, 0.2)' : ms.current ? 'rgba(56, 189, 248, 0.2)' : '#1e293b',
                  color: ms.completed ? '#34d399' : ms.current ? '#38bdf8' : '#64748b',
                  border: `1px solid ${ms.completed ? '#10b981' : ms.current ? '#38bdf8' : '#334155'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  flexShrink: 0
                }}>
                  {ms.completed ? '✓' : idx + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: ms.current ? '#38bdf8' : '#f8fafc', margin: 0 }}>
                      {ms.name}
                    </h4>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>{ms.location}</div>
                  <div style={{ fontSize: '0.7rem', color: ms.current ? '#fbbf24' : '#64748b', marginTop: '2px' }}>{ms.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
