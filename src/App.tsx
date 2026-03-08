import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DocsLayout from "./components/DocsLayout";
import IntroductionPage from "./pages/docs/IntroductionPage";
import InstallationPage from "./pages/docs/InstallationPage";
import GettingStartedPage from "./pages/docs/GettingStartedPage";
import LoggerPage from "./pages/docs/LoggerPage";
import MockPage from "./pages/docs/MockPage";
import RetryPage from "./pages/docs/RetryPage";
import TransformerPage from "./pages/docs/TransformerPage";
import ZustandPage from "./pages/docs/ZustandPage";
import ComingSoonPage from "./pages/docs/ComingSoonPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<IntroductionPage />} />
            <Route path="installation" element={<InstallationPage />} />
            <Route path="getting-started" element={<GettingStartedPage />} />
            {/* Core */}
            <Route path="core/create-api" element={<ComingSoonPage section="Core" title="Create API" />} />
            <Route path="core/middleware" element={<ComingSoonPage section="Core" title="Middleware" />} />
            <Route path="core/api-error" element={<ComingSoonPage section="Core" title="API Error" />} />
            {/* Adapters */}
            <Route path="adapters/react" element={<ComingSoonPage section="Adapters" title="React" />} />
            <Route path="adapters/svelte" element={<ComingSoonPage section="Adapters" title="Svelte" />} />
            <Route path="adapters/react-native" element={<ComingSoonPage section="Adapters" title="React Native" />} />
            {/* Middleware Library */}
            <Route path="middleware/logger" element={<LoggerPage />} />
            <Route path="middleware/mock" element={<MockPage />} />
            <Route path="middleware/retry" element={<RetryPage />} />
            <Route path="middleware/transformer" element={<TransformerPage />} />
            <Route path="middleware/zustand" element={<ZustandPage />} />
            {/* Advanced */}
            <Route path="advanced/type-inference" element={<ComingSoonPage section="Advanced" title="Type Inference" />} />
            <Route path="advanced/request-deduplication" element={<ComingSoonPage section="Advanced" title="Request Deduplication" />} />
            <Route path="advanced/structured-errors" element={<ComingSoonPage section="Advanced" title="Structured Errors" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
