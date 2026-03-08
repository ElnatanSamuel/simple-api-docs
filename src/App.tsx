import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DocsLayout from "./components/DocsLayout";
import IntroductionPage from "./pages/docs/IntroductionPage";
import InstallationPage from "./pages/docs/InstallationPage";
import QuickStartPage from "./pages/docs/QuickStartPage";
import ArchitecturePage from "./pages/docs/ArchitecturePage";
import ConfigurationPage from "./pages/docs/ConfigurationPage";
import EndpointsPage from "./pages/docs/EndpointsPage";
import AuthenticationPage from "./pages/docs/AuthenticationPage";
import DashboardPage from "./pages/docs/DashboardPage";
import MetricsPage from "./pages/docs/MetricsPage";
import CLIPage from "./pages/docs/CLIPage";
import AutomationPage from "./pages/docs/AutomationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DocsLayout />}>
            <Route path="/" element={<IntroductionPage />} />
            <Route path="/docs/installation" element={<InstallationPage />} />
            <Route path="/docs/quickstart" element={<QuickStartPage />} />
            <Route path="/docs/architecture" element={<ArchitecturePage />} />
            <Route path="/docs/configuration" element={<ConfigurationPage />} />
            <Route path="/docs/endpoints" element={<EndpointsPage />} />
            <Route path="/docs/authentication" element={<AuthenticationPage />} />
            <Route path="/docs/dashboard" element={<DashboardPage />} />
            <Route path="/docs/metrics" element={<MetricsPage />} />
            <Route path="/docs/cli" element={<CLIPage />} />
            <Route path="/docs/automation" element={<AutomationPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
