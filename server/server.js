require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Import Database
require("./config/database");

// Import Routes
const medicineRoutes = require("./routes/medicineRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ============================
// Middleware
// ============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// Home Route
// ============================
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🏥 MediGuardian AI Backend Running Successfully"
    });
});

// ============================
// API Routes
// ============================
app.use("/api/auth", authRoutes);
app.use("/api/medicines", medicineRoutes);

// ============================
// 404 Route
// ============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found"
    });
});

// ============================
// Server
// ============================
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
    console.log("=====================================");
    console.log("🏥 MediGuardian AI Server Started");
    console.log(`🚀 Server : http://localhost:${PORT}`);
    console.log("=====================================");
});