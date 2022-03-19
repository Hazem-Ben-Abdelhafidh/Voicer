import classes from "./NavLink.module.scss";
import { Link } from "react-router-dom";

export default function NavLink({ children, path }) {
  return (
    <li className={classes.Link}>
      <Link to={path}>{children}</Link>
    </li>
  );
}
