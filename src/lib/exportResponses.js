import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export const exportApplications = async () => {
  const snapshot = await getDocs(
    collection(db, "audition_applications")
  );

  if (snapshot.empty) {
    alert("No applications found");
    return;
  }

  // ✅ FIXED COLUMN ORDER
  const headers = [
    "id",
    "name",
    "email",
    "rollNumber",
    "gender",
    "department",
    "preferredCell",
    "motivation",
  ];

  const rows = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name ?? "",
      email: data.email ?? "",
      rollNumber: data.rollNumber ?? "",
      gender: data.gender ?? "",
      department: data.department ?? "",
      preferredCell: data.preferredCell ?? "",
      motivation: data.motivation ?? "",
    };
  });

  const csvRows = [
    headers.join(","),

    ...rows.map((row) =>
      headers
        .map((key) =>
          `"${String(row[key]).replace(/"/g, '""')}"`
        )
        .join(",")
    ),
  ];

  const csv = csvRows.join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "audition_applications_clean.csv";
  a.click();

  window.URL.revokeObjectURL(url);
};
