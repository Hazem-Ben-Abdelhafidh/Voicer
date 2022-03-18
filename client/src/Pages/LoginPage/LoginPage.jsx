import { useState } from "react";
import Input from "../../Components/Form/Input/Input";
import SubmitButton from "../../Components/Form/SubmitButton/SubmitButton";
import classes from "./LoginPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { login, userSelector } from "./../../Redux/userSlice";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching} =
    useSelector(userSelector);
  const handleLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
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
        <a href="#">don't have an account? click here to register</a>
        <SubmitButton isFetching={isFetching} buttonLabel="Login" />
      </form>
    </main>
  );
};
export default LoginPage;
