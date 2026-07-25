const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");

const login = (req, res) => {

    const { email, password } = req.body;

    Auth.findAdminByEmail(email, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            });
        }

        const admin = results[0];

        // Compare plain-text password
        if (password !== admin.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.json({
            success: true,
            message: "Login Successful",
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email
            }
        });

    });

};

module.exports = {
    login
};