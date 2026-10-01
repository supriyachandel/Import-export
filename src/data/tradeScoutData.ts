import { ProspectCompany, ProspectContact, ResearchSession, SavedLead, DemoStep } from '../types';

export const TRADE_SCOUT_MODULES = [
  {
    id: 'market-scout',
    name: 'Market Scout',
    role: 'Market Discovery & Trade Intelligence',
    description: 'Scans customs filings, commercial import directories, port bills of lading, and industry registries across the target market.',
    icon: 'Globe'
  },
  {
    id: 'company-researcher',
    name: 'Company Researcher',
    role: 'Profile & Trade Flow Deep-Dive',
    description: 'Analyzes company business models, product catalog alignment, past supplier origin countries, and recurring shipment frequency.',
    icon: 'Building2'
  },
  {
    id: 'contact-scout',
    name: 'Contact Scout',
    role: 'Decision-Maker Intelligence',
    description: 'Discovers verified procurement heads, commercial directors, and technical sourcing managers with decision authority.',
    icon: 'Users'
  },
  {
    id: 'verification-scout',
    name: 'Verification Scout',
    role: 'Evidence & Integrity Audit',
    description: 'Cross-checks registry filings, active tax pins, trade association memberships, and flags data points requiring human verification.',
    icon: 'ShieldCheck'
  },
  {
    id: 'analyst',
    name: 'Analyst Copilot',
    role: 'Commercial Fit & Synthesis',
    description: 'Synthesizes market data to rank prospects, explain qualification rationale, and generate actionable outreach talking points.',
    icon: 'Sparkles'
  }
];

