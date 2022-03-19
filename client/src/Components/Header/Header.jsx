import classes from "./Header.module.scss";
import Logo from "../Logo/Logo";
import NavLinks from "./NavLinks/NavLinks";
export default function () {
  return (
    <header className={classes.Header}>
      <Logo />
      <NavLinks />
    </header>
  );
}
