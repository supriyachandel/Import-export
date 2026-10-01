import React, { useState } from 'react';
import { ScreenType, UserRole, Supplier, TradeDocument, ProspectCompany, ProspectContact, SavedLead, ResearchSession } from './types';
import { SUPPLIERS, MOCK_DOCUMENTS } from './data/mockData';
import {
  KENYA_REFRIGERATION_PROSPECTS,
  INITIAL_SAVED_LEADS,
  MOCK_RESEARCH_SESSIONS,
  TRADE_SCOUT_TOUR_STEPS
} from './data/tradeScoutData';

// Navigation Components
import { Sidebar } from './components/navigation/Sidebar';
import { Header } from './components/navigation/Header';
import { DemoTourBanner } from './components/navigation/DemoTourBanner';

// Modals
import { RequestQuoteModal } from './components/modals/RequestQuoteModal';
import { HumanHandoffModal } from './components/modals/HumanHandoffModal';
import { AICustomerUpdateModal } from './components/modals/AICustomerUpdateModal';
import { DocumentOCRModal } from './components/modals/DocumentOCRModal';
import { NotificationsModal } from './components/modals/NotificationsModal';

// Milestone 1 Trade Scout Screens
import { TradeScoutScreen } from './components/screens/TradeScoutScreen';
import { SavedLeadsScreen } from './components/screens/SavedLeadsScreen';
import { ResearchHistoryScreen } from './components/screens/ResearchHistoryScreen';

