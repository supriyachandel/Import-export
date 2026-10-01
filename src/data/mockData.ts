import {
  User,
  Supplier,
  RFQItem,
  Quotation,
  Order,
  TradeDocument,
  Shipment,
  CRMLead,
  HITLTask,
  DemoStep
} from '../types';

export const CURRENT_USER: User = {
  id: 'usr-1',
  name: 'Sarah Jenkins',
  company: 'Global Trade Imports Inc.',
  email: 's.jenkins@globaltradeimports.ca',
  role: 'buyer',
  country: 'Canada',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  verified: true
};

export const DEMO_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Sarah Jenkins',
    company: 'Global Trade Imports Inc.',
    email: 's.jenkins@globaltradeimports.ca',
    role: 'buyer',
    country: 'Canada',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'usr-2',
    name: 'Rajesh Sharma',
    company: 'ABC Textiles Ltd.',
    email: 'r.sharma@abctextiles.in',
    role: 'supplier',
    country: 'India',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'usr-3',
    name: 'Marcus Vance',
    company: 'TradeAI Operations',
    email: 'm.vance@tradeai.ops',
    role: 'operations',
    country: 'United Kingdom',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    company: 'TradeAI SuperAdmin',
    email: 'elena@tradeai.platform',
    role: 'admin',
    country: 'United States',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verified: true
  }
];

export const SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'ABC Textiles Ltd.',
    country: 'India',
    countryCode: 'IN',
    city: 'Tirupur, Tamil Nadu',
    categories: ['Apparel & Garments', '100% Organic Cotton', 'Knitted Textiles', 'Custom Merchandising'],
    moq: 2000,
    capacityPerMonth: '250,000 pcs/mo',
    rating: 4.9,
    reviewsCount: 128,
    verified: true,
    aiMatchScore: 98,
    matchReasons: [
      'Matches your target price (<$10) with $7.80/unit FOB quote historical average',
      'Strong export track record to North America (Canada/USA 64% of volume)',
      'Certified OEKO-TEX Standard 100, GOTS Organic Cotton, ISO 9001:2015',
      'High on-time shipment compliance rate (99.2% over 36 months)'
    ],
    certifications: ['OEKO-TEX 100', 'GOTS Organic', 'ISO 9001', 'Sedex SMETA'],
    priceRange: '$7.20 - $8.50',
    leadTimeDays: 35,
    countriesServed: ['Canada', 'USA', 'Germany', 'UK', 'Australia', 'Japan'],
    establishedYear: 2008,
    overview: 'ABC Textiles is a tier-1 vertical garment manufacturer specializing in premium combed cotton shirts, corporate apparel, and sustainable fashion textiles with automated cut-to-pack facilities.',
    esgScore: 94,
    featuredProduct: {
      name: 'Premium Combed Cotton Shirt (180 GSM)',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80',
      price: '$7.80',
      moq: 2000
    }
  },
  {
    id: 'sup-2',
    name: 'Prime Garments India',
    country: 'India',
    countryCode: 'IN',
    city: 'Surat, Gujarat',
    categories: ['Apparel & Garments', 'Cotton Blends', 'Woven Shirts', 'Fast Fashion'],
    moq: 3000,
    capacityPerMonth: '180,000 pcs/mo',
    rating: 4.6,
    reviewsCount: 84,
    verified: true,
    aiMatchScore: 92,
    matchReasons: [
      'Competitive price tier ($8.40 CIF Canada)',
      'WRAP Gold & BSCI Social Compliance certified',
      'Consistent supply chain for combed yarns',
      'Requires slightly higher MOQ (3,000 units)'
    ],
    certifications: ['WRAP Gold', 'BSCI', 'ISO 14001'],
    priceRange: '$8.00 - $9.20',
    leadTimeDays: 40,
    countriesServed: ['Canada', 'USA', 'France', 'Netherlands'],
    establishedYear: 2012,
    overview: 'Prime Garments produces high-durability woven shirts and industrial uniforms with strict quality control labs and integrated dying units.',
    esgScore: 88,
    featuredProduct: {
      name: 'Classic Oxford Cotton Button-Down',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80',
      price: '$8.40',
      moq: 3000
    }
  },
  {
    id: 'sup-3',
    name: 'Asia Cotton Export Joint Stock',
    country: 'Vietnam',
    countryCode: 'VN',
    city: 'Da Nang',
    categories: ['Apparel & Garments', 'Cotton Pique', 'Sports & Casual Shirts'],
    moq: 5000,
    capacityPerMonth: '320,000 pcs/mo',
    rating: 4.5,
    reviewsCount: 62,
    verified: true,
    aiMatchScore: 84,
    matchReasons: [
      'Very competitive low unit price ($7.20 FOB Haiphong)',
      'Modern automated Japanese stitching machinery',
      '⚠️ Lead time is 55 days (Exceeds your 45-day deadline requirement)',
      'MOQ is 5,000 units'
    ],
    certifications: ['ISO 9001', 'SA8000', 'OEKO-TEX 100'],
    priceRange: '$7.00 - $7.90',
    leadTimeDays: 55,
    countriesServed: ['Japan', 'South Korea', 'USA', 'EU'],
    establishedYear: 2015,
    overview: 'Asia Cotton Export operates a 40,000 sqm export facility in central Vietnam, catering to large-scale international apparel retailers.',
    esgScore: 86,
    featuredProduct: {
      name: 'Heavyweight Cotton Crewneck',
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=80',
      price: '$7.20',
      moq: 5000
    }
  },
  {
    id: 'sup-4',
    name: 'Atlas Textile Mills Ltd.',
    country: 'Bangladesh',
    countryCode: 'BD',
    city: 'Dhaka',
    categories: ['Knitwear', 'T-Shirts & Polos', 'Recycled Polyester Blends'],
    moq: 10000,
    capacityPerMonth: '600,000 pcs/mo',
    rating: 4.4,
    reviewsCount: 190,
    verified: true,
    aiMatchScore: 78,
    matchReasons: [
      'Lowest unit cost for massive volume',
      'Accord on Fire and Building Safety certified',
      'Higher MOQ required (10,000+ units)',
      'Longer shipping route to Atlantic ports'
    ],
    certifications: ['Accord Certified', 'GOTS', 'OEKO-TEX 100'],
    priceRange: '$5.50 - $6.80',
    leadTimeDays: 50,
    countriesServed: ['EU', 'UK', 'USA'],
    establishedYear: 2004,
    overview: 'Large-scale vertical apparel plant handling high-volume standard basic garments with sustainable water recycling systems.',
    esgScore: 82,
    featuredProduct: {
      name: 'Basic Crewneck Jersey Cotton',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=80',
      price: '$5.90',
      moq: 10000
    }
  },
  {
    id: 'sup-5',
    name: 'Anatolia Garment Industries',
    country: 'Turkey',
    countryCode: 'TR',
    city: 'Istanbul',
    categories: ['Luxury Cotton', 'Pima Cotton Shirts', 'Fast-Turnaround Fashion'],
    moq: 1500,
    capacityPerMonth: '90,000 pcs/mo',
    rating: 4.8,
    reviewsCount: 77,
    verified: true,
    aiMatchScore: 81,
    matchReasons: [
      'Fast 25-day production lead time',
      'Ultra high-grade Turkish Aegean cotton',
      'Higher price point ($11.50/unit) exceeding your $10 target',
      'Low MOQ flexibility (1,500 units)'
    ],
    certifications: ['BCI Cotton', 'ISO 9001', 'Sedex'],
    priceRange: '$10.50 - $13.00',
    leadTimeDays: 25,
    countriesServed: ['Germany', 'UK', 'USA', 'Canada'],
    establishedYear: 2011,
    overview: 'Premium European-standard manufacturer specializing in high thread count Aegean long-staple cotton apparel.',
    esgScore: 92,
    featuredProduct: {
      name: 'Aegean Cotton Dress Shirt',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=80',
      price: '$11.80',
      moq: 1500
    }
  }
];

