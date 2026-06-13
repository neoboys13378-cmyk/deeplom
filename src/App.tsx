import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SiteProvider, useSite } from './context/SiteContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Marquee from './components/Marquee';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import TechPage from './pages/TechPage';
import ContactsPage from './pages/ContactsPage';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import HeroEditor from './pages/admin/HeroEditor';
import AboutEditor from './pages/admin/AboutEditor';
import ServicesEditor from './pages/admin/ServicesEditor';
import ProjectsEditor from './pages/admin/ProjectsEditor';
import StatsEditor from './pages/admin/StatsEditor';
import ContactsEditor from './pages/admin/ContactsEditor';
import SettingsEditor from './pages/admin/SettingsEditor';

/* ─── Scroll to top on route change ─── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ─── Protected route ─── */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useSite();
  if (!session) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

/* ─── Public layout wrapper ─── */
function PublicLayout({ page }: { page: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* Spacer for fixed navbar height */}
      <div className="h-20" />
      <Marquee />
      <main className="flex-1">
        {page}
      </main>
      <Footer />
    </>
  );
}

/* ─── Loading state ─── */
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-4 glow-blue">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="2" width="6" height="6" rx="1" fill="white" opacity="0.9"/>
            <rect x="12" y="2" width="6" height="6" rx="1" fill="white" opacity="0.6"/>
            <rect x="2" y="12" width="6" height="6" rx="1" fill="white" opacity="0.6"/>
            <rect x="12" y="12" width="6" height="6" rx="1" fill="white" opacity="0.9"/>
          </svg>
        </div>
        <div className="text-white font-bold text-lg mb-2">ACRON Digital</div>
        <div className="text-slate-500 text-sm font-mono animate-pulse">Загрузка системы...</div>
      </div>
    </div>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <HashRouter>
      <SiteProvider>
        <AppRoutes />
      </SiteProvider>
    </HashRouter>
  );
}

function AppRoutes() {
  const { loading } = useSite();

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <ScrollToTop />
      <Routes>
        {/* Public pages — each route explicit */}
        <Route path="/" element={<PublicLayout page={<HomePage />} />} />
        <Route path="/about" element={<PublicLayout page={<AboutPage />} />} />
        <Route path="/services" element={<PublicLayout page={<ServicesPage />} />} />
        <Route path="/projects" element={<PublicLayout page={<ProjectsPage />} />} />
        <Route path="/tech" element={<PublicLayout page={<TechPage />} />} />
        <Route path="/contacts" element={<PublicLayout page={<ContactsPage />} />} />

        {/* Admin login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Admin protected routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminLayout /></ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="hero" element={<HeroEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="services" element={<ServicesEditor />} />
          <Route path="projects" element={<ProjectsEditor />} />
          <Route path="stats" element={<StatsEditor />} />
          <Route path="contacts" element={<ContactsEditor />} />
          <Route path="settings" element={<SettingsEditor />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
