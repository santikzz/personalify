import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalProvider } from '@/context/GlobalContext';

import { HomePage } from '@/pages/HomePage';
import { ClientListPage } from '@/pages/ClientListPage';
import { EmployeePage } from '@/pages/EmployeePage';
import { EmployeeListPage } from '@/pages/EmployeeListPage';
import { CreateEmployeePage } from '@/pages/CreateEmployeePage';
import { CreateClientPage } from './pages/CreateClientPage';
import { ClientPage } from './pages/ClientPage';

function App() {

  return (

    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <GlobalProvider>
        <Router>

          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="/personal" element={<EmployeeListPage />} />  
            <Route path="/employee/:employeeId" element={<EmployeePage />} />
            <Route path="/newemployee" element={<CreateEmployeePage />} />

            <Route path="/clients" element={<ClientListPage />} />
            <Route path="/client/:clientId" element={<ClientPage />} />
            <Route path="/newclient" element={<CreateClientPage />} />

          </Routes>

        </Router>
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default App
