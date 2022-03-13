import Input from "../../Components/Form/Input/Input";
import SubmitButton from "../../Components/Form/SubmitButton/SubmitButton";
import classes from "./../LoginPage/LoginPage.module.scss";
const SignupPage = () => {
    return ( 
        <main className={classes.Page}>
      <form className={classes.Login}>
        <h1>Signup</h1>
        <Input type="text" name="username"/>
        <Input type="email" name="email" />
        <Input type="password" name="password"/>
        <Input type="password" name="confirm password"/>

        <a href="#">Have an account? Connect Now!</a>
        <SubmitButton buttonLabel="Signup"/>

      </form>
    </main>
     );
}
 
export default SignupPage;