import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Agendamento from "./pages/Agendamento";
import Atendimento from "./pages/Atendimento";
import Pacientes from "./pages/Pacientes";
import Profissionais from "./pages/Profissionais"; // Import Profissionais
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/atendimento" element={<Atendimento />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/profissionais" element={<Profissionais />} /> {/* Add Profissionais route */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
