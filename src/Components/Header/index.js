import "./index.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { APP_IMAGE } from "../../Utils/constants";

const Header = (props) => {
  const { history } = props;

  const logoutClicked = () => {
    const ok = window.confirm("Are you Sure? You want to logout ?");
    if (ok) {
      Cookies.remove("token");
      history.replace("/");
    }
  };

  const token = Cookies.get("token");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/feed">
          <img src={APP_IMAGE} className="logo" alt="logo" />
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/myposts" className="nav_link">
              My Profile
            </Link>
          </li>
          <li>
            <Link to="/feed" className="nav_link">
              Feed
            </Link>
          </li>

          <li>
            <Link to="/help" className="nav_link">
              Help
            </Link>
          </li>

          <li>
            <Link to="/about" className="nav_link">
              About
            </Link>
          </li>
          <li>
            <button className="button" onClick={logoutClicked}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Header);
