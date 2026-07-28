import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Medicines from "./pages/Medicines";
import AddMedicine from "./pages/AddMedicine";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import QRCodePage from "./pages/QRCodePage";
import AIPrediction from "./pages/AIPrediction";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Default */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Medicines */}
        <Route
          path="/medicines"
          element={<Medicines />}
        />

        {/* Add Medicine */}
        <Route
          path="/add"
          element={<AddMedicine />}
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* QR Code */}
        <Route
          path="/qrcode"
          element={<QRCodePage />}
        />

        {/* AI Prediction */}
        <Route
          path="/prediction"
          element={<AIPrediction />}
        />

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