export const MOCK_RFQS: RFQItem[] = [
  {
    id: 'rfq-1',
    rfqNumber: 'RFQ-2048',
    title: '10,000 Units Premium Combed Cotton Shirts',
    product: 'Premium Cotton Shirts (180 GSM, Custom Label)',
    quantity: 10000,
    unit: 'pcs',
    targetPrice: 10.00,
    currency: 'USD',
    destinationCountry: 'Canada',
    destinationPort: 'Port of Montreal (FOB or CIF)',
    requiredDeliveryDate: '2026-11-20',
    leadTimeDays: 45,
    specifications: [
      '100% Combed Compact Ring-Spun Cotton, 180 GSM',
      'Pre-shrunk fabric, Colorfastness Grade 4+',
      'Custom woven inner neck label + satin care label',
      'Sizes: S (15%), M (35%), L (35%), XL (15%)',
      'Reinforced double-stitched collar and hems'
    ],
    packaging: 'Individual eco-polybag with barcode sticker, 50 pcs per 5-ply export carton',
    certifications: ['OEKO-TEX Standard 100', 'GOTS Certified Organic or BCI'],
    status: 'Responses Received',
    createdAt: '2026-09-28',
    responsesCount: 3,
    invitedSuppliers: ['ABC Textiles Ltd.', 'Prime Garments India', 'Asia Cotton Export Joint Stock'],
    aiSummary: 'Requirement structured for 10,000 units premium 180 GSM cotton shirts destined for Canada. 3 suppliers matched and submitted quotations with landed cost calculations ready.',
    assignedOwner: 'Sarah Jenkins (Global Trade Imports)'
  },
  {
    id: 'rfq-2',
    rfqNumber: 'RFQ-1982',
    title: '25,000 Organic Canvas Tote Bags with Screen Print',
    product: 'Heavyweight Organic Canvas Tote Bags (320 GSM)',
    quantity: 25000,
    unit: 'pcs',
    targetPrice: 3.20,
    currency: 'USD',
    destinationCountry: 'Canada',
    destinationPort: 'Port of Vancouver',
    requiredDeliveryDate: '2026-12-10',
    leadTimeDays: 50,
    specifications: ['100% GOTS Organic Cotton Canvas', 'Cross-stitched handles 65cm length', '2-color water-based screen printing'],
    packaging: '100 pcs per master carton',
    certifications: ['GOTS', 'FairTrade'],
    status: 'Negotiation',
    createdAt: '2026-09-15',
    responsesCount: 4,
    invitedSuppliers: ['EcoBags Ltd.', 'Atlas Textile Mills'],
    aiSummary: 'Under price negotiation with top supplier in Bangladesh to reach target price $2.95/unit.',
    assignedOwner: 'Sarah Jenkins'
  },
  {
    id: 'rfq-3',
    rfqNumber: 'RFQ-1850',
    title: '5,000 Waterproof Outdoor Softshell Jackets',
    product: 'Tri-layer Breathable Softshell Jackets',
    quantity: 5000,
    unit: 'pcs',
    targetPrice: 24.50,
    currency: 'USD',
    destinationCountry: 'Canada',
    destinationPort: 'Port of Montreal',
    requiredDeliveryDate: '2027-01-15',
    leadTimeDays: 60,
    specifications: ['10,000mm Waterproof Membrane', 'YKK Aquaguard Zippers', 'Taped Seams'],
    packaging: 'Individual hangtag with desiccant pouch',
    certifications: ['Bluesign Approved', 'ISO 9001'],
    status: 'Published',
    createdAt: '2026-09-30',
    responsesCount: 1,
    invitedSuppliers: ['Asia Cotton Export Joint Stock', 'Nordic Garment Works'],
    aiSummary: 'Awaiting 2 more quotation responses before AI comparative matrix compilation.',
    assignedOwner: 'Sarah Jenkins'
  }
];

