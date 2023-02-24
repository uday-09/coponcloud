import React from "react";
import "./styles.css";

function ErrorPage({ message }) {
  return (
    <div className="error-body">
      <img
        src="https://img.freepik.com/free-vector/ethical-dilemma-illustration_23-2148729240.jpg?size=338&ext=jpg&ga=GA1.1.2028920382.1677230295&semt=ais"
        alt="error"
      ></img>
      {message}
    </div>
  );
}

export default ErrorPage;
