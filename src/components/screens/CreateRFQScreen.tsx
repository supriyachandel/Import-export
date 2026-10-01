import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Save,
  CheckCircle2,
  FileQuestion,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Plus,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { ScreenType } from '../../types';
import { SUPPLIERS } from '../../data/mockData';

interface CreateRFQScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onRFQCreated?: () => void;
}

export const CreateRFQScreen: React.FC<CreateRFQScreenProps> = ({ onNavigate, onRFQCreated }) => {
  const [productTitle, setProductTitle] = useState('10,000 Units Premium Combed Cotton Shirts');
  const [productCategory, setProductCategory] = useState('Apparel & Garments');
  const [quantity, setQuantity] = useState('10000');
  const [unit, setUnit] = useState('pcs');
  const [targetPrice, setTargetPrice] = useState('10.00');
  const [currency, setCurrency] = useState('USD');
  const [destinationCountry, setDestinationCountry] = useState('Canada');
  const [destinationPort, setDestinationPort] = useState('Port of Montreal (FOB or CIF)');
  const [deliveryDate, setDeliveryDate] = useState('2026-11-20');
  const [leadTimeDays, setLeadTimeDays] = useState('45');
  const [specs, setSpecs] = useState<string[]>([
    '100% Combed Compact Ring-Spun Cotton, 180 GSM',
    'Pre-shrunk fabric, Colorfastness Grade 4+',
    'Custom woven inner neck label + satin care label',
    'Sizes: S (15%), M (35%), L (35%), XL (15%)',
    'Reinforced double-stitched collar and hems'
  ]);
  const [newSpec, setNewSpec] = useState('');
  const [packaging, setPackaging] = useState('Individual eco-polybag with barcode sticker, 50 pcs per 5-ply export carton');
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>(['sup-1', 'sup-2', 'sup-3']);
  const [isPublished, setIsPublished] = useState(false);

  const handleAddSpec = () => {
    if (!newSpec.trim()) return;
    setSpecs([...specs, newSpec.trim()]);
    setNewSpec('');
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const toggleSupplier = (id: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublished(true);
    if (onRFQCreated) onRFQCreated();
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            Create Intelligent Sourcing RFQ
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Draft structured buyer requirements with AI specification auto-completion and 1-click multi-supplier dispatch
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => onNavigate('rfqs')}
            className="btn-secondary"
            style={{ fontSize: '0.78rem' }}
          >
            <span>Cancel / View All RFQs</span>
          </button>
        </div>
      </div>

      {isPublished ? (
        /* Post-Publish AI Structured Summary & Match Confirmation */
        <div style={{
          backgroundColor: '#111827',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          animation: 'slideUp 0.25s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={26} color="#34d399" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  RFQ-2048 Successfully Published & Dispatched!
                </h3>
                <span className="badge-success">Status: Published</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                Dispatched to 3 matched verified manufacturers. AI quotation comparative analysis will generate automatically upon response.
              </p>
            </div>
          </div>

          {/* AI Structured Criteria Box */}
          <div style={{
            backgroundColor: '#0b0f19',
            border: '1px solid #24324d',
            borderRadius: '12px',
            padding: '18px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '14px',
            fontSize: '0.8rem'
          }}>
            <div>
              <span style={{ color: '#64748b' }}>Product:</span>
              <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{productTitle}</div>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Quantity & Target:</span>
              <div style={{ fontWeight: 700, color: '#34d399' }}>{Number(quantity).toLocaleString()} pcs @ ${targetPrice} USD</div>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Delivery Port:</span>
              <div style={{ fontWeight: 700, color: '#38bdf8' }}>{destinationPort}</div>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Required Lead Time:</span>
              <div style={{ fontWeight: 700, color: '#fbbf24' }}>{leadTimeDays} Days (By {deliveryDate})</div>
            </div>
          </div>

          {/* Invited Suppliers Status */}
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>
              Invited Verified Manufacturers
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {SUPPLIERS.slice(0, 3).map((sup) => (
                <div
                  key={sup.id}
                  style={{
                    backgroundColor: '#161f30',
                    border: '1px solid #24324d',
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>{sup.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{sup.city}, {sup.country}</div>
                  </div>
                  <span className="badge-info">Dispatched</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action to Jump to Quotations Comparison */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '10px' }}>
            <button
              onClick={() => onNavigate('rfqs')}
              className="btn-secondary"
            >
              View in RFQ Pipeline
            </button>
            <button
              onClick={() => onNavigate('quotations')}
              className="btn-ai"
              style={{ fontSize: '0.85rem', padding: '10px 20px' }}
            >
              <span>Compare Received Supplier Quotations</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* Form */
        <form onSubmit={handlePublish} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
          {/* Left Column: Form Fields */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                RFQ Requirement Title
              </label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="input-control"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                  Total Quantity (units)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="input-control"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                  Target Price (USD / unit)
                </label>
                <input
                  type="text"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="input-control"
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                  Destination Country & Port
                </label>
                <input
                  type="text"
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  className="input-control"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                  Target Delivery Date (Max 45 Days)
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="input-control"
                  required
                />
              </div>
            </div>

            {/* Technical Specifications List */}
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '6px' }}>
                Technical & Material Specifications
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                {specs.map((s, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#161f30',
                      border: '1px solid #24324d',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.78rem',
                      color: '#f1f5f9'
                    }}
                  >
                    <span>• {s}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(idx)}
                      style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder="Add another requirement (e.g. Double-needle stitch on sleeves)..."
                  value={newSpec}
                  onChange={(e) => setNewSpec(e.target.value)}
                  className="input-control"
                  style={{ fontSize: '0.78rem', padding: '6px 10px' }}
                />
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="btn-secondary"
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  <Plus size={14} />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '4px' }}>
                Packaging & Labeling Instructions
              </label>
              <input
                type="text"
                value={packaging}
                onChange={(e) => setPackaging(e.target.value)}
                className="input-control"
              />
            </div>
          </div>

          {/* Right Column: AI Recommended Suppliers Dispatch Box */}
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            borderRadius: '14px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                AI Recommended Match & Dispatch
              </h3>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
              AI automatically selected top-ranked verified suppliers matching price, lead time and export destination.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SUPPLIERS.slice(0, 3).map((sup) => {
                const isSelected = selectedSuppliers.includes(sup.id);
                return (
                  <div
                    key={sup.id}
                    onClick={() => toggleSupplier(sup.id)}
                    style={{
                      backgroundColor: isSelected ? 'rgba(99, 102, 241, 0.12)' : '#161f30',
                      border: isSelected ? '1px solid #6366f1' : '1px solid #24324d',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>{sup.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{sup.city}, {sup.country} • MOQ: {sup.moq}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34d399' }}>{sup.aiMatchScore}% Match</div>
                      <span style={{ fontSize: '0.68rem', color: isSelected ? '#38bdf8' : '#64748b' }}>
                        {isSelected ? '✓ Selected' : '+ Include'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Action */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.88rem' }}
              >
                <Send size={16} />
                <span>Publish RFQ & Send to Selected Suppliers</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('rfqs')}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.8rem' }}
              >
                <Save size={14} />
                <span>Save as Internal Draft</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