export const MOCK_QUOTATIONS: Quotation[] = [
  {
    id: 'quote-1',
    quoteNumber: 'QUO-ABC-9821',
    rfqNumber: 'RFQ-2048',
    supplierId: 'sup-1',
    supplierName: 'ABC Textiles Ltd.',
    supplierCountry: 'India',
    unitPrice: 7.80,
    moq: 2000,
    leadTimeDays: 35,
    shippingTerms: 'FOB Mumbai Port',
    paymentTerms: '30% Advance, 70% against Bill of Lading (B/L)',
    totalCost: 78000,
    status: 'Accepted',
    aiScore: 96,
    aiAnalysis: {
      pros: [
        'Best overall value: $7.80/unit is 22% below your $10 budget limit',
        'Lead time of 35 days easily accommodates your 45-day deadline',
        'Full compliance with OEKO-TEX Standard 100 & GOTS certifications',
        'Includes pre-production sample approval in 7 business days'
      ],
      cons: [
        'FOB term requires buyer to arrange marine cargo freight from Mumbai ($3,400 est.)'
      ],
      landedCostDriver: 'Ocean Freight (~$0.34/unit) + Canadian Import Duty 17% (~$1.32/unit) = Total Landed Cost ~$9.46/unit',
      riskScore: 'Low',
      missingInfo: []
    },
    certificationsAttached: ['OEKO-TEX 100 Cert #IN-84920', 'GOTS Scope Certificate #CU-837194', 'ISO 9001:2015 Audit Report'],
    validUntil: '2026-10-25'
  },
  {
    id: 'quote-2',
    quoteNumber: 'QUO-PRIME-4412',
    rfqNumber: 'RFQ-2048',
    supplierId: 'sup-2',
    supplierName: 'Prime Garments India',
    supplierCountry: 'India',
    unitPrice: 8.40,
    moq: 3000,
    leadTimeDays: 40,
    shippingTerms: 'CIF Port of Montreal',
    paymentTerms: '50% Advance, 50% on Dispatch',
    totalCost: 84000,
    status: 'Pending Review',
    aiScore: 88,
    aiAnalysis: {
      pros: [
        'CIF terms include marine insurance and freight direct to Montreal',
        'WRAP Gold certified manufacturing facility'
      ],
      cons: [
        'Unit cost $8.40 is $0.60 higher per unit ($6,000 difference for order)',
        'Heavier cash flow impact (50% upfront deposit vs 30% standard)'
      ],
      landedCostDriver: 'Freight included. Import Duty 17% (~$1.43/unit) = Total Landed Cost ~$9.83/unit',
      riskScore: 'Medium',
      missingInfo: ['Shrinkage test lab report for 180 GSM batch pending']
    },
    certificationsAttached: ['WRAP Certificate #19283', 'BSCI Audit Score B'],
    validUntil: '2026-10-20'
  },
  {
    id: 'quote-3',
    quoteNumber: 'QUO-VN-7703',
    rfqNumber: 'RFQ-2048',
    supplierId: 'sup-3',
    supplierName: 'Asia Cotton Export Joint Stock',
    supplierCountry: 'Vietnam',
    unitPrice: 7.20,
    moq: 5000,
    leadTimeDays: 55,
    shippingTerms: 'FOB Port of Haiphong',
    paymentTerms: '100% Irrevocable Letter of Credit (L/C) at sight',
    totalCost: 72000,
    status: 'Pending Review',
    aiScore: 74,
    aiAnalysis: {
      pros: [
        'Lowest raw unit cost at $7.20 ($6,000 cheaper than ABC Textiles)'
      ],
      cons: [
        '⚠️ CRITICAL: 55-day lead time exceeds your strict 45-day required delivery schedule',
        '100% L/C at sight creates banking fee overhead (~$850)',
        'Custom woven label turnaround is 12 days extra'
      ],
      landedCostDriver: 'Ocean Freight Haiphong-Montreal (~$0.48/unit) + Tariff (CPTPP preferential rate 0% under rules of origin) = Total Landed Cost ~$7.68/unit',
      riskScore: 'High',
      missingInfo: ['Custom barcode packaging polybag spec confirmation missing']
    },
    certificationsAttached: ['ISO 9001', 'SA8000 Social Accountability'],
    validUntil: '2026-10-18'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'ORD-1024',
    rfqNumber: 'RFQ-2048',
    quoteNumber: 'QUO-ABC-9821',
    buyerName: 'Global Trade Imports Inc.',
    buyerCountry: 'Canada',
    supplierName: 'ABC Textiles Ltd.',
    supplierCountry: 'India',
    productName: '10,000 Units Premium Combed Cotton Shirts (180 GSM)',
    quantity: 10000,
    totalValue: 78000,
    paymentTerms: '30% Advance ($23,400 Paid), 70% against B/L',
    deliveryDate: '2026-11-17',
    destinationPort: 'Port of Montreal, QC, Canada',
    status: 'Shipment',
    stageNumber: 4,
    documentsCount: {
      total: 5,
      approved: 4,
      flagged: 1
    },
    shipmentId: 'SHIP-2048',
    timeline: [
      {
        title: 'Order Confirmed & Deposit Paid',
        date: '2026-09-29',
        completed: true,
        current: false,
        description: 'Purchase Order signed. 30% advance ($23,400) wire transferred to ABC Textiles.'
      },
      {
        title: 'Trade Documents Generated & OCR Validated',
        date: '2026-10-01',
        completed: true,
        current: false,
        description: 'Proforma, Packing List & Commercial Invoices processed by AI OCR engine.'
      },
      {
        title: 'Factory Production & Quality Inspection (QC Passed)',
        date: '2026-10-08',
        completed: true,
        current: false,
        description: '10,000 units spun, cut, stitched and boxed. AQL 2.5 inspection passed.'
      },
      {
        title: 'Container Loaded & Ocean Shipment (In Transit)',
        date: '2026-10-14',
        completed: false,
        current: true,
        description: 'Container #MRKU-8492019 departed Nhava Sheva (Mumbai). Currently sailing in Indian Ocean / Red Sea route.'
      },
      {
        title: 'Customs Clearance & Final Delivery',
        date: '2026-11-17 (Estimated)',
        completed: false,
        current: false,
        description: 'Pending arrival at Port of Montreal for CBSA customs release.'
      }
    ]
  },
  {
    id: 'ord-2',
    orderNumber: 'ORD-0988',
    rfqNumber: 'RFQ-1720',
    quoteNumber: 'QUO-TURK-109',
    buyerName: 'Global Trade Imports Inc.',
    buyerCountry: 'Canada',
    supplierName: 'Anatolia Garment Industries',
    supplierCountry: 'Turkey',
    productName: '1,500 Units Pima Cotton Oxford Dress Shirts',
    quantity: 1500,
    totalValue: 17700,
    paymentTerms: '100% Net 30 after delivery',
    deliveryDate: '2026-10-22',
    destinationPort: 'Toronto Pearson (Air Freight)',
    status: 'Delivered',
    stageNumber: 5,
    documentsCount: {
      total: 4,
      approved: 4,
      flagged: 0
    },
    shipmentId: 'SHIP-1904',
    timeline: [
      {
        title: 'Delivered & Stocked',
        date: '2026-09-26',
        completed: true,
        current: false,
        description: 'Order fully received at Toronto distribution warehouse.'
      }
    ]
  }
];

