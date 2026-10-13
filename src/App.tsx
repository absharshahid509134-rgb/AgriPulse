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
import { SellerSignUpPage } from './pages/SellerSignUpPage';
import { FarmerLoginPage } from './pages/FarmerLoginPage';
import { FarmerSignUpPage } from './pages/FarmerSignUpPage';
import { SellerPortalPage } from './pages/SellerPortalPage';
import { HomeDashboardPage } from './pages/HomeDashboardPage';
import { FarmManagementPage } from './pages/FarmManagementPage';
import { WeatherIntelligencePage } from './pages/WeatherIntelligencePage';
import { DictionaryPage } from './pages/DictionaryPage';
import { DiseaseAnalysisPage } from './pages/DiseaseAnalysisPage';
import { StorePage } from './pages/StorePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartAndCheckoutPage } from './pages/CartAndCheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { WishlistPage } from './pages/WishlistPage';
import { OffersPage } from './pages/OffersPage';
import { NewsPage } from './pages/NewsPage';
import { SchemesPage } from './pages/SchemesPage';
import { AccountSettingsPage } from './pages/AccountSettingsPage';

const ProtectedRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session } = useAgriPulse();
  const location = useLocation();

  if (!session) {
    const isFarmerPath = location.pathname.startsWith('/home') || location.pathname.startsWith('/farm');
    return <Navigate to={isFarmerPath ? '/farmer/login' : '/login'} state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

const RootRedirect: React.FC = () => {
  const { session } = useAgriPulse();
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={session.portalType === 'seller' ? '/seller' : '/home'} replace />;
};

export const App: React.FC = () => {
  return (
    <AgriPulseProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Routes */}
          {/* Seller Log In */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/seller/login" element={<LoginPage />} />

          {/* Seller Sign Up */}
          <Route path="/signup" element={<SellerSignUpPage />} />
          <Route path="/seller/signup" element={<SellerSignUpPage />} />

          {/* Farmer Sign In & Sign Up */}
          <Route path="/farmer/login" element={<FarmerLoginPage />} />
          <Route path="/farmer/signup" element={<FarmerSignUpPage />} />

          {/* Root Redirect to respective portal */}
          <Route path="/" element={<RootRedirect />} />

          {/* Dedicated Seller Portal */}
          <Route
            path="/seller"
            element={
              <ProtectedRouteGuard>
                <SellerPortalPage />
              </ProtectedRouteGuard>
            }
          />
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRouteGuard>
                <SellerPortalPage />
              </ProtectedRouteGuard>
            }
          />

          {/* Protected Farmer Portal Routes */}
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
            <Route path="/store/product/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartAndCheckoutPage />} />
            <Route path="/checkout" element={<CartAndCheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:orderId" element={<OrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/offers" element={<OffersPage />} />
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
