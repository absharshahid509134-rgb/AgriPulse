import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { AgriPulseProvider, useAgriPulse } from './context/AgriPulseContext';
import { AppShell } from './components/AppShell';
import { LoginPage } from './pages/LoginPage';
import { HomeDashboardPage } from './pages/HomeDashboardPage';
import { FarmManagementPage } from './pages/FarmManagementPage';
import { WeatherIntelligencePage } from './pages/WeatherIntelligencePage';
import { DictionaryPage } from './pages/DictionaryPage';
import { DiseaseAnalysisPage } from './pages/DiseaseAnalysisPage';
import { StorePage } from './pages/StorePage';
import { CartAndCheckoutPage } from './pages/CartAndCheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { NewsPage } from './pages/NewsPage';
import { SchemesPage } from './pages/SchemesPage';
import { AccountSettingsPage } from './pages/AccountSettingsPage';

const ProtectedRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session } = useAgriPulse();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

const RootRedirect: React.FC = () => {
  const { session } = useAgriPulse();
  return <Navigate to={session ? '/home' : '/login'} replace />;
};

export const App: React.FC = () => {
  return (
    <AgriPulseProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Root Redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Protected Application Routes */}
          <Route
            element={
              <ProtectedRouteGuard>
                <AppShell />
              </ProtectedRouteGuard>
            }
          >
            <Route path="/home" element={<HomeDashboardPage />} />
            <Route path="/farm" element={<FarmManagementPage />} />
            <Route path="/weather" element={<WeatherIntelligencePage />} />
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/disease" element={<DiseaseAnalysisPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/cart" element={<CartAndCheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/schemes" element={<SchemesPage />} />
            <Route path="/account" element={<AccountSettingsPage />} />
          </Route>

          {/* Fallback for unknown routes */}
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </BrowserRouter>
    </AgriPulseProvider>
  );
};
