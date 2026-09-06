import { useState, useEffect } from "react";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  const handleCancel = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://127.0.0.1:8000/appointments/${appointmentId}`,
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
          "http://127.0.0.1:8000/appointments",
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
      <h1>My Appointments</h1>

      <p>View and manage your booked appointments.</p>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <div
            className="appointment-card"
            key={appointment._id}
          >
            <h2>Appointment</h2>

            <p>
              <strong>Doctor ID:</strong>{" "}
              {appointment.doctor_id}
            </p>

            <p>
              <strong>Patient:</strong>{" "}
              {appointment.patient_email}
            </p>

            <p>
              <strong>Date & Time:</strong>{" "}
              {appointment.appointment_date}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {appointment.status || "pending"}
            </p>

            <button
              onClick={() => handleCancel(appointment._id)}
            >
              Cancel Appointment
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Appointments;