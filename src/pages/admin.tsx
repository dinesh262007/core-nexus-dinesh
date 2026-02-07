// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { exportApplications } from "../lib/exportResponses";
// import { db } from "../firebase.js";
// import { collection, query, orderBy, getDocs } from "firebase/firestore";

// const ADMIN_PASSWORD = "speed force";

// export default function Admin() {
//   const [password, setPassword] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [error, setError] = useState("");
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = () => {
//     if (password === ADMIN_PASSWORD) {
//       setIsAuthenticated(true);
//       setError("");
//     } else {
//       setError("Incorrect password");
//     }
//   };

//   /* 🔹 FETCH APPLICATIONS AFTER LOGIN */
//   useEffect(() => {
//     if (!isAuthenticated) return;

//     const fetchApplications = async () => {
//       setLoading(true);
//       try {
//         const q = query(
//           collection(db, "audition_applications"),
//           orderBy("createdAt", "desc"),
//         );
//         const snapshot = await getDocs(q);
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setApplications(data);
//       } catch (err) {
//         console.error("Error fetching applications:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [isAuthenticated]);

//   /* 🔐 LOGIN SCREEN */
//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
//         <div className="bg-[#161616] p-8 rounded-xl w-full max-w-sm">
//           <h1 className="text-xl font-bold text-[#efefef] mb-4 text-center">
//             Admin Login
//           </h1>

//           <Input
//             type="password"
//             placeholder="Enter admin password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mb-4"
//           />

//           {error && (
//             <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
//           )}

//           <Button onClick={handleLogin} className="w-full">
//             Login
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   /* 📋 ADMIN DASHBOARD */
//   return (
//     <div className="p-10">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Admin – Audition Applications</h1>

//         <Button onClick={exportApplications}>
//           Download Applications (CSV)
//         </Button>
//       </div>

//       {loading ? (
//         <p className="text-muted-foreground">Loading applications...</p>
//       ) : applications.length === 0 ? (
//         <p className="text-muted-foreground">No applications found.</p>
//       ) : (
//         <div className="overflow-x-auto rounded-lg border">
//           <table className="w-full text-sm">
//             <thead className="bg-muted">
//               <tr>
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Email</th>
//                 <th className="p-3 text-left">Roll No</th>
//                 <th className="p-3 text-left">Gender</th>
//                 <th className="p-3 text-left">Department</th>
//                 <th className="p-3 text-left">Preferred Cell</th>
//                 <th className="p-3 text-left">Motivation</th>
//                 <th className="p-3 text-left">Submitted At</th>
//               </tr>
//             </thead>

//             <tbody>
//               {applications.map((app) => (
//                 <tr key={app.id} className="border-t align-top">
//                   <td className="p-3">{app.name || "-"}</td>
//                   <td className="p-3">{app.email || "-"}</td>
//                   <td className="p-3">{app.rollNumber || "-"}</td>
//                   <td className="p-3 capitalize">{app.gender || "-"}</td>
//                   <td className="p-3 uppercase">{app.department || "-"}</td>
//                   <td className="p-3 uppercase">{app.preferredCell || "-"}</td>
//                   <td className="p-3 max-w-xs whitespace-pre-wrap">
//                     {app.motivation || "-"}
//                   </td>
//                   <td className="p-3">
//                     {app.createdAt?.toDate
//                       ? app.createdAt.toDate().toLocaleString()
//                       : "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db, auth } from "../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { exportApplicationsByCell } from "../lib/exportResponses";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const CELLS = ["wdct", "robo", "core", "ecell", "rnd"];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid admin credentials");
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchApplications = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "audition_applications"),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        setApplications(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );
      } catch (err) {
        console.error("FETCH FAILED:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [isAuthenticated]);

  /* 🔐 LOGIN */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <div className="bg-[#161616] p-8 rounded-xl w-full max-w-sm">
          <h1 className="text-xl font-bold text-center mb-4">Admin Login</h1>

          <Input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </div>
    );
  }

  /* FILTERED DATA */
  const filteredApps = selectedCell
    ? applications.filter((app) => app.preferredCells?.includes(selectedCell))
    : [];

  /* 📋 DASHBOARD */
  return (
    <div className="p-10 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Total Applications</p>
          <p className="text-2xl font-bold">{applications.length}</p>
        </div>

        {CELLS.map((cell) => (
          <div key={cell} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground uppercase">{cell}</p>
            <p className="text-2xl font-bold">
              {
                applications.filter((a) => a.preferredCells?.includes(cell))
                  .length
              }
            </p>
          </div>
        ))}
      </div>

      {/* CELL SELECTOR */}
      <div className="flex flex-wrap gap-3">
        {CELLS.map((cell) => (
          <Button
            key={cell}
            variant={selectedCell === cell ? "default" : "outline"}
            onClick={() => setSelectedCell(cell)}
          >
            {cell.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* SELECTED CELL HEADER */}
      {selectedCell && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {selectedCell.toUpperCase()} Applications
            <span className="ml-2 text-sm text-muted-foreground">
              ({filteredApps.length})
            </span>
          </h2>

          <Button
            variant="secondary"
            onClick={() => exportApplicationsByCell(selectedCell)}
          >
            Download CSV
          </Button>
        </div>
      )}

      {/* TABLE */}
      {loading ? (
        <p className="text-muted-foreground">Loading applications...</p>
      ) : !selectedCell ? (
        <p className="text-muted-foreground">
          Select a cell to view applications.
        </p>
      ) : filteredApps.length === 0 ? (
        <p className="text-muted-foreground">No applications for this cell.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Dept</th>
                <th className="p-3 text-left">Motivation</th>
                <th className="p-3 text-left">Submitted At</th>
              </tr>
            </thead>

            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} className="border-t align-top">
                  <td className="p-3">{app.name}</td>
                  <td className="p-3">{app.email}</td>
                  <td className="p-3">{app.rollNumber}</td>
                  <td className="p-3">{app.phone || "-"}</td>
                  <td className="p-3 capitalize">{app.gender}</td>
                  <td className="p-3 uppercase">{app.department}</td>
                  <td className="p-3 max-w-xs whitespace-pre-wrap">
                    {app.motivation}
                  </td>
                  <td className="p-3">
                    {app.createdAt?.toDate
                      ? app.createdAt.toDate().toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
