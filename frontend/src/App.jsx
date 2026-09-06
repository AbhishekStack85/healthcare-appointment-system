import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Doctors from "./Doctors";
import BookAppointment from "./BookAppointment";
import Appointments from "./Appointments";
import Register from "./Register";
import DoctorDashboard from "./DoctorDashboard";
import DoctorAppointments from "./DoctorAppointments";

function App() {
  return (
    <Routes>
      <Route path="/doctor-appointments"element={<DoctorAppointments />}/>
      <Route path="/doctor-dashboard"element={<DoctorDashboard />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login onLogin={() => {}} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/book-appointment/:doctorId"element={<BookAppointment />}/>
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/"element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;