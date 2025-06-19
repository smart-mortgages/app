import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AccountBalanceDetail from './pages/AccountBalanceDetail'
import MortgageDetail from './pages/MortgageDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account-balance" element={<AccountBalanceDetail />} />
        <Route path="/mortgage" element={<MortgageDetail />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  )
}

export default App
