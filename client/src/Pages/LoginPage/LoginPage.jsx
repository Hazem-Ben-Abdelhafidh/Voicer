import { useState } from "react";
import Input from "../../Components/Form/Input/Input";
import SubmitButton from "../../Components/Form/SubmitButton/SubmitButton";
import classes from "./LoginPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { login, userSelector } from "./../../Redux/userSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching } = useSelector(userSelector);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/home";
  const handleLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
    navigate(from, { replace: true });
  };

  return (
    <main className={classes.Page}>
      <form className={classes.Login} onSubmit={handleLogin}>
        <h1>Login</h1>
        <Input type="email" name="email" value={email} onChange={setEmail} />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={setPassword}
        />
        <Link to="/signup">
          don't have an account? click here to register
        </Link>
        <SubmitButton isFetching={isFetching} buttonLabel="Login" />
      </form>
    </main>
  );
};
export default LoginPage;
