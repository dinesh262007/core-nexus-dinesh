// import { db } from "../firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// export const exportApplicationsByCell = async (cell) => {
//   const q = query(
//     collection(db, "audition_applications"),
//     where("preferredCell", "==", cell)
//   );

//   const snapshot = await getDocs(q);

//   if (snapshot.empty) {
//     alert(`No applications for ${cell.toUpperCase()}`);
//     return;
//   }

//   const rows = [
//     [
//       "Name",
//       "Email",
//       "Roll Number",
//       "Gender",
//       "Department",
//       "Preferred Cell",
//       "Motivation",
//       "Submitted At",
//     ],
//   ];

//   snapshot.docs.forEach((doc) => {
//     const d = doc.data();
//     rows.push([
//       d.name || "",
//       d.email || "",
//       d.rollNumber || "",
//       d.gender || "",
//       d.department || "",
//       d.preferredCell || "",
//       (d.motivation || "").replace(/\n/g, " "),
//       d.createdAt?.toDate
//         ? d.createdAt.toDate().toLocaleString()
//         : "",
//     ]);
//   });

//   const csvContent = rows.map((r) => r.join(",")).join("\n");

//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement("a");
//   link.href = url;
//   link.download = `auditions_${cell}.csv`;
//   link.click();
// };

import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

/* ---------- CSV ESCAPE FUNCTION ---------- */
const escapeCSV = (value) => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  return `"${str.replace(/"/g, '""')}"`;
};

/* ---------- EXPORT BY CELL ---------- */

export const exportApplicationsByCell = async (cell) => {
  try {
    /* 🔴 IMPORTANT: array-contains for preferredCells */
    const q = query(
      collection(db, "audition_applications"),
      where("preferredCells", "array-contains", cell),
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      alert(`No applications for ${cell.toUpperCase()}`);
      return;
    }

    const rows = [
      [
        "Name",
        "Email",
        "Roll Number",
        "Phone",
        "Gender",
        "Department",
        "Preferred Cells",
        "Motivation",
        "Submitted At",
      ],
    ];

    snapshot.docs.forEach((doc) => {
      const d = doc.data();

      rows.push([
        d.name || "",
        d.email || "",
        d.rollNumber || "",
        d.phone || "",
        d.gender || "",
        d.department || "",
        (d.preferredCells || []).join(" | "),
        (d.motivation || "").replace(/\n/g, " "),
        d.createdAt && d.createdAt.toDate
          ? d.createdAt.toDate().toLocaleString()
          : "",
      ]);
    });

    /* ---- build csv ---- */

    const csvContent = rows
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `auditions_${cell}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert("Export failed. Check console.");
  }
};
