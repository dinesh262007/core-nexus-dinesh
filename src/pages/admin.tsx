import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exportApplications } from "../lib/exportResponses";

const ADMIN_PASSWORD = "speed force"; 

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <div className="bg-[#161616] p-8 rounded-xl w-full max-w-sm">
          <h1 className="text-xl font-bold text-[#efefef] mb-4 text-center">
            Admin Login
          </h1>

          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Admin – Audition Applications
      </h1>

      <Button onClick={exportApplications}>
        Download Applications (CSV)
      </Button>
    </div>
  );
}
