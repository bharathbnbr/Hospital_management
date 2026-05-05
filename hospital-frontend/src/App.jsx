import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdmitPatient from "./pages/common/AdmitPatient";
import ProtectedRoute from "./components/ProtectedRoute";
import { getRole } from "./utils/auth";
import { Toaster } from "react-hot-toast";
import DischargePatient from "./pages/common/DischargePatient";
import Register from "./pages/Register";

function App() {
  const role = getRole();
  console.log("role", role)
  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <>
          <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admit" element={<ProtectedRoute><AdmitPatient /></ProtectedRoute>} />
          <Route path="/Discharge" element={<ProtectedRoute><DischargePatient /></ProtectedRoute>} />

        </>

        {/* {role === "admin" && (
          <Route path="/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
        )} */}
      </Routes>
    </>
  );
}

export default App;