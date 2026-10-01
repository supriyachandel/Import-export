export type ScreenType =
  | 'login'
  | 'dashboard'
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
  stageNumber: number; // 1 to 5
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
