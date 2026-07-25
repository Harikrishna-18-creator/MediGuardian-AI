import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import API from "../services/api";
import { motion } from "framer-motion";
import {
Bar,
Pie
} from "react-chartjs-2";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Tooltip,
Legend
} from "chart.js";

import {
FaPills,
FaExclamationTriangle,
FaTimesCircle,
FaRupeeSign
} from "react-icons/fa";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
ArcElement,
Tooltip,
Legend
);

function Reports(){

const [medicines,setMedicines]=useState([]);

useEffect(()=>{
loadData();
},[]);

const loadData=async()=>{

const res=await API.get("/medicines");

setMedicines(res.data.data);

};

const total=medicines.length;

const low=medicines.filter(
m=>m.quantity<=m.reorder_level
).length;

const expired=medicines.filter(
m=>new Date(m.expiry_date)<new Date()
).length;

const value=medicines.reduce(
(sum,m)=>sum+(m.quantity*m.price),
0
);

const barData={

labels:medicines.map(
m=>m.medicine_name
),

datasets:[

{

label:"Stock",

data:medicines.map(
m=>m.quantity
)

}

]

};

const pieData={

labels:["Available","Low Stock","Expired"],

datasets:[

{

data:[
total-low-expired,
low,
expired
]

}

]

};

return(

<>

<Navbar/>

<div className="d-flex">

<Sidebar/>

<div className="container-fluid p-4">

<h2 className="mb-4">

📊 Reports & Analytics

</h2>

<div className="row">

<div className="col-md-3">

<DashboardCard
title="Total Medicines"
value={total}
icon={<FaPills/>}
color="#2563EB"
/>

</div>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>

<Card>

...

</Card>

</motion.div>
<div className="col-md-3">

<DashboardCard
title="Low Stock"
value={low}
icon={<FaExclamationTriangle/>}
color="#F59E0B"
/>

</div>

<div className="col-md-3">

<DashboardCard
title="Expired"
value={expired}
icon={<FaTimesCircle/>}
color="#EF4444"
/>

</div>

<div className="col-md-3">

<DashboardCard
title="Inventory Value"
value={`₹${value}`}
icon={<FaRupeeSign/>}
color="#10B981"
/>

</div>

</div>

<div className="row mt-5">

<div className="col-md-8">

<div className="card shadow">

<div className="card-body">

<h4>

📈 Stock Overview

</h4>

<Bar data={barData}/>

</div>

</div>

</div>

<div className="col-md-4">

<div className="card shadow">

<div className="card-body">

<h4>

🥧 Inventory Status

</h4>

<Pie data={pieData}/>

</div>

</div>

</div>

</div>

<div className="card shadow mt-5">

<div className="card-body">

<h4>

📅 Recent Expired Medicines

</h4>

<table className="table">

<thead>

<tr>

<th>Name</th>

<th>Expiry</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

medicines

.filter(
m=>new Date(m.expiry_date)<new Date()
)

.map(m=>(

<tr key={m.id}>

<td>{m.medicine_name}</td>

<td>{m.expiry_date}</td>

<td>

<span className="badge bg-danger">

Expired

</span>

</td>

</tr>

))

}

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