export const KENYA_REFRIGERATION_PROSPECTS: ProspectCompany[] = [
  {
    id: 'prsp-1',
    name: 'AfriCool Logistics & Commercial Equipment Ltd',
    country: 'Kenya',
    city: 'Nairobi (Industrial Area, Enterprise Rd)',
    companyType: 'Import Distributor',
    productRelevance: 'Highly Relevant',
    relevanceScore: 98,
    importActivity: 'Active (Last shipment 14 days ago)',
    importFrequency: 'High (Monthly+)',
    approxVolume: '$650k - $1.2M / year',
    sourcingCountries: ['China', 'India', 'Turkey', 'Italy'],
    website: 'https://www.africool-kenya.co.ke',
    verificationStatus: 'Verified Importer',
    whyThisCompany: 'High relevance because this company shows recurring monthly import activity for commercial display chillers, walk-in cold rooms, and supermarket condensing units across East Africa with an established distribution network of 140+ retail and hospitality accounts.',
    whatNeedsVerification: [
      'Current warehouse stock capacity in Nairobi vs Mombasa bonded facility',
      'Exclusive distributor agreements with existing European compressor brands',
      'Direct contact phone number for Head of Procurement'
    ],
    overview: 'AfriCool is a leading Kenyan turnkey refrigeration distributor established in 2011. They supply, install, and service commercial cold chain infrastructure for supermarket chains (Naivas, Quickmart), agro-processors, and beverage distributors throughout Kenya and Uganda.',
    productsHandled: [
      'Commercial Multideck Display Chillers (1.8m - 3.75m)',
      'Island Display Freezers & Glass Top Chests',
      'Walk-In Modular Cold Rooms (-25°C to +4°C)',
      'Semi-Hermetic Condensing Units & Evaporators',
      'R404A / R290 Eco-friendly Commercial Coolers'
    ],
    importHistorySummary: 'Recorded 34 maritime container consignments in past 24 months via Port of Mombasa. Major suppliers based in Ningbo (China), Pune (India), and Izmir (Turkey). Steady quarterly growth of 22% in commercial display units.',
    companySignals: [
      '✓ Active KRA Tax Compliance Pin & Registered Import License #IMP-77821',
      '✓ Major supplier to 3 national supermarket chains in Kenya',
      '✓ Operates dedicated 35,000 sq ft technical assembly warehouse in Nairobi',
      '✓ Member of Kenya Association of Manufacturers (KAM)'
    ],
    contacts: [
      {
        id: 'cnt-1',
        name: 'John Kamau',
        role: 'Head of Technical Procurement & Sourcing',
        company: 'AfriCool Logistics & Commercial Equipment Ltd',
        department: 'Procurement & Imports',
        contactAvailability: 'Verified Available',
        verificationStatus: 'Verified',
        emailDemo: 'j.kamau@africool-kenya.co.ke (Demo Data)',
        phoneDemo: '+254 722 849 *** (Demo Data)',
        decisionPower: 'High (Procurement/Signer)'
      },
      {
        id: 'cnt-2',
        name: 'Mary Wanjiku',
        role: 'Commercial & Sales Director',
        company: 'AfriCool Logistics & Commercial Equipment Ltd',
        department: 'Commercial Strategy',
        contactAvailability: 'Verified Available',
        verificationStatus: 'Verified',
        emailDemo: 'm.wanjiku@africool-kenya.co.ke (Demo Data)',
        phoneDemo: '+254 733 192 *** (Demo Data)',
        decisionPower: 'High (Procurement/Signer)'
      },
      {
        id: 'cnt-3',
        name: 'Peter Omondi',
        role: 'Senior Cold Chain Project Engineer',
        company: 'AfriCool Logistics & Commercial Equipment Ltd',
        department: 'Engineering & QA',
        contactAvailability: 'Likely Match',
        verificationStatus: 'Public Record',
        decisionPower: 'Medium (Technical Reviewer)'
      }
    ],
    sources: [
      { title: 'Kenya Revenue Authority (KRA) Trade Manifest Digest', type: 'Customs Filing', date: 'Sept 2026', verified: true },
      { title: 'Port of Mombasa Bill of Lading Ledger (B/L #MSK98201)', type: 'Trade Manifest', date: 'Aug 2026', verified: true },
      { title: 'Kenya Business Registry Verification Record #CPR/2011/5829', type: 'Business Registry', date: 'Verified 2026', verified: true },
      { title: 'Official Corporate Portal & Product Catalog', type: 'Company Website', date: 'Live 2026', verified: true }
    ],
    potentialOpportunity: 'AfriCool is actively expanding its supplier roster for 2027 to source competitive, high-durability commercial display coolers to meet surging demand from tier-2 Kenyan retail stores.',
    savedAsLead: true
  },
  {
    id: 'prsp-2',
    name: 'Nairobi Cold Storage & HVAC Solutions Ltd',
    country: 'Kenya',
    city: 'Nairobi (Mombasa Road Corridor)',
    companyType: 'Import Distributor',
    productRelevance: 'Highly Relevant',
    relevanceScore: 95,
    importActivity: 'Active (Last shipment 28 days ago)',
    importFrequency: 'High (Monthly+)',
    approxVolume: '$500k - $950k / year',
    sourcingCountries: ['India', 'China', 'Germany'],
    website: 'https://www.nairobicoldstorage.co.ke',
    verificationStatus: 'Verified Importer',
    whyThisCompany: 'Strong commercial distributor with recurring import volume in industrial cooling compressors, beverage display cabinets, and supermarket reach-in chillers for retail supermarket chains.',
    whatNeedsVerification: [
      'Credit terms preferred (Letter of Credit vs 30% advance deposit)',
      'Lead time requirements for high-season December retail inventory orders'
    ],
    overview: 'Specializes in HVAC-R supply and refrigeration engineering projects for hospitality, food retail, and pharmaceutical temperature-controlled warehouses across Kenya.',
    productsHandled: ['Supermarket Display Chillers', 'Condensing Units', 'Compressors', 'Insulated PUF Panels'],
    importHistorySummary: '19 shipments logged in 2025-2026. Consistent sourcing from Nhava Sheva (India) and Shanghai (China).',
    companySignals: [
      '✓ Official contractor for 4 hotel groups in Nairobi & Coast',
      '✓ Dedicated fleet of 18 field installation vehicles'
    ],
    contacts: [
      {
        id: 'cnt-4',
        name: 'David Ochieng',
        role: 'Procurement & Import Manager',
        company: 'Nairobi Cold Storage & HVAC Solutions Ltd',
        department: 'Supply Chain',
        contactAvailability: 'Verified Available',
        verificationStatus: 'Verified',
        emailDemo: 'd.ochieng@nairobicoldstorage.co.ke (Demo Data)',
        decisionPower: 'High (Procurement/Signer)'
      }
    ],
    sources: [
      { title: 'East Africa Customs Electronic Network', type: 'Customs Filing', date: 'Aug 2026', verified: true },
      { title: 'Kenya National Chamber of Commerce & Industry (KNCCI)', type: 'Business Registry', date: '2026', verified: true }
    ],
    potentialOpportunity: 'Looking to diversify away from high-cost European units by partnering with direct manufacturers offering OEM branding.',
    savedAsLead: true
  },
  {
    id: 'prsp-3',
    name: 'Equator Refrigeration & Supermarket Fixtures',
    country: 'Kenya',
    city: 'Mombasa (Nyali Industrial Zone)',
    companyType: 'Wholesale Integrator',
    productRelevance: 'Highly Relevant',
    relevanceScore: 92,
    importActivity: 'Active (Last shipment 35 days ago)',
    importFrequency: 'Moderate (Quarterly)',
    approxVolume: '$400k - $750k / year',
    sourcingCountries: ['China', 'India', 'UAE'],
    website: 'https://www.equator-refrigeration.ke',
    verificationStatus: 'Verified Importer',
    whyThisCompany: 'Prime coastal distributor supplying supermarket chains, resorts, and meat processing facilities along the Kenya-Tanzania border corridor.',
    whatNeedsVerification: [
      'Specific voltage & tropicalized ambient temperature (+43°C) technical compliance requirements'
    ],
    overview: 'Established 2014 in Mombasa, Equator Refrigeration imports and distributes heavy-duty commercial cooling equipment suited for tropical coastal climates.',
    productsHandled: ['Tropicalized Upright Freezers', 'Butchery Display Chillers', 'Blast Freezers', 'Ice Machines'],
    importHistorySummary: 'Direct recipient of 14 x 40ft HC containers at Mombasa port in 2025/2026.',
    companySignals: ['✓ Direct proximity to Port of Mombasa', '✓ Authorized service center for 6 global brands'],
    contacts: [
      {
        id: 'cnt-5',
        name: 'Fatima Hassan',
        role: 'Managing Director & Key Buyer',
        company: 'Equator Refrigeration & Supermarket Fixtures',
        department: 'Executive Management',
        contactAvailability: 'Verified Available',
        verificationStatus: 'Verified',
        emailDemo: 'f.hassan@equator-refrigeration.ke (Demo Data)',
        decisionPower: 'High (Procurement/Signer)'
      }
    ],
    sources: [
      { title: 'Port of Mombasa Inward Manifest', type: 'Trade Manifest', date: 'July 2026', verified: true }
    ],
    potentialOpportunity: 'Seeking factory-direct container pricing on tropicalized double-door glass coolers.',
    savedAsLead: false
  },
  {
    id: 'prsp-4',
    name: 'Great Rift Cooling Systems Ltd',
    country: 'Kenya',
    city: 'Nakuru (Agricultural Hub)',
    companyType: 'Engineering Contractor',
    productRelevance: 'Relevant',
    relevanceScore: 89,
    importActivity: 'Active (Last shipment 45 days ago)',
    importFrequency: 'Moderate (Quarterly)',
    approxVolume: '$300k - $600k / year',
    sourcingCountries: ['India', 'Turkey', 'China'],
    website: 'https://www.greatriftcooling.co.ke',
    verificationStatus: 'Registered Business',
    whyThisCompany: 'Serves flower exporters and dairy cooperatives throughout the Rift Valley requiring post-harvest pre-coolers and cold rooms.',
    whatNeedsVerification: ['Payment terms stability', 'Secondary contact for technical drawings'],
    overview: 'Supplies horticultural cold storage units, milk cooling tanks, and commercial display cases in Nakuru, Naivasha, and Eldoret.',
    productsHandled: ['Milk Chillers', 'Pre-cooling Evaporators', 'Commercial Refrigeration Units'],
    importHistorySummary: '8 import declarations logged over 18 months.',
    companySignals: ['✓ Key supplier to Kenya Dairy Farmers Cooperatives'],
    contacts: [
      {
        id: 'cnt-6',
        name: 'Samuel Kiprop',
        role: 'Technical Sourcing Lead',
        company: 'Great Rift Cooling Systems Ltd',
        department: 'Operations',
        contactAvailability: 'Likely Match',
        verificationStatus: 'Public Record',
        decisionPower: 'Medium (Technical Reviewer)'
      }
    ],
    sources: [
      { title: 'Kenya Agro-Processing Suppliers Directory', type: 'Business Directory', date: '2026', verified: true }
    ],
    potentialOpportunity: 'High demand for affordable milk cooling tanks and commercial walk-ins.',
    savedAsLead: false
  },
  {
    id: 'prsp-5',
    name: 'Safari Commercial Kitchens & Coolers Ltd',
    country: 'Kenya',
    city: 'Nairobi (Westlands)',
    companyType: 'Direct Importer & Retailer',
    productRelevance: 'Relevant',
    relevanceScore: 88,
    importActivity: 'Active (Last shipment 20 days ago)',
    importFrequency: 'High (Monthly+)',
    approxVolume: '$550k - $900k / year',
    sourcingCountries: ['China', 'Italy', 'India'],
    website: 'https://www.safarikitchenske.com',
    verificationStatus: 'Verified Importer',
    whyThisCompany: 'Premier hospitality equipment supplier providing undercounter chillers, bar coolers, and display cases to 200+ restaurants and safari lodges.',
    whatNeedsVerification: ['Custom stainless steel grade preferences (SS304 vs SS201)'],
    overview: 'High-end foodservice equipment importer with a major showroom in Nairobi Westlands.',
    productsHandled: ['Undercounter Refrigerators', 'Cake Display Showcases', 'Chest Freezers', 'Wine Coolers'],
    importHistorySummary: '22 shipments recorded in past 2 years.',
    companySignals: ['✓ Preferred supplier for international hotel franchises in East Africa'],
    contacts: [
      {
        id: 'cnt-7',
        name: 'Grace Mutua',
        role: 'Purchasing & Logistics Director',
        company: 'Safari Commercial Kitchens & Coolers Ltd',
        department: 'Procurement',
        contactAvailability: 'Verified Available',
        verificationStatus: 'Verified',
        emailDemo: 'g.mutua@safarikitchenske.com (Demo Data)',
        decisionPower: 'High (Procurement/Signer)'
      }
    ],
    sources: [
      { title: 'Kenya Commercial Importers Registry', type: 'Business Registry', date: '2026', verified: true }
    ],
    potentialOpportunity: 'Immediate requirement for commercial curved glass display showcases.',
    savedAsLead: false
  },
  {
    id: 'prsp-6',
    name: 'Kenya Dairy & Agro-Coolers Alliance Ltd',
    country: 'Kenya',
    city: 'Eldoret',
    companyType: 'Wholesale Integrator',
    productRelevance: 'Relevant',
    relevanceScore: 86,
    importActivity: 'Active (Last shipment 60 days ago)',
    importFrequency: 'Moderate (Quarterly)',
    approxVolume: '$350k - $700k / year',
    sourcingCountries: ['India', 'Turkey'],
    website: 'https://www.kenyadairycoolers.co.ke',
    verificationStatus: 'Registered Business',
    whyThisCompany: 'Specializes in bulk milk chillers, cold chain transport refrigeration units, and rural off-grid solar cooling equipment.',
    whatNeedsVerification: ['Solar direct-drive inverter compatibility for units'],
    overview: 'Focuses on agri-food preservation and dairy cooling infrastructure across Western Kenya.',
    productsHandled: ['Bulk Milk Coolers', 'Solar Cold Rooms', 'Condensing Sets'],
    importHistorySummary: '11 import consignments in 24 months.',
    companySignals: ['✓ Partnered with USAID Kenya Agri-Cold Program'],
    contacts: [
      {
        id: 'cnt-8',
        name: 'Ezekiel Cheruiyot',
        role: 'General Manager of Procurement',
        company: 'Kenya Dairy & Agro-Coolers Alliance Ltd',
        department: 'Supply Chain',
        contactAvailability: 'Likely Match',
        verificationStatus: 'Public Record',
        decisionPower: 'High (Procurement/Signer)'
      }
    ],
    sources: [{ title: 'KRA Import Electronic Portal', type: 'Customs Filing', date: '2026', verified: true }],
    potentialOpportunity: 'Tender open for 50 units modular cold storage boxes.',
    savedAsLead: false
  },
  {
    id: 'prsp-7',
    name: 'Summit Supermarket Refrigeration East Africa',
    country: 'Kenya',
    city: 'Nairobi (Sameer Industrial Park)',
    companyType: 'Import Distributor',
    productRelevance: 'Highly Relevant',
    relevanceScore: 94,
    importActivity: 'Active (Last shipment 18 days ago)',
    importFrequency: 'High (Monthly+)',
    approxVolume: '$700k - $1.4M / year',
    sourcingCountries: ['China', 'India', 'Germany', 'Spain'],
    website: 'https://www.summitrefrigeration-ea.com',
    verificationStatus: 'Verified Importer',
    whyThisCompany: 'Large-scale distributor supplying supermarket multidecks, island freezers, and remote compressor racks across Kenya, Rwanda, and Uganda.',
    whatNeedsVerification: ['Warranty support obligations and spare parts consignment terms'],
    overview: 'Dedicated retail refrigeration powerhouse handling full turnkey store installations.',
    productsHandled: ['Remote Multideck Display Chillers', 'Plug-in Freezers', 'Centralized Compressor Racks'],
    importHistorySummary: '42 maritime containers imported in last 24 months.',
    companySignals: ['✓ Authorized installer for East African supermarket conglomerates'],
    contacts: [
      {
        id: 'cnt-9',
        name: 'Alex Kariuki',
        role: 'Head of Global Sourcing',
        company: 'Summit Supermarket Refrigeration East Africa',
        department: 'Global Sourcing',
        contactAvailability: 'Verified Available',
        verificationStatus: 'Verified',
        emailDemo: 'a.kariuki@summitrefrigeration-ea.com (Demo Data)',
        decisionPower: 'High (Procurement/Signer)'
      }
    ],
    sources: [{ title: 'Port of Mombasa Bill of Lading Log', type: 'Trade Manifest', date: 'Aug 2026', verified: true }],
    potentialOpportunity: 'Looking to replace European supplier with cost-efficient Indian/Asian partner.',
    savedAsLead: true
  },
  {
    id: 'prsp-8',
    name: 'Kilimanjaro Industrial Refrigeration Co.',
    country: 'Kenya',
    city: 'Nairobi',
    companyType: 'Engineering Contractor',
    productRelevance: 'Relevant',
    relevanceScore: 85,
    importActivity: 'Active (Last shipment 50 days ago)',
    importFrequency: 'Moderate (Quarterly)',
    approxVolume: '$400k - $800k / year',
    sourcingCountries: ['China', 'India'],
    website: 'https://www.kilimanjarocooling.ke',
    verificationStatus: 'Verified Importer',
    whyThisCompany: 'Constructs heavy industrial cold storage facilities for fruit and vegetable exporters.',
    whatNeedsVerification: ['R404A phase-down timeline compliance'],
    overview: 'Engineering and equipment firm specializing in massive multi-room cold storages.',
    productsHandled: ['Industrial Evaporators', 'Screw Compressors', 'Air-Cooled Condensers'],
    importHistorySummary: '15 shipments recorded.',
    companySignals: ['✓ 15 years in Kenyan market'],
    contacts: [
      {
        id: 'cnt-10',
        name: 'Bernard Njoroge',
        role: 'Chief Engineer & Buyer',
        company: 'Kilimanjaro Industrial Refrigeration Co.',
        department: 'Engineering',
        contactAvailability: 'Contact info not verified',
        verificationStatus: 'Unverified',
        decisionPower: 'High (Procurement/Signer)'
      }
    ],
    sources: [{ title: 'East Africa Directory of Industrial Engineers', type: 'Business Directory', date: '2026', verified: true }],
    potentialOpportunity: 'Expanding cold storage facilities near Jomo Kenyatta Airport.',
    savedAsLead: false
  },
  {
    id: 'prsp-9',
    name: 'Pan-Africa Beverage Dispensing & Coolers',
    country: 'Kenya',
    city: 'Kisumu',
    companyType: 'Import Distributor',
    productRelevance: 'Relevant',
    relevanceScore: 84,
    importActivity: 'Active (Last shipment 40 days ago)',
    importFrequency: 'Moderate (Quarterly)',
    approxVolume: '$300k - $550k / year',
    sourcingCountries: ['India', 'China'],
    website: 'https://www.panafricabeveragecoolers.co.ke',
    verificationStatus: 'Registered Business',
    whyThisCompany: 'Supplies single-door and double-door glass merchandiser chillers to bottling depots and beverage companies.',
    whatNeedsVerification: ['Custom LED branding canopy requirements'],
    overview: 'Regional distributor for beverage display coolers in Western Kenya.',
    productsHandled: ['Glass Door Beverage Merchandisers', 'Draft Beer Coolers'],
    importHistorySummary: '10 containers imported in 2025/2026.',
    companySignals: ['✓ Strong logistics footprint in Lake Victoria region'],
    contacts: [
      {
        id: 'cnt-11',
        name: 'George Otieno',
        role: 'Procurement Officer',
        company: 'Pan-Africa Beverage Dispensing & Coolers',
        department: 'Purchasing',
        contactAvailability: 'Likely Match',
        verificationStatus: 'Public Record',
        decisionPower: 'Medium (Technical Reviewer)'
      }
    ],
    sources: [{ title: 'KRA Customs Database', type: 'Customs Filing', date: '2026', verified: true }],
    potentialOpportunity: 'Preparing tender for 200 retail bottle chillers.',
    savedAsLead: false
  },
  {
    id: 'prsp-10',
    name: 'Apex Marine Refrigeration Ltd',
    country: 'Kenya',
    city: 'Mombasa',
    companyType: 'Engineering Contractor',
    productRelevance: 'Relevant',
    relevanceScore: 82,
    importActivity: 'Active (Last shipment 70 days ago)',
    importFrequency: 'Occasional',
    approxVolume: '$250k - $500k / year',
    sourcingCountries: ['India', 'UAE'],
    website: 'https://www.apexmarinerefrigeration.ke',
    verificationStatus: 'Registered Business',
    whyThisCompany: 'Focuses on seafood processing chillers and fishing vessel ice systems in coastal Mombasa.',
    whatNeedsVerification: ['Anti-corrosive marine environment coating specs'],
    overview: 'Niche provider of marine cooling equipment and ice plants.',
    productsHandled: ['Flake Ice Machines', 'Seafood Preservation Freezers'],
    importHistorySummary: '6 import consignments.',
    companySignals: ['✓ Licensed marine engineering vendor'],
    contacts: [
      {
        id: 'cnt-12',
        name: 'Rashid Salim',
        role: 'Managing Director',
        company: 'Apex Marine Refrigeration Ltd',
        department: 'Management',
        contactAvailability: 'Contact info not verified',
        verificationStatus: 'Unverified',
        decisionPower: 'High (Procurement/Signer)'
      }
    ],
    sources: [{ title: 'Mombasa Maritime Trade Index', type: 'Business Directory', date: '2026', verified: true }],
    potentialOpportunity: 'Expanding flake ice generation capacity for export fisheries.',
    savedAsLead: false
  },
  {
    id: 'prsp-11',
    name: 'Victoria Pharma-Cold Supplies',
    country: 'Kenya',
    city: 'Nairobi',
    companyType: 'Direct Importer & Retailer',
    productRelevance: 'Needs Review',
    relevanceScore: 78,
    importActivity: 'Active (Last shipment 90 days ago)',
    importFrequency: 'Occasional',
    approxVolume: '$200k - $400k / year',
    sourcingCountries: ['Germany', 'China'],
    website: 'https://www.victoriapharmacold.co.ke',
    verificationStatus: 'Needs Review',
    whyThisCompany: 'Focuses on specialized medical 2°C to 8°C vaccine refrigerators. Potential fit only if your commercial line includes precision temperature control.',
    whatNeedsVerification: ['Pharmacy and Poisons Board medical device import certification compliance'],
    overview: 'Medical cold chain importer serving clinics, hospitals, and pharmacies.',
    productsHandled: ['Medical Vaccine Fridges', 'Ultra-Low Temp Freezers (-86°C)'],
    importHistorySummary: '5 specialized air cargo & LCL shipments.',
    companySignals: ['✓ Medical supply vendor license'],
    contacts: [
      {
        id: 'cnt-13',
        name: 'Dr. Catherine Mbaire',
        role: 'Technical Sourcing Director',
        company: 'Victoria Pharma-Cold Supplies',
        department: 'Medical Sourcing',
        contactAvailability: 'Likely Match',
        verificationStatus: 'Public Record',
        decisionPower: 'High (Procurement/Signer)'
      }
    ],
    sources: [{ title: 'Kenya Health Sector Directory', type: 'Business Directory', date: '2026', verified: true }],
    potentialOpportunity: 'Only relevant if manufacturer offers medical grade certification.',
    savedAsLead: false
  },
  {
    id: 'prsp-12',
    name: 'Zodiac Foodservice Equipment Kenya',
    country: 'Kenya',
    city: 'Nairobi (Industrial Area)',
    companyType: 'Wholesale Integrator',
    productRelevance: 'Relevant',
    relevanceScore: 87,
    importActivity: 'Active (Last shipment 30 days ago)',
    importFrequency: 'High (Monthly+)',
    approxVolume: '$450k - $850k / year',
    sourcingCountries: ['China', 'India', 'Turkey'],
    website: 'https://www.zodiacfoodservice.ke',
    verificationStatus: 'Verified Importer',
    whyThisCompany: 'Strong wholesale distributor stocking commercial ice makers, prep tables, and glass door upright chillers for fast-food chains.',
    whatNeedsVerification: ['Local assembly capabilities and custom dimensions for Kenyan kitchens'],
    overview: 'Supplies commercial kitchens, bakeries, and butcheries across Nairobi.',
    productsHandled: ['Pizza Prep Refrigerated Counters', 'Vertical Commercial Freezers', 'Ice Machines'],
    importHistorySummary: '18 maritime consignments in 24 months.',
    companySignals: ['✓ 12,000 sq ft showroom and distribution warehouse'],
    contacts: [
      {
        id: 'cnt-14',
        name: 'Kevin Mutiso',
        role: 'Purchasing Manager',
        company: 'Zodiac Foodservice Equipment Kenya',
        department: 'Procurement',
        contactAvailability: 'Verified Available',
        verificationStatus: 'Verified',
        emailDemo: 'k.mutiso@zodiacfoodservice.ke (Demo Data)',
        decisionPower: 'High (Procurement/Signer)'
      }
    ],
    sources: [{ title: 'Kenya Customs Inward Cargo Ledger', type: 'Customs Filing', date: '2026', verified: true }],
    potentialOpportunity: 'Looking for reliable OEM partner for stainless steel reach-in coolers.',
    savedAsLead: false
  }
];

