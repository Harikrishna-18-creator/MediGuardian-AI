const db = require("../config/database");

const findAdminByEmail = (email, callback) => {

    const sql = "SELECT * FROM admins WHERE email = ?";

    db.query(sql, [email], callback);

};

module.exports = {
    findAdminByEmail
};