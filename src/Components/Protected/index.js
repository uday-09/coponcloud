import Cookies from "js-cookie";
import { Redirect, Route } from "react-router-dom";

const Protected = (props) => {
  const token = Cookies.get("token");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

export default Protected;
