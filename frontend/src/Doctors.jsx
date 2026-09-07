import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/doctors`
        );

        const data = await response.json();

        setDoctors(data);
      } catch (error) {
        console.log("Doctors fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctors-page">

      {/* Header */}
      <div className="doctors-header">

        <div>
          <span className="doctors-label">
            🩺 HEALTHCARE PROFESSIONALS
          </span>

          <h1>Find Your Doctor</h1>

          <p>
            Connect with trusted doctors and book your appointment
            with ease.
          </p>
        </div>

        <div className="doctors-header-icon">
          👨‍⚕️
        </div>

      </div>

      {/* Doctor Count */}
      <div className="doctors-title-row">
        <div>
          <h2>Available Doctors</h2>
          <p>Choose the right specialist for your healthcare needs.</p>
        </div>

        <div className="doctor-count">
          {doctors.length} Doctors
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="doctors-loading">
          <div className="loading-spinner"></div>
          <p>Finding available doctors...</p>
        </div>
      )}

      {/* Doctors */}
      {!loading && doctors.length > 0 && (
        <div className="doctors-grid">

          {doctors.map((doctor) => (
            <div className="doctor-profile-card" key={doctor._id}>

              <div className="doctor-profile-top">

                <div className="doctor-avatar">
                  👨‍⚕️
                </div>

                <div className="available-badge">
                  <span></span>
                  Available
                </div>

              </div>

              <h3>{doctor.name}</h3>

              <p className="doctor-specialization">
                {doctor.specialization}
              </p>

              <div className="doctor-details">

                <div className="doctor-detail">
                  <span>🎓</span>
                  <div>
                    <small>Experience</small>
                    <strong>{doctor.experience} years</strong>
                  </div>
                </div>

                <div className="doctor-detail">
                  <span>🩺</span>
                  <div>
                    <small>Specialist</small>
                    <strong>{doctor.specialization}</strong>
                  </div>
                </div>

              </div>

              <button
                className="doctor-book-btn"
                onClick={() =>
                  navigate(`/book-appointment/${doctor._id}`)
                }
              >
                Book Appointment
                <span>→</span>
              </button>

            </div>
          ))}

        </div>
      )}

      {/* Empty */}
      {!loading && doctors.length === 0 && (
        <div className="doctors-empty">
          <div>🩺</div>
          <h3>No doctors available</h3>
          <p>Please check again later.</p>
        </div>
      )}

    </div>
  );
}

export default Doctors;