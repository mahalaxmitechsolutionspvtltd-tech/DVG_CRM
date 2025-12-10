import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Network from './pages/Network';
import Reports from './pages/Reports';
import Companies from './pages/Companies';
import Emails from './pages/Emails';
import Settings from './pages/Settings';
import Deals from './pages/Deals';
import Contacts from './pages/Contacts';

import ProtectedRoutes from './ProtectedRoutes';
import { Login } from './auth/Login';
import { Signup } from './auth/Signup';
import AuthProvider from './auth/AuthProvider';
import AuthRedirect from './AuthRedirect';



function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>

          <Routes>
            <Route element={<AuthRedirect />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/leads" element={<Leads />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/network" element={<Network />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/emails" element={<Emails />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
