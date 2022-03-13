const Layout = ({children}) => {
    const hazem=5;
    hazem=3;
    return ( <>
        <div>Header</div>
        <main>
            {children} 
            
        </main>
        <div>Footer</div>
    </> );
}
 
export default Layout;