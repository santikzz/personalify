import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalProvider } from '@/context/GlobalContext';

import { HomePage } from '@/pages/HomePage';
import { ClientListPage } from '@/pages/ClientListPage';
import { EmployeePage } from '@/pages/EmployeePage';
import { EmployeeListPage } from '@/pages/EmployeeListPage';
import { CreateEmployeePage } from '@/pages/CreateEmployeePage';
import { CreateClientPage } from '@/pages/CreateClientPage';
import { ClientPage } from '@/pages/ClientPage';
import { LoginPage } from '@/pages/LoginPage';
import { ProtectedRoute } from '@/utils/ProtectedRoute';

export default function App() {

  const queryClient = new QueryClient();

  return (

    /*
      <ThemeProvider>: Light/Dark theme manager.
      <QueryClientProvider>: @tanstack/react-query provider for easier data fetching.
      <GlobalProvider>: Global context provider for global state management.
      <ProtectedRoute>: Custom route for routes that require authentication.
    */

    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <Router>
            <Routes>

              <Route path="/login" element={<LoginPage />} />

              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />

              <Route path="/personal" element={<ProtectedRoute><EmployeeListPage /></ProtectedRoute>} />
              <Route path="/employee/:employeeId" element={<ProtectedRoute><EmployeePage /></ProtectedRoute>} />
              <Route path="/newemployee" element={<ProtectedRoute><CreateEmployeePage /></ProtectedRoute>} />

              <Route path="/clients" element={<ProtectedRoute><ClientListPage /></ProtectedRoute>} />
              <Route path="/client/:clientId" element={<ProtectedRoute><ClientPage /></ProtectedRoute>} />
              <Route path="/newclient" element={<ProtectedRoute><CreateClientPage /></ProtectedRoute>} />

            </Routes>
          </Router>
        </GlobalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}