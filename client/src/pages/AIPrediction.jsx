import React, { useEffect, useState } from "react";
import {
  FaRobot,
  FaSearch,
  FaBoxes,
  FaChartLine,
  FaShoppingCart,
} from "react-icons/fa";

const AIPrediction = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [search, setSearch] = useState("");

  // Dummy data
  useEffect(() => {
    const data = [
      {
        id: 1,
        medicine_name: "Paracetamol",
        quantity: 120,
      },
      {
        id: 2,
        medicine_name: "Amoxicillin",
        quantity: 25,
      },
      {
        id: 3,
        medicine_name: "Vitamin C",
        quantity: 65,
      },
      {
        id: 4,
        medicine_name: "Cetirizine",
        quantity: 12,
      },
      {
        id: 5,
        medicine_name: "Metformin",
        quantity: 95,
      },
      {
        id: 6,
        medicine_name: "Ibuprofen",
        quantity: 40,
      },
      {
        id: 7,
        medicine_name: "Azithromycin",
        quantity: 18,
      },
      {
        id: 8,
        medicine_name: "Insulin",
        quantity: 8,
      },
    ];

    const predicted = data.map((item) => {
      let predictedDemand = Math.floor(Math.random() * 100) + 20;

      let suggestedOrder = 0;

      if (predictedDemand > item.quantity) {
        suggestedOrder = predictedDemand - item.quantity + 20;
      }

      let status = "Normal";

      if (predictedDemand > 90)
        status = "High Demand";
      else if (predictedDemand > 60)
        status = "Medium";

      return {
        ...item,
        predictedDemand,
        suggestedOrder,
        status,
      };
    });

    setMedicines(predicted);
    setFilteredMedicines(predicted);
  }, []);

  useEffect(() => {
    const result = medicines.filter((item) =>
      item.medicine_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredMedicines(result);
  }, [search, medicines]);

  const statusBadge = (status) => {
    switch (status) {
      case "High Demand":
        return (
          <span className="badge bg-danger">
            🔴 High Demand
          </span>
        );

      case "Medium":
        return (
          <span className="badge bg-warning text-dark">
            🟡 Medium
          </span>
        );

      default:
        return (
          <span className="badge bg-success">
            🟢 Normal
          </span>
        );
    }
  };

  return (
    <div className="container py-4">

      {/* Header */}

      <div className="card shadow-lg border-0 mb-4">
        <div className="card-body bg-primary text-white rounded">

          <div className="d-flex align-items-center">

            <FaRobot size={40} />

            <div className="ms-3">
              <h2 className="mb-1">
                AI Medicine Demand Prediction
              </h2>

              <p className="mb-0">
                Smart Inventory Forecast Dashboard
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Search */}

      <div className="card shadow-sm mb-4">
        <div className="card-body">

          <div className="input-group">

            <span className="input-group-text">
              <FaSearch />
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Search Medicine..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>
      </div>

      {/* Cards */}

      <div className="row mb-4">

        <div className="col-md-4 mb-3">

          <div className="card shadow h-100 border-0">

            <div className="card-body text-center">

              <FaBoxes
                size={45}
                className="text-primary mb-3"
              />

              <h5>Total Medicines</h5>

              <h2>{filteredMedicines.length}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card shadow h-100 border-0">

            <div className="card-body text-center">

              <FaChartLine
                size={45}
                className="text-success mb-3"
              />

              <h5>Average Demand</h5>

              <h2>
                {Math.floor(
                  filteredMedicines.reduce(
                    (a, b) =>
                      a + b.predictedDemand,
                    0
                  ) /
                    (filteredMedicines.length || 1)
                )}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card shadow h-100 border-0">

            <div className="card-body text-center">

              <FaShoppingCart
                size={45}
                className="text-danger mb-3"
              />

              <h5>Total Suggested Orders</h5>

              <h2>
                {filteredMedicines.reduce(
                  (a, b) =>
                    a + b.suggestedOrder,
                  0
                )}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Prediction Table */}

      <div className="card shadow border-0">

        <div className="card-header bg-dark text-white">
          AI Prediction Results
        </div>

        <div className="table-responsive">

          <table className="table table-hover table-striped mb-0">

            <thead className="table-primary">

              <tr>

                <th>#</th>

                <th>Medicine</th>

                <th>Current Stock</th>

                <th>Predicted Demand</th>

                <th>Suggested Order</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredMedicines.map((medicine, index) => (

                <tr key={medicine.id}>

                  <td>{index + 1}</td>

                  <td>{medicine.medicine_name}</td>

                  <td>{medicine.quantity}</td>

                  <td>{medicine.predictedDemand}</td>

                  <td>{medicine.suggestedOrder}</td>

                  <td>
                    {statusBadge(medicine.status)}
                  </td>

                </tr>

              ))}

              {filteredMedicines.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-4"
                  >
                    No medicines found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AIPrediction;