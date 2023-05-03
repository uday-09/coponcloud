import "./landing.css";
import { Link } from "react-router-dom";
import { ADMIN_APP_URL } from "../../Utils/constants";
import { Dropdown, Button } from "antd";

const items = [
  {
    key: "1",
    label: <a href={`/login`}>Login as user</a>,
  },
  {
    key: "2",
    label: <a href={ADMIN_APP_URL}>Login as Admin</a>,
  },
];

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
          {/* <button type="button" className="button button3"> */}
          <Button className="button button3">Signup</Button>
          {/* </button> */}
        </Link>

        {/* <Link to="/login" className="link">
          <button type="button" className="button button3">
            Login as User
          </button>
        </Link> */}
        {/* <Link  className="link"> */}
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button className="button button3">Login</Button>
        </Dropdown>
        {/* </Link> */}
      </div>
    </div>
  </div>
);

export default Landing;
