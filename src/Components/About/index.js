import "./index.css";
import Header from "../Header";

const About = () => (
  <>
    <Header />
    <div className="about-main-container">
      <div className="About-descritpion">
        <img src="assets/logo.png" alt="logo" className="logo-landing" />
        <h1 className="about">Who we are and we do ?</h1>
        <h3 className="welcome">WELCOME</h3>
        <p className="description">
          Cop On Cloud is developed by the students of RGUKT Basar.The motive of
          building this app is to bring awareness among ourselves about the
          society we are living in. We provide the public with a platform where
          they can share the valuable information about the crime activities in
          their neighbourhood.We believe in giving people a way to use their
          phones to protect a neighbor, to prevent a tragedy, and to count on
          one another.We assist the law enforcing agencies and police department
          by providing the information about the happening crimes leading to
          reduced crime rate.Helping in creating a better-informed citizenry and
          to build a safer and stronger community together is our goal.
        </p>
      </div>
    </div>
  </>
);

export default About;
