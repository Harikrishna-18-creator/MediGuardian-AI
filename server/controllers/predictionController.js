const db = require("../config/db");

// AI Prediction Logic
const getPredictions = (req, res) => {

    const sql = `
        SELECT
            id,
            medicine_name,
            quantity
        FROM medicines
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error",
                error: err
            });
        }

        const predictions = results.map((medicine) => {

            // Random demand (Demo AI)
            const predictedDemand =
                Math.floor(Math.random() * 100) + 20;

            let suggestedOrder = 0;

            if (predictedDemand > medicine.quantity) {

                suggestedOrder =
                    predictedDemand -
                    medicine.quantity +
                    20;

            }

            let status = "Normal";

            if (predictedDemand > 90) {

                status = "High Demand";

            } else if (predictedDemand > 60) {

                status = "Medium";

            }

            return {

                id: medicine.id,
                medicine_name: medicine.medicine_name,
                quantity: medicine.quantity,
                predictedDemand,
                suggestedOrder,
                status

            };

        });

        res.json({
            success: true,
            total: predictions.length,
            predictions
        });

    });

};

module.exports = {
    getPredictions
};