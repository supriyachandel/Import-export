import React, { useState } from 'react';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Building2,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  Heart,
  Send,
  Eye,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';
import { Supplier, ScreenType } from '../../types';
import { SUPPLIERS } from '../../data/mockData';

interface MarketplaceScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onRequestQuote: (supplier: Supplier) => void;
  onSelectSupplierProfile: (supplier: Supplier) => void;
}

export const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  onNavigate,
  onRequestQuote,
  onSelectSupplierProfile
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [onlyVerified, setOnlyVerified] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>(['sup-1']);
  const [viewMode, setViewMode] = useState<'suppliers' | 'products'>('suppliers');

  const filteredSuppliers = SUPPLIERS.filter((sup) => {
    const matchesSearch =
      sup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sup.categories.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCountry = selectedCountry === 'All' || sup.country === selectedCountry;
    const matchesCategory = selectedCategory === 'All' || sup.categories.some((c) => c.includes(selectedCategory));
    const matchesVerified = !onlyVerified || sup.verified;

    return matchesSearch && matchesCountry && matchesCategory && matchesVerified;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner / Marketplace Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            Global Verified Supplier Marketplace
          </h2>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Access audited manufacturers with ESG certifications, production capacity metrics & AI match scoring
          </p>
        </div>

        {/* View Switcher & RFQ Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            backgroundColor: '#111827',
            border: '1px solid #24324d',
            borderRadius: '8px',
            padding: '3px',
            display: 'flex'
          }}>
            <button
              onClick={() => setViewMode('suppliers')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'suppliers' ? '#4f46e5' : 'transparent',
                color: viewMode === 'suppliers' ? '#ffffff' : '#94a3b8',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Suppliers Directory
            </button>
            <button
              onClick={() => setViewMode('products')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'products' ? '#4f46e5' : 'transparent',
                color: viewMode === 'products' ? '#ffffff' : '#94a3b8',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Product Catalog
            </button>
          </div>

          <button
            onClick={() => onNavigate('create-rfq')}
            className="btn-primary"
            style={{ fontSize: '0.8rem' }}
          >
            <span>+ Create Custom RFQ</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div style={{
        backgroundColor: '#111827',
        border: '1px solid #1e293b',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            placeholder="Search shirts, cotton, factory name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-control"
            style={{ paddingLeft: '36px' }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Country Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Country:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="input-control"
              style={{ width: '130px', padding: '6px 10px', fontSize: '0.78rem' }}
            >
              <option value="All">All Origins</option>
              <option value="India">India</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Turkey">Turkey</option>
            </select>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 600 }}>Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-control"
              style={{ width: '150px', padding: '6px 10px', fontSize: '0.78rem' }}
            >
              <option value="All">All Categories</option>
              <option value="Apparel">Apparel & Garments</option>
              <option value="Cotton">100% Organic Cotton</option>
              <option value="Knitwear">Knitwear</option>
              <option value="Luxury">Luxury Cotton</option>
            </select>
          </div>

          {/* Verified Checkbox */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#cbd5e1', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              style={{ accentColor: '#6366f1' }}
            />
            <span>Verified Only</span>
          </label>
        </div>
      </div>

      {/* Supplier Grid View */}
      {viewMode === 'suppliers' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '18px' }}>
          {filteredSuppliers.map((sup) => {
            const isFav = favorites.includes(sup.id);
            return (
              <div
                key={sup.id}
                style={{
                  backgroundColor: '#111827',
                  border: sup.id === 'sup-1' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid #1e293b',
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  position: 'relative'
                }}
              >
                {/* Top Card Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                        {sup.name}
                      </h3>
                      <button
                        onClick={() => toggleFavorite(sup.id)}
                        style={{ background: 'none', border: 'none', color: isFav ? '#f43f5e' : '#64748b', cursor: 'pointer', padding: '2px' }}
                      >
                        <Heart size={16} fill={isFav ? '#f43f5e' : 'none'} />
                      </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', color: '#94a3b8' }}>
                      <span>{sup.city}, {sup.country}</span>
                      <span>•</span>
                      <span>Est. {sup.establishedYear}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      color: sup.aiMatchScore >= 90 ? '#34d399' : '#38bdf8'
                    }}>
                      {sup.aiMatchScore}% Match
                    </div>
                    <span style={{ fontSize: '0.66rem', color: '#64748b' }}>AI Score</span>
                  </div>
                </div>

                {/* Rating & Verified Badges */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#fbbf24', fontSize: '0.78rem', fontWeight: 700 }}>
                      <Star size={14} fill="#fbbf24" />
                      <span>{sup.rating}</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>({sup.reviewsCount} reviews)</span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {sup.verified && (
                      <span className="badge-success" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ShieldCheck size={12} /> Verified
                      </span>
                    )}
                    <span className="badge-neutral">ESG {sup.esgScore}/100</span>
                  </div>
                </div>

                {/* Key Metrics */}
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
                    <div style={{ color: '#64748b' }}>MOQ:</div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{sup.moq.toLocaleString()} pcs</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b' }}>Lead Time:</div>
                    <div style={{ fontWeight: 700, color: '#fbbf24' }}>{sup.leadTimeDays} days</div>
                  </div>
                  <div>
                    <div style={{ color: '#64748b' }}>Capacity:</div>
                    <div style={{ fontWeight: 700, color: '#38bdf8' }}>{sup.capacityPerMonth}</div>
                  </div>
                </div>

                {/* Categories & Certifications */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {sup.certifications.map((c) => (
                    <span key={c} style={{ fontSize: '0.68rem', backgroundColor: '#1e293b', color: '#94a3b8', padding: '2px 8px', borderRadius: '4px' }}>
                      {c}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '6px' }}>
                  <button
                    onClick={() => {
                      onSelectSupplierProfile(sup);
                      onNavigate('supplier-profile');
                    }}
                    className="btn-secondary"
                    style={{ flex: 1, fontSize: '0.78rem', padding: '8px' }}
                  >
                    <Eye size={14} />
                    <span>View Profile</span>
                  </button>

                  <button
                    onClick={() => onRequestQuote(sup)}
                    className="btn-primary"
                    style={{ flex: 1, fontSize: '0.78rem', padding: '8px' }}
                  >
                    <Send size={14} />
                    <span>Request Quote</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Product Catalog Grid View */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
          {SUPPLIERS.map((sup) => (
            <div
              key={sup.id}
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1e293b',
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <img
                src={sup.featuredProduct.image}
                alt={sup.featuredProduct.name}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 600 }}>{sup.name}</span>
                  <span className="badge-info">{sup.country}</span>
                </div>

                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                  {sup.featuredProduct.name}
                </h4>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px' }}>
                  <div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{sup.featuredProduct.price}</span>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}> / pc</span>
                  </div>
                  <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>MOQ: {sup.featuredProduct.moq.toLocaleString()} pcs</span>
                </div>

                <button
                  onClick={() => onRequestQuote(sup)}
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '0.78rem', marginTop: '6px' }}
                >
                  <span>Request Product Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
