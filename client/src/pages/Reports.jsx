import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Reports() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/medicines");
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const totalMedicines = medicines.length;

  const lowStock = medicines.filter(
    (medicine) => Number(medicine.quantity) <= 10
  ).length;

  const expiredMedicines = medicines.filter((medicine) => {
    return new Date(medicine.expiry_date) < new Date();
  }).length;

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <h2 className="mb-4 fw-bold">
            Reports Dashboard
          </h2>

          <div className="row">

            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 bg-primary text-white">
                <div className="card-body text-center">
                  <h5>Total Medicines</h5>
                  <h2>{totalMedicines}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 bg-warning text-dark">
                <div className="card-body text-center">
                  <h5>Low Stock</h5>
                  <h2>{lowStock}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 bg-danger text-white">
                <div className="card-body text-center">
                  <h5>Expired</h5>
                  <h2>{expiredMedicines}</h2>
                </div>
              </div>
            </div>

          </div>

          <div className="card shadow">

            <div className="card-header bg-dark text-white">
              Medicine Report
            </div>

            <div className="card-body table-responsive">

              <table className="table table-bordered table-hover">

                <thead className="table-primary">

                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Expiry Date</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {medicines.map((medicine, index) => {

                    const expired =
                      new Date(medicine.expiry_date) < new Date();

                    return (
                      <tr key={medicine.id}>
                        <td>{index + 1}</td>
                        <td>{medicine.medicine_name}</td>
                        <td>{medicine.category}</td>
                        <td>{medicine.quantity}</td>
                        <td>{medicine.expiry_date}</td>

                        <td>
                          {expired ? (
                            <span className="badge bg-danger">
                              Expired
                            </span>
                          ) : Number(medicine.quantity) <= 10 ? (
                            <span className="badge bg-warning text-dark">
                              Low Stock
                            </span>
                          ) : (
                            <span className="badge bg-success">
                              Available
                            </span>
                          )}
                        </td>
                      </tr>
                    );

                  })}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default Reports;