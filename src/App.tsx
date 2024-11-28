import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {/* Main route for Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Redirect all other routes to Dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
