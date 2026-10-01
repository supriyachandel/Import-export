import React, { useState } from 'react';
import {
  Compass,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  ListOrdered,
  X
} from 'lucide-react';
import { TRADE_SCOUT_TOUR_STEPS } from '../../data/tradeScoutData';
import { ScreenType } from '../../types';

interface DemoTourBannerProps {
  currentStepIndex: number;
  onSelectStep: (stepIndex: number) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const DemoTourBanner: React.FC<DemoTourBannerProps> = ({
  currentStepIndex,
  onSelectStep,
  onNavigate
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const step = TRADE_SCOUT_TOUR_STEPS[currentStepIndex] || TRADE_SCOUT_TOUR_STEPS[0];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === TRADE_SCOUT_TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (!isLast) {
      const nextIdx = currentStepIndex + 1;
      onSelectStep(nextIdx);
      onNavigate(TRADE_SCOUT_TOUR_STEPS[nextIdx].screen);
    } else {
      onSelectStep(0);
      onNavigate(TRADE_SCOUT_TOUR_STEPS[0].screen);
    }
  };

  const handlePrev = () => {
    if (!isFirst) {
      const prevIdx = currentStepIndex - 1;
      onSelectStep(prevIdx);
      onNavigate(TRADE_SCOUT_TOUR_STEPS[prevIdx].screen);
    }
  };

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '24px',
          zIndex: 90,
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '30px',
          padding: '10px 18px',
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 700,
          fontSize: '0.85rem'
        }}
      >
        <Sparkles size={16} />
        <span>Trade Scout Demo Guide (Step {step.stepNumber}/{TRADE_SCOUT_TOUR_STEPS.length})</span>
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '18px',
      left: '280px',
      right: '24px',
      zIndex: 90,
      background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.96) 0%, rgba(15, 23, 42, 0.98) 100%)',
      border: '1px solid rgba(99, 102, 241, 0.4)',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.2)',
      backdropFilter: 'blur(16px)',
      borderRadius: '14px',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }}>
      {/* Left: Step indicator and explanation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '0.9rem',
          color: '#ffffff',
          flexShrink: 0
        }}>
          {step.stepNumber}
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 700,
              color: '#38bdf8'
            }}>
              AI Trade Scout Walkthrough ({step.stepNumber}/{TRADE_SCOUT_TOUR_STEPS.length})
            </span>
            <span style={{ fontSize: '0.68rem', color: '#64748b' }}>•</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#a5b4fc' }}>
              Target: {step.title}
            </span>
          </div>
          <p style={{
            fontSize: '0.8rem',
            color: '#e2e8f0',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {step.description} <strong style={{ color: '#38bdf8' }}>→ {step.actionText}</strong>
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        {/* Step Dropdown Menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              padding: '7px 12px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#cbd5e1',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ListOrdered size={14} />
            <span>Jump to Step</span>
          </button>

          {menuOpen && (
            <div style={{
              position: 'absolute',
              bottom: '48px',
              right: 0,
              width: '320px',
              maxHeight: '380px',
              overflowY: 'auto',
              backgroundColor: '#161f30',
              border: '1px solid #334155',
              borderRadius: '12px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
              padding: '8px',
              zIndex: 100
            }}>
              <div style={{ padding: '6px 10px', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                <span>TRADE SCOUT MILESTONE 1 DEMO</span>
                <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <X size={13} />
                </button>
              </div>

              {TRADE_SCOUT_TOUR_STEPS.map((s, idx) => (
                <button
                  key={s.stepNumber}
                  onClick={() => {
                    onSelectStep(idx);
                    onNavigate(s.screen);
                    setMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    textAlign: 'left',
                    backgroundColor: currentStepIndex === idx ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                    color: currentStepIndex === idx ? '#38bdf8' : '#e2e8f0',
                    fontSize: '0.76rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '2px'
                  }}
                >
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    background: currentStepIndex === idx ? '#4f46e5' : '#1e293b',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {s.stepNumber}
                  </span>
                  <div style={{ minWidth: 0, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <div style={{ fontWeight: currentStepIndex === idx ? 700 : 500 }}>{s.title}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={isFirst}
          style={{
            padding: '7px 12px',
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: isFirst ? '#475569' : '#cbd5e1',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: isFirst ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <ChevronLeft size={14} />
          <span>Back</span>
        </button>

        {/* Next / Primary Action Button */}
        <button
          onClick={handleNext}
          style={{
            padding: '8px 16px',
            background: isLast ? 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' : 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#ffffff',
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)'
          }}
        >
          <span>{isLast ? 'Restart Journey' : 'Next Step'}</span>
          {isLast ? <RotateCcw size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Minimize Button */}
        <button
          onClick={() => setCollapsed(true)}
          title="Minimize Demo Guide"
          style={{
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
