import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportMedicinesPDF = (medicines) => {

const doc = new jsPDF();

doc.text("MediGuardian AI Report",14,15);

autoTable(doc,{
head:[[
"Medicine",
"Category",
"Qty",
"Price"
]],
body:medicines.map(m=>[
m.medicine_name,
m.category,
m.quantity,
m.price
])
});

doc.save("Medicines.pdf");

};