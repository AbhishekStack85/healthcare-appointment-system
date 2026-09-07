import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

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
        `${import.meta.env.VITE_API_URL}/register`,
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

      {/* Navbar */}
      <nav className="register-navbar">

        <div
          className="register-logo"
          onClick={() => navigate("/")}
        >
          <span>✚</span>
          HealthCare
        </div>

        <div className="register-nav-actions">
          <span>Already have an account?</span>

          <button
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>

      </nav>

      {/* Register Section */}
      <section className="register-section">

        <div className="register-container">

          {/* Left Side */}
          <div className="register-info">

            <div className="register-small-title">
              JOIN OUR COMMUNITY
            </div>

            <h1>
              Better Health
              <br />
              <span>Brighter Tomorrow</span>
            </h1>

            <p className="register-description">
              Create your account and take the first step
              towards a healthier, happier you.
            </p>

            <div className="register-benefits">

              <div className="register-benefit">
                <div className="benefit-icon">✓</div>
                <span>Book appointments easily</span>
              </div>

              <div className="register-benefit">
                <div className="benefit-icon">👥</div>
                <span>Access trusted doctors</span>
              </div>

              <div className="register-benefit">
                <div className="benefit-icon">📅</div>
                <span>Manage your appointments</span>
              </div>

              <div className="register-benefit">
                <div className="benefit-icon">🛡️</div>
                <span>Secure and private</span>
              </div>

            </div>

            <div className="register-illustration">
              👨‍⚕️
              <span>❤</span>
            </div>

          </div>

          {/* Right Side */}
          <div className="register-form-container">

            <div className="register-form-header">
              <h2>Create Account</h2>

              <p>
                Register for your HealthCare account
              </p>
            </div>

            <form
              className="register-form"
              onSubmit={handleRegister}
            >

              {/* Name */}
              <div className="register-field">

                <label>Full Name</label>

                <div className="register-input-wrapper">
                  <span>👤</span>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

              </div>

              {/* Email */}
              <div className="register-field">

                <label>Email Address</label>

                <div className="register-input-wrapper">
                  <span>✉</span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

              </div>

              {/* Password */}
              <div className="register-field">

                <label>Password</label>

                <div className="register-input-wrapper">
                  <span>🔒</span>

                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

              </div>

              {/* Role */}
              <div className="register-field">

                <label>Account Type</label>

                <div className="role-selection">

                  <button
                    type="button"
                    className={
                      role === "patient"
                        ? "role-option active"
                        : "role-option"
                    }
                    onClick={() => setRole("patient")}
                  >
                    <span>👤</span>
                    Patient
                  </button>

                  <button
                    type="button"
                    className={
                      role === "doctor"
                        ? "role-option active"
                        : "role-option"
                    }
                    onClick={() => setRole("doctor")}
                  >
                    <span>🩺</span>
                    Doctor
                  </button>

                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="create-account-btn"
              >
                Create Account
                <span>→</span>
              </button>

            </form>

            {/* Message */}
            {message && (
              <p className="register-message">
                {message}
              </p>
            )}

            <div className="register-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <p className="register-login-text">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Register;