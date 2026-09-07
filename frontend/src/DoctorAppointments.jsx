import { useState, useEffect } from "react";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments/${appointmentId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAppointments((currentAppointments) =>
          currentAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? {
                  ...appointment,
                  status: newStatus,
                }
              : appointment
          )
        );
      } else {
        alert(data.detail || "Status update failed");
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
        console.log("Doctor appointments fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatus = (appointment) => {
    return appointment.status || "pending";
  };

  return (
    <div className="doctor-appointments-page">

      {/* Header */}
      <div className="doctor-appointments-header">

        <div>
          <span className="appointments-label">
            🩺 DOCTOR PORTAL
          </span>

          <h1>My Appointments</h1>

          <p>
            Manage appointments and respond to requests from your patients.
          </p>
        </div>

        <div className="appointments-header-icon">
          📅
        </div>

      </div>

      {/* Summary */}
      <div className="appointment-summary">

        <div className="summary-box">
          <span>📋</span>
          <div>
            <strong>{appointments.length}</strong>
            <small>Total Appointments</small>
          </div>
        </div>

        <div className="summary-box">
          <span>⏳</span>
          <div>
            <strong>
              {
                appointments.filter(
                  (a) => getStatus(a) === "pending"
                ).length
              }
            </strong>
            <small>Pending</small>
          </div>
        </div>

        <div className="summary-box">
          <span>✅</span>
          <div>
            <strong>
              {
                appointments.filter(
                  (a) => getStatus(a) === "accepted"
                ).length
              }
            </strong>
            <small>Accepted</small>
          </div>
        </div>

        <div className="summary-box">
          <span>❌</span>
          <div>
            <strong>
              {
                appointments.filter(
                  (a) => getStatus(a) === "rejected"
                ).length
              }
            </strong>
            <small>Rejected</small>
          </div>
        </div>

      </div>

      {/* Section Title */}
      <div className="appointments-section-title">
        <div>
          <h2>Patient Appointments</h2>
          <p>Review and manage your appointment requests.</p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="appointments-loading">
          <div className="appointment-spinner"></div>
          <p>Loading appointments...</p>
        </div>
      )}

      {/* Empty */}
      {!loading && appointments.length === 0 && (
        <div className="appointments-empty">
          <div className="empty-icon">📅</div>
          <h3>No appointments yet</h3>
          <p>
            When patients book an appointment, it will appear here.
          </p>
        </div>
      )}

      {/* Appointment Cards */}
      {!loading && appointments.length > 0 && (
        <div className="doctor-appointments-grid">

          {appointments.map((appointment) => {
            const status = getStatus(appointment);

            return (
              <div
                className="doctor-appointment-card-new"
                key={appointment._id}
              >

                {/* Card Header */}
                <div className="appointment-card-top">

                  <div className="patient-info">

                    <div className="patient-avatar">
                      👤
                    </div>

                    <div>
                      <h3>Patient</h3>
                      <p>{appointment.patient_email}</p>
                    </div>

                  </div>

                  <span
                    className={`appointment-status ${status}`}
                  >
                    {status === "accepted" && "✓ Accepted"}
                    {status === "rejected" && "✕ Rejected"}
                    {status === "pending" && "⏳ Pending"}
                  </span>

                </div>

                {/* Appointment Details */}
                <div className="appointment-details">

                  <div className="appointment-detail-box">
                    <span>📅</span>

                    <div>
                      <small>Appointment Date</small>

                      <strong>
                        {new Date(
                          appointment.appointment_date
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </strong>
                    </div>
                  </div>

                  <div className="appointment-detail-box">
                    <span>🕐</span>

                    <div>
                      <small>Appointment Time</small>

                      <strong>
                        {new Date(
                          appointment.appointment_date
                        ).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </strong>
                    </div>
                  </div>

                </div>

                {/* Doctor ID */}
                <div className="appointment-doctor-id">
                  <span>🩺</span>

                  <div>
                    <small>Doctor ID</small>
                    <p>{appointment.doctor_id}</p>
                  </div>
                </div>

                {/* Actions */}
                {status === "pending" && (
                  <div className="appointment-actions">

                    <button
                      className="accept-btn"
                      onClick={() =>
                        handleStatusUpdate(
                          appointment._id,
                          "accepted"
                        )
                      }
                    >
                      ✓ Accept Appointment
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        handleStatusUpdate(
                          appointment._id,
                          "rejected"
                        )
                      }
                    >
                      ✕ Reject
                    </button>

                  </div>
                )}

                {/* Final Status */}
                {status === "accepted" && (
                  <div className="appointment-result accepted-result">
                    ✓ This appointment has been accepted
                  </div>
                )}

                {status === "rejected" && (
                  <div className="appointment-result rejected-result">
                    ✕ This appointment has been rejected
                  </div>
                )}

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default DoctorAppointments;