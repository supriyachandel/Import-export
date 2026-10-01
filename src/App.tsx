import React, { useState } from 'react';
import { ScreenType, UserRole, Supplier, TradeDocument } from './types';
import { SUPPLIERS, MOCK_DOCUMENTS, DEMO_TOUR_STEPS } from './data/mockData';

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

// Screens
import { LoginScreen } from './components/screens/LoginScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
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
  const [demoStepIndex, setDemoStepIndex] = useState<number>(1); // starts on Dashboard (Step 2)

  // Modals state
  const [selectedSupplierForQuote, setSelectedSupplierForQuote] = useState<Supplier | null>(null);
  const [selectedSupplierForProfile, setSelectedSupplierForProfile] = useState<Supplier>(SUPPLIERS[0]);
  const [selectedDocForOCR, setSelectedDocForOCR] = useState<TradeDocument | null>(MOCK_DOCUMENTS[1]); // PL-ABC-9821 by default
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isHandoffModalOpen, setIsHandoffModalOpen] = useState(false);
  const [isCustomerUpdateModalOpen, setIsCustomerUpdateModalOpen] = useState(false);
  const [isDocOCRModalOpen, setIsDocOCRModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Sync navigation with demo step index
  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    const matchingStepIdx = DEMO_TOUR_STEPS.findIndex((s) => s.screen === screen);
    if (matchingStepIdx !== -1) {
      setDemoStepIndex(matchingStepIdx);
    }
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
            setDemoStepIndex(1);
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
        unreadExceptionsCount={2}
        pendingQuotesCount={3}
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
          unreadCount={3}
        />

        {/* Dynamic Screen Routing */}
        <main style={{ flex: 1 }}>
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              onNavigate={handleNavigate}
              onOpenDocModal={() => handleOpenDocOCR(MOCK_DOCUMENTS[1])}
              onOpenShipmentModal={() => setIsCustomerUpdateModalOpen(true)}
            />
          )}

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

      {/* Interactive 16-Step Client Demo Walkthrough Banner */}
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
