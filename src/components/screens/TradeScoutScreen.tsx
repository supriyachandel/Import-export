import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  Search,
  Globe,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Filter,
  Bookmark,
  ChevronRight,
  RefreshCw,
  Clock,
  Layers,
  HelpCircle,
  Eye,
  Check,
  Mail,
  Phone,
  FileText,
  UserCheck,
  Bot,
  Send,
  X,
  Plus
} from 'lucide-react';
import { ProspectCompany, ProspectContact, ScreenType } from '../../types';
import {
  KENYA_REFRIGERATION_PROSPECTS,
  TRADE_SCOUT_MODULES
} from '../../data/tradeScoutData';

interface TradeScoutScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSaveLead: (prospect: ProspectCompany, contact?: ProspectContact) => void;
  savedCompanyIds: string[];
}

export const TradeScoutScreen: React.FC<TradeScoutScreenProps> = ({
  onNavigate,
  onSaveLead,
  savedCompanyIds
}) => {
  // Mode: 'input' | 'researching' | 'results'
  const [viewState, setViewState] = useState<'input' | 'researching' | 'results'>('results');

  // Input Fields
  const [productInput, setProductInput] = useState('Commercial Refrigeration Equipment');
  const [targetMarketInput, setTargetMarketInput] = useState('Kenya');
  const [researchGoalInput, setResearchGoalInput] = useState(
    'Find distributors and companies actively importing commercial refrigeration equipment.'
  );
  const [companyTypeFilter, setCompanyTypeFilter] = useState('All Types');
  const [importFrequencyFilter, setImportFrequencyFilter] = useState('All');
  const [sourcingCountryFilter, setSourcingCountryFilter] = useState('All');
  const [relevanceFilter, setRelevanceFilter] = useState('All');

  // Research Animation Stages
  const [researchProgress, setResearchProgress] = useState(0);
  const [currentResearchStepIdx, setCurrentResearchStepIdx] = useState(0);
  const [analyzedCount, setAnalyzedCount] = useState(0);

  // Selected Company for Deep Research Drawer
  const [selectedCompany, setSelectedCompany] = useState<ProspectCompany | null>(null);
  const [contactScoutActive, setContactScoutActive] = useState(false);
  const [contactScoutDone, setContactScoutDone] = useState(true);

  // Global "Why these companies?" Modal
  const [whyTheseModalOpen, setWhyTheseModalOpen] = useState(false);

  // Contextual AI Follow-up Chat on Results Page
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'assistant'; text: string; time: string; highlightIds?: string[] }[]>([
    {
      sender: 'assistant',
      text: 'I have researched the Kenyan commercial refrigeration market across customs manifests, trade directories, and company registries. I analyzed 1,284 entities and shortlisted 12 qualified distributor prospects. You can ask me questions about specific companies, import frequencies, key purchasing contacts, or market fit.',
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [highlightedCompanyIds, setHighlightedCompanyIds] = useState<string[]>([]);

  const examplePrompts = [
    { product: 'Commercial Refrigeration Equipment', market: 'Kenya', goal: 'Find distributors for commercial refrigeration equipment in Kenya' },
    { product: 'Industrial Refrigeration Systems', market: 'Tanzania', goal: 'Find importers of industrial refrigeration systems in Tanzania' },
    { product: 'HVAC Equipment & Chillers', market: 'United Arab Emirates (UAE)', goal: 'Find companies buying HVAC equipment in UAE' },
    { product: 'Supermarket Display Freezers', market: 'South Africa', goal: 'Find potential distributors for my products in South Africa' }
  ];

  const researchWorkflowStages = [
    { title: 'Understanding product category & trade nomenclature', msg: 'Analyzing commercial refrigeration, display chillers & condensing equipment...' },
    { title: 'Identifying relevant HS trade classifications', msg: 'Targeting HS 8418.50, HS 8418.69, HS 8418.99 trade lines...' },
    { title: 'Searching regional customs import manifests', msg: 'Scanning Port of Mombasa bills of lading & KRA trade digests...' },
    { title: 'Discovering potential commercial importers', msg: 'Discovered 1,284 company entity records...' },
    { title: 'Analyzing business models & product relevance', msg: 'Filtering distributors, wholesale stockists & contractors...' },
    { title: 'Checking recurring import activity & frequency', msg: 'Validating active import shipments within past 12-24 months...' },
    { title: 'Researching technical distributor profiles', msg: 'Checking warehouse footprint, client network & cold chain capabilities...' },
    { title: 'Identifying verified procurement contacts', msg: 'Searching decision-makers in technical sourcing & commercial ops...' },
    { title: 'Auditing verification signals & business registries', msg: 'Checking tax PINS, company registration & KAM association records...' },
    { title: 'Ranking prospects & preparing recommendations', msg: 'Synthesizing top 12 qualified trade prospects...' }
  ];

  // Run simulated research workflow
  const startResearch = () => {
    setViewState('researching');
    setResearchProgress(0);
    setCurrentResearchStepIdx(0);
    setAnalyzedCount(0);
    setHighlightedCompanyIds([]);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setCurrentResearchStepIdx(step);
      setResearchProgress(Math.min(step * 10, 100));
      setAnalyzedCount(Math.min(Math.round(step * 128.4), 1284));

      if (step >= 10) {
        clearInterval(interval);
        setTimeout(() => {
          setViewState('results');
        }, 500);
      }
    }, 450);
  };

  // Filtered Prospects
  const filteredProspects = KENYA_REFRIGERATION_PROSPECTS.filter((p) => {
    const matchesCompanyType = companyTypeFilter === 'All Types' || p.companyType === companyTypeFilter;
    const matchesFrequency = importFrequencyFilter === 'All' || p.importFrequency.includes(importFrequencyFilter);
    const matchesSourcing = sourcingCountryFilter === 'All' || p.sourcingCountries.includes(sourcingCountryFilter);
    const matchesRelevance = relevanceFilter === 'All' || p.productRelevance === relevanceFilter;
    return matchesCompanyType && matchesFrequency && matchesSourcing && matchesRelevance;
  });

  // Handle Contextual AI Assistant Query
  const handleSendChat = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: queryText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const lower = queryText.toLowerCase();
      let replyText = '';
      let highlightIds: string[] = [];

      if (lower.includes('why') && (lower.includes('these') || lower.includes('select') || lower.includes('3') || lower.includes('top'))) {
        replyText =
          'I selected the top 3 companies (AfriCool Logistics, Nairobi Cold Storage, and Equator Refrigeration) because they show the strongest combination of:\n1. Recurring monthly import activity (30+ ocean containers on record)\n2. Pure B2B distributor business models serving national supermarket chains\n3. Sourcing history from Asian & Indian manufacturers\n4. Verified procurement decision-makers on file with high buying authority.';
        highlightIds = ['prsp-1', 'prsp-2', 'prsp-3'];
      } else if (lower.includes('distributor') || lower.includes('interesting')) {
        replyText =
          'The 3 strongest commercial distributors in this market are:\n• AfriCool Logistics (#1 Distributor in Kenya for supermarket multideck chillers)\n• Nairobi Cold Storage (Specializes in commercial HVAC-R & cold room packages)\n• Summit Supermarket Refrigeration (Handles retail display cases for East African grocery chains).\n\nI have highlighted them below for your review.';
        highlightIds = ['prsp-1', 'prsp-2', 'prsp-7'];
      } else if (lower.includes('frequency') || lower.includes('volume') || lower.includes('highest')) {
        replyText =
          'The companies with the highest import frequency (Monthly+) and largest volume ($600k - $1.4M/yr) are AfriCool Logistics, Summit Supermarket Refrigeration, Safari Commercial Kitchens, and Nairobi Cold Storage. All have recorded active shipments within the past 30 days.';
        highlightIds = ['prsp-1', 'prsp-2', 'prsp-5', 'prsp-7'];
      } else if (lower.includes('china') || lower.includes('sourcing')) {
        replyText =
          'AfriCool Logistics, Nairobi Cold Storage, Equator Refrigeration, and Summit Supermarket Refrigeration have active sourcing lanes from Ningbo and Shanghai. They are experienced with container shipping via Port of Mombasa.';
        highlightIds = ['prsp-1', 'prsp-2', 'prsp-3', 'prsp-7'];
      } else if (lower.includes('contact') || lower.includes('purchasing') || lower.includes('who')) {
        replyText =
          'Key purchasing decision-makers identified:\n• John Kamau (Head of Technical Procurement @ AfriCool)\n• David Ochieng (Procurement & Import Manager @ Nairobi Cold Storage)\n• Alex Kariuki (Head of Global Sourcing @ Summit Supermarket Refrigeration)\n\nYou can click "View Full Research" on any company to inspect contact details.';
        highlightIds = ['prsp-1', 'prsp-2', 'prsp-7'];
      } else if (lower.includes('save') || lower.includes('lead')) {
        replyText =
          'I have marked AfriCool Logistics, Nairobi Cold Storage, and Summit Supermarket Refrigeration to be saved into your Saved Leads pipeline.';
        highlightIds = ['prsp-1', 'prsp-2', 'prsp-7'];
        onSaveLead(KENYA_REFRIGERATION_PROSPECTS[0]);
        onSaveLead(KENYA_REFRIGERATION_PROSPECTS[1]);
        onSaveLead(KENYA_REFRIGERATION_PROSPECTS[6]);
      } else {
        replyText = `Based on our trade intelligence for Kenya, commercial refrigeration demand is driven by modern grocery retail expansion and agro-food cold chains. The 12 shortlisted companies represent verified distributors with proven import capacity.`;
      }

      setHighlightedCompanyIds(highlightIds);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          highlightIds
        }
      ]);
    }, 600);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* View State A: Research Input Area */}
      {viewState === 'input' && (
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '18px',
          padding: '32px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {/* Header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)'
              }}>
                <Compass size={22} color="#ffffff" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  AI Trade Scout
                </h2>
                <span className="badge-info">Milestone 1 • Market & Buyer Discovery</span>
              </div>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#94a3b8', margin: 0, maxWidth: '780px', lineHeight: 1.5 }}>
              Tell us what you sell and where you want to sell it. AI will research the market, analyze trade activity, and identify the verified companies worth investigating.
            </p>
          </div>

          {/* Prompt Suggestion Chips */}
          <div style={{
            backgroundColor: '#0b0f19',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '14px 16px'
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} color="#38bdf8" />
              <span>EXAMPLE SOURCING RESEARCH PROMPTS (CLICK TO LOAD)</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {examplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setProductInput(p.product);
                    setTargetMarketInput(p.market);
                    setResearchGoalInput(p.goal);
                  }}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#161f30',
                    border: '1px solid #24324d',
                    borderRadius: '8px',
                    color: '#cbd5e1',
                    fontSize: '0.76rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#24324d')}
                >
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.goal}</span>
                  <ArrowRight size={13} color="#38bdf8" style={{ flexShrink: 0, marginLeft: '6px' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Form Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
                  1. Product / Industry You Manufacture or Export
                </label>
                <input
                  type="text"
                  value={productInput}
                  onChange={(e) => setProductInput(e.target.value)}
                  className="input-control"
                  style={{ fontSize: '0.9rem', padding: '12px 14px' }}
                  placeholder="e.g. Commercial Refrigeration Equipment, Organic Cotton T-Shirts, Solar Inverters..."
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
                  2. Target Destination Market / Country
                </label>
                <input
                  type="text"
                  value={targetMarketInput}
                  onChange={(e) => setTargetMarketInput(e.target.value)}
                  className="input-control"
                  style={{ fontSize: '0.9rem', padding: '12px 14px' }}
                  placeholder="e.g. Kenya, Tanzania, United Arab Emirates, South Africa, Germany..."
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px' }}>
                  3. Specific Research Goal
                </label>
                <textarea
                  value={researchGoalInput}
                  onChange={(e) => setResearchGoalInput(e.target.value)}
                  rows={3}
                  className="input-control"
                  style={{ fontSize: '0.85rem', resize: 'none' }}
                  placeholder="e.g. Find distributors, supermarket equipment importers, and cold storage contractors..."
                />
              </div>
            </div>

            {/* Optional Research Preferences */}
            <div style={{
              backgroundColor: '#0d1322',
              border: '1px solid #1e293b',
              borderRadius: '14px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={14} color="#38bdf8" />
                <span>Optional Scoping Parameters</span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: '#94a3b8', marginBottom: '4px' }}>
                  Preferred Company Type
                </label>
                <select
                  value={companyTypeFilter}
                  onChange={(e) => setCompanyTypeFilter(e.target.value)}
                  className="input-control"
                  style={{ fontSize: '0.8rem', padding: '8px 10px' }}
                >
                  <option>All Types</option>
                  <option>Import Distributor</option>
                  <option>Wholesale Integrator</option>
                  <option>Direct Importer & Retailer</option>
                  <option>Engineering Contractor</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', color: '#94a3b8', marginBottom: '4px' }}>
                  Minimum Import Frequency
                </label>
                <select
                  value={importFrequencyFilter}
                  onChange={(e) => setImportFrequencyFilter(e.target.value)}
                  className="input-control"
                  style={{ fontSize: '0.8rem', padding: '8px 10px' }}
                >
                  <option value="All">Any Frequency (Monthly, Quarterly, Occasional)</option>
                  <option value="High">High Frequency (Monthly+ Recurring)</option>
                  <option value="Moderate">Moderate Frequency (Quarterly)</option>
                </select>
              </div>

              {/* Specialized Modules Banner */}
              <div style={{
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '0.72rem',
                color: '#cbd5e1',
                lineHeight: 1.4
              }}>
                <div style={{ fontWeight: 700, color: '#a5b4fc', marginBottom: '2px' }}>
                  5 Specialized AI Modules Active:
                </div>
                Market Scout • Company Researcher • Contact Scout • Verification Scout • Analyst Copilot.
              </div>
            </div>
          </div>

          {/* Primary Submit Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '14px', paddingTop: '10px' }}>
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={startResearch}
              className="btn-ai"
              style={{ padding: '12px 28px', fontSize: '0.95rem' }}
            >
              <Sparkles size={18} />
              <span>Start AI Trade Research</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* View State B: Live Animated Multi-Stage AI Research Workflow */}
      {viewState === 'researching' && (
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          borderRadius: '18px',
          padding: '36px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="ai-pill">
                  <RefreshCw size={12} className="animate-spin" />
                  AI Trade Scout Investigating
                </span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Real-time Autonomous Workflow</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Researching: {productInput} → {targetMarketInput}
              </h2>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8' }}>
                {analyzedCount.toLocaleString()}
              </div>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Companies Discovered & Analyzed</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#a5b4fc', fontWeight: 600 }}>
              <span>Investigation Progress: Stage {Math.min(currentResearchStepIdx + 1, 10)} of 10</span>
              <span>{researchProgress}% Completed</span>
            </div>
            <div style={{ height: '10px', backgroundColor: '#0b0f19', borderRadius: '6px', overflow: 'hidden', border: '1px solid #1e293b' }}>
              <div style={{
                width: `${researchProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
                borderRadius: '6px',
                transition: 'width 0.35s ease'
              }} />
            </div>
          </div>

          {/* 5 Specialized Module Status Chips */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {TRADE_SCOUT_MODULES.map((m, idx) => {
              const isActive = currentResearchStepIdx >= idx * 2;
              return (
                <div
                  key={m.id}
                  style={{
                    backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : '#0d1322',
                    border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid #1e293b',
                    borderRadius: '10px',
                    padding: '12px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isActive ? '#38bdf8' : '#64748b', marginBottom: '2px' }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{m.role}</div>
                </div>
              );
            })}
          </div>

          {/* 10-Stage Checklist Simulation */}
          <div style={{
            backgroundColor: '#0b0f19',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            {researchWorkflowStages.map((st, sIdx) => {
              const isDone = currentResearchStepIdx > sIdx;
              const isCurrent = currentResearchStepIdx === sIdx;

              return (
                <div
                  key={sIdx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '0.78rem',
                    color: isDone ? '#e2e8f0' : isCurrent ? '#38bdf8' : '#475569'
                  }}
                >
                  <div style={{ marginTop: '2px', flexShrink: 0 }}>
                    {isDone ? (
                      <CheckCircle2 size={16} color="#34d399" />
                    ) : isCurrent ? (
                      <RefreshCw size={15} color="#38bdf8" className="animate-spin" />
                    ) : (
                      <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '1px solid #334155' }} />
                    )}
                  </div>
                  <div>
                    <div style={{ fontWeight: isCurrent || isDone ? 600 : 400 }}>{st.title}</div>
                    {isCurrent && (
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '1px' }}>
                        {st.msg}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View State C: Qualified Prospects Results View */}
      {viewState === 'results' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Results Banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            borderRadius: '16px',
            padding: '22px 26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
              }}>
                <Sparkles size={24} color="#ffffff" />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge-success">Research Complete</span>
                  <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                    1,284 Companies Analyzed • 47 Matched • 12 Shortlisted
                  </span>
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  12 Qualified Prospects for Commercial Refrigeration in Kenya
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: '2px 0 0 0' }}>
                  Curated shortlist of active distributors and wholesale importers with recent customs import activity.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setWhyTheseModalOpen(true)}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '8px 14px', borderColor: 'rgba(99, 102, 241, 0.4)' }}
              >
                <HelpCircle size={15} color="#38bdf8" />
                <span>Why these companies?</span>
              </button>

              <button
                onClick={() => setViewState('input')}
                className="btn-primary"
                style={{ fontSize: '0.8rem', padding: '8px 14px' }}
              >
                <Plus size={15} />
                <span>New Research</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Relevance:</span>
                <select
                  value={relevanceFilter}
                  onChange={(e) => setRelevanceFilter(e.target.value)}
                  className="input-control"
                  style={{ width: '140px', padding: '6px 10px', fontSize: '0.78rem' }}
                >
                  <option value="All">All Relevance</option>
                  <option value="Highly Relevant">Highly Relevant</option>
                  <option value="Relevant">Relevant</option>
                  <option value="Needs Review">Needs Review</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Company Type:</span>
                <select
                  value={companyTypeFilter}
                  onChange={(e) => setCompanyTypeFilter(e.target.value)}
                  className="input-control"
                  style={{ width: '160px', padding: '6px 10px', fontSize: '0.78rem' }}
                >
                  <option>All Types</option>
                  <option>Import Distributor</option>
                  <option>Wholesale Integrator</option>
                  <option>Direct Importer & Retailer</option>
                  <option>Engineering Contractor</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Sourcing Origin:</span>
                <select
                  value={sourcingCountryFilter}
                  onChange={(e) => setSourcingCountryFilter(e.target.value)}
                  className="input-control"
                  style={{ width: '130px', padding: '6px 10px', fontSize: '0.78rem' }}
                >
                  <option value="All">All Origins</option>
                  <option value="China">China</option>
                  <option value="India">India</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
            </div>

            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Showing {filteredProspects.length} curated prospects
            </span>
          </div>

          {/* Qualified Prospects Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))', gap: '18px' }}>
            {filteredProspects.map((p) => {
              const isSaved = savedCompanyIds.includes(p.id) || p.savedAsLead;
              const isHighlighted = highlightedCompanyIds.includes(p.id);

              return (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: isHighlighted ? 'rgba(99, 102, 241, 0.15)' : '#111827',
                    border: isHighlighted ? '2px solid #38bdf8' : p.relevanceScore >= 95 ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid #1e293b',
                    borderRadius: '14px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: isHighlighted ? '0 0 24px rgba(56, 189, 248, 0.3)' : '0 4px 20px rgba(0,0,0,0.2)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  {/* Top Row: Name, Match Tag, Score */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                          {p.name}
                        </h3>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                        {p.city}, {p.country} • <span style={{ color: '#38bdf8' }}>{p.companyType}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <span className={p.productRelevance === 'Highly Relevant' ? 'badge-success' : p.productRelevance === 'Relevant' ? 'badge-info' : 'badge-warning'}>
                        {p.productRelevance}
                      </span>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>
                        Score: {p.relevanceScore}/100
                      </div>
                    </div>
                  </div>

                  {/* Why This Company Snippet */}
                  <div style={{
                    backgroundColor: '#0b0f19',
                    border: '1px solid #1e293b',
                    borderRadius: '8px',
                    padding: '10px 12px'
                  }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#a5b4fc', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={11} color="#38bdf8" />
                      <span>WHY THIS COMPANY?</span>
                    </div>
                    <p style={{ fontSize: '0.74rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
                      {p.whyThisCompany}
                    </p>
                  </div>

                  {/* Metric Pills */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '6px',
                    fontSize: '0.72rem',
                    color: '#94a3b8',
                    backgroundColor: '#0d1322',
                    padding: '8px 10px',
                    borderRadius: '8px'
                  }}>
                    <div>Frequency: <strong style={{ color: '#f1f5f9' }}>{p.importFrequency}</strong></div>
                    <div>Est. Volume: <strong style={{ color: '#34d399' }}>{p.approxVolume}</strong></div>
                    <div style={{ gridColumn: 'span 2' }}>
                      Sourcing Origins: <strong style={{ color: '#38bdf8' }}>{p.sourcingCountries.join(', ')}</strong>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '6px' }}>
                    <button
                      onClick={() => {
                        setSelectedCompany(p);
                        setContactScoutActive(false);
                      }}
                      className="btn-secondary"
                      style={{ flex: 1, fontSize: '0.78rem', padding: '8px' }}
                    >
                      <Eye size={14} />
                      <span>View Research</span>
                    </button>

                    <button
                      onClick={() => onSaveLead(p, p.contacts[0])}
                      className={isSaved ? 'btn-secondary' : 'btn-primary'}
                      style={{
                        flex: 1,
                        fontSize: '0.78rem',
                        padding: '8px',
                        background: isSaved ? undefined : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      }}
                    >
                      <Bookmark size={14} fill={isSaved ? '#34d399' : 'none'} color={isSaved ? '#34d399' : '#ffffff'} />
                      <span>{isSaved ? 'Saved as Lead' : 'Save as Lead'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contextual AI Assistant on Results Page */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid rgba(99, 102, 241, 0.35)',
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot size={18} color="#ffffff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                    Contextual AI Trade Assistant
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
                    Ask anything about the Kenya refrigeration market research results
                  </p>
                </div>
              </div>
              <span className="badge-info">Active Context: 12 Kenyan Prospects</span>
            </div>

            {/* Chat Thread */}
            <div style={{
              backgroundColor: '#0b0f19',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '14px',
              maxHeight: '220px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: msg.sender === 'user' ? '#4f46e5' : '#1e293b',
                    color: msg.sender === 'user' ? '#ffffff' : '#38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {msg.sender === 'user' ? 'U' : 'AI'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.76rem', color: '#f1f5f9', whiteSpace: 'pre-wrap', lineHeight: 1.45 }}>
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Prompt Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
              <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, whiteSpace: 'nowrap' }}>
                ASK AI:
              </span>
              {[
                'Why did you select these 3?',
                'Show me the most interesting distributors',
                'Which companies have the highest import frequency?',
                'Show companies sourcing from China',
                'Who are the likely purchasing people?',
                'Save these companies as leads'
              ].map((chip, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => handleSendChat(chip)}
                  style={{
                    backgroundColor: '#161f30',
                    border: '1px solid #24324d',
                    borderRadius: '16px',
                    padding: '4px 12px',
                    color: '#cbd5e1',
                    fontSize: '0.74rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#24324d';
                    e.currentTarget.style.color = '#cbd5e1';
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendChat(chatInput);
              }}
              style={{ display: 'flex', gap: '10px' }}
            >
              <input
                type="text"
                placeholder="Ask about distributors, contacts, import volumes, or request follow-up actions..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="input-control"
                style={{ fontSize: '0.84rem', padding: '10px 14px' }}
              />
              <button type="submit" className="btn-ai" style={{ padding: '0 18px', flexShrink: 0 }}>
                <Send size={15} />
                <span>Ask</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global "Why these companies?" Modal */}
      {whyTheseModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '24px'
        }}>
          <div style={{
            backgroundColor: '#161f30',
            border: '1px solid #334155',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            animation: 'slideUp 0.25s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={20} color="#ffffff" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    AI Qualification Rationale & Methodology
                  </h3>
                  <p style={{ fontSize: '0.74rem', color: '#94a3b8', margin: 0 }}>
                    How TradeAI evaluated 1,284 entities down to 12 qualified prospects
                  </p>
                </div>
              </div>
              <button onClick={() => setWhyTheseModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ backgroundColor: '#0d1322', border: '1px solid #24324d', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', lineHeight: 1.5, color: '#cbd5e1' }}>
              <p style={{ margin: 0 }}>
                Our <strong>AI Trade Analyst</strong> applied a 4-pillar qualification sieve across Kenyan import records:
              </p>
              <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong style={{ color: '#38bdf8' }}>Product Relevance (40%):</strong> Filtered for companies with verified import lines in HS 8418 (Commercial display chillers, walk-in cold rooms, supermarket cases).</li>
                <li><strong style={{ color: '#34d399' }}>Import Recency & Cadence (30%):</strong> Prioritized companies with recurring ocean shipments (Monthly/Quarterly) arriving via Port of Mombasa within the last 12 months.</li>
                <li><strong style={{ color: '#fbbf24' }}>Business Model Fit (20%):</strong> Excluded end-consumers and one-off buyers; retained established stocking distributors, wholesale integrators, and MEP contractors.</li>
                <li><strong style={{ color: '#c084fc' }}>Contact & Verification Signals (10%):</strong> Checked KRA active registration and discovered accessible procurement heads.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setWhyTheseModalOpen(false)} className="btn-primary">
                Got it, return to prospects
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Company Deep-Dive Research Modal / Drawer */}
      {selectedCompany && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '24px'
        }}>
          <div style={{
            backgroundColor: '#131b2c',
            border: '1px solid #334155',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '920px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
            overflow: 'hidden',
            animation: 'slideUp 0.25s ease'
          }}>
            {/* Header */}
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid #24324d',
              backgroundColor: '#0d1322',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    {selectedCompany.name}
                  </h3>
                  <span className="badge-success">{selectedCompany.productRelevance}</span>
                  <span className="badge-info">{selectedCompany.verificationStatus}</span>
                </div>
                <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '2px 0 0 0' }}>
                  {selectedCompany.city}, {selectedCompany.country} • {selectedCompany.companyType} • Web: {selectedCompany.website}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => onSaveLead(selectedCompany, selectedCompany.contacts[0])}
                  className="btn-primary"
                  style={{ fontSize: '0.78rem' }}
                >
                  <Bookmark size={14} />
                  <span>Save as Lead</span>
                </button>
                <button onClick={() => setSelectedCompany(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Overview & Why Interesting */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr', gap: '18px' }}>
                {/* Left: Overview */}
                <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '12px', padding: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                    Company Overview & Commercial Scale
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                    {selectedCompany.overview}
                  </p>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div><strong>Import Activity:</strong> {selectedCompany.importActivity}</div>
                    <div><strong>Est. Annual Volume:</strong> <span style={{ color: '#34d399' }}>{selectedCompany.approxVolume}</span></div>
                    <div><strong>Sourcing Countries:</strong> {selectedCompany.sourcingCountries.join(', ')}</div>
                  </div>
                </div>

                {/* Right: Why Interesting & What Needs Verification */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ backgroundColor: '#111827', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#34d399', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={13} />
                      <span>WHY THIS COMPANY MAY BE INTERESTING</span>
                    </div>
                    <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: 0, lineHeight: 1.4 }}>
                      {selectedCompany.whyThisCompany}
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#111827', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#fbbf24', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertTriangle size={13} />
                      <span>WHAT NEEDS VERIFICATION</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.74rem', color: '#fef3c7', lineHeight: 1.4 }}>
                      {selectedCompany.whatNeedsVerification.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Scout Section */}
              <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={18} color="#38bdf8" />
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                      Contact Scout: Key Procurement & Commercial People
                    </h4>
                  </div>
                  <span className="badge-neutral">DEMO DATA (PUBLIC RECORDS SIMULATION)</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                  {selectedCompany.contacts.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        backgroundColor: '#161f30',
                        border: '1px solid #24324d',
                        borderRadius: '10px',
                        padding: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div>
                          <strong style={{ fontSize: '0.85rem', color: '#f8fafc' }}>{c.name}</strong>
                          <div style={{ fontSize: '0.74rem', color: '#38bdf8' }}>{c.role}</div>
                        </div>
                        <span className={c.verificationStatus === 'Verified' ? 'badge-success' : 'badge-neutral'}>
                          {c.verificationStatus}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Dept: {c.department} • Authority: <span style={{ color: '#fbbf24' }}>{c.decisionPower}</span>
                      </div>

                      {c.emailDemo && (
                        <div style={{ fontSize: '0.7rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                          <Mail size={11} color="#64748b" />
                          <span>{c.emailDemo}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence & Sources Section */}
              <div style={{ backgroundColor: '#111827', border: '1px solid #1e293b', borderRadius: '14px', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <ShieldCheck size={18} color="#34d399" />
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                    Evidence & Intelligence Sources
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {selectedCompany.sources.map((src, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        backgroundColor: '#0d1322',
                        border: '1px solid #1e293b',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.76rem', fontWeight: 600, color: '#f1f5f9' }}>{src.title}</div>
                        <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{src.type} • {src.date}</div>
                      </div>
                      <span className="badge-success">✓ Verified</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
