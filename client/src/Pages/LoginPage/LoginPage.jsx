import Input from "../../Components/Form/Input/Input";
import SubmitButton from "../../Components/Form/SubmitButton/SubmitButton";
import classes from "./LoginPage.module.scss";
const LoginPage = () => {
  return (
    <main className={classes.Page}>
      <form className={classes.Login}>
        <h1>Login</h1>
        <Input type="email" name="email" />
        <Input type="password" name="password"/>
        <a href="#">don't have an account? click here to register</a>
        <SubmitButton buttonLabel="Login"/>

      </form>
    </main>
  );
};

export default LoginPage;
