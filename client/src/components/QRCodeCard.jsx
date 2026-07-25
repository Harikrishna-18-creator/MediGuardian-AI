import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import { FaDownload, FaPrint } from "react-icons/fa";

const QRCodeCard = ({ medicine }) => {
  const qrRef = useRef();

  const downloadQR = async () => {
    const canvas = await html2canvas(qrRef.current);

    const link = document.createElement("a");
    link.download = `${medicine.medicine_name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const printQR = () => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(qrRef.current.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const qrData = JSON.stringify({
    id: medicine.id,
    medicine: medicine.medicine_name,
    batch: medicine.batch_no,
    stock: medicine.quantity,
    expiry: medicine.expiry_date,
  });

  return (
    <div className="card shadow border-0 h-100">

      <div className="card-body text-center" ref={qrRef}>

        <QRCodeCanvas
          value={qrData}
          size={180}
          includeMargin={true}
        />

        <h5 className="mt-3">
          {medicine.medicine_name}
        </h5>

        <p className="mb-1">
          <strong>Batch:</strong> {medicine.batch_no}
        </p>

        <p className="mb-1">
          <strong>Stock:</strong> {medicine.quantity}
        </p>

        <p>
          <strong>Expiry:</strong> {medicine.expiry_date}
        </p>

      </div>

      <div className="card-footer bg-white">

        <button
          className="btn btn-success me-2"
          onClick={downloadQR}
        >
          <FaDownload /> Download
        </button>

        <button
          className="btn btn-primary"
          onClick={printQR}
        >
          <FaPrint /> Print
        </button>

      </div>

    </div>
  );
};

export default QRCodeCard;