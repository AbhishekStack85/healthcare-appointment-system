import { useState, useEffect } from "react";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);

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
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="doctor-appointments-page">
      <h1>My Appointments</h1>

      <p>
        View appointments booked by your patients.
      </p>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            className="doctor-appointment-card"
            key={appointment._id}
          >
            <h2>Patient Appointment</h2>

            <p>
              <strong>Patient:</strong>{" "}
              {appointment.patient_email}
            </p>

            <p>
              <strong>Doctor ID:</strong>{" "}
              {appointment.doctor_id}
            </p>

            <p>
              <strong>Date & Time:</strong>{" "}
              {appointment.appointment_date}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {appointment.status || "pending"}
            </p>

            {(!appointment.status ||
              appointment.status === "pending") && (
              <div>
                <button
                  onClick={() =>
                    handleStatusUpdate(
                      appointment._id,
                      "accepted"
                    )
                  }
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      appointment._id,
                      "rejected"
                    )
                  }
                >
                  Reject
                </button>
              </div>
            )}

            {appointment.status === "accepted" && (
              <p>✅ Appointment Accepted</p>
            )}

            {appointment.status === "rejected" && (
              <p>❌ Appointment Rejected</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default DoctorAppointments;