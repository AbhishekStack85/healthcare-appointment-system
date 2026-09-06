import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("Logging in...");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
  localStorage.setItem("token", data.access_token);

  if (data.role === "doctor") {
    navigate("/doctor-dashboard");
  } else {
    navigate("/dashboard");
  }
} else {
        setMessage(data.detail || "Login failed");
      }
    } catch (error) {
      setMessage("Server se connection nahi ho pa raha.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2>HealthCare</h2>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Doctors</a>
          <a href="#">Appointments</a>
          <button>Login</button>
        </div>
      </nav>

      {/* Login Section */}
      <section className="login-section">
        <div className="login-card">
          <h1>Welcome Back</h1>

          <p>Login to your HealthCare account</p>

          <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          {message && (
            <p className="login-message">{message}</p>
          )}

          <p className="register-text">Don't have an account?{" "}
            <button type="button" onClick={() => navigate("/register")}>
               Register
                </button>
</p>
        </div>
      </section>
    </div>
  );
}

export default Login;