import { Toaster } from "@/components/ui/toaster"; // Original Toaster
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // shadcn Sonner
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Pages
import HomeDashboardPage from "./pages/HomeDashboardPage";
import MarketsPage from "./pages/MarketsPage";
import TradingPage from "./pages/TradingPage";
import WalletPage from "./pages/WalletPage";
import EarnPage from "./pages/EarnPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// Dummy AdvancedChartComponent if not provided by user (for TradingPage)
// In a real scenario, this component would be properly defined.
// For this exercise, we assume it's provided as per instructions.
// If 'src/components/AdvancedChartComponent.tsx' doesn't exist, this will cause an error.
// The prompt implies it should be imported like any other component.

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* Forshadcn/ui Toasts */}
      <SonnerToaster richColors position="top-right" /> {/* For Sonner notifications */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeDashboardPage />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/trading" element={<TradingPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          {/* Example of sub-route for wallet if needed, e.g. /wallet/deposit */}
          <Route path="/wallet/:action" element={<WalletPage />} /> 
          <Route path="/earn" element={<EarnPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;