// Secondary / Existing Screens
import { DashboardScreen } from './components/screens/DashboardScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { AIAssistantScreen } from './components/screens/AIAssistantScreen';
import { MarketplaceScreen } from './components/screens/MarketplaceScreen';
import { SupplierProfileScreen } from './components/screens/SupplierProfileScreen';
import { CreateRFQScreen } from './components/screens/CreateRFQScreen';
import { RFQManagementScreen } from './components/screens/RFQManagementScreen';
import { QuotationComparisonScreen } from './components/screens/QuotationComparisonScreen';
import { OrderManagementScreen } from './components/screens/OrderManagementScreen';
import { DocumentManagementScreen } from './components/screens/DocumentManagementScreen';
import { ShipmentTrackingScreen } from './components/screens/ShipmentTrackingScreen';
import { CRMLeadsScreen } from './components/screens/CRMLeadsScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { AdminOperationsScreen } from './components/screens/AdminOperationsScreen';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('buyer');
  const [demoStepIndex, setDemoStepIndex] = useState<number>(0);

  // Trade Scout Saved Leads State
  const [savedLeads, setSavedLeads] = useState<SavedLead[]>(INITIAL_SAVED_LEADS);

  // Modals state
  const [selectedSupplierForQuote, setSelectedSupplierForQuote] = useState<Supplier | null>(null);
  const [selectedSupplierForProfile, setSelectedSupplierForProfile] = useState<Supplier>(SUPPLIERS[0]);
  const [selectedDocForOCR, setSelectedDocForOCR] = useState<TradeDocument | null>(MOCK_DOCUMENTS[1]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isHandoffModalOpen, setIsHandoffModalOpen] = useState(false);
  const [isCustomerUpdateModalOpen, setIsCustomerUpdateModalOpen] = useState(false);
  const [isDocOCRModalOpen, setIsDocOCRModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Sync navigation with demo step index
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    const matchingStepIdx = TRADE_SCOUT_TOUR_STEPS.findIndex((s) => s.screen === screen);
    if (matchingStepIdx !== -1) {
      setDemoStepIndex(matchingStepIdx);
    }
  };

  const handleSaveLead = (prospect: ProspectCompany, contact?: ProspectContact) => {
    const contactPerson = contact || prospect.contacts[0] || {
      name: 'Key Purchasing Contact',
      role: 'Procurement Department'
    };

    if (savedLeads.some((l) => l.companyId === prospect.id || l.company === prospect.name)) {
      return;
    }

    const newLead: SavedLead = {
      id: `lead-${Date.now()}`,
      companyId: prospect.id,
      company: prospect.name,
      country: prospect.country,
      contactName: contactPerson.name,
      contactRole: contactPerson.role,
      product: 'Commercial Refrigeration Equipment',
      status: 'Qualified',
      qualification: prospect.productRelevance,
      aiReason: prospect.whyThisCompany,
      notes: `Discovered via AI Trade Scout research. Active import volume: ${prospect.approxVolume}.`,
      lastResearchDate: 'Today',
      nextAction: `Reach out to ${contactPerson.name} (${contactPerson.role}) with technical product line catalog.`,
      website: prospect.website
    };

    setSavedLeads((prev) => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (id: string, status: SavedLead['status']) => {
    setSavedLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const handleOpenQuoteModal = (supplier: Supplier) => {
    setSelectedSupplierForQuote(supplier);
    setIsQuoteModalOpen(true);
  };

  const handleOpenDocOCR = (doc?: TradeDocument) => {
    setSelectedDocForOCR(doc || MOCK_DOCUMENTS[1]);
    setIsDocOCRModalOpen(true);
  };

  // If on login screen, render standalone login
  if (currentScreen === 'login') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#070b14' }}>
        <LoginScreen
          onLogin={(role) => {
            setUserRole(role);
            setCurrentScreen('dashboard');
            setDemoStepIndex(0);
          }}
          onNavigate={handleNavigate}
        />
        <DemoTourBanner
          currentStepIndex={demoStepIndex}
          onSelectStep={(idx) => setDemoStepIndex(idx)}
          onNavigate={handleNavigate}
        />
      </div>
    );
  }

  const savedCompanyIds = savedLeads.map((l) => l.companyId);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#0b0f19',
      color: '#f8fafc',
      overflowX: 'hidden'
    }}>
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        userRole={userRole}
        savedLeadsCount={savedLeads.length}
        researchesCount={24}
      />

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100vh',
        overflowY: 'auto',
        paddingBottom: '90px' // Space for floating Demo Tour Banner
      }}>
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          userRole={userRole}
          onRoleChange={setUserRole}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadCount={2}
        />

        {/* Dynamic Screen Routing */}
        <main style={{ flex: 1 }}>
          {/* Milestone 1 Core Screens */}
          {currentScreen === 'dashboard' && (
            <DashboardScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === 'trade-scout' && (
            <TradeScoutScreen
              onNavigate={handleNavigate}
              onSaveLead={handleSaveLead}
              savedCompanyIds={savedCompanyIds}
            />
          )}

          {currentScreen === 'saved-leads' && (
            <SavedLeadsScreen
              savedLeads={savedLeads}
              onNavigate={handleNavigate}
              onUpdateLeadStatus={handleUpdateLeadStatus}
            />
          )}

          {currentScreen === 'research-history' && (
            <ResearchHistoryScreen
              onNavigate={handleNavigate}
              onOpenSession={(session) => {
                handleNavigate('trade-scout');
              }}
            />
          )}

          {/* Secondary / Future Milestone Screens */}
          {currentScreen === 'ai-assistant' && (
            <AIAssistantScreen
              onNavigate={handleNavigate}
              onOpenHumanHandoff={() => setIsHandoffModalOpen(true)}
              onRequestQuote={handleOpenQuoteModal}
            />
          )}

          {currentScreen === 'marketplace' && (
            <MarketplaceScreen
              onNavigate={handleNavigate}
              onRequestQuote={handleOpenQuoteModal}
              onSelectSupplierProfile={(sup) => setSelectedSupplierForProfile(sup)}
            />
          )}

          {currentScreen === 'supplier-profile' && (
            <SupplierProfileScreen
              supplier={selectedSupplierForProfile}
              onNavigate={handleNavigate}
              onRequestQuote={handleOpenQuoteModal}
            />
          )}

          {currentScreen === 'create-rfq' && (
            <CreateRFQScreen
              onNavigate={handleNavigate}
              onRFQCreated={() => {}}
            />
          )}

          {currentScreen === 'rfqs' && (
            <RFQManagementScreen
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'quotations' && (
            <QuotationComparisonScreen
              onNavigate={handleNavigate}
              onOrderCreated={() => {}}
            />
          )}

          {currentScreen === 'orders' && (
            <OrderManagementScreen
              onNavigate={handleNavigate}
              onOpenDocOCRModal={() => handleOpenDocOCR(MOCK_DOCUMENTS[1])}
            />
          )}

          {currentScreen === 'documents' && (
            <DocumentManagementScreen
              onNavigate={handleNavigate}
              onOpenOCRModal={handleOpenDocOCR}
              onOpenHumanHandoff={() => setIsHandoffModalOpen(true)}
            />
          )}

          {currentScreen === 'shipments' && (
            <ShipmentTrackingScreen
              onNavigate={handleNavigate}
              onOpenCustomerUpdateModal={() => setIsCustomerUpdateModalOpen(true)}
            />
          )}

          {currentScreen === 'crm' && (
            <CRMLeadsScreen
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'analytics' && (
            <AnalyticsScreen
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'admin' && (
            <AdminOperationsScreen
              onNavigate={handleNavigate}
              onOpenDocOCRModal={() => handleOpenDocOCR(MOCK_DOCUMENTS[1])}
              onOpenShipmentUpdateModal={() => setIsCustomerUpdateModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Interactive 10-Step AI Trade Scout Walkthrough Banner */}
      <DemoTourBanner
        currentStepIndex={demoStepIndex}
        onSelectStep={(idx) => setDemoStepIndex(idx)}
        onNavigate={handleNavigate}
      />

      {/* Global Modals & Drawers */}
      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        supplier={selectedSupplierForQuote}
        onSuccess={() => handleNavigate('rfqs')}
      />

      <HumanHandoffModal
        isOpen={isHandoffModalOpen}
        onClose={() => setIsHandoffModalOpen(false)}
        onEscalateSuccess={() => handleNavigate('admin')}
      />

      <AICustomerUpdateModal
        isOpen={isCustomerUpdateModalOpen}
        onClose={() => setIsCustomerUpdateModalOpen(false)}
        shipmentNumber="SHIP-2048"
        orderNumber="ORD-1024"
      />

      <DocumentOCRModal
        isOpen={isDocOCRModalOpen}
        onClose={() => setIsDocOCRModalOpen(false)}
        document={selectedDocForOCR}
        onEscalate={() => setIsHandoffModalOpen(true)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={handleNavigate}
        onOpenDocModal={() => handleOpenDocOCR(MOCK_DOCUMENTS[1])}
        onOpenShipmentUpdateModal={() => setIsCustomerUpdateModalOpen(true)}
      />
    </div>
  );
};
