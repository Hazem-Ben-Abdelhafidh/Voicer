import Input from "../../Components/Form/Input/Input";
import SubmitButton from "../../Components/Form/SubmitButton/SubmitButton";
import classes from "./../LoginPage/LoginPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { signup, userSelector } from "./../../Redux/userSlice";
import { useState } from "react";
const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const signupHandler= (e)=>{
    e.preventDefault();
    const user={name,email,password,passwordConfirm}
    dispatch(signup(user));
  }
  return (
    <main className={classes.Page}>
      <form className={classes.Login} onSubmit={signupHandler}>
        <h1>Signup</h1>
        <Input type="text" name="username" value={name} onChange={setName} />
        <Input type="email" name="email" value={email} onChange={setEmail} />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={setPassword}
        />
        <Input
          type="password"
          name="confirm password"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />

        <a href="#">Have an account? Connect Now!</a>
        <SubmitButton isFetching={isFetching} buttonLabel="Signup" />
      </form>
    </main>
  );
};

export default SignupPage;
