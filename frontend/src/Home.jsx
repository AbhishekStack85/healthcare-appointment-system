import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className="home-navbar">
        <div className="home-logo">
          <span>✚</span>
          HealthCare
        </div>

        <div className="home-nav-links">
          <button onClick={() => navigate("/")}>
            Home
          </button>

          <button onClick={() => navigate("/doctors")}>
            Find Doctors
          </button>

          <button>
            How It Works
          </button>

          <button>
            About
          </button>
        </div>

        <div className="home-nav-actions">
          <button
            className="home-signin"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>

          <button
            className="home-get-started"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="home-hero">

        <div className="home-hero-content">

          <div className="home-badge">
            👥 Trusted Healthcare Platform
          </div>

          <h1>
            Your Health,
            <br />
            <span>Our Priority</span>
          </h1>

          <p>
            Book appointments with trusted doctors, manage your
            appointments, and take control of your healthcare journey.
          </p>

          <div className="home-hero-buttons">

            <button
              className="home-primary-btn"
              onClick={() => navigate("/register")}
            >
              → Get Started
            </button>

            <button
              className="home-secondary-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>

          </div>

          {/* Stats */}
          <div className="home-stats">

            <div className="home-stat">
              <div className="stat-icon">👨‍⚕️</div>

              <div>
                <strong>Trusted Doctors</strong>
                <span>Professional care</span>
              </div>
            </div>

            <div className="home-stat">
              <div className="stat-icon">📅</div>

              <div>
                <strong>Easy Booking</strong>
                <span>Book in seconds</span>
              </div>
            </div>

            <div className="home-stat">
              <div className="stat-icon">✓</div>

              <div>
                <strong>Secure & Simple</strong>
                <span>Healthcare management</span>
              </div>
            </div>

          </div>

        </div>

        {/* Hero Visual */}
        <div className="home-hero-visual">

          {/* Real Doctor */}
          <div className="doctor-circle">

            <div className="doctor-background"></div>

            <img
              src="/doctor.png"
              alt="Indian Doctor"
            />

          </div>

          {/* Easy Booking Card */}
          <div className="floating-card booking-card">

            <span className="floating-icon">
              📅
            </span>

            <div>
              <strong>Easy Booking</strong>
              <p>Book appointments in seconds</p>
            </div>

          </div>

          {/* Find Doctors Card */}
          <div className="floating-card doctor-card-home">

            <span className="floating-icon">
              👨‍⚕️
            </span>

            <div>
              <strong>Find Doctors</strong>
              <p>Choose your specialist</p>
            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="home-features">

        <h2>Everything You Need</h2>

        <p className="home-features-subtitle">
          Simple and convenient healthcare management
        </p>

        <div className="home-feature-container">

          <div className="home-feature-card">

            <div className="feature-icon-home">
              👨‍⚕️
            </div>

            <h3>Find Doctors</h3>

            <p>
              Browse available doctors and choose the right
              specialist for your healthcare needs.
            </p>

          </div>

          <div className="home-feature-card">

            <div className="feature-icon-home">
              📅
            </div>

            <h3>Easy Booking</h3>

            <p>
              Book appointments quickly and manage your
              upcoming appointments in one place.
            </p>

          </div>

          <div className="home-feature-card">

            <div className="feature-icon-home">
              ✓
            </div>

            <h3>Track Status</h3>

            <p>
              Keep track of your appointment status and
              receive updates from your doctor.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;