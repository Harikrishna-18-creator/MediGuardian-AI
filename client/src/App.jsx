import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import QRCodePage from "./pages/QRCodePage";
import AIPrediction from "./pages/AIPrediction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Main Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/qrcode" element={<QRCodePage />} />
        <Route path="/prediction" element={<AIPrediction />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container text-center mt-5">
              <h1>404</h1>
              <h4>Page Not Found</h4>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;