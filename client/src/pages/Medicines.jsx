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

  const fetchMedicines = async () => {
    try {
      const res = await API.get("/medicines");
      setMedicines(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedicine = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;

    try {
      await API.delete(`/medicines/${id}`);
      fetchMedicines();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.medicine_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      medicine.category
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "" ||
      medicine.category === category;

    return matchesSearch && matchesCategory;
  });

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
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
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
              medicines={filteredMedicines}
              deleteMedicine={deleteMedicine}
            />

          </motion.div>

        </div>

      </div>
    </>
  );
}

export default Medicines;