export const MOCK_DOCUMENTS: TradeDocument[] = [
  {
    id: 'doc-1',
    orderNumber: 'ORD-1024',
    type: 'Commercial Invoice',
    documentNumber: 'INV-ABC-9821',
    fileName: 'Commercial_Invoice_ORD-1024_ABC.pdf',
    uploadDate: '2026-10-01 09:15 AM',
    status: 'Approved',
    extractedFields: {
      'Invoice No': 'INV-ABC-9821',
      'Date': '2026-10-01',
      'Seller': 'ABC Textiles Ltd., Tirupur, India',
      'Buyer': 'Global Trade Imports Inc., Montreal, Canada',
      'Total Units': 10000,
      'Unit Price': '$7.80 USD',
      'Total Amount': '$78,000.00 USD',
      'Incoterm': 'FOB Nhava Sheva (Mumbai)',
      'HS Code': '6109.10.00 (Cotton T-Shirts)'
    },
    aiValidation: {
      isValid: true,
      severity: 'success',
      suggestedAction: 'Ready for customs filing'
    },
    version: 1,
    reviewedBy: 'AI Auto-Verification'
  },
  {
    id: 'doc-2',
    orderNumber: 'ORD-1024',
    type: 'Packing List',
    documentNumber: 'PL-ABC-9821',
    fileName: 'Packing_List_ORD-1024.pdf',
    uploadDate: '2026-10-01 09:18 AM',
    status: 'Needs Review',
    extractedFields: {
      'Packing List No': 'PL-ABC-9821',
      'Carton Count': '196 Cartons (50 pcs/ctn)',
      'Extracted Total Quantity': '9,800 pcs',
      'Gross Weight': '2,450 kg',
      'Net Weight': '2,200 kg',
      'Volume (CBM)': '14.8 CBM',
      'Container No': 'MRKU-8492019',
      'Seal No': 'MSK-774912'
    },
    aiValidation: {
      isValid: false,
      severity: 'warning',
      warningMessage: '⚠️ AI Discrepancy Flag: Packing List item sum states 9,800 units (196 cartons), whereas Commercial Invoice INV-ABC-9821 specifies 10,000 units (200 cartons). Missing 4 cartons (200 units / $1,560 value).',
      suggestedAction: 'Human Review required: Request revised Packing List from ABC Textiles or approve 9,800 pcs with credit note.'
    },
    version: 1,
    reviewedBy: 'Pending Human Approver'
  },
  {
    id: 'doc-3',
    orderNumber: 'ORD-1024',
    type: 'Bill of Lading',
    documentNumber: 'BL-MAEU-849201',
    fileName: 'Bill_Of_Lading_Maersk_SHIP-2048.pdf',
    uploadDate: '2026-10-02 11:30 AM',
    status: 'Verified',
    extractedFields: {
      'B/L Number': 'MAEU849201948',
      'Carrier': 'Maersk Line A/S',
      'Vessel / Voyage': 'MAERSK MC-KINNEY / 2604W',
      'Port of Loading': 'Nhava Sheva (INNSA), India',
      'Port of Discharge': 'Port of Montreal (CAMTR), Canada',
      'Container No': 'MRKU-8492019 (40ft High Cube)',
      'Freight': 'Prepaid / As Arranged'
    },
    aiValidation: {
      isValid: true,
      severity: 'success',
      suggestedAction: 'All carrier signatures and endorsement stamps verified.'
    },
    version: 1,
    reviewedBy: 'AI Document Vision Engine'
  },
  {
    id: 'doc-4',
    orderNumber: 'ORD-1024',
    type: 'Certificate of Origin',
    documentNumber: 'COO-EIC-2026-449',
    fileName: 'Certificate_of_Origin_India_Export.pdf',
    uploadDate: '2026-10-02 02:40 PM',
    status: 'Approved',
    extractedFields: {
      'Certificate No': 'COO-EIC-2026-449',
      'Issuing Body': 'Export Inspection Council of India',
      'Country of Origin': 'India',
      'Preferential Tariff Category': 'GSP Form A / Standard Duty',
      'Consignee': 'Global Trade Imports Inc.'
    },
    aiValidation: {
      isValid: true,
      severity: 'success',
      suggestedAction: 'Compliant with Canadian Border Services Agency (CBSA) origin rules.'
    },
    version: 1,
    reviewedBy: 'AI Auto-Verification'
  },
  {
    id: 'doc-5',
    orderNumber: 'ORD-1024',
    type: 'Proforma Invoice',
    documentNumber: 'PI-ABC-2048',
    fileName: 'Proforma_Invoice_Signed_PI2048.pdf',
    uploadDate: '2026-09-29 04:10 PM',
    status: 'Approved',
    extractedFields: {
      'PI Number': 'PI-ABC-2048',
      'Issued Date': '2026-09-29',
      'Amount': '$78,000.00 USD',
      'Buyer Signature': 'Sarah Jenkins (E-Signed)',
      'Supplier Stamp': 'ABC Textiles Authorised Signatory'
    },
    aiValidation: {
      isValid: true,
      severity: 'success',
      suggestedAction: 'Contract legally binding.'
    },
    version: 2,
    reviewedBy: 'Operations Legal Desk'
  }
];

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'ship-1',
    shipmentNumber: 'SHIP-2048',
    orderNumber: 'ORD-1024',
    carrier: 'Maersk Ocean Freight',
    vesselName: 'Maersk Mc-Kinney Moller (Voyage 2604W)',
    containerNumber: 'MRKU-8492019 (40ft HC)',
    originPort: 'Nhava Sheva (Mumbai), India',
    originCountry: 'India',
    destinationPort: 'Port of Montreal, QC, Canada',
    destinationCountry: 'Canada',
    etd: '2026-10-12',
    eta: '2026-11-15',
    revisedEta: '2026-11-17',
    status: 'In Transit',
    progressPercentage: 48,
    hasException: true,
    exceptionDetails: {
      type: 'Transshipment Port Congestion Delay',
      severity: 'medium',
      message: '⚠️ 2-Day Delay Alert: Vessel delayed at Port of Tangier transshipment hub due to adverse North Atlantic storm swells. Estimated arrival updated from Nov 15 to Nov 17.',
      recommendedAction: 'Send automated AI-prepared shipment advisory to Global Trade Imports logistics receiving department.',
      draftCustomerMessage: 'Dear Global Trade Imports Team, Please be advised that Container MRKU-8492019 for Order ORD-1024 is currently en route via Maersk Line. Due to heavy swells at the Mediterranean transshipment hub, the revised estimated vessel arrival in Montreal is Nov 17, 2026 (2 days variance). All customs documentation is pre-cleared. We will keep you updated.'
    },
    milestones: [
      {
        name: 'Factory Gate Dispatch & Port Gating',
        location: 'Tirupur → Nhava Sheva Terminal',
        date: '2026-10-10 14:00',
        completed: true,
        current: false
      },
      {
        name: 'Indian Export Customs Clearance & Loading',
        location: 'Jawaharlal Nehru Port Trust (JNPT)',
        date: '2026-10-12 18:30',
        completed: true,
        current: false
      },
      {
        name: 'Vessel In Transit (Ocean Passage)',
        location: 'Arabian Sea → Mediterranean Sea Route',
        date: '2026-10-14 (Current Location)',
        completed: false,
        current: true
      },
      {
        name: 'Port of Montreal Arrival & CBSA Customs Filing',
        location: 'Cast Terminal, Port of Montreal',
        date: '2026-11-17 (Revised ETA)',
        completed: false,
        current: false
      },
      {
        name: 'Final Door Drayage Delivery',
        location: 'Global Trade Imports Central Distribution, QC',
        date: '2026-11-18 (Est.)',
        completed: false,
        current: false
      }
    ]
  },
  {
    id: 'ship-2',
    shipmentNumber: 'SHIP-1904',
    orderNumber: 'ORD-0988',
    carrier: 'Lufthansa Cargo Air',
    vesselName: 'LH Cargo Flight 8220',
    containerNumber: 'AWB #020-84910283',
    originPort: 'Istanbul (IST), Turkey',
    originCountry: 'Turkey',
    destinationPort: 'Toronto Pearson (YYZ), Canada',
    destinationCountry: 'Canada',
    etd: '2026-09-24',
    eta: '2026-09-26',
    status: 'Delivered',
    progressPercentage: 100,
    hasException: false,
    milestones: [
      {
        name: 'Air Cargo Uplifted',
        location: 'Istanbul Airport',
        date: '2026-09-24',
        completed: true,
        current: false
      },
      {
        name: 'Delivered to Consignee',
        location: 'Toronto Warehouse',
        date: '2026-09-26',
        completed: true,
        current: true
      }
    ]
  }
];

