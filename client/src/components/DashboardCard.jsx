import React from "react";

function DashboardCard({
  title,
  value,
  icon,
  color,
}) {

  return (

    <div
      className="card shadow"
      style={{
        borderLeft: `6px solid ${color}`,
      }}
    >

      <div className="card-body d-flex justify-content-between">

        <div>

          <h6 className="text-muted">
            {title}
          </h6>

          <h2>{value}</h2>

        </div>

        <div
          style={{
            color,
            fontSize: "35px",
          }}
        >
          {icon}
        </div>

      </div>

    </div>

  );
}

export default DashboardCard;