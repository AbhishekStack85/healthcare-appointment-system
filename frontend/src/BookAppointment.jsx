import { useState } from "react";
import { useParams } from "react-router-dom";

function BookAppointment() {
  const { doctorId } = useParams();

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();

    setMessage("Booking appointment...");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/appointments",
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
      <h1>Book Appointment</h1>

      <div className="booking-card">
        <h2>Appointment Details</h2>

        <form onSubmit={handleBooking}>
          <label>Appointment Date</label>

          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />

          <label>Appointment Time</label>

          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />

          <button type="submit">
            Confirm Booking
          </button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default BookAppointment;