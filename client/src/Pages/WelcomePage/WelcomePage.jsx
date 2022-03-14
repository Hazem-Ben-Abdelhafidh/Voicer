import classes from "./WelcomePage.module.scss";
import { Link } from "react-router-dom";
const WelcomePage = () => {
  return (
    <main className={classes.Page}>
      <div className={classes.hero}>
        <h1>Voicer</h1>
        <div className={classes.hero1}>
          <h2>Speak up! Let your voice be Heard!</h2>
          <div className={classes.buttons}>
            <Link
              to="/login"
              className={`${classes.button} ${classes.loginButton}`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`${classes.button} ${classes.registerButton}`}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WelcomePage;
