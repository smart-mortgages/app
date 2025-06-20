import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/user/Dashboard'
import AccountBalanceDetail from './pages/user/AccountBalanceDetail'
import MortgageDetail from './pages/user/MortgageDetail'
import AdminDashboard from './pages/admin/Dashboard'
import { DataProvider } from './context/DataContext'
import './App.css'

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account-balance" element={<AccountBalanceDetail />} />
          <Route path="/mortgage" element={<MortgageDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
