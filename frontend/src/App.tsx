import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalProvider } from '@/context/GlobalContext';

import { ProtectedRoute } from '@/utils/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';

import { EmployeeDetailPage } from '@/pages/employee/EmployeeDetailPage';
import { EmployeeListPage } from '@/pages/employee/EmployeeListPage';
import { EmployeeCreatePage } from '@/pages/employee/EmployeeCreatePage';
import { EmployeeEditPage } from '@/pages/employee/EmployeeEditPage';

import { ClientDetailPage } from '@/pages/client/ClientDetailPage';
import { ClientListPage } from '@/pages/client/ClientListPage';
import { ClientCreatePage } from '@/pages/client/ClientCreatePage';
import { ClientEditPage } from '@/pages/client/ClientEditPage';

import { ManagerListPage } from '@/pages/manager/ManagerListPage';
import { ManagerCreatePage } from '@/pages/manager/ManagerCreatePage';
import { ManagerEditPage } from '@/pages/manager/ManagerEditPage';


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
              <Route path="/employee/:employeeId" element={<ProtectedRoute><EmployeeDetailPage /></ProtectedRoute>} />
              <Route path="/employee/new" element={<ProtectedRoute><EmployeeCreatePage /></ProtectedRoute>} />
              <Route path="/employee/:employeeId/edit" element={<ProtectedRoute><EmployeeEditPage /></ProtectedRoute>} />

              <Route path="/managers" element={<ProtectedRoute><ManagerListPage /></ProtectedRoute>} />
              <Route path="/manager/new" element={<ProtectedRoute><ManagerCreatePage /></ProtectedRoute>} />
              <Route path="/manager/:managerId/edit" element={<ProtectedRoute><ManagerEditPage /></ProtectedRoute>} />

              <Route path="/clients" element={<ProtectedRoute><ClientListPage /></ProtectedRoute>} />
              <Route path="/client/:clientId" element={<ProtectedRoute><ClientDetailPage /></ProtectedRoute>} />
              <Route path="/client/new" element={<ProtectedRoute><ClientCreatePage /></ProtectedRoute>} />
              <Route path="/client/:clientId/edit" element={<ProtectedRoute><ClientEditPage /></ProtectedRoute>} />

            </Routes>
          </Router>
        </GlobalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}