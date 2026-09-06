import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("Creating account...");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: role,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(data.detail || "Registration failed");
      }
    } catch (error) {
      setMessage("Server se connection nahi ho pa raha.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Create Account</h1>

        <p>Register for your HealthCare account</p>

        <form onSubmit={handleRegister}>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <button type="submit">
            Register
          </button>

        </form>

        {message && (
          <p className="register-message">
            {message}
          </p>
        )}

        <p>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;