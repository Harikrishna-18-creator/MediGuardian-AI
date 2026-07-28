const express = require("express");
const router = express.Router();

const medicineController = require("../controllers/medicineController");

// ===================================
// Dashboard Statistics
// ===================================
router.get("/dashboard", medicineController.getDashboardStats);

// ===================================
// Low Stock Medicines
// ===================================
router.get("/low-stock", medicineController.getLowStockMedicines);

// ===================================
// Expired Medicines
// ===================================
router.get("/expired", medicineController.getExpiredMedicines);

// ===================================
// Search Medicines
// Example:
// /api/medicines/search?keyword=para
// ===================================
router.get("/search", medicineController.searchMedicines);

// ===================================
// Get All Medicines
// ===================================
router.get("/", medicineController.getAllMedicines);

// ===================================
// Get Medicine By ID
// ===================================
router.get("/:id", medicineController.getMedicineById);

// ===================================
// Add Medicine
// ===================================
router.post("/", medicineController.addMedicine);

// ===================================
// Update Medicine
// ===================================
router.put("/:id", medicineController.updateMedicine);

// ===================================
// Delete Medicine
// ===================================
router.delete("/:id", medicineController.deleteMedicine);

module.exports = router;