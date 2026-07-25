import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import Loader from "../components/Loader";
import API from "../services/api";

import { motion } from "framer-motion";

import {
  FaPills,
  FaExclamationTriangle,
  FaTimesCircle,
  FaRupeeSign,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await API.get("/medicines");

      setMedicines(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const totalMedicines = medicines.length;

  const lowStock = medicines.filter(
    (m) => Number(m.quantity) <= Number(m.reorder_level)
  ).length;

  const expired = medicines.filter(
    (m) => new Date(m.expiry_date) < new Date()
  ).length;

  const inventoryValue = medicines.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0) *
        Number(item.price || 0),
    0
  );

  const barData = {
    labels: medicines.map(
      (m) => m.medicine_name
    ),

    datasets: [
      {
        label: "Stock",

        data: medicines.map(
          (m) => m.quantity
        ),

        backgroundColor: "#2563EB",
      },
    ],
  };

  const pieData = {
    labels: [
      "Healthy",
      "Low Stock",
      "Expired",
    ],

    datasets: [
      {
        data: [
          totalMedicines -
            lowStock -
            expired,
          lowStock,
          expired,
        ],

        backgroundColor: [
          "#10B981",
          "#F59E0B",
          "#EF4444",
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">

        <Sidebar />

        <div className="container-fluid p-4">

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 fw-bold"
          >
            Dashboard
          </motion.h2>

          {/* Cards */}

          <motion.div
            className="row"
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <div className="col-md-3 mb-4">

              <DashboardCard
                title="Total Medicines"
                value={totalMedicines}
                icon={<FaPills />}
                color="#2563EB"
              />

            </div>

            <div className="col-md-3 mb-4">

              <DashboardCard
                title="Low Stock"
                value={lowStock}
                icon={
                  <FaExclamationTriangle />
                }
                color="#F59E0B"
              />

            </div>

            <div className="col-md-3 mb-4">

              <DashboardCard
                title="Expired"
                value={expired}
                icon={
                  <FaTimesCircle />
                }
                color="#EF4444"
              />

            </div>

            <div className="col-md-3 mb-4">

              <DashboardCard
                title="Inventory Value"
                value={`₹${inventoryValue}`}
                icon={<FaRupeeSign />}
                color="#10B981"
              />

            </div>

          </motion.div>

          {/* Charts */}

          <div className="row">

            <motion.div
              className="col-lg-8 mb-4"
              initial={{
                opacity: 0,
                x: -80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <div className="card shadow">

                <div className="card-body">

                  <h4 className="mb-3">
                    📊 Medicine Stock
                  </h4>

                  <Bar data={barData} />

                </div>

              </div>

            </motion.div>

            <motion.div
              className="col-lg-4 mb-4"
              initial={{
                opacity: 0,
                x: 80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <div className="card shadow">

                <div className="card-body">

                  <h4 className="mb-3">
                    📈 Inventory Status
                  </h4>

                  <Pie data={pieData} />

                </div>

              </div>

            </motion.div>

          </div>

          {/* Recent Medicines */}

          <motion.div
            className="card shadow"
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <div className="card-body">

              <h4 className="mb-3">
                Recent Medicines
              </h4>

              <table className="table table-hover">

                <thead className="table-primary">

                  <tr>

                    <th>ID</th>

                    <th>Medicine</th>

                    <th>Category</th>

                    <th>Quantity</th>

                    <th>Expiry</th>

                  </tr>

                </thead>

                <tbody>

                  {medicines
                    .slice(0, 5)
                    .map((medicine) => (

                      <tr
                        key={medicine.id}
                      >

                        <td>
                          {medicine.id}
                        </td>

                        <td>
                          {
                            medicine.medicine_name
                          }
                        </td>

                        <td>
                          {
                            medicine.category
                          }
                        </td>

                        <td>
                          {
                            medicine.quantity
                          }
                        </td>

                        <td>
                          {
                            medicine.expiry_date
                          }
                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

          </motion.div>

        </div>

      </div>

    </>
  );
}

export default Dashboard;