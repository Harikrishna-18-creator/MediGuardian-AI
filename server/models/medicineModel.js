const db = require("../config/database");

// ===============================
// Get All Medicines
// ===============================
const getAllMedicines = (callback) => {

    const sql = "SELECT * FROM medicines ORDER BY id DESC";

    db.query(sql, callback);

};

// ===============================
// Get Medicine By ID
// ===============================
const getMedicineById = (id, callback) => {

    const sql = "SELECT * FROM medicines WHERE id = ?";

    db.query(sql, [id], callback);

};

// ===============================
// Add Medicine
// ===============================
const addMedicine = (medicine, callback) => {

    const sql = `
        INSERT INTO medicines
        (
            medicine_name,
            category,
            batch_no,
            quantity,
            reorder_level,
            purchase_date,
            expiry_date,
            price,
            manufacturer
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            medicine.medicine_name,
            medicine.category,
            medicine.batch_no,
            medicine.quantity,
            medicine.reorder_level,
            medicine.purchase_date,
            medicine.expiry_date,
            medicine.price,
            medicine.manufacturer
        ],
        callback
    );

};

// ===============================
// Update Medicine
// ===============================
const updateMedicine = (id, medicine, callback) => {

    const sql = `
        UPDATE medicines
        SET
            medicine_name=?,
            category=?,
            batch_no=?,
            quantity=?,
            reorder_level=?,
            purchase_date=?,
            expiry_date=?,
            price=?,
            manufacturer=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            medicine.medicine_name,
            medicine.category,
            medicine.batch_no,
            medicine.quantity,
            medicine.reorder_level,
            medicine.purchase_date,
            medicine.expiry_date,
            medicine.price,
            medicine.manufacturer,
            id
        ],
        callback
    );

};

// ===============================
// Delete Medicine
// ===============================
const deleteMedicine = (id, callback) => {

    const sql = "DELETE FROM medicines WHERE id=?";

    db.query(sql, [id], callback);

};

// ===============================
// Search Medicines
// ===============================
const searchMedicines = (keyword, callback) => {

    const sql = `
        SELECT *
        FROM medicines
        WHERE medicine_name LIKE ?
        OR category LIKE ?
        OR manufacturer LIKE ?
    `;

    const search = `%${keyword}%`;

    db.query(sql, [search, search, search], callback);

};

// ===============================
// Low Stock Medicines
// ===============================
const getLowStockMedicines = (callback) => {

    const sql = `
        SELECT *
        FROM medicines
        WHERE quantity <= reorder_level
    `;

    db.query(sql, callback);

};

// ===============================
// Expired Medicines
// ===============================
const getExpiredMedicines = (callback) => {

    const sql = `
        SELECT *
        FROM medicines
        WHERE expiry_date < CURDATE()
    `;

    db.query(sql, callback);

};

// ===============================
// Dashboard Statistics
// ===============================
const getDashboardStats = (callback) => {

    const sql = `
        SELECT
            COUNT(*) AS totalMedicines,
            SUM(CASE WHEN quantity <= reorder_level THEN 1 ELSE 0 END) AS lowStock,
            SUM(CASE WHEN expiry_date < CURDATE() THEN 1 ELSE 0 END) AS expired
        FROM medicines
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return callback(err, null);
        }

        callback(null, results[0]);

    });

};

// ===============================
// Export
// ===============================
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