import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";

// Lazy load components
const LandingPage = lazy(() => import("./components/landing/LandingPage"));
const Login = lazy(() => import("./components/auth/Login"));
const SignUp = lazy(() => import("./components/auth/SignUp"));
const Products = lazy(() => import("./components/Products"));
const CustomPrint = lazy(() => import("./components/CustomPrint"));
const DashboardLayout = lazy(
  () => import("./components/dashboard/DashboardLayout"),
);
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const Financial = lazy(() => import("./components/dashboard/Financial"));
const CalendarView = lazy(() => import("./components/dashboard/CalendarView"));
const AIOverview = lazy(() => import("./components/dashboard/AIOverview"));
const AIApps = lazy(() => import("./components/dashboard/AIApps"));
const AIChat = lazy(() => import("./components/dashboard/AIChat"));
const Sensors = lazy(() => import("./components/dashboard/Sensors"));
const SocialMedia = lazy(() => import("./components/dashboard/SocialMedia"));
const Settings = lazy(() => import("./components/dashboard/Settings"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/custom-3d-print" element={<CustomPrint />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="financial" element={<Financial />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="ai-overview" element={<AIOverview />} />
            <Route path="ai-apps" element={<AIApps />} />
            <Route path="ai-chat" element={<AIChat />} />
            <Route path="sensors" element={<Sensors />} />
            <Route path="social-media" element={<SocialMedia />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
