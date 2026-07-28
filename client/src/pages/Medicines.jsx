import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MedicineTable from "../components/MedicineTable";
import Loader from "../components/Loader";
import API from "../services/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Medicines() {
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  // ==============================
  // Fetch Medicines
  // ==============================
  const fetchMedicines = async (keyword = "") => {
    try {
      let url = "/medicines";

      if (keyword.trim() !== "") {
        url = `/medicines/search?keyword=${keyword}`;
      }

      const res = await API.get(url);

      setMedicines(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Delete Medicine
  // ==============================
  const deleteMedicine = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;

    try {
      await API.delete(`/medicines/${id}`);
      fetchMedicines(search);
    } catch (err) {
      console.log(err);
    }
  };

  // ==============================
  // Category Filter
  // ==============================
  const displayedMedicines =
    category === ""
      ? medicines
      : medicines.filter(
          (medicine) => medicine.category === category
        );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container-fluid p-4">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h2 className="fw-bold">
                Medicines
              </h2>

              <Link
                to="/add"
                className="btn btn-primary"
              >
                + Add Medicine
              </Link>

            </div>

            <div className="row mb-4">

              <div className="col-md-6">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Medicine..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    fetchMedicines(e.target.value);
                  }}
                />

              </div>

              <div className="col-md-3">

                <select
                  className="form-select"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >

                  <option value="">
                    All Categories
                  </option>

                  <option value="Tablet">
                    Tablet
                  </option>

                  <option value="Capsule">
                    Capsule
                  </option>

                  <option value="Injection">
                    Injection
                  </option>

                  <option value="Syrup">
                    Syrup
                  </option>

                </select>

              </div>

            </div>

            <MedicineTable
              medicines={displayedMedicines}
              deleteMedicine={deleteMedicine}
            />

          </motion.div>

        </div>

      </div>

    </>
  );
}

export default Medicines;