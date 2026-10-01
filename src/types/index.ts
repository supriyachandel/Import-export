export type ScreenType =
  | 'dashboard'
  | 'trade-scout'
  | 'saved-leads'
  | 'research-history'
  | 'login'
  | 'ai-assistant'
  | 'marketplace'
  | 'supplier-profile'
  | 'create-rfq'
  | 'rfqs'
  | 'quotations'
  | 'orders'
  | 'documents'
  | 'shipments'
  | 'crm'
  | 'analytics'
  | 'admin';

export type UserRole =
  | 'buyer'
  | 'supplier'
  | 'trade_team'
  | 'operations'
  | 'admin';

export interface User {
  id: string;
  name: string;
  company: string;
  email: string;
  role: UserRole;
  country: string;
  avatar: string;
  verified: boolean;
}

export interface ProspectContact {
  id: string;
  name: string;
  role: string;
  company: string;
  publicProfileUrl?: string;
  contactAvailability: 'Verified Available' | 'Likely Match' | 'Contact info not verified';
  verificationStatus: 'Verified' | 'Unverified' | 'Public Record';
  emailDemo?: string;
  phoneDemo?: string;
  department: string;
  decisionPower: 'High (Procurement/Signer)' | 'Medium (Technical Reviewer)' | 'Operations';
}

export interface ProspectCompany {
  id: string;
  name: string;
  country: string;
  city: string;
  companyType: 'Import Distributor' | 'Wholesale Integrator' | 'Direct Importer & Retailer' | 'Engineering Contractor' | 'Logistics & Cold Storage';
  productRelevance: 'Highly Relevant' | 'Relevant' | 'Needs Review';
  relevanceScore: number; // e.g. 96
  importActivity: string; // e.g. "Active (Last shipment 18 days ago)"
  importFrequency: 'High (Monthly+)' | 'Moderate (Quarterly)' | 'Occasional';
  approxVolume: string; // e.g. "$450k - $800k / year"
  sourcingCountries: string[]; // e.g. ["China", "India", "Turkey", "Germany"]
  website: string;
  verificationStatus: 'Verified Importer' | 'Registered Business' | 'Needs Review';
  whyThisCompany: string;
  whatNeedsVerification: string[];
  overview: string;
  productsHandled: string[];
  importHistorySummary: string;
  companySignals: string[];
  contacts: ProspectContact[];
  sources: {
    title: string;
    type: 'Trade Manifest' | 'Business Registry' | 'Company Website' | 'Customs Filing' | 'Business Directory';
    date: string;
    verified: boolean;
  }[];
  potentialOpportunity: string;
  savedAsLead?: boolean;
}

export interface ResearchSession {
  id: string;
  product: string;
  targetMarket: string;
  researchGoal: string;
  companyType?: string;
  importFrequency?: string;
  sourcingCountry?: string;
  status: 'Completed' | 'In Progress' | 'Draft';
  companiesAnalyzed: number;
  matchedCount: number;
  shortlistedCount: number;
  createdAt: string;
  prospects: ProspectCompany[];
}

export interface SavedLead {
  id: string;
  companyId: string;
  company: string;
  country: string;
  contactName: string;
  contactRole: string;
  product: string;
  status: 'New' | 'Qualified' | 'Contacted' | 'Interested' | 'Follow-up' | 'Not Relevant';
  qualification: 'Highly Relevant' | 'Relevant' | 'Needs Review';
  aiReason: string;
  notes: string;
  lastResearchDate: string;
  nextAction: string;
  website: string;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city: string;
  categories: string[];
  moq: number;
  capacityPerMonth: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  aiMatchScore: number;
  matchReasons: string[];
  certifications: string[];
  priceRange: string;
  leadTimeDays: number;
  countriesServed: string[];
  establishedYear: number;
  overview: string;
  esgScore: number;
  featuredProduct: {
    name: string;
    image: string;
    price: string;
    moq: number;
  };
}

