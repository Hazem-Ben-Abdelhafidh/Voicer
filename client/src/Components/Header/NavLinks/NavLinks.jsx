import classes from './NavLinks.module.scss';
import NavLink from './NavLink/NavLink'

export default function NavLinks() {
  return (
    <nav className={classes.Navigation}>
        <ul>
            <NavLink path="/about">About</NavLink>
            <NavLink path="/newsFeed">NewsFeed</NavLink>
            <NavLink path="/stranger">Talk with a Stranger!</NavLink>
        </ul>
    </nav>
  )
}