export const MOCK_CRM_LEADS: CRMLead[] = [
  {
    id: 'lead-1',
    companyName: 'Nordic Apparel Group',
    contactPerson: 'Henrik Lindqvist',
    country: 'Sweden',
    email: 'h.lindqvist@nordicapparel.se',
    source: 'Marketplace Inbound',
    stage: 'Negotiation',
    dealValue: 145000,
    aiScore: 94,
    aiInsights: 'High buying intent: Viewed 4 organic cotton supplier catalogs 18 times this week. Requested bulk sample pack.',
    lastContactDate: '2026-09-30',
    nextFollowUpDate: '2026-10-03',
    owner: 'Sarah Jenkins',
    recommendedAction: 'Send revised CIF Gothenburg quotation with 5% volume tier discount.'
  },
  {
    id: 'lead-2',
    companyName: 'EuroRetail Corp',
    contactPerson: 'Claire Dubois',
    country: 'France',
    email: 'c.dubois@euroretail.fr',
    source: 'RFQ-2048 Sourcing Network',
    stage: 'Quotation',
    dealValue: 88000,
    aiScore: 86,
    aiInsights: 'Looking for fast 30-day turnaround woven shirts. Good match for Turkish & Indian verified suppliers.',
    lastContactDate: '2026-09-29',
    nextFollowUpDate: '2026-10-02',
    owner: 'Sarah Jenkins',
    recommendedAction: 'Send comparison breakdown for OEKO-TEX certified cotton lines.'
  },
  {
    id: 'lead-3',
    companyName: 'Pacific Merchandising Ltd.',
    contactPerson: 'David Wong',
    country: 'Australia',
    email: 'd.wong@pacificmerch.com.au',
    source: 'AI Trade Assistant Inquiry',
    stage: 'Qualified',
    dealValue: 62000,
    aiScore: 79,
    aiInsights: 'Looking for 15,000 units canvas totes for Q1 promo campaign.',
    lastContactDate: '2026-09-28',
    nextFollowUpDate: '2026-10-04',
    owner: 'Marcus Vance',
    recommendedAction: 'Invite to publish structured RFQ on marketplace.'
  },
  {
    id: 'lead-4',
    companyName: 'Apex Fashion Brands',
    contactPerson: 'Jessica Meyer',
    country: 'United States',
    email: 'jmeyer@apexfashion.us',
    source: 'Direct Web Portal',
    stage: 'Won',
    dealValue: 210000,
    aiScore: 98,
    aiInsights: 'Repeat tier-1 buyer. Contract renewed for Fall/Winter apparel lines.',
    lastContactDate: '2026-09-27',
    nextFollowUpDate: '2026-10-15',
    owner: 'Sarah Jenkins',
    recommendedAction: 'Schedule quarterly production capacity review.'
  }
];

