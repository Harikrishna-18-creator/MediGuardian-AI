import React from "react";

const PredictionTable = ({ medicines }) => {
  const getStatusBadge = (status) => {
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
    <div className="card shadow border-0">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">AI Prediction Results</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-striped align-middle mb-0">
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
            {medicines.length > 0 ? (
              medicines.map((medicine, index) => (
                <tr key={medicine.id}>
                  <td>{index + 1}</td>

                  <td className="fw-semibold">
                    {medicine.medicine_name}
                  </td>

                  <td>{medicine.quantity}</td>

                  <td>
                    <span className="badge bg-info text-dark">
                      {medicine.predictedDemand}
                    </span>
                  </td>

                  <td>
                    {medicine.suggestedOrder > 0 ? (
                      <span className="badge bg-primary">
                        {medicine.suggestedOrder}
                      </span>
                    ) : (
                      <span className="badge bg-success">
                        No Order Needed
                      </span>
                    )}
                  </td>

                  <td>{getStatusBadge(medicine.status)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <h5>No medicines found.</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PredictionTable;