import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaQrcode } from "react-icons/fa";
import QRCodeCard from "../components/QRCodeCard";

const QRCodePage = () => {

  const [medicines, setMedicines] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const data = [
      {
        id: 1,
        medicine_name: "Paracetamol",
        batch_no: "PAR001",
        quantity: 100,
        expiry_date: "2027-08-12",
      },
      {
        id: 2,
        medicine_name: "Amoxicillin",
        batch_no: "AMX201",
        quantity: 50,
        expiry_date: "2026-11-30",
      },
      {
        id: 3,
        medicine_name: "Vitamin C",
        batch_no: "VIT100",
        quantity: 75,
        expiry_date: "2028-03-15",
      },
    ];

    setMedicines(data);
    setFiltered(data);

  }, []);

  useEffect(() => {

    setFiltered(
      medicines.filter((m) =>
        m.medicine_name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );

  }, [search, medicines]);

  return (
    <div className="container py-4">

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <div className="card shadow-lg border-0 mb-4">

          <div className="card-body bg-primary text-white">

            <h2>
              <FaQrcode /> QR Code Management
            </h2>

            <p className="mb-0">
              Generate and print QR codes for medicines
            </p>

          </div>

        </div>

      </motion.div>

      <div className="input-group mb-4">

        <span className="input-group-text">
          <FaSearch />
        </span>

        <input
          className="form-control"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="row">

        {filtered.map((medicine) => (

          <div
            className="col-lg-4 col-md-6 mb-4"
            key={medicine.id}
          >

            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >

              <QRCodeCard medicine={medicine} />

            </motion.div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default QRCodePage;