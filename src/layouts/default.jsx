import Menu from "../components/Menu";

Menu
function DefaultLayout({children}) {
    return <div className="layout">
        <Menu></Menu>
        {children}
    </div> ;
}

export default DefaultLayout;