export const MOCK_RESEARCH_SESSIONS: ResearchSession[] = [
  {
    id: 'res-1',
    product: 'Commercial Refrigeration Equipment',
    targetMarket: 'Kenya',
    researchGoal: 'Find distributors and companies actively importing commercial refrigeration equipment.',
    companyType: 'Import Distributors & Wholesale Integrators',
    importFrequency: 'Monthly+ & Quarterly',
    sourcingCountry: 'Global (India, China, Europe)',
    status: 'Completed',
    companiesAnalyzed: 1284,
    matchedCount: 47,
    shortlistedCount: 12,
    createdAt: 'Today, 10:15 AM',
    prospects: KENYA_REFRIGERATION_PROSPECTS
  },
  {
    id: 'res-2',
    product: 'Industrial Cooling Systems & Chillers',
    targetMarket: 'Tanzania',
    researchGoal: 'Identify active buyers and engineering distributors in Dar es Salaam for heavy industrial chillers.',
    companyType: 'Engineering Contractors & Importers',
    importFrequency: 'Quarterly',
    sourcingCountry: 'India, China',
    status: 'Completed',
    companiesAnalyzed: 940,
    matchedCount: 31,
    shortlistedCount: 8,
    createdAt: 'Yesterday',
    prospects: KENYA_REFRIGERATION_PROSPECTS.slice(0, 8)
  },
  {
    id: 'res-3',
    product: 'HVAC Equipment & Air Handling Units',
    targetMarket: 'United Arab Emirates (UAE)',
    researchGoal: 'Discover HVAC distributors and MEP contractors with high-volume import activity in Dubai and Abu Dhabi.',
    companyType: 'MEP Contractors & Stockists',
    importFrequency: 'Monthly+',
    sourcingCountry: 'All',
    status: 'Completed',
    companiesAnalyzed: 2450,
    matchedCount: 84,
    shortlistedCount: 15,
    createdAt: '3 days ago',
    prospects: KENYA_REFRIGERATION_PROSPECTS.slice(0, 6)
  },
  {
    id: 'res-4',
    product: 'Display Freezers & Beverage Coolers',
    targetMarket: 'South Africa',
    researchGoal: 'Find commercial refrigeration wholesalers supplying retail grocery chains in Johannesburg and Cape Town.',
    companyType: 'Retail Fixture Distributors',
    importFrequency: 'Monthly+',
    sourcingCountry: 'India, China, Europe',
    status: 'Completed',
    companiesAnalyzed: 1820,
    matchedCount: 52,
    shortlistedCount: 10,
    createdAt: '1 week ago',
    prospects: KENYA_REFRIGERATION_PROSPECTS.slice(0, 5)
  }
];

