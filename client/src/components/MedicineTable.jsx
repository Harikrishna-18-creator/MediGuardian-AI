import React from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaQrcode,
} from "react-icons/fa";

function MedicineTable({
  medicines,
  deleteMedicine,
}) {
  return (
    <div className="card shadow">

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-primary">

              <tr>

                <th>ID</th>

                <th>Medicine</th>

                <th>Category</th>

                <th>Price</th>

                <th>Quantity</th>

                <th>Expiry Date</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {medicines.length === 0 ? (

                <tr>

                  <td
                    colSpan="8"
                    className="text-center text-muted"
                  >
                    No medicines found.
                  </td>

                </tr>

              ) : (

                medicines.map((medicine) => {

                  const expired =
                    new Date(medicine.expiry_date) <
                    new Date();

                  const lowStock =
                    Number(medicine.quantity) <=
                    Number(medicine.reorder_level);

                  return (

                    <tr key={medicine.id}>

                      <td>{medicine.id}</td>

                      <td>{medicine.medicine_name}</td>

                      <td>{medicine.category}</td>

                      <td>₹{medicine.price}</td>

                      <td>{medicine.quantity}</td>

                      <td>{medicine.expiry_date}</td>

                      <td>

                        {expired ? (

                          <span className="badge bg-danger">
                            Expired
                          </span>

                        ) : lowStock ? (

                          <span className="badge bg-warning text-dark">
                            Low Stock
                          </span>

                        ) : (

                          <span className="badge bg-success">
                            Available
                          </span>

                        )}

                      </td>

                      <td>

                        <Link
                          to={`/edit/${medicine.id}`}
                          className="btn btn-warning btn-sm me-2"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() =>
                            deleteMedicine(
                              medicine.id
                            )
                          }
                        >
                          <FaTrash />
                        </button>

                        <Link
                          to={`/qrcode?id=${medicine.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          <FaQrcode />
                        </Link>

                      </td>

                    </tr>

                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default MedicineTable;