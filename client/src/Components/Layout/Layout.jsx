import Header from "../Header/Header";
import classes from './Layout.module.scss';

const Layout = ({children}) => {
    return ( <div className={classes.Layout}>
        <Header/>
        <main>
            {children} 
            
        </main>
        <div>Footer</div>
    </div> );
}
 
export default Layout;