export const MOCK_HITL_TASKS: HITLTask[] = [
  {
    id: 'hitl-1',
    type: 'Document Discrepancy',
    title: 'Packing List Quantity Mismatch on ORD-1024',
    severity: 'high',
    referenceId: 'ORD-1024 (PL-ABC-9821)',
    assignedRole: 'Operations Specialist',
    description: 'AI OCR detected 9,800 pcs in Packing List vs 10,000 pcs in Commercial Invoice. 200 units unaccounted ($1,560 value).',
    aiSuggestion: 'Request ABC Textiles to issue amended PL-ABC-9821 v2 with correct carton count (200 cartons) before customs declaration.',
    status: 'Pending Action',
    timestamp: '2 hours ago'
  },
  {
    id: 'hitl-2',
    type: 'Shipment Escalation',
    title: '2-Day Storm Delay Advisory for SHIP-2048',
    severity: 'medium',
    referenceId: 'SHIP-2048 (Maersk Voyage 2604W)',
    assignedRole: 'Trade Support Team',
    description: 'Vessel transshipment delay at Tangier Port. AI generated automated customer notice draft.',
    aiSuggestion: 'Review and approve AI-generated delay notification email to Global Trade Imports receiving warehouse.',
    status: 'Pending Action',
    timestamp: '4 hours ago'
  },
  {
    id: 'hitl-3',
    type: 'Supplier Verification',
    title: 'Renew GOTS Organic Certificate for Prime Garments',
    severity: 'low',
    referenceId: 'Prime Garments India (sup-2)',
    assignedRole: 'Compliance Officer',
    description: 'Annual GOTS certificate renewal submitted by supplier. AI vision verified stamp and barcode validity.',
    aiSuggestion: 'One-click approve supplier verified badge extension for 12 months.',
    status: 'Pending Action',
    timestamp: '1 day ago'
  },
  {
    id: 'hitl-4',
    type: 'Quote Deviation',
    title: 'Asia Cotton Export Lead Time Exceeds RFQ Deadline',
    severity: 'medium',
    referenceId: 'RFQ-2048 (QUO-VN-7703)',
    assignedRole: 'Buyer Sourcing Lead',
    description: 'Supplier submitted 55-day lead time when RFQ required max 45 days. Unit cost is very attractive at $7.20.',
    aiSuggestion: 'Negotiate express sea freight split or decline offer in comparison matrix.',
    status: 'Resolved',
    timestamp: '2 days ago'
  }
];

