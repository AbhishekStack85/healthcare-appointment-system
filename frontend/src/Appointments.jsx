import { useState, useEffect } from "react";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const handleCancel = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments/${appointmentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAppointments((currentAppointments) =>
          currentAppointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
      } else {
        alert(data.detail || "Cancellation failed");
      }
    } catch (error) {
      alert("Server se connection nahi ho pa raha.");
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setAppointments(data);
        } else {
          console.log("Appointments error:", data.detail);
        }
      } catch (error) {
        console.log("Appointments fetch error:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="appointments-page">

      {/* Header */}
      <div className="appointments-header">
        <div>
          <span className="appointments-badge">
            🏥 HealthCare
          </span>

          <h1>My Appointments</h1>

          <p>
            View and manage all your booked appointments in one place.
          </p>
        </div>

        <div className="appointments-icon">
          📅
        </div>
      </div>

      {/* Appointment List */}
      {appointments.length === 0 ? (
        <div className="empty-appointments">
          <div className="empty-icon">📅</div>
          <h2>No Appointments Yet</h2>
          <p>
            You haven't booked any appointments yet.
          </p>
        </div>
      ) : (
        <div className="appointments-grid">

          {appointments.map((appointment) => {

            const status = appointment.status || "pending";

            return (
              <div
                className="appointment-card"
                key={appointment._id}
              >

                {/* Card Header */}
                <div className="appointment-card-header">
                  <div className="appointment-doctor-icon">
                    👨‍⚕️
                  </div>

                  <div>
                    <h2>Doctor Appointment</h2>
                    <p>Healthcare consultation</p>
                  </div>

                  <span className={`status-badge ${status}`}>
                    {status === "accepted" && "✓ Accepted"}
                    {status === "rejected" && "✕ Rejected"}
                    {status === "pending" && "◷ Pending"}
                  </span>
                </div>

                {/* Details */}
                <div className="appointment-details">

                  <div className="appointment-detail">
                    <span className="detail-icon">👨‍⚕️</span>

                    <div>
                      <small>Doctor ID</small>
                      <strong>{appointment.doctor_id}</strong>
                    </div>
                  </div>

                  <div className="appointment-detail">
                    <span className="detail-icon">👤</span>

                    <div>
                      <small>Patient</small>
                      <strong>{appointment.patient_email}</strong>
                    </div>
                  </div>

                  <div className="appointment-detail">
                    <span className="detail-icon">📅</span>

                    <div>
                      <small>Date & Time</small>
                      <strong>
                        {appointment.appointment_date}
                      </strong>
                    </div>
                  </div>

                </div>

                {/* Status Message */}
                {status === "accepted" && (
                  <div className="appointment-status accepted-message">
                    ✅ Your appointment has been accepted by the doctor.
                  </div>
                )}

                {status === "rejected" && (
                  <div className="appointment-status rejected-message">
                    ❌ Your appointment was rejected by the doctor.
                  </div>
                )}

                {status === "pending" && (
                  <div className="appointment-status pending-message">
                    ⏳ Waiting for doctor confirmation.
                  </div>
                )}

                {/* Cancel */}
                <button
                  className="cancel-appointment-btn"
                  onClick={() => handleCancel(appointment._id)}
                >
                  Cancel Appointment
                </button>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Appointments;