export interface RFQItem {
  id: string;
  rfqNumber: string;
  title: string;
  product: string;
  quantity: number;
  unit: string;
  targetPrice: number;
  currency: string;
  destinationCountry: string;
  destinationPort: string;
  requiredDeliveryDate: string;
  leadTimeDays: number;
  specifications: string[];
  packaging: string;
  certifications: string[];
  status: 'Draft' | 'Published' | 'Responses Received' | 'Negotiation' | 'Closed';
  createdAt: string;
  responsesCount: number;
  invitedSuppliers: string[];
  aiSummary: string;
  assignedOwner: string;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  rfqNumber: string;
  supplierId: string;
  supplierName: string;
  supplierCountry: string;
  unitPrice: number;
  moq: number;
  leadTimeDays: number;
  shippingTerms: string;
  paymentTerms: string;
  totalCost: number;
  status: 'Pending Review' | 'Shortlisted' | 'Accepted' | 'Revision Requested' | 'Rejected';
  aiScore: number;
  aiAnalysis: {
    pros: string[];
    cons: string[];
    landedCostDriver: string;
    riskScore: 'Low' | 'Medium' | 'High';
    missingInfo?: string[];
  };
  certificationsAttached: string[];
  validUntil: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  rfqNumber: string;
  quoteNumber: string;
  buyerName: string;
  buyerCountry: string;
  supplierName: string;
  supplierCountry: string;
  productName: string;
  quantity: number;
  totalValue: number;
  paymentTerms: string;
  deliveryDate: string;
  destinationPort: string;
  status: 'Order Confirmed' | 'Documents In Review' | 'In Production' | 'Shipment' | 'Delivered';
  stageNumber: number;
  documentsCount: {
    total: number;
    approved: number;
    flagged: number;
  };
  shipmentId: string;
  timeline: {
    title: string;
    date: string;
    completed: boolean;
    current: boolean;
    description: string;
  }[];
}

export interface TradeDocument {
  id: string;
  orderNumber: string;
  type: 'Commercial Invoice' | 'Packing List' | 'Bill of Lading' | 'Certificate of Origin' | 'Proforma Invoice' | 'Purchase Order';
  documentNumber: string;
  fileName: string;
  uploadDate: string;
  status: 'Uploaded' | 'Processing' | 'Verified' | 'Needs Review' | 'Approved';
  extractedFields: Record<string, string | number>;
  aiValidation: {
    isValid: boolean;
    warningMessage?: string;
    severity?: 'warning' | 'error' | 'success';
    suggestedAction?: string;
  };
  version: number;
  reviewedBy?: string;
}

export interface Shipment {
  id: string;
  shipmentNumber: string;
  orderNumber: string;
  carrier: string;
  vesselName: string;
  containerNumber: string;
  originPort: string;
  originCountry: string;
  destinationPort: string;
  destinationCountry: string;
  etd: string;
  eta: string;
  revisedEta?: string;
  status: 'Pickup' | 'Export Customs' | 'In Transit' | 'Import Customs' | 'Delivered';
  progressPercentage: number;
  hasException: boolean;
  exceptionDetails?: {
    type: string;
    severity: 'low' | 'medium' | 'high';
    message: string;
    recommendedAction: string;
    draftCustomerMessage: string;
  };
  milestones: {
    name: string;
    location: string;
    date: string;
    completed: boolean;
    current: boolean;
  }[];
}

export interface CRMLead {
  id: string;
  companyName: string;
  contactPerson: string;
  country: string;
  email: string;
  source: string;
  stage: 'New' | 'Qualified' | 'Quotation' | 'Negotiation' | 'Won' | 'Lost';
  dealValue: number;
  aiScore: number;
  aiInsights: string;
  lastContactDate: string;
  nextFollowUpDate: string;
  owner: string;
  recommendedAction: string;
}

export interface HITLTask {
  id: string;
  type: 'Document Discrepancy' | 'Supplier Verification' | 'Quote Deviation' | 'Shipment Escalation';
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  referenceId: string;
  assignedRole: string;
  description: string;
  aiSuggestion: string;
  status: 'Pending Action' | 'In Review' | 'Resolved';
  timestamp: string;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  type?: 'text' | 'structured_supplier_match' | 'order_status' | 'doc_warning' | 'shipment_alert';
  data?: any;
  requiresHumanReview?: boolean;
}

export interface DemoStep {
  stepNumber: number;
  title: string;
  screen: ScreenType;
  description: string;
  actionText: string;
  targetExplanation: string;
}
