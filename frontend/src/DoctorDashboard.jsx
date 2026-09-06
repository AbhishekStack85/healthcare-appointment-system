import { useNavigate } from "react-router-dom";
function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="doctor-dashboard">

      <div className="doctor-header">
        <div>
          <h1>HealthCare</h1>
          <p>Doctor Dashboard</p>
        </div>

        <button
             className="logout-btn" onClick={() => {localStorage.removeItem("token");navigate("/login"); }}>
                 Logout
             </button>
      </div>

      <div className="doctor-welcome">
        <h2>Welcome, Doctor 👨‍⚕️</h2>
        <p>
          Manage your appointments and patients from here.
        </p>
      </div>

      <div className="doctor-cards">

        <div className="doctor-card">
          <div className="card-icon">📅</div>

          <h3>Appointments</h3>

          <p>
            View your upcoming patient appointments.
          </p>

          <button onClick={() => navigate("/doctor-appointments")}>
                 View Appointments
             </button>
        </div>

        <div className="doctor-card">
          <div className="card-icon">👥</div>

          <h3>Patients</h3>

          <p>
            View patients who have booked appointments.
          </p>

          <button>
            View Patients
          </button>
        </div>

        <div className="doctor-card">
          <div className="card-icon">⚙️</div>

          <h3>Profile</h3>

          <p>
            Manage your doctor profile and availability.
          </p>

          <button>
            Manage Profile
          </button>
        </div>

      </div>

    </div>
  );
}

export default DoctorDashboard;