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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

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
    <div className="login-page">

      {/* Navbar */}
      <nav className="login-navbar">

        <div
          className="login-logo"
          onClick={() => navigate("/")}
        >
          <span>✚</span>
          HealthCare
        </div>

        <div className="login-nav-actions">
          <span>Don't have an account?</span>

          <button onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>

      </nav>

      {/* Login Section */}
      <section className="login-section-new">

        <div className="login-container">

          {/* Left Side */}
          <div className="login-info">

            <div className="login-small-title">
              WELCOME BACK
            </div>

            <h1>
              Your Health,
              <br />
              <span>Our Priority</span>
            </h1>

            <p>
              Sign in to manage your appointments, connect with
              trusted doctors, and stay on top of your healthcare.
            </p>

            <div className="login-benefits">

              <div className="login-benefit">
                <div className="login-benefit-icon">✓</div>
                <span>Manage your appointments</span>
              </div>

              <div className="login-benefit">
                <div className="login-benefit-icon">👨‍⚕️</div>
                <span>Connect with trusted doctors</span>
              </div>

              <div className="login-benefit">
                <div className="login-benefit-icon">🔒</div>
                <span>Secure and protected account</span>
              </div>

            </div>

            <div className="login-illustration">
              🩺
              <span>❤</span>
            </div>

          </div>

          {/* Right Side */}
          <div className="login-form-container">

            <div className="login-form-header">
              <h2>Welcome Back</h2>

              <p>
                Login to your HealthCare account
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={handleLogin}
            >

              {/* Email */}
              <div className="login-field">

                <label>Email Address</label>

                <div className="login-input-wrapper">
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
              <div className="login-field">

                <label>Password</label>

                <div className="login-input-wrapper">
                  <span>🔒</span>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="login-submit-btn"
              >
                Sign In
                <span>→</span>
              </button>

            </form>

            {message && (
              <p className="login-message-new">
                {message}
              </p>
            )}

            <div className="login-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            <p className="login-register-text">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Login;