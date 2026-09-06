import { useNavigate } from "react-router-dom";
function Dashboard() {
    const navigate = useNavigate();
  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>HealthCare</h1>
          <p>Patient Dashboard</p>
        </div>

        <button
              className="logout-btn"
                  onClick={() => {localStorage.removeItem("token");navigate("/login");  }}> Logout
         </button>
      </div>

      {/* Welcome */}
      <div className="welcome-section">
        <h2>Welcome back! 👋</h2>
        <p>Manage your healthcare appointments easily.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-cards">

        <div className="dashboard-card">
          <div className="card-icon">👨‍⚕️</div>
          <h3>Find Doctors</h3>
          <p>Browse available doctors and their specializations.</p>
          <button onClick={() => navigate("/doctors")}>
  View Doctors
</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <h3>Book Appointment</h3>
          <p>Choose a doctor and book your appointment.</p>
          <button>Book Now</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📋</div>
          <h3>My Appointments</h3>
          <p>View and manage your upcoming appointments.</p>
          <button onClick={() => navigate("/appointments")}>
  View Appointments
</button>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;