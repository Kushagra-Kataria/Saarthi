import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import Index from "./pages/Index";
import Submit from "./pages/Submit";
import Track from "./pages/Track";
import Admin from "./pages/Admin";
import HeatmapPage from "./pages/HeatmapPage";
import Transparency from "./pages/Transparency";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/track" element={<Track />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/heatmap" element={<HeatmapPage />} />
          <Route path="/admin/complaints" element={<Admin />} />
          <Route path="/admin/crisis" element={<Admin />} />
          <Route path="/admin/departments" element={<Admin />} />
          <Route path="/admin/reports" element={<Admin />} />
          <Route path="/admin/settings" element={<Admin />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