export const INITIAL_SAVED_LEADS: SavedLead[] = [
  {
    id: 'lead-1',
    companyId: 'prsp-1',
    company: 'AfriCool Logistics & Commercial Equipment Ltd',
    country: 'Kenya',
    contactName: 'John Kamau',
    contactRole: 'Head of Technical Procurement & Sourcing',
    product: 'Commercial Refrigeration Equipment',
    status: 'Qualified',
    qualification: 'Highly Relevant',
    aiReason: 'Recurring monthly imports (34 shipments in 24 mos) and established 140+ supermarket accounts in East Africa.',
    notes: 'Prioritizing outreach for 2027 commercial multideck display chiller catalog.',
    lastResearchDate: 'Today',
    nextAction: 'Send technical spec sheet & CIF Mombasa volume price list to John Kamau.',
    website: 'https://www.africool-kenya.co.ke'
  },
  {
    id: 'lead-2',
    companyId: 'prsp-2',
    company: 'Nairobi Cold Storage & HVAC Solutions Ltd',
    country: 'Kenya',
    contactName: 'David Ochieng',
    contactRole: 'Procurement & Import Manager',
    product: 'Commercial Refrigeration Equipment',
    status: 'New',
    qualification: 'Highly Relevant',
    aiReason: 'High import frequency for reach-in chillers and supermarket fixtures; seeking non-European OEM alternatives.',
    notes: 'David Ochieng manages all direct Asian and Indian manufacturer relationships.',
    lastResearchDate: 'Today',
    nextAction: 'Request 10-minute introductory call via email.',
    website: 'https://www.nairobicoldstorage.co.ke'
  },
  {
    id: 'lead-3',
    companyId: 'prsp-7',
    company: 'Summit Supermarket Refrigeration East Africa',
    country: 'Kenya',
    contactName: 'Alex Kariuki',
    contactRole: 'Head of Global Sourcing',
    product: 'Commercial Refrigeration Equipment',
    status: 'Interested',
    qualification: 'Highly Relevant',
    aiReason: '42 maritime containers imported in 24 months for national supermarket chains.',
    notes: 'Expressed interest in sample test batch for 2.5m multideck display chiller.',
    lastResearchDate: 'Today',
    nextAction: 'Prepare sample dispatch agreement and warranty documentation.',
    website: 'https://www.summitrefrigeration-ea.com'
  },
  {
    id: 'lead-4',
    companyId: 'prsp-5',
    company: 'Safari Commercial Kitchens & Coolers Ltd',
    country: 'Kenya',
    contactName: 'Grace Mutua',
    contactRole: 'Purchasing & Logistics Director',
    product: 'Commercial Refrigeration Equipment',
    status: 'Follow-up',
    qualification: 'Relevant',
    aiReason: 'Hospitality focus with 200+ restaurant and safari lodge clients.',
    notes: 'Reviewing curved glass cake showcase dimensions.',
    lastResearchDate: 'Yesterday',
    nextAction: 'Follow up on SS304 material certification.',
    website: 'https://www.safarikitchenske.com'
  }
];

export const TRADE_SCOUT_TOUR_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'Trade Scout Dashboard',
    screen: 'dashboard',
    description: 'Executive dashboard highlighting 24 Researches, 18,420 Companies Analyzed, 186 Qualified Prospects, and 42 Saved Leads.',
    actionText: 'Click "Start New Trade Research"',
    targetExplanation: 'Sets the exporter perspective: discovering new international distribution partners.'
  },
  {
    stepNumber: 2,
    title: 'Enter Sourcing Requirement',
    screen: 'trade-scout',
    description: 'Enter: "Commercial Refrigeration Equipment" in "Kenya" to find active importing distributors.',
    actionText: 'Click "Start AI Research" or sample prompt chip',
    targetExplanation: 'Trade Scout understands the product category and trade nomenclature.'
  },
  {
    stepNumber: 3,
    title: 'Multi-Stage AI Research Workflow',
    screen: 'trade-scout',
    description: 'Watch the 5 AI Specialized Modules (Market Scout, Company Researcher, Contact Scout, Verification Scout, Analyst) analyze trade signals.',
    actionText: 'Watch animated research workflow progress',
    targetExplanation: 'Visualizes deep automated investigation across customs data and company registries.'
  },
  {
    stepNumber: 4,
    title: '12 Qualified Prospects Identified',
    screen: 'trade-scout',
    description: 'AI filters 1,284 analyzed companies down to 12 curated, highly relevant prospects with transparent match explanations.',
    actionText: 'Click "Why these companies?" button',
    targetExplanation: 'Demonstrates intelligent noise reduction instead of generic bulk data dumps.'
  },
  {
    stepNumber: 5,
    title: 'Inspect Company Research: AfriCool',
    screen: 'trade-scout',
    description: 'Open AfriCool Logistics (Nairobi, Kenya) to view import history, sourcing countries, signals, and evidence sources.',
    actionText: 'Click "View Full Research" on AfriCool card',
    targetExplanation: 'Transparently shows why the prospect is compelling and what needs verification.'
  },
  {
    stepNumber: 6,
    title: 'Contact Scout & Procurement Leads',
    screen: 'trade-scout',
    description: 'Run Contact Scout to discover decision-makers: John Kamau (Head of Procurement) and Mary Wanjiku (Commercial Director).',
    actionText: 'Click "Find Relevant Contacts" inside company view',
    targetExplanation: 'Connects company research to actionable verified decision-makers.'
  },
  {
    stepNumber: 7,
    title: 'Contextual AI Assistant Follow-Up',
    screen: 'trade-scout',
    description: 'Ask the contextual AI: "Why did you select these 3?" or "Show me the most interesting distributors."',
    actionText: 'Click prompt chip in the contextual AI bar',
    targetExplanation: 'AI responds with deep understanding of the active market research.'
  },
  {
    stepNumber: 8,
    title: 'Save Prospect as Qualified Lead',
    screen: 'trade-scout',
    description: 'Click "Save as Lead" to convert researched prospect with AI qualification notes into your sales pipeline.',
    actionText: 'Click "Save as Lead" button',
    targetExplanation: 'Seamless transition from intelligence to sales execution.'
  },
  {
    stepNumber: 9,
    title: 'Saved Leads Pipeline',
    screen: 'saved-leads',
    description: 'Manage actionable leads with qualification tags, contact notes, and direct next action trackers.',
    actionText: 'Click "Research History" in sidebar',
    targetExplanation: 'Simple, lightweight lead management without bloated CRM complexity.'
  },
  {
    stepNumber: 10,
    title: 'Research History Archive',
    screen: 'research-history',
    description: 'Reopen past market research sessions (Kenya, Tanzania, UAE, South Africa) with 1 click.',
    actionText: 'Click "Return to Dashboard"',
    targetExplanation: 'Shows persistent intelligence asset accumulated over time.'
  }
];