export const DEMO_TOUR_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'Buyer Logs In',
    screen: 'login',
    description: 'Enterprise login screen with quick 1-click role switcher (Buyer: Global Trade Imports, Canada).',
    actionText: 'Click "Login as Buyer (Demo)"',
    targetExplanation: 'Starts the walkthrough with a clean, branded enterprise portal.'
  },
  {
    stepNumber: 2,
    title: 'Main Dashboard & Executive Briefing',
    screen: 'dashboard',
    description: 'Live overview of active RFQs, quotes, order progress, shipment alerts and AI management summary.',
    actionText: 'Click "AI Trade Assistant" or "Ask AI"',
    targetExplanation: 'Shows key trade KPIs and surfaces real-time trade signals.'
  },
  {
    stepNumber: 3,
    title: 'AI Conversational Sourcing Query',
    screen: 'ai-assistant',
    description: 'Enter: "I need 10,000 cotton shirts from India, target price under $10, delivery within 45 days."',
    actionText: 'Click the suggested prompt chip or type in the query',
    targetExplanation: 'AI transforms ambiguous human requirements into structured export specifications.'
  },
  {
    stepNumber: 4,
    title: 'AI Structures Requirement & Matches Suppliers',
    screen: 'ai-assistant',
    description: 'AI displays structured sourcing criteria and ranks top verified suppliers with match percentages and reasoning.',
    actionText: 'Click "View ABC Textiles Profile" or "Request Quote"',
    targetExplanation: 'Shows 98% match for ABC Textiles with transparent reasoning.'
  },
  {
    stepNumber: 5,
    title: 'Explore B2B Marketplace & Supplier Profile',
    screen: 'marketplace',
    description: 'Browse verified global suppliers with rich multi-attribute filters, ESG ratings and capacity metrics.',
    actionText: 'Click "Create RFQ for 10k Shirts"',
    targetExplanation: 'Demonstrates deep catalog search and company verification badges.'
  },
  {
    stepNumber: 6,
    title: 'Create & AI-Structure RFQ-2048',
    screen: 'create-rfq',
    description: 'AI assists in generating detailed packaging, GSM specs, target price ($10), and matching 3 suppliers.',
    actionText: 'Click "Publish RFQ & Send to Suppliers"',
    targetExplanation: 'Creates RFQ-2048 with one click and notifies suppliers.'
  },
  {
    stepNumber: 7,
    title: 'RFQ Management Pipeline',
    screen: 'rfqs',
    description: 'View active RFQs, countdown timers, response statuses and automated supplier follow-up tracking.',
    actionText: 'Click "Compare 3 Quotations (RFQ-2048)"',
    targetExplanation: 'Tracks buyer requests through their lifecycle.'
  },
  {
    stepNumber: 8,
    title: 'AI Quotation Comparison Matrix',
    screen: 'quotations',
    description: 'Compare ABC Textiles ($7.80), Prime Garments ($8.40) & Asia Cotton ($7.20). AI highlights landed cost & lead-time risks.',
    actionText: 'Click "Accept Quote & Create Order (ABC Textiles)"',
    targetExplanation: 'Empowers buyers with deep financial & risk breakdown.'
  },
  {
    stepNumber: 9,
    title: 'Order Management (ORD-1024 / $78,000)',
    screen: 'orders',
    description: 'Complete 5-stage order lifecycle: Confirmed → Documents → Production → Shipment → Delivered.',
    actionText: 'Click "View AI Trade Documents"',
    targetExplanation: 'Centralized control room for the $78,000 production run.'
  },
  {
    stepNumber: 10,
    title: 'AI Document Management & OCR Verification',
    screen: 'documents',
    description: 'Simulated OCR extraction on Commercial Invoice, Bill of Lading and Packing List.',
    actionText: 'Click "Inspect Packing List Discrepancy"',
    targetExplanation: 'Shows OCR data extraction and document validation.'
  },
  {
    stepNumber: 11,
    title: 'Human-In-The-Loop Exception Triage',
    screen: 'admin',
    description: 'AI flags 9,800 units in Packing List vs 10,000 units on Invoice and routes to human reviewer for approval.',
    actionText: 'Click "Approve Resolution / Track Shipment"',
    targetExplanation: 'Demonstrates where human judgement governs critical exceptions.'
  },
  {
    stepNumber: 12,
    title: 'Shipment Tracking (SHIP-2048 Ocean Freight)',
    screen: 'shipments',
    description: 'Live milestone map for Container #MRKU-8492019 (Mumbai → Montreal). 2-day weather delay alert surfaced.',
    actionText: 'Click "Send AI-Prepared Customer Update"',
    targetExplanation: 'Proactive logistics exception handling.'
  },
  {
    stepNumber: 13,
    title: 'CRM / Lead Pipeline & Automated Follow-ups',
    screen: 'crm',
    description: 'Manage buyer leads, automated AI follow-up drafts, and deal score calculations.',
    actionText: 'Click "View Trade Analytics"',
    targetExplanation: 'Shows commercial sales and negotiation automation.'
  },
  {
    stepNumber: 14,
    title: 'Trade Intelligence & Analytics',
    screen: 'analytics',
    description: 'Interactive charts: RFQ conversion funnel, order value by country, shipment delays, and AI automation rates.',
    actionText: 'Click "Admin & Operations Center"',
    targetExplanation: 'C-level executive analytics and AI efficiency metrics.'
  },
  {
    stepNumber: 15,
    title: 'Admin, Verification & HITL Queue',
    screen: 'admin',
    description: 'Full administrative control over user verification, audit logs, AI confidence thresholds and team roles.',
    actionText: 'Click "Return to Dashboard"',
    targetExplanation: 'Enterprise-grade governance and security.'
  },
  {
    stepNumber: 16,
    title: 'Journey Complete - Live Operating System',
    screen: 'dashboard',
    description: 'Demonstrated complete end-to-end journey from sourcing prompt to shipment arrival and exceptions!',
    actionText: 'Restart Demo or Explore Freely',
    targetExplanation: 'Full clickable prototype ready for client presentation.'
  }
];
