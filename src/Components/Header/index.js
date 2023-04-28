import "./index.css";
import { Link, withRouter, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { APP_IMAGE } from "../../Utils/constants";
import { Button } from "antd";
import { ReadOutlined, UserOutlined, QuestionCircleOutlined, InfoCircleOutlined,LogoutOutlined, FontColorsOutlined } from "@ant-design/icons";

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

  const pathname = window.location.pathname;
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/feed">
          <img src={APP_IMAGE} className="logo" alt="logo" />
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/myposts" className="nav_link">
              <Button icon={<UserOutlined></UserOutlined>}></Button>
              {pathname === "/myposts" ? <p style={{fontSize:15 ,marginLeft:26, marginTop:5, color:"blue"}}><b>Profile</b></p> : <p style={{fontSize:15 ,marginLeft:26, marginTop:5}}>Profile</p>}
            </Link>
          </li>
          <li>
            <Link to="/feed" className="nav_link">
            <Button icon={<ReadOutlined></ReadOutlined>}></Button>
            {pathname === "/feed" ? <p style={{fontSize:15 ,marginLeft:35, marginTop:5, color:"blue"}}><b>Feed</b></p> : <p style={{fontSize:15 ,marginLeft:35, marginTop:5}}>Feed</p>}
            </Link>
          </li>

          <li>
            <Link to="/help" className="nav_link">
            <Button icon={<QuestionCircleOutlined></QuestionCircleOutlined>}></Button>
            {pathname === "/help" ? <p style={{fontSize:15 ,marginLeft:35, marginTop:5, color:"blue"}}><b>Help</b></p> : <p style={{fontSize:15 ,marginLeft:35, marginTop:5}}>Help</p>}
            </Link>
          </li>

          <li>
            <Link to="/about" className="nav_link">
            <Button icon={<InfoCircleOutlined></InfoCircleOutlined>}></Button>
            {pathname === "/about" ? <p style={{fontSize:15 ,marginLeft:30, marginTop:5, color:"blue"}}><b>About</b></p> : <p style={{fontSize:15 ,marginLeft:30, marginTop:5}}>About</p>}
            </Link>
          </li>
          <li>
            <Button className="button" icon={<LogoutOutlined></LogoutOutlined>}  onClick={logoutClicked}></Button>
            <p style={{fontSize:15 ,marginLeft:20, marginTop:5, marginRight:5}}>Logout</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Header);
