const Medicine = require("../models/medicineModel");

// ==============================
// Get All Medicines
// ==============================
const getAllMedicines = (req, res) => {

    Medicine.getAllMedicines((err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });

    });

};

// ==============================
// Get Medicine By ID
// ==============================
const getMedicineById = (req, res) => {

    const id = req.params.id;

    Medicine.getMedicineById(id, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Medicine Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: results[0]
        });

    });

};

// ==============================
// Add Medicine
// ==============================
const addMedicine = (req, res) => {

    Medicine.addMedicine(req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Medicine Added Successfully"
        });

    });

};

// ==============================
// Update Medicine
// ==============================
const updateMedicine = (req, res) => {

    const id = req.params.id;

    Medicine.updateMedicine(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Medicine Updated Successfully"
        });

    });

};

// ==============================
// Delete Medicine
// ==============================
const deleteMedicine = (req, res) => {

    const id = req.params.id;

    Medicine.deleteMedicine(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Medicine Deleted Successfully"
        });

    });

};

// ==============================
// Search Medicines
// ==============================
const searchMedicines = (req, res) => {

    const keyword = req.query.keyword;

    Medicine.searchMedicines(keyword, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });

    });

};

// ==============================
// Low Stock Medicines
// ==============================
const getLowStockMedicines = (req, res) => {

    Medicine.getLowStockMedicines((err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });

    });

};

// ==============================
// Expired Medicines
// ==============================
const getExpiredMedicines = (req, res) => {

    Medicine.getExpiredMedicines((err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });

    });

};

// ==============================
// Dashboard Statistics
// ==============================
const getDashboardStats = (req, res) => {

    Medicine.getDashboardStats((err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });

    });

};

// ==============================
// Export All Controllers
// ==============================
module.exports = {
    getAllMedicines,
    getMedicineById,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    searchMedicines,
    getLowStockMedicines,
    getExpiredMedicines,
    getDashboardStats
};