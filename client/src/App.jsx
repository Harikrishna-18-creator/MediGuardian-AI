import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import AddMedicine from "./pages/AddMedicine";
import EditMedicine from "./pages/EditMedicine";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import QRCodePage from "./pages/QRCodePage";
import AIPrediction from "./pages/AIPrediction";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/medicines" element={<Medicines />} />

        <Route path="/add" element={<AddMedicine />} />

        <Route path="/edit/:id" element={<EditMedicine />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/qrcode" element={<QRCodePage />} />

        <Route path="/prediction" element={<AIPrediction />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;