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
import CreateApiPage from "./pages/docs/CreateApiPage";
import MiddlewarePage from "./pages/docs/MiddlewarePage";
import ApiErrorPage from "./pages/docs/ApiErrorPage";
import ReactAdapterPage from "./pages/docs/ReactAdapterPage";
import SvelteAdapterPage from "./pages/docs/SvelteAdapterPage";
import ReactNativePage from "./pages/docs/ReactNativePage";
import LoggerPage from "./pages/docs/LoggerPage";
import MockPage from "./pages/docs/MockPage";
import RetryPage from "./pages/docs/RetryPage";
import TransformerPage from "./pages/docs/TransformerPage";
import ZustandPage from "./pages/docs/ZustandPage";
import TypeInferencePage from "./pages/docs/TypeInferencePage";
import RequestDeduplicationPage from "./pages/docs/RequestDeduplicationPage";
import StructuredErrorsPage from "./pages/docs/StructuredErrorsPage";
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
            <Route path="core/create-api" element={<CreateApiPage />} />
            <Route path="core/middleware" element={<MiddlewarePage />} />
            <Route path="core/api-error" element={<ApiErrorPage />} />
            {/* Adapters */}
            <Route path="adapters/react" element={<ReactAdapterPage />} />
            <Route path="adapters/svelte" element={<SvelteAdapterPage />} />
            <Route path="adapters/react-native" element={<ReactNativePage />} />
            {/* Middleware Library */}
            <Route path="middleware/logger" element={<LoggerPage />} />
            <Route path="middleware/mock" element={<MockPage />} />
            <Route path="middleware/retry" element={<RetryPage />} />
            <Route path="middleware/transformer" element={<TransformerPage />} />
            <Route path="middleware/zustand" element={<ZustandPage />} />
            {/* Advanced */}
            <Route path="advanced/type-inference" element={<TypeInferencePage />} />
            <Route path="advanced/request-deduplication" element={<RequestDeduplicationPage />} />
            <Route path="advanced/structured-errors" element={<StructuredErrorsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
