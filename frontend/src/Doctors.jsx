import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
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
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="doctors-page">
      <h1>Find a Doctor</h1>

      <p>
        Choose a doctor based on specialization and experience.
      </p>

      {doctors.map((doctor) => (
        <div className="doctor-card" key={doctor._id}>
          <h2>{doctor.name}</h2>

          <p>
            <strong>Specialization:</strong>{" "}
            {doctor.specialization}
          </p>

          <p>
            <strong>Experience:</strong>{" "}
            {doctor.experience} years
          </p>

          <button
  onClick={() => navigate(`/book-appointment/${doctor._id}`)}
>
  Book Appointment
</button>
        </div>
      ))}
    </div>
  );
}

export default Doctors;