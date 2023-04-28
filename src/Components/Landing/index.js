import "./landing.css";
import { Link } from "react-router-dom";

const Landing = () => (
  <div className="landing-container">
    <div className="landing-content">
      <div class="description2">
        <h1>Cop-On-Cloud</h1>
        <img src="assets/logo.png" alt="logo" className="logo-landing" />
        {/* <h3>Sign-in</h3>
        <h3>Explore</h3> */}
      </div>

      <div className="buttons-container">
        <Link to="/signup" className="link">
          <button type="button" className="button button3">
            Signup
          </button>
        </Link>

        <Link to="/login" className="link">
          <button type="button" className="button button3">
            Login as User
          </button>
        </Link>
        {/* <Link  className="link"> */}
        <button type="button" className="button button3">
          <a href="http://localhost:3001">Login as Admin</a>
        </button>
        {/* </Link> */}
      </div>
    </div>
  </div>
);

export default Landing;
