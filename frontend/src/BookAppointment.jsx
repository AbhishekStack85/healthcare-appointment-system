import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    setMessage("Booking appointment...");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            doctor_id: doctorId,
            appointment_date: `${appointmentDate}T${appointmentTime}:00`,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Appointment booked successfully!");
      } else {
        setMessage(data.detail || "Booking failed");
      }
    } catch (error) {
      setMessage("Server se connection nahi ho pa raha.");
    }
  };

  return (
    <div className="booking-page">

      {/* Header */}
      <div className="booking-header">
        <div>
          <span className="booking-badge">🏥 HealthCare</span>

          <h1>Book Your Appointment</h1>

          <p>
            Schedule an appointment with your trusted healthcare provider.
          </p>
        </div>

        <div className="booking-icon">
          📅
        </div>
      </div>

      {/* Booking Card */}
      <div className="booking-card">

        <div className="booking-card-header">
          <div>
            <h2>Appointment Details</h2>
            <p>Select your preferred date and time</p>
          </div>

          <div className="doctor-small-icon">
            👨‍⚕️
          </div>
        </div>

        <form onSubmit={handleBooking}>

          <div className="booking-field">
            <label>Appointment Date</label>

            <div className="input-wrapper">
              <span>📅</span>

              <input
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="booking-field">
            <label>Appointment Time</label>

            <div className="input-wrapper">
              <span>🕐</span>

              <input
                type="time"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="booking-info">
            <span>🔒</span>
            <p>
              Your appointment information is secure and protected.
            </p>
          </div>

          <button type="submit" className="confirm-booking-btn">
            Confirm Booking
            <span>→</span>
          </button>

        </form>

        {message && (
          <div
            className={
              message.includes("successfully")
                ? "booking-message success"
                : "booking-message"
            }
          >
            {message.includes("successfully") ? "✅ " : "ℹ️ "}
            {message}
          </div>
        )}

        <button
          className="back-btn"
          onClick={() => navigate("/doctors")}
        >
          ← Back to Doctors
        </button>

      </div>

    </div>
  );
}

export default